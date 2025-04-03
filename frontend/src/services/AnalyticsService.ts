
export interface InterviewSession {
  id: string;
  title: string;
  date: Date;
  duration: number; // seconds
  topics: string[];
  questionCount: number;
  performanceScore: number; // 0-100
  feedback: SessionFeedback;
}

export interface SessionFeedback {
  strengths: string[];
  improvements: string[];
  technicalScore: number; // 0-100
  communicationScore: number; // 0-100
  overallImpression: string;
}

export interface PerformanceMetrics {
  totalInterviews: number;
  averageDuration: number; // minutes
  averageScore: number; // 0-100
  strongestTopics: string[];
  weakestTopics: string[];
  completedTopics: string[];
  recentSessions: InterviewSession[];
  weeklyActivity: { date: string; count: number }[];
}

export class AnalyticsService {
  private storageKey = 'interview_sessions';

  // Save interview session
  public async saveSession(session: Omit<InterviewSession, 'id'>): Promise<InterviewSession> {
    const sessions = await this.getAllSessions();
    const newSession: InterviewSession = {
      ...session,
      id: Date.now().toString(),
    };
    
    sessions.push(newSession);
    localStorage.setItem(this.storageKey, JSON.stringify(sessions));
    
    return newSession;
  }

  // Get all interview sessions
  public async getAllSessions(): Promise<InterviewSession[]> {
    const sessionsJson = localStorage.getItem(this.storageKey);
    if (!sessionsJson) {
      return this.getMockSessions();
    }
    
    try {
      const sessions = JSON.parse(sessionsJson) as InterviewSession[];
      
      // Convert date strings back to Date objects
      return sessions.map(session => ({
        ...session,
        date: new Date(session.date)
      }));
    } catch (error) {
      console.error('Error parsing sessions from localStorage:', error);
      return this.getMockSessions();
    }
  }

  // Get a specific session by ID
  public async getSessionById(id: string): Promise<InterviewSession | null> {
    const sessions = await this.getAllSessions();
    return sessions.find(session => session.id === id) || null;
  }

  // Get performance metrics
  public async getPerformanceMetrics(): Promise<PerformanceMetrics> {
    const sessions = await this.getAllSessions();
    
    if (sessions.length === 0) {
      return this.getMockPerformanceMetrics();
    }

    // Calculate metrics from sessions
    const totalInterviews = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const averageDuration = totalDuration / totalInterviews / 60; // Convert to minutes
    
    const totalScore = sessions.reduce((sum, session) => sum + session.performanceScore, 0);
    const averageScore = totalScore / totalInterviews;
    
    // Calculate topic strengths
    const topicScores: Record<string, { total: number; count: number }> = {};
    sessions.forEach(session => {
      session.topics.forEach(topic => {
        if (!topicScores[topic]) {
          topicScores[topic] = { total: 0, count: 0 };
        }
        topicScores[topic].total += session.performanceScore;
        topicScores[topic].count += 1;
      });
    });
    
    const topicAverages = Object.entries(topicScores).map(([topic, { total, count }]) => ({
      topic,
      averageScore: total / count
    }));
    
    topicAverages.sort((a, b) => b.averageScore - a.averageScore);
    
    const strongestTopics = topicAverages.slice(0, 3).map(t => t.topic);
    const weakestTopics = [...topicAverages].sort((a, b) => a.averageScore - b.averageScore).slice(0, 3).map(t => t.topic);
    
    // Get most recent sessions
    const recentSessions = [...sessions].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
    
    // Calculate weekly activity
    const weeklyActivity = this.calculateWeeklyActivity(sessions);
    
    return {
      totalInterviews,
      averageDuration,
      averageScore,
      strongestTopics,
      weakestTopics,
      completedTopics: Array.from(new Set(sessions.flatMap(s => s.topics))),
      recentSessions,
      weeklyActivity
    };
  }

  private calculateWeeklyActivity(sessions: InterviewSession[]): { date: string; count: number }[] {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Create an array of the last 7 days
    const last7Days: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      last7Days.push({
        date: date.toISOString().split('T')[0],
        count: 0
      });
    }
    
    // Count sessions for each day
    sessions.forEach(session => {
      const sessionDate = session.date.toISOString().split('T')[0];
      const dayEntry = last7Days.find(day => day.date === sessionDate);
      if (dayEntry) {
        dayEntry.count += 1;
      }
    });
    
    return last7Days;
  }

  // Mock data for development
  private getMockSessions(): InterviewSession[] {
    return [
      {
        id: '1',
        title: 'React Frontend Interview',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        duration: 1800, // 30 minutes
        topics: ['React', 'JavaScript', 'Frontend'],
        questionCount: 12,
        performanceScore: 85,
        feedback: {
          strengths: ['React concepts', 'Component design', 'State management'],
          improvements: ['Performance optimization', 'Error handling'],
          technicalScore: 86,
          communicationScore: 84,
          overallImpression: 'Strong candidate with good React knowledge'
        }
      },
      {
        id: '2',
        title: 'JavaScript Algorithms',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        duration: 2700, // 45 minutes
        topics: ['JavaScript', 'Algorithms', 'Data Structures'],
        questionCount: 8,
        performanceScore: 78,
        feedback: {
          strengths: ['Problem solving', 'JavaScript basics'],
          improvements: ['Time complexity analysis', 'Dynamic programming'],
          technicalScore: 75,
          communicationScore: 82,
          overallImpression: 'Good foundation, needs more practice with advanced algorithms'
        }
      },
      {
        id: '3',
        title: 'Frontend System Design',
        date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
        duration: 3600, // 60 minutes
        topics: ['System Design', 'Architecture', 'Frontend'],
        questionCount: 6,
        performanceScore: 92,
        feedback: {
          strengths: ['System architecture', 'Scalability considerations', 'User experience'],
          improvements: ['Caching strategies'],
          technicalScore: 94,
          communicationScore: 90,
          overallImpression: 'Excellent understanding of frontend architecture'
        }
      }
    ];
  }

  private getMockPerformanceMetrics(): PerformanceMetrics {
    return {
      totalInterviews: 12,
      averageDuration: 42.5, // minutes
      averageScore: 83.2,
      strongestTopics: ['React', 'Frontend', 'JavaScript'],
      weakestTopics: ['System Design', 'Data Structures', 'Algorithms'],
      completedTopics: ['React', 'JavaScript', 'Frontend', 'System Design', 'Algorithms', 'Data Structures'],
      recentSessions: this.getMockSessions(),
      weeklyActivity: [
        { date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 1 },
        { date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 2 },
        { date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0 },
        { date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 3 },
        { date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 1 },
        { date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], count: 0 },
        { date: new Date().toISOString().split('T')[0], count: 0 }
      ]
    };
  }
}

export default AnalyticsService;
