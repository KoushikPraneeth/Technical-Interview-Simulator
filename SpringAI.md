SearchCTRL + k

# Introduction

![Integration Problem](https://docs.spring.io/spring-ai/reference/_images/spring_ai_logo_with_text.svg)

The `Spring AI` project aims to streamline the development of applications that incorporate artificial intelligence functionality without unnecessary complexity.

The project draws inspiration from notable Python projects, such as LangChain and LlamaIndex, but Spring AI is not a direct port of those projects.
The project was founded with the belief that the next wave of Generative AI applications will not be only for Python developers but will be ubiquitous across many programming languages.

|     |                                                                                                                             |
| --- | --------------------------------------------------------------------------------------------------------------------------- |
|     | Spring AI addresses the fundamental challenge of AI integration: `Connecting your enterprise Data and APIs with AI Models`. |

Interactive

Spring AI provides abstractions that serve as the foundation for developing AI applications.
These abstractions have multiple implementations, enabling easy component swapping with minimal code changes.

Spring AI provides the following features:

- Portable API support across AI providers for Chat, text-to-image, and Embedding models. Both synchronous and streaming API options are supported. Access to model-specific features is also available.

- Support for all major [AI Model providers](https://docs.spring.io/spring-ai/reference/api/index.html) such as Anthropic, OpenAI, Microsoft, Amazon, Google, and Ollama. Supported model types include:

- [Chat Completion](https://docs.spring.io/spring-ai/reference/api/chatmodel.html)

- [Embedding](https://docs.spring.io/spring-ai/reference/api/embeddings.html)

- [Text to Image](https://docs.spring.io/spring-ai/reference/api/imageclient.html)

- [Audio Transcription](https://docs.spring.io/spring-ai/reference/api/audio/transcriptions.html)

- [Text to Speech](https://docs.spring.io/spring-ai/reference/api/audio/speech.html)

- [Moderation](https://docs.spring.io/spring-ai/reference/index.html#api/moderation)

- [Structured Outputs](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html) \- Mapping of AI Model output to POJOs.

- Support for all major [Vector Database providers](https://docs.spring.io/spring-ai/reference/api/vectordbs.html) such as Apache Cassandra, Azure Cosmos DB, Azure Vector Search, Chroma, Elasticsearch, GemFire, MariaDB, Milvus, MongoDB Atlas, Neo4j, OpenSearch, Oracle, PostgreSQL/PGVector, PineCone, Qdrant, Redis, SAP Hana, Typesense and Weaviate.

- Portable API across Vector Store providers, including a novel SQL-like metadata filter API.

- [Tools/Function Calling](https://docs.spring.io/spring-ai/reference/api/tools.html) \- Permits the model to request the execution of client-side tools and functions, thereby accessing necessary real-time information as required and taking action.

- [Observability](https://docs.spring.io/spring-ai/reference/observability/index.html) \- Provides insights into AI-related operations.

- Document ingestion [ETL framework](https://docs.spring.io/spring-ai/reference/api/etl-pipeline.html) for Data Engineering.

- [AI Model Evaluation](https://docs.spring.io/spring-ai/reference/api/testing.html) \- Utilities to help evaluate generated content and protect against hallucinated response.

- Spring Boot Auto Configuration and Starters for AI Models and Vector Stores.

- [ChatClient API](https://docs.spring.io/spring-ai/reference/api/chatclient.html) \- Fluent API for communicating with AI Chat Models, idiomatically similar to the WebClient and RestClient APIs.

- [Advisors API](https://docs.spring.io/spring-ai/reference/api/advisors.html) \- Encapsulates recurring Generative AI patterns, transforms data sent to and from Language Models (LLMs), and provides portability across various models and use cases.

- Support for [Chat Conversation Memory](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_chat_memory) and [Retrieval Augmented Generation (RAG)](https://docs.spring.io/spring-ai/reference/api/chatclient.html#_retrieval_augmented_generation).

This feature set lets you implement common use cases, such as “Q&A over your documentation” or “Chat with your documentation.”

The [concepts section](https://docs.spring.io/spring-ai/reference/concepts.html) provides a high-level overview of AI concepts and their representation in Spring AI.

The [Getting Started](https://docs.spring.io/spring-ai/reference/getting-started.html) section shows you how to create your first AI application.
Subsequent sections delve into each component and common use cases with a code-focused approach.

SearchCTRL + k

# Getting Started

This section offers jumping off points for how to get started using Spring AI.

You should follow the steps in each of the following sections according to your needs.

|     |                                                |
| --- | ---------------------------------------------- |
|     | Spring AI supports Spring Boot 3.2.x and 3.3.x |

## Spring Initializr

Head on over to [start.spring.io](https://start.spring.io/) and select the AI Models and Vector Stores that you want to use in your new applications.

## Artifact Repositories

### Milestones - Use Maven Central

As of 1.0.0-M6, releases are available in Maven Central.
No changes to your build file are required.

### Snapshots - Add Snapshot Repositories

To use the Snapshot (and pre 1.0.0-M6 milestone) versions, you need to add the following snapshot repositories in your build file.

Add the following repository definitions to your Maven or Gradle build file:

- Maven

- Gradle

```xml hljs
<repositories>
  <repository>
    <id>spring-snapshots</id>
    <name>Spring Snapshots</name>
    <url>https://repo.spring.io/snapshot</url>
    <releases>
      <enabled>false</enabled>
    </releases>
  </repository>
  <repository>
    <name>Central Portal Snapshots</name>
    <id>central-portal-snapshots</id>
    <url>https://central.sonatype.com/repository/maven-snapshots/</url>
    <releases>
      <enabled>false</enabled>
    </releases>
    <snapshots>
      <enabled>true</enabled>
    </snapshots>
  </repository>
</repositories>
Copied!
```

```groovy hljs
repositories {
  mavenCentral()
  maven { url 'https://repo.spring.io/milestone' }
  maven { url 'https://repo.spring.io/snapshot' }
  maven {
    name = 'Central Portal Snapshots'
    url = 'https://central.sonatype.com/repository/maven-snapshots/'
  }
}
Copied!
```

## Dependency Management

The Spring AI Bill of Materials (BOM) declares the recommended versions of all the dependencies used by a given release of Spring AI.
Using the BOM from your application’s build script avoids the need for you to specify and maintain the dependency versions yourself.
Instead, the version of the BOM you’re using determines the utilized dependency versions.
It also ensures that you’re using supported and tested versions of the dependencies by default, unless you choose to override them.

Add the BOM to your project:

- Maven

- Gradle

```xml hljs
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>1.0.0-SNAPSHOT</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
Copied!
```

```groovy hljs
dependencies {
  implementation platform("org.springframework.ai:spring-ai-bom:1.0.0-SNAPSHOT")
  // Replace the following with the starter dependencies of specific modules you wish to use
  implementation 'org.springframework.ai:spring-ai-openai'
}
Copied!
```

Gradle users can also use the Spring AI BOM by leveraging Gradle (5.0+) native support for declaring dependency constraints using a Maven BOM.
This is implemented by adding a 'platform' dependency handler method to the dependencies section of your Gradle build script.
As shown in the snippet below this can then be followed by version-less declarations of the Starter Dependencies for the one or more spring-ai modules you wish to use, e.g. spring-ai-openai.

## Add dependencies for specific components

Each of the following sections in the documentation shows which dependencies you need to add to your project build system.

- [Chat Models](https://docs.spring.io/spring-ai/reference/api/chatmodel.html)

- [Embeddings Models](https://docs.spring.io/spring-ai/reference/api/embeddings.html)

- [Image Generation Models](https://docs.spring.io/spring-ai/reference/api/imageclient.html)

- [Transcription Models](https://docs.spring.io/spring-ai/reference/api/audio/transcriptions.html)

- [Text-To-Speech (TTS) Models](https://docs.spring.io/spring-ai/reference/api/audio/speech.html)

- [Vector Databases](https://docs.spring.io/spring-ai/reference/api/vectordbs.html)

## Spring AI samples

Please refer to [this page](https://github.com/danvega/awesome-spring-ai) for more resources and samples related to Spring AI.

SearchCTRL + k

# DeepSeek Chat

[DeepSeek AI](https://www.deepseek.com/) provides the open-source DeepSeek V3 model, renowned for its cutting-edge reasoning and problem-solving capabilities.

Spring AI integrates with DeepSeek AI by reusing the existing [OpenAI](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html) client. To get started, you’ll need to obtain a [DeepSeek API Key](https://api-docs.deepseek.com/), configure the base URL, and select one of the supported models.

![spring ai deepseek integration](https://docs.spring.io/spring-ai/reference/_images/spring-ai-deepseek-integration.jpg)

|     |                                                                                                                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|     | The current version of the deepseek-chat model’s Function Calling capability is unstable, which may result in looped calls or empty responses. |

Check the [DeepSeekWithOpenAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/chat/proxy/DeepSeekWithOpenAiChatModelIT.java) tests for examples of using DeepSeek with Spring AI.

## Prerequisites

- **Create an API Key**:
  Visit [here](https://api-docs.deepseek.com/) to create an API Key. Configure it using the `spring.ai.openai.api-key` property in your Spring AI project.

- **Set the DeepSeek Base URL**:
  Set the `spring.ai.openai.base-url` property to `api.deepseek.com`.

- **Select a DeepSeek Model**:
  Use the `spring.ai.openai.chat.options.model=<model name>` property to specify the model. Refer to [Supported Models](https://api-docs.deepseek.com/quick_start/pricing) for available options.

Example environment variables configuration:

```shell hljs
export SPRING_AI_OPENAI_API_KEY=<INSERT DEEPSEEK API KEY HERE>
export SPRING_AI_OPENAI_BASE_URL=https://api.deepseek.com
export SPRING_AI_OPENAI_CHAT_MODEL=deepseek-chat
Copied!
```

### Add Repositories and BOM

Spring AI artifacts are published in Maven Central and Spring Snapshot repositories.
Refer to the [Repositories](https://docs.spring.io/spring-ai/reference/getting-started.html#repositories) section to add these repositories to your build system.

To help with dependency management, Spring AI provides a BOM (bill of materials) to ensure that a consistent version of Spring AI is used throughout the entire project. Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build system.

## Auto-configuration

|     |                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | There has been a significant change in the Spring AI auto-configuration, starter modules' artifact names.<br>Please refer to the [upgrade notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) for more information. |

Spring AI provides Spring Boot auto-configuration for the OpenAI Chat Client.
To enable it add the following dependency to your project’s Maven `pom.xml` or Gradle `build.gradle` build files:

- Maven

- Gradle

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
Copied!
```

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-starter-model-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

### Chat Properties

#### Retry Properties

The prefix `spring.ai.retry` is used as the property prefix that lets you configure the retry mechanism for the OpenAI chat model.

| Property                                 | Description                                                                                        | Default |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| spring.ai.retry.max-attempts             | Maximum number of retry attempts.                                                                  | 10      |
| spring.ai.retry.backoff.initial-interval | Initial sleep duration for the exponential backoff policy.                                         | 2 sec.  |
| spring.ai.retry.backoff.multiplier       | Backoff interval multiplier.                                                                       | 5       |
| spring.ai.retry.backoff.max-interval     | Maximum backoff duration.                                                                          | 3 min.  |
| spring.ai.retry.on-client-errors         | If false, throw a NonTransientAiException, and do not attempt retry for `4xx` client error codes   | false   |
| spring.ai.retry.exclude-on-http-codes    | List of HTTP status codes that should not trigger a retry (e.g. to throw NonTransientAiException). | empty   |
| spring.ai.retry.on-http-codes            | List of HTTP status codes that should trigger a retry (e.g. to throw TransientAiException).        | empty   |

#### Connection Properties

The prefix `spring.ai.openai` is used as the property prefix that lets you connect to OpenAI.

| Property                  | Description                                              | Default |
| ------------------------- | -------------------------------------------------------- | ------- |
| spring.ai.openai.base-url | The URL to connect to. Must be set to `api.deepseek.com` | -       |
| spring.ai.openai.api-key  | Your DeepSeek API Key                                    | -       |

#### Configuration Properties

|     |                                                                                                                                                                                                                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Enabling and disabling of the chat auto-configurations are now configured via top level properties with the prefix `spring.ai.model.chat`.<br>To enable, spring.ai.model.chat=openai (It is enabled by default)<br>To disable, spring.ai.model.chat=none (or any value which doesn’t match openai)<br>This change is done to allow configuration of multiple models. |

The prefix `spring.ai.openai.chat` is the property prefix that lets you configure the chat model implementation for OpenAI.

| Property                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| spring.ai.openai.chat.enabled (Removed and no longer valid) | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                        | true    |
| spring.ai.model.chat                                        | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                        | openai  |
| spring.ai.openai.chat.base-url                              | Optional overrides the spring.ai.openai.base-url to provide chat specific url. Must be set to `api.deepseek.com`                                                                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.api-key                               | Optional overrides the spring.ai.openai.api-key to provide chat specific api-key                                                                                                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.options.model                         | The [DeepSeek LLM model](https://api-docs.deepseek.com/quick_start/pricing) to use                                                                                                                                                                                                                                                                                                                                                                               | -       |
| spring.ai.openai.chat.options.temperature                   | The sampling temperature to use that controls the apparent creativity of generated completions. Higher values will make output more random while lower values will make results more focused and deterministic. It is not recommended to modify temperature and top_p for the same completions request as the interaction of these two settings is difficult to predict.                                                                                         | 0.8     |
| spring.ai.openai.chat.options.frequencyPenalty              | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model’s likelihood to repeat the same line verbatim.                                                                                                                                                                                                                                                                       | 0.0f    |
| spring.ai.openai.chat.options.maxTokens                     | The maximum number of tokens to generate in the chat completion. The total length of input tokens and generated tokens is limited by the model’s context length.                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.options.n                             | How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.                                                                                                                                                                                                                                                             | 1       |
| spring.ai.openai.chat.options.presencePenalty               | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model’s likelihood to talk about new topics.                                                                                                                                                                                                                                                                                    | -       |
| spring.ai.openai.chat.options.responseFormat                | An object specifying the format that the model must output. Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the message the model generates is valid JSON.                                                                                                                                                                                                                                                                            | -       |
| spring.ai.openai.chat.options.seed                          | This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result.                                                                                                                                                                                                                                                              | -       |
| spring.ai.openai.chat.options.stop                          | Up to 4 sequences where the API will stop generating further tokens.                                                                                                                                                                                                                                                                                                                                                                                             | -       |
| spring.ai.openai.chat.options.topP                          | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.                                                                                                                                                    | -       |
| spring.ai.openai.chat.options.tools                         | A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for.                                                                                                                                                                                                                                                                                           | -       |
| spring.ai.openai.chat.options.toolChoice                    | Controls which (if any) function is called by the model. none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function. Specifying a particular function via {"type: "function", "function": {"name": "my_function"}} forces the model to call that function. none is the default when no functions are present. auto is the default if functions are present. | -       |
| spring.ai.openai.chat.options.user                          | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.                                                                                                                                                                                                                                                                                                                                                               | -       |
| spring.ai.openai.chat.options.functions                     | List of functions, identified by their names, to enable for function calling in a single prompt requests. Functions with those names must exist in the functionCallbacks registry.                                                                                                                                                                                                                                                                               | -       |
| spring.ai.openai.chat.options.stream-usage                  | (For streaming only) Set to add an additional chunk with token usage statistics for the entire request. The `choices` field for this chunk is an empty array and all other chunks will also include a usage field, but with a null value.                                                                                                                                                                                                                        | false   |
| spring.ai.openai.chat.options.proxy-tool-calls              | If true, the Spring AI will not handle the function calls internally, but will proxy them to the client. Then is the client’s responsibility to handle the function calls, dispatch them to the appropriate function, and return the results. If false (the default), the Spring AI will handle the function calls internally. Applicable only for chat models with function calling support                                                                     | false   |

|     |                                                                                                                                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | All properties prefixed with `spring.ai.openai.chat.options` can be overridden at runtime by adding a request specific [Runtime Options](https://docs.spring.io/spring-ai/reference/api/chat/deepseek-chat.html#chat-options) to the `Prompt` call. |

## Runtime Options

The [OpenAiChatOptions.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) provides model configurations, such as the model to use, the temperature, the frequency penalty, etc.

On start-up, the default options can be configured with the `OpenAiChatModel(api, options)` constructor or the `spring.ai.openai.chat.options.*` properties.

At run-time you can override the default options by adding new, request specific, options to the `Prompt` call.
For example to override the default model and temperature for a specific request:

```java hljs
ChatResponse response = chatModel.call(
    new Prompt(
        "Generate the names of 5 famous pirates.",
        OpenAiChatOptions.builder()
            .model("deepseek-chat")
            .temperature(0.4)
        .build()
    ));
Copied!
```

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | In addition to the model specific [OpenAiChatOptions](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) you can use a portable [ChatOptions](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptions.java) instance, created with the [ChatOptions#builder()](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptions.java). |

## Function Calling

|     |                                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | The current version of the deepseek-chat model’s Function Calling capabilitity is unstable, which may result in looped calls or empty responses. |

## Multimodal

|     |                                                            |
| --- | ---------------------------------------------------------- |
|     | Currently, the DeepSeek API doesn’t support media content. |

## Sample Controller

[Create](https://start.spring.io/) a new Spring Boot project and add the `spring-ai-starter-model-openai` to your pom (or gradle) dependencies.

Add a `application.properties` file, under the `src/main/resources` directory, to enable and configure the OpenAi chat model:

```application.properties hljs
spring.ai.openai.api-key=<DEEPSEEK_API_KEY>
spring.ai.openai.base-url=https://api.deepseek.com
spring.ai.openai.chat.options.model=deepseek-chat
spring.ai.openai.chat.options.temperature=0.7

# The DeepSeek API doesn't support embeddings, so we need to disable it.
spring.ai.openai.embedding.enabled=false
Copied!
```

|     |                                                   |
| --- | ------------------------------------------------- |
|     | replace the `api-key` with your DeepSeek Api key. |

This will create a `OpenAiChatModel` implementation that you can inject into your class.
Here is an example of a simple `@Controller` class that uses the chat model for text generations.

```java hljs
@RestController
public class ChatController {

    private final OpenAiChatModel chatModel;

    @Autowired
    public ChatController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
    public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }
}
Copied!
```

## References

- [Documentation Home](https://api-docs.deepseek.com/)

- [Error Codes](https://api-docs.deepseek.com/quick_start/error_codes)

- [Rate Limits](https://api-docs.deepseek.com/quick_start/rate_limit)

SearchCTRL + k

# Groq Chat

[Groq](https://groq.com/) is an extremely fast, LPU™ based, AI Inference Engine that support various [AI Models](https://console.groq.com/docs/models),
supports `Tool/Function Calling` and exposes a `OpenAI API` compatible endpoint.

Spring AI integrates with the [Groq](https://groq.com/) by reusing the existing [OpenAI](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html) client.
For this you need to obtain a [Groq Api Key](https://console.groq.com/keys), set the base-url to [api.groq.com/openai](https://api.groq.com/openai) and select one of the
provided [Groq models](https://console.groq.com/docs/models).

![spring ai groq integration](https://docs.spring.io/spring-ai/reference/_images/spring-ai-groq-integration.jpg)

|     |                                                                                                                                                                                                                                |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | The Groq API is not fully compatible with the OpenAI API.<br>Be aware for the following [compatibility constrains](https://console.groq.com/docs/openai).<br>Additionally, currently Groq doesn’t support multimodal messages. |

Check the [GroqWithOpenAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/chat/proxy/GroqWithOpenAiChatModelIT.java) tests
for examples of using Groq with Spring AI.

## Prerequisites

- Create an API Key.
  Please visit [here](https://console.groq.com/keys) to create an API Key.
  The Spring AI project defines a configuration property named `spring.ai.openai.api-key` that you should set to the value of the `API Key` obtained from groq.com.

- Set the Groq URL.
  You have to set the `spring.ai.openai.base-url` property to `api.groq.com/openai`.

- Select a [Groq Model](https://console.groq.com/docs/models).
  Use the `spring.ai.openai.chat.options.model=<model name>` property to set the Model.

Exporting an environment variable is one way to set that configuration property:

```shell hljs
export SPRING_AI_OPENAI_API_KEY=<INSERT GROQ API KEY HERE>
export SPRING_AI_OPENAI_BASE_URL=https://api.groq.com/openai
export SPRING_AI_OPENAI_CHAT_MODEL=llama3-70b-8192
Copied!
```

### Add Repositories and BOM

Spring AI artifacts are published in Maven Central and Spring Snapshot repositories.
Refer to the [Repositories](https://docs.spring.io/spring-ai/reference/getting-started.html#repositories) section to add these repositories to your build system.

To help with dependency management, Spring AI provides a BOM (bill of materials) to ensure that a consistent version of Spring AI is used throughout the entire project. Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build system.

## Auto-configuration

|     |                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | There has been a significant change in the Spring AI auto-configuration, starter modules' artifact names.<br>Please refer to the [upgrade notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) for more information. |

Spring AI provides Spring Boot auto-configuration for the OpenAI Chat Client.
To enable it add the following dependency to your project’s Maven `pom.xml` or Gradle `build.gradle` build files:

- Maven

- Gradle

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
Copied!
```

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-starter-model-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

### Chat Properties

#### Retry Properties

The prefix `spring.ai.retry` is used as the property prefix that lets you configure the retry mechanism for the OpenAI chat model.

| Property                                 | Description                                                                                        | Default |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| spring.ai.retry.max-attempts             | Maximum number of retry attempts.                                                                  | 10      |
| spring.ai.retry.backoff.initial-interval | Initial sleep duration for the exponential backoff policy.                                         | 2 sec.  |
| spring.ai.retry.backoff.multiplier       | Backoff interval multiplier.                                                                       | 5       |
| spring.ai.retry.backoff.max-interval     | Maximum backoff duration.                                                                          | 3 min.  |
| spring.ai.retry.on-client-errors         | If false, throw a NonTransientAiException, and do not attempt retry for `4xx` client error codes   | false   |
| spring.ai.retry.exclude-on-http-codes    | List of HTTP status codes that should not trigger a retry (e.g. to throw NonTransientAiException). | empty   |
| spring.ai.retry.on-http-codes            | List of HTTP status codes that should trigger a retry (e.g. to throw TransientAiException).        | empty   |

#### Connection Properties

The prefix `spring.ai.openai` is used as the property prefix that lets you connect to OpenAI.

| Property                  | Description                                                 | Default |
| ------------------------- | ----------------------------------------------------------- | ------- |
| spring.ai.openai.base-url | The URL to connect to. Must be set to `api.groq.com/openai` | -       |
| spring.ai.openai.api-key  | The Groq API Key                                            | -       |

#### Configuration Properties

|     |                                                                                                                                                                                                                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Enabling and disabling of the chat auto-configurations are now configured via top level properties with the prefix `spring.ai.model.chat`.<br>To enable, spring.ai.model.chat=openai (It is enabled by default)<br>To disable, spring.ai.model.chat=none (or any value which doesn’t match openai)<br>This change is done to allow configuration of multiple models. |

The prefix `spring.ai.openai.chat` is the property prefix that lets you configure the chat model implementation for OpenAI.

| Property                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Default |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| spring.ai.openai.chat.enabled (Removed and no longer valid) | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                        | true    |
| spring.ai.openai.chat                                       | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                        | openai  |
| spring.ai.openai.chat.base-url                              | Optional overrides the spring.ai.openai.base-url to provide chat specific url. Must be set to `api.groq.com/openai`                                                                                                                                                                                                                                                                                                                                              | -       |
| spring.ai.openai.chat.api-key                               | Optional overrides the spring.ai.openai.api-key to provide chat specific api-key                                                                                                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.options.model                         | The [available model](https://console.groq.com/docs/models) names are `llama3-8b-8192`, `llama3-70b-8192`, `mixtral-8x7b-32768`, `gemma2-9b-it`.                                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.options.temperature                   | The sampling temperature to use that controls the apparent creativity of generated completions. Higher values will make output more random while lower values will make results more focused and deterministic. It is not recommended to modify temperature and top_p for the same completions request as the interaction of these two settings is difficult to predict.                                                                                         | 0.8     |
| spring.ai.openai.chat.options.frequencyPenalty              | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model’s likelihood to repeat the same line verbatim.                                                                                                                                                                                                                                                                       | 0.0f    |
| spring.ai.openai.chat.options.maxTokens                     | The maximum number of tokens to generate in the chat completion. The total length of input tokens and generated tokens is limited by the model’s context length.                                                                                                                                                                                                                                                                                                 | -       |
| spring.ai.openai.chat.options.n                             | How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep n as 1 to minimize costs.                                                                                                                                                                                                                                                             | 1       |
| spring.ai.openai.chat.options.presencePenalty               | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model’s likelihood to talk about new topics.                                                                                                                                                                                                                                                                                    | -       |
| spring.ai.openai.chat.options.responseFormat                | An object specifying the format that the model must output. Setting to `{ "type": "json_object" }` enables JSON mode, which guarantees the message the model generates is valid JSON.                                                                                                                                                                                                                                                                            | -       |
| spring.ai.openai.chat.options.seed                          | This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result.                                                                                                                                                                                                                                                              | -       |
| spring.ai.openai.chat.options.stop                          | Up to 4 sequences where the API will stop generating further tokens.                                                                                                                                                                                                                                                                                                                                                                                             | -       |
| spring.ai.openai.chat.options.topP                          | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.                                                                                                                                                    | -       |
| spring.ai.openai.chat.options.tools                         | A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for.                                                                                                                                                                                                                                                                                           | -       |
| spring.ai.openai.chat.options.toolChoice                    | Controls which (if any) function is called by the model. none means the model will not call a function and instead generates a message. auto means the model can pick between generating a message or calling a function. Specifying a particular function via {"type: "function", "function": {"name": "my_function"}} forces the model to call that function. none is the default when no functions are present. auto is the default if functions are present. | -       |
| spring.ai.openai.chat.options.user                          | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.                                                                                                                                                                                                                                                                                                                                                               | -       |
| spring.ai.openai.chat.options.functions                     | List of functions, identified by their names, to enable for function calling in a single prompt requests. Functions with those names must exist in the functionCallbacks registry.                                                                                                                                                                                                                                                                               | -       |
| spring.ai.openai.chat.options.stream-usage                  | (For streaming only) Set to add an additional chunk with token usage statistics for the entire request. The `choices` field for this chunk is an empty array and all other chunks will also include a usage field, but with a null value.                                                                                                                                                                                                                        | false   |
| spring.ai.openai.chat.options.proxy-tool-calls              | If true, the Spring AI will not handle the function calls internally, but will proxy them to the client. Then is the client’s responsibility to handle the function calls, dispatch them to the appropriate function, and return the results. If false (the default), the Spring AI will handle the function calls internally. Applicable only for chat models with function calling support                                                                     | false   |

|     |                                                                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | All properties prefixed with `spring.ai.openai.chat.options` can be overridden at runtime by adding a request specific [Runtime Options](https://docs.spring.io/spring-ai/reference/api/chat/groq-chat.html#chat-options) to the `Prompt` call. |

## Runtime Options

The [OpenAiChatOptions.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) provides model configurations, such as the model to use, the temperature, the frequency penalty, etc.

On start-up, the default options can be configured with the `OpenAiChatModel(api, options)` constructor or the `spring.ai.openai.chat.options.*` properties.

At run-time you can override the default options by adding new, request specific, options to the `Prompt` call.
For example to override the default model and temperature for a specific request:

```java hljs
ChatResponse response = chatModel.call(
    new Prompt(
        "Generate the names of 5 famous pirates.",
        OpenAiChatOptions.builder()
            .model("mixtral-8x7b-32768")
            .temperature(0.4)
        .build()
    ));
Copied!
```

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | In addition to the model specific [OpenAiChatOptions](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) you can use a portable [ChatOptions](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptions.java) instance, created with the [ChatOptions#builder()](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptions.java). |

## Function Calling

Groq API endpoints support [tool/function calling](https://console.groq.com/docs/tool-use) when selecting one of the Tool/Function supporting models.

|     |                                                                            |
| --- | -------------------------------------------------------------------------- |
|     | Check the Tool [Supported Models](https://console.groq.com/docs/tool-use). |

![spring ai groq functions 2](https://docs.spring.io/spring-ai/reference/_images/spring-ai-groq-functions-2.jpg)

You can register custom Java functions with your ChatModel and have the provided Groq model intelligently choose to output a JSON object containing arguments to call one or many of the registered functions.
This is a powerful technique to connect the LLM capabilities with external tools and APIs.

### Tool Example

Here’s a simple example of how to use Groq function calling with Spring AI:

```java hljs
@SpringBootApplication
public class GroqApplication {

    public static void main(String[] args) {
        SpringApplication.run(GroqApplication.class, args);
    }

    @Bean
    CommandLineRunner runner(ChatClient.Builder chatClientBuilder) {
        return args -> {
            var chatClient = chatClientBuilder.build();

            var response = chatClient.prompt()
                .user("What is the weather in Amsterdam and Paris?")
                .functions("weatherFunction") // reference by bean name.
                .call()
                .content();

            System.out.println(response);
        };
    }

    @Bean
    @Description("Get the weather in location")
    public Function<WeatherRequest, WeatherResponse> weatherFunction() {
        return new MockWeatherService();
    }

    public static class MockWeatherService implements Function<WeatherRequest, WeatherResponse> {

        public record WeatherRequest(String location, String unit) {}
        public record WeatherResponse(double temp, String unit) {}

        @Override
        public WeatherResponse apply(WeatherRequest request) {
            double temperature = request.location().contains("Amsterdam") ? 20 : 25;
            return new WeatherResponse(temperature, request.unit);
        }
    }
}
Copied!
```

In this example, when the model needs weather information, it will automatically call the `weatherFunction` bean, which can then fetch real-time weather data.
The expected response looks like this: "The weather in Amsterdam is currently 20 degrees Celsius, and the weather in Paris is currently 25 degrees Celsius."

Read more about OpenAI [Function Calling](https://docs.spring.io/spring-ai/reference/api/chat/functions/openai-chat-functions.html).

## Multimodal

|     |                                                       |
| --- | ----------------------------------------------------- |
|     | Currently the Groq API doesn’t support media content. |

## Sample Controller

[Create](https://start.spring.io/) a new Spring Boot project and add the `spring-ai-starter-model-openai` to your pom (or gradle) dependencies.

Add a `application.properties` file, under the `src/main/resources` directory, to enable and configure the OpenAi chat model:

```application.properties hljs
spring.ai.openai.api-key=<GROQ_API_KEY>
spring.ai.openai.base-url=https://api.groq.com/openai
spring.ai.openai.chat.options.model=llama3-70b-8192
spring.ai.openai.chat.options.temperature=0.7
Copied!
```

|     |                                                     |
| --- | --------------------------------------------------- |
|     | replace the `api-key` with your OpenAI credentials. |

This will create a `OpenAiChatModel` implementation that you can inject into your class.
Here is an example of a simple `@Controller` class that uses the chat model for text generations.

```java hljs
@RestController
public class ChatController {

    private final OpenAiChatModel chatModel;

    @Autowired
    public ChatController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
	public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }
}
Copied!
```

## Manual Configuration

The [OpenAiChatModel](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatModel.java) implements the `ChatModel` and `StreamingChatModel` and uses the [\[low-level-api\]](https://docs.spring.io/spring-ai/reference/api/chat/groq-chat.html#low-level-api) to connect to the OpenAI service.

Add the `spring-ai-openai` dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file.

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

Next, create a `OpenAiChatModel` and use it for text generations:

```java hljs
var openAiApi = new OpenAiApi("https://api.groq.com/openai", System.getenv("GROQ_API_KEY"));
var openAiChatOptions = OpenAiChatOptions.builder()
            .model("llama3-70b-8192")
            .temperature(0.4)
            .maxTokens(200)
        .build();
var chatModel = new OpenAiChatModel(this.openAiApi, this.openAiChatOptions);

ChatResponse response = this.chatModel.call(
    new Prompt("Generate the names of 5 famous pirates."));

// Or with streaming responses
Flux<ChatResponse> response = this.chatModel.stream(
    new Prompt("Generate the names of 5 famous pirates."));
Copied!
```

The `OpenAiChatOptions` provides the configuration information for the chat requests.
The `OpenAiChatOptions.Builder` is fluent options builder.

SearchCTRL + k

# OpenAI Chat

Spring AI supports the various AI language models from OpenAI, the company behind ChatGPT, which has been instrumental in sparking interest in AI-driven text generation thanks to its creation of industry-leading text generation models and embeddings.

## Prerequisites

You will need to create an API with OpenAI to access ChatGPT models.
Create an account at [OpenAI signup page](https://platform.openai.com/signup) and generate the token on the [API Keys page](https://platform.openai.com/account/api-keys).
The Spring AI project defines a configuration property named `spring.ai.openai.api-key` that you should set to the value of the `API Key` obtained from openai.com.
Exporting an environment variable is one way to set that configuration property:

```shell hljs
export SPRING_AI_OPENAI_API_KEY=<INSERT KEY HERE>
Copied!
```

### Add Repositories and BOM

Spring AI artifacts are published in Maven Central and Spring Snapshot repositories.
Refer to the [Repositories](https://docs.spring.io/spring-ai/reference/getting-started.html#repositories) section to add these repositories to your build system.

To help with dependency management, Spring AI provides a BOM (bill of materials) to ensure that a consistent version of Spring AI is used throughout the entire project. Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build system.

## Auto-configuration

|     |                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | There has been a significant change in the Spring AI auto-configuration, starter modules' artifact names.<br>Please refer to the [upgrade notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) for more information. |

Spring AI provides Spring Boot auto-configuration for the OpenAI Chat Client.
To enable it add the following dependency to your project’s Maven `pom.xml` or Gradle `build.gradle` build files:

- Maven

- Gradle

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
Copied!
```

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-starter-model-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

### Chat Properties

#### Retry Properties

The prefix `spring.ai.retry` is used as the property prefix that lets you configure the retry mechanism for the OpenAI chat model.

| Property                                 | Description                                                                                        | Default |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- | ------- |
| spring.ai.retry.max-attempts             | Maximum number of retry attempts.                                                                  | 10      |
| spring.ai.retry.backoff.initial-interval | Initial sleep duration for the exponential backoff policy.                                         | 2 sec.  |
| spring.ai.retry.backoff.multiplier       | Backoff interval multiplier.                                                                       | 5       |
| spring.ai.retry.backoff.max-interval     | Maximum backoff duration.                                                                          | 3 min.  |
| spring.ai.retry.on-client-errors         | If false, throw a NonTransientAiException, and do not attempt retry for `4xx` client error codes   | false   |
| spring.ai.retry.exclude-on-http-codes    | List of HTTP status codes that should not trigger a retry (e.g. to throw NonTransientAiException). | empty   |
| spring.ai.retry.on-http-codes            | List of HTTP status codes that should trigger a retry (e.g. to throw TransientAiException).        | empty   |

#### Connection Properties

The prefix `spring.ai.openai` is used as the property prefix that lets you connect to OpenAI.

| Property                         | Description                                                               | Default                                   |
| -------------------------------- | ------------------------------------------------------------------------- | ----------------------------------------- |
| spring.ai.openai.base-url        | The URL to connect to                                                     | [api.openai.com](https://api.openai.com/) |
| spring.ai.openai.api-key         | The API Key                                                               | -                                         |
| spring.ai.openai.organization-id | Optionally, you can specify which organization to use for an API request. | -                                         |
| spring.ai.openai.project-id      | Optionally, you can specify which project to use for an API request.      | -                                         |

|     |                                                                                                                                                                                                                                                                                                             |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | For users that belong to multiple organizations (or are accessing their projects through their legacy user API key), you can optionally specify which organization and project is used for an API request.<br>Usage from these API requests will count as usage for the specified organization and project. |

#### Configuration Properties

|     |                                                                                                                                                                                                                                                                                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Enabling and disabling of the chat auto-configurations are now configured via top level properties with the prefix `spring.ai.model.chat`.<br>To enable, spring.ai.model.chat=openai (It is enabled by default)<br>To disable, spring.ai.model.chat=none (or any value which doesn’t match openai)<br>This change is done to allow configuration of multiple models. |

The prefix `spring.ai.openai.chat` is the property prefix that lets you configure the chat model implementation for OpenAI.

| Property                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Default                |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| spring.ai.openai.chat.enabled (Removed and no longer valid) | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | true                   |
| spring.ai.model.chat                                        | Enable OpenAI chat model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | openai                 |
| spring.ai.openai.chat.base-url                              | Optional override for the `spring.ai.openai.base-url` property to provide a chat-specific URL.                                                                                                                                                                                                                                                                                                                                                                                                           | -                      |
| spring.ai.openai.chat.completions-path                      | The path to append to the base URL.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `/v1/chat/completions` |
| spring.ai.openai.chat.api-key                               | Optional override for the `spring.ai.openai.api-key` to provide a chat-specific API Key.                                                                                                                                                                                                                                                                                                                                                                                                                 | -                      |
| spring.ai.openai.chat.organization-id                       | Optionally, you can specify which organization to use for an API request.                                                                                                                                                                                                                                                                                                                                                                                                                                | -                      |
| spring.ai.openai.chat.project-id                            | Optionally, you can specify which project to use for an API request.                                                                                                                                                                                                                                                                                                                                                                                                                                     | -                      |
| spring.ai.openai.chat.options.model                         | Name of the OpenAI chat model to use. You can select between models such as: `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-3.5-turbo`, and more. See the [models](https://platform.openai.com/docs/models) page for more information.                                                                                                                                                                                                                                                                     | `gpt-4o-mini`          |
| spring.ai.openai.chat.options.temperature                   | The sampling temperature to use that controls the apparent creativity of generated completions. Higher values will make output more random while lower values will make results more focused and deterministic. It is not recommended to modify `temperature` and `top_p` for the same completions request as the interaction of these two settings is difficult to predict.                                                                                                                             | 0.8                    |
| spring.ai.openai.chat.options.frequencyPenalty              | Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model’s likelihood to repeat the same line verbatim.                                                                                                                                                                                                                                                                                                               | 0.0f                   |
| spring.ai.openai.chat.options.logitBias                     | Modify the likelihood of specified tokens appearing in the completion.                                                                                                                                                                                                                                                                                                                                                                                                                                   | -                      |
| spring.ai.openai.chat.options.maxTokens                     | (Deprecated in favour of `maxCompletionTokens`) The maximum number of tokens to generate in the chat completion. The total length of input tokens and generated tokens is limited by the model’s context length.                                                                                                                                                                                                                                                                                         | -                      |
| spring.ai.openai.chat.options.maxCompletionTokens           | An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.                                                                                                                                                                                                                                                                                                                                                                    | -                      |
| spring.ai.openai.chat.options.n                             | How many chat completion choices to generate for each input message. Note that you will be charged based on the number of generated tokens across all of the choices. Keep `n` as 1 to minimize costs.                                                                                                                                                                                                                                                                                                   | 1                      |
| spring.ai.openai.chat.options.store                         | Whether to store the output of this chat completion request for use in our model                                                                                                                                                                                                                                                                                                                                                                                                                         | false                  |
| spring.ai.openai.chat.options.metadata                      | Developer-defined tags and values used for filtering completions in the chat completion dashboard                                                                                                                                                                                                                                                                                                                                                                                                        | empty map              |
| spring.ai.openai.chat.options.output-modalities             | Output types that you would like the model to generate for this request. Most models are capable of generating text, which is the default.<br>The `gpt-4o-audio-preview` model can also be used to generate audio. To request that this model generate both text and audio responses,<br>you can use: `text`, `audio`. Not supported for streaming.                                                                                                                                                      | -                      |
| spring.ai.openai.chat.options.output-audio                  | Audio parameters for the audio generation. Required when audio output is requested with `output-modalities`: `audio`.<br>Requires the `gpt-4o-audio-preview` model and is is not supported for streaming completions.                                                                                                                                                                                                                                                                                    | -                      |
| spring.ai.openai.chat.options.presencePenalty               | Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model’s likelihood to talk about new topics.                                                                                                                                                                                                                                                                                                                            | -                      |
| spring.ai.openai.chat.options.responseFormat.type           | Compatible with `GPT-4o`, `GPT-4o mini`, `GPT-4 Turbo` and all `GPT-3.5 Turbo` models newer than `gpt-3.5-turbo-1106`. The `JSON_OBJECT` type enables JSON mode, which guarantees the message the model generates is valid JSON.<br>The `JSON_SCHEMA` type enables [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) which guarantees the model will match your supplied JSON schema. The JSON_SCHEMA type requires setting the `responseFormat.schema` property as well. | -                      |
| spring.ai.openai.chat.options.responseFormat.name           | Response format schema name. Applicable only for `responseFormat.type=JSON_SCHEMA`                                                                                                                                                                                                                                                                                                                                                                                                                       | custom_schema          |
| spring.ai.openai.chat.options.responseFormat.schema         | Response format JSON schema. Applicable only for `responseFormat.type=JSON_SCHEMA`                                                                                                                                                                                                                                                                                                                                                                                                                       | -                      |
| spring.ai.openai.chat.options.responseFormat.strict         | Response format JSON schema adherence strictness. Applicable only for `responseFormat.type=JSON_SCHEMA`                                                                                                                                                                                                                                                                                                                                                                                                  | -                      |
| spring.ai.openai.chat.options.seed                          | This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result.                                                                                                                                                                                                                                                                                                      | -                      |
| spring.ai.openai.chat.options.stop                          | Up to 4 sequences where the API will stop generating further tokens.                                                                                                                                                                                                                                                                                                                                                                                                                                     | -                      |
| spring.ai.openai.chat.options.topP                          | An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with `top_p` probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or `temperature` but not both.                                                                                                                                                                                        | -                      |
| spring.ai.openai.chat.options.tools                         | A list of tools the model may call. Currently, only functions are supported as a tool. Use this to provide a list of functions the model may generate JSON inputs for.                                                                                                                                                                                                                                                                                                                                   | -                      |
| spring.ai.openai.chat.options.toolChoice                    | Controls which (if any) function is called by the model. `none` means the model will not call a function and instead generates a message. `auto` means the model can pick between generating a message or calling a function. Specifying a particular function via `{"type: "function", "function": {"name": "my_function"}}` forces the model to call that function. `none` is the default when no functions are present. `auto` is the default if functions are present.                               | -                      |
| spring.ai.openai.chat.options.user                          | A unique identifier representing your end-user, which can help OpenAI to monitor and detect abuse.                                                                                                                                                                                                                                                                                                                                                                                                       | -                      |
| spring.ai.openai.chat.options.functions                     | List of functions, identified by their names, to enable for function calling in a single prompt requests. Functions with those names must exist in the `functionCallbacks` registry.                                                                                                                                                                                                                                                                                                                     | -                      |
| spring.ai.openai.chat.options.stream-usage                  | (For streaming only) Set to add an additional chunk with token usage statistics for the entire request. The `choices` field for this chunk is an empty array and all other chunks will also include a usage field, but with a null value.                                                                                                                                                                                                                                                                | false                  |
| spring.ai.openai.chat.options.parallel-tool-calls           | Whether to enable [parallel function calling](https://platform.openai.com/docs/guides/function-calling/parallel-function-calling) during tool use.                                                                                                                                                                                                                                                                                                                                                       | true                   |
| spring.ai.openai.chat.options.http-headers                  | Optional HTTP headers to be added to the chat completion request. To override the `api-key` you need to use an `Authorization` header key, and you have to prefix the key value with the `Bearer` prefix.                                                                                                                                                                                                                                                                                                | -                      |
| spring.ai.openai.chat.options.proxy-tool-calls              | If true, the Spring AI will not handle the function calls internally, but will proxy them to the client. Then is the client’s responsibility to handle the function calls, dispatch them to the appropriate function, and return the results. If false (the default), the Spring AI will handle the function calls internally. Applicable only for chat models with function calling support                                                                                                             | false                  |

|     |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | You can override the common `spring.ai.openai.base-url` and `spring.ai.openai.api-key` for the `ChatModel` and `EmbeddingModel` implementations.<br>The `spring.ai.openai.chat.base-url` and `spring.ai.openai.chat.api-key` properties, if set, take precedence over the common properties.<br>This is useful if you want to use different OpenAI accounts for different models and different model endpoints. |

|     |                                                                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | All properties prefixed with `spring.ai.openai.chat.options` can be overridden at runtime by adding request-specific [Runtime Options](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html#chat-options) to the `Prompt` call. |

## Runtime Options

The [OpenAiChatOptions.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) class provides model configurations such as the model to use, the temperature, the frequency penalty, etc.

On start-up, the default options can be configured with the `OpenAiChatModel(api, options)` constructor or the `spring.ai.openai.chat.options.*` properties.

At run-time, you can override the default options by adding new, request-specific options to the `Prompt` call.
For example, to override the default model and temperature for a specific request:

```java hljs
ChatResponse response = chatModel.call(
    new Prompt(
        "Generate the names of 5 famous pirates.",
        OpenAiChatOptions.builder()
            .model("gpt-4o")
            .temperature(0.4)
        .build()
    ));
Copied!
```

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | In addition to the model specific [OpenAiChatOptions](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatOptions.java) you can use a portable [ChatOptions](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptions.java) instance, created with [ChatOptionsBuilder#builder()](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/prompt/ChatOptionsBuilder.java). |

## Function Calling

You can register custom Java functions with the `OpenAiChatModel` and have the OpenAI model intelligently choose to output a JSON object containing arguments to call one or many of the registered functions.
This is a powerful technique to connect the LLM capabilities with external tools and APIs.
Read more about [OpenAI Function Calling](https://docs.spring.io/spring-ai/reference/api/chat/functions/openai-chat-functions.html).

## Multimodal

Multimodality refers to a model’s ability to simultaneously understand and process information from various sources, including text, images, audio, and other data formats.
OpenAI supports text, vision, and audio input modalities.

### Vision

OpenAI models that offer vision multimodal support include `gpt-4`, `gpt-4o`, and `gpt-4o-mini`.
Refer to the [Vision](https://platform.openai.com/docs/guides/vision) guide for more information.

The OpenAI [User Message API](https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages) can incorporate a list of base64-encoded images or image urls with the message.
Spring AI’s [Message](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/messages/Message.java) interface facilitates multimodal AI models by introducing the [Media](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/model/Media.java) type.
This type encompasses data and details regarding media attachments in messages, utilizing Spring’s `org.springframework.util.MimeType` and a `org.springframework.core.io.Resource` for the raw media data.

Below is a code example excerpted from [OpenAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/c9a3e66f90187ce7eae7eb78c462ec622685de6c/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/chat/OpenAiChatModelIT.java#L293), illustrating the fusion of user text with an image using the `gpt-4o` model.

```java hljs
var imageResource = new ClassPathResource("/multimodal.test.png");

var userMessage = new UserMessage("Explain what do you see on this picture?",
        new Media(MimeTypeUtils.IMAGE_PNG, this.imageResource));

ChatResponse response = chatModel.call(new Prompt(this.userMessage,
        OpenAiChatOptions.builder().model(OpenAiApi.ChatModel.GPT_4_O.getValue()).build()));
Copied!
```

|     |                                                                                                                                                                                                                                                                                                                  |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | GPT_4_VISION_PREVIEW will continue to be available only to existing users of this model starting June 17, 2024. If you are not an existing user, please use the GPT_4_O or GPT_4_TURBO models. More details [here](https://platform.openai.com/docs/deprecations/2024-06-06-gpt-4-32k-and-vision-preview-models) |

or the image URL equivalent using the `gpt-4o` model:

```java hljs
var userMessage = new UserMessage("Explain what do you see on this picture?",
        new Media(MimeTypeUtils.IMAGE_PNG,
                "https://docs.spring.io/spring-ai/reference/_images/multimodal.test.png"));

ChatResponse response = chatModel.call(new Prompt(this.userMessage,
        OpenAiChatOptions.builder().model(OpenAiApi.ChatModel.GPT_4_O.getValue()).build()));
Copied!
```

|     |                                       |
| --- | ------------------------------------- |
|     | You can pass multiple images as well. |

The example shows a model taking as an input the `multimodal.test.png` image:

![Multimodal Test Image](https://docs.spring.io/spring-ai/reference/_images/multimodal.test.png)

along with the text message "Explain what do you see on this picture?", and generating a response like this:

```
This is an image of a fruit bowl with a simple design. The bowl is made of metal with curved wire edges that
create an open structure, allowing the fruit to be visible from all angles. Inside the bowl, there are two
yellow bananas resting on top of what appears to be a red apple. The bananas are slightly overripe, as
indicated by the brown spots on their peels. The bowl has a metal ring at the top, likely to serve as a handle
for carrying. The bowl is placed on a flat surface with a neutral-colored background that provides a clear
view of the fruit inside.
```

### Audio

OpenAI models that offer input audio multimodal support include `gpt-4o-audio-preview`.
Refer to the [Audio](https://platform.openai.com/docs/guides/audio) guide for more information.

The OpenAI [User Message API](https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages) can incorporate a list of base64-encoded audio files with the message.
Spring AI’s [Message](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/messages/Message.java) interface facilitates multimodal AI models by introducing the [Media](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/messages/Media.java) type.
This type encompasses data and details regarding media attachments in messages, utilizing Spring’s `org.springframework.util.MimeType` and a `org.springframework.core.io.Resource` for the raw media data.
Currently, OpenAI support only the following media types: `audio/mp3` and `audio/wav`.

Below is a code example excerpted from [OpenAiChatModelIT.java](https://github.com/spring-projects/spring-ai/blob/c9a3e66f90187ce7eae7eb78c462ec622685de6c/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/chat/OpenAiChatModelIT.java#L442), illustrating the fusion of user text with an audio file using the `gpt-4o-audio-preview` model.

```java hljs
var audioResource = new ClassPathResource("speech1.mp3");

var userMessage = new UserMessage("What is this recording about?",
        List.of(new Media(MimeTypeUtils.parseMimeType("audio/mp3"), audioResource)));

ChatResponse response = chatModel.call(new Prompt(List.of(userMessage),
        OpenAiChatOptions.builder().model(OpenAiApi.ChatModel.GPT_4_O_AUDIO_PREVIEW).build()));
Copied!
```

|     |                                            |
| --- | ------------------------------------------ |
|     | You can pass multiple audio files as well. |

### Output Audio

OpenAI models that offer input audio multimodal support include `gpt-4o-audio-preview`.
Refer to the [Audio](https://platform.openai.com/docs/guides/audio) guide for more information.

The OpenAI [Assystant Message API](https://platform.openai.com/docs/api-reference/chat/create#chat-create-messages) can contain a list of base64-encoded audio files with the message.
Spring AI’s [Message](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/messages/Message.java) interface facilitates multimodal AI models by introducing the [Media](https://github.com/spring-projects/spring-ai/blob/main/spring-ai-core/src/main/java/org/springframework/ai/chat/messages/Media.java) type.
This type encompasses data and details regarding media attachments in messages, utilizing Spring’s `org.springframework.util.MimeType` and a `org.springframework.core.io.Resource` for the raw media data.
Currently, OpenAI support only the following audio types: `audio/mp3` and `audio/wav`.

Below is a code example, illustrating the response of user text along with an audio byte array, using the `gpt-4o-audio-preview` model:

```java hljs
var userMessage = new UserMessage("Tell me joke about Spring Framework");

ChatResponse response = chatModel.call(new Prompt(List.of(userMessage),
        OpenAiChatOptions.builder()
            .model(OpenAiApi.ChatModel.GPT_4_O_AUDIO_PREVIEW)
            .outputModalities(List.of("text", "audio"))
            .outputAudio(new AudioParameters(Voice.ALLOY, AudioResponseFormat.WAV))
            .build()));

String text = response.getResult().getOutput().getContent(); // audio transcript

byte[] waveAudio = response.getResult().getOutput().getMedia().get(0).getDataAsByteArray(); // audio data
Copied!
```

You have to specify an `audio` modality in the `OpenAiChatOptions` to generate audio output.
The `AudioParameters` class provides the voice and audio format for the audio output.

## Structured Outputs

OpenAI provides custom [Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) APIs that ensure your model generates responses conforming strictly to your provided `JSON Schema`.
In addition to the existing Spring AI model-agnostic [Structured Output Converter](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html), these APIs offer enhanced control and precision.

|     |                                                                                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Currently, OpenAI supports a [subset of the JSON Schema language](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas) format. |

### Configuration

Spring AI allows you to configure your response format either programmatically using the `OpenAiChatOptions` builder or through application properties.

#### Using the Chat Options Builder

You can set the response format programmatically with the `OpenAiChatOptions` builder as shown below:

```java hljs
String jsonSchema = """
        {
            "type": "object",
            "properties": {
                "steps": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "explanation": { "type": "string" },
                            "output": { "type": "string" }
                        },
                        "required": ["explanation", "output"],
                        "additionalProperties": false
                    }
                },
                "final_answer": { "type": "string" }
            },
            "required": ["steps", "final_answer"],
            "additionalProperties": false
        }
        """;

Prompt prompt = new Prompt("how can I solve 8x + 7 = -23",
        OpenAiChatOptions.builder()
            .model(ChatModel.GPT_4_O_MINI)
            .responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, this.jsonSchema))
            .build());

ChatResponse response = this.openAiChatModel.call(this.prompt);
Copied!
```

|     |                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Adhere to the OpenAI [subset of the JSON Schema language](https://platform.openai.com/docs/guides/structured-outputs/supported-schemas) format. |

#### Integrating with BeanOutputConverter Utilities

You can leverage existing [BeanOutputConverter](https://docs.spring.io/spring-ai/reference/api/structured-output-converter.html#_bean_output_converter) utilities to automatically generate the JSON Schema from your domain objects and later convert the structured response into domain-specific instances:

- Java

- Kotlin

```java hljs
record MathReasoning(
    @JsonProperty(required = true, value = "steps") Steps steps,
    @JsonProperty(required = true, value = "final_answer") String finalAnswer) {

    record Steps(
        @JsonProperty(required = true, value = "items") Items[] items) {

        record Items(
            @JsonProperty(required = true, value = "explanation") String explanation,
            @JsonProperty(required = true, value = "output") String output) {
        }
    }
}

var outputConverter = new BeanOutputConverter<>(MathReasoning.class);

var jsonSchema = this.outputConverter.getJsonSchema();

Prompt prompt = new Prompt("how can I solve 8x + 7 = -23",
        OpenAiChatOptions.builder()
            .model(ChatModel.GPT_4_O_MINI)
            .responseFormat(new ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, this.jsonSchema))
            .build());

ChatResponse response = this.openAiChatModel.call(this.prompt);
String content = this.response.getResult().getOutput().getContent();

MathReasoning mathReasoning = this.outputConverter.convert(this.content);
Copied!
```

```kotlin hljs
data class MathReasoning(
	val steps: Steps,
	@get:JsonProperty(value = "final_answer") val finalAnswer: String) {

	data class Steps(val items: Array<Items>) {

		data class Items(
			val explanation: String,
			val output: String)
	}
}

val outputConverter = BeanOutputConverter(MathReasoning::class.java)

val jsonSchema = outputConverter.jsonSchema;

val prompt = Prompt("how can I solve 8x + 7 = -23",
	OpenAiChatOptions.builder()
		.model(ChatModel.GPT_4_O_MINI)
		.responseFormat(ResponseFormat(ResponseFormat.Type.JSON_SCHEMA, jsonSchema))
		.build())

val response = openAiChatModel.call(prompt)
val content = response.getResult().getOutput().getContent()

val mathReasoning = outputConverter.convert(content)
Copied!
```

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | Although this is optional for JSON Schema, OpenAI [mandates](https://platform.openai.com/docs/guides/structured-outputs/all-fields-must-be-required#all-fields-must-be-required) required fields for the structured response to function correctly. Kotlin reflection is used to infer which property are required or not based on the nullability of types and default values of parameters, so for most use case `@get:JsonProperty(required = true)` is not needed. `@get:JsonProperty(value = "custom_name")` can be useful to customize the property name. Make sure to generate the annotation on the related getters with this `@get:` syntax, see [related documentation](https://kotlinlang.org/docs/annotations.html#annotation-use-site-targets). |

#### Configuring via Application Properties

Alternatively, when using the OpenAI auto-configuration, you can configure the desired response format through the following application properties:

```application.properties hljs
spring.ai.openai.api-key=YOUR_API_KEY
spring.ai.openai.chat.options.model=gpt-4o-mini

spring.ai.openai.chat.options.response-format.type=JSON_SCHEMA
spring.ai.openai.chat.options.response-format.name=MySchemaName
spring.ai.openai.chat.options.response-format.schema={"type":"object","properties":{"steps":{"type":"array","items":{"type":"object","properties":{"explanation":{"type":"string"},"output":{"type":"string"}},"required":["explanation","output"],"additionalProperties":false}},"final_answer":{"type":"string"}},"required":["steps","final_answer"],"additionalProperties":false}
spring.ai.openai.chat.options.response-format.strict=true
Copied!
```

## Sample Controller

[Create](https://start.spring.io/) a new Spring Boot project and add the `spring-ai-starter-model-openai` to your pom (or gradle) dependencies.

Add an `application.properties` file under the `src/main/resources` directory to enable and configure the OpenAi chat model:

```application.properties hljs
spring.ai.openai.api-key=YOUR_API_KEY
spring.ai.openai.chat.options.model=gpt-4o
spring.ai.openai.chat.options.temperature=0.7
Copied!
```

|     |                                                     |
| --- | --------------------------------------------------- |
|     | Replace the `api-key` with your OpenAI credentials. |

This will create an `OpenAiChatModel` implementation that you can inject into your classes.
Here is an example of a simple `@RestController` class that uses the chat model for text generations.

```java hljs
@RestController
public class ChatController {

    private final OpenAiChatModel chatModel;

    @Autowired
    public ChatController(OpenAiChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ai/generate")
    public Map<String,String> generate(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        return Map.of("generation", this.chatModel.call(message));
    }

    @GetMapping("/ai/generateStream")
	public Flux<ChatResponse> generateStream(@RequestParam(value = "message", defaultValue = "Tell me a joke") String message) {
        Prompt prompt = new Prompt(new UserMessage(message));
        return this.chatModel.stream(prompt);
    }
}
Copied!
```

## Manual Configuration

The [OpenAiChatModel](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/OpenAiChatModel.java) implements the `ChatModel` and `StreamingChatModel` and uses the [Low-level OpenAiApi Client](https://docs.spring.io/spring-ai/reference/api/chat/openai-chat.html#low-level-api) to connect to the OpenAI service.

Add the `spring-ai-openai` dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file.

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

Next, create an `OpenAiChatModel` and use it for text generations:

```java hljs
var openAiApi = new OpenAiApi(System.getenv("OPENAI_API_KEY"));
var openAiChatOptions = OpenAiChatOptions.builder()
            .model("gpt-3.5-turbo")
            .temperature(0.4)
            .maxTokens(200)
            .build();
var chatModel = new OpenAiChatModel(this.openAiApi, this.openAiChatOptions);

ChatResponse response = this.chatModel.call(
    new Prompt("Generate the names of 5 famous pirates."));

// Or with streaming responses
Flux<ChatResponse> response = this.chatModel.stream(
    new Prompt("Generate the names of 5 famous pirates."));
Copied!
```

The `OpenAiChatOptions` provides the configuration information for the chat requests.
The `OpenAiChatOptions.Builder` is a fluent options-builder.

## Low-level OpenAiApi Client

The [OpenAiApi](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/api/OpenAiApi.java) provides is lightweight Java client for OpenAI Chat API [OpenAI Chat API](https://platform.openai.com/docs/api-reference/chat).

Following class diagram illustrates the `OpenAiApi` chat interfaces and building blocks:

![OpenAiApi Chat API Diagram](https://docs.spring.io/spring-ai/reference/_images/openai-chat-api.jpg)

Here is a simple snippet showing how to use the API programmatically:

```java hljs
OpenAiApi openAiApi =
    new OpenAiApi(System.getenv("OPENAI_API_KEY"));

ChatCompletionMessage chatCompletionMessage =
    new ChatCompletionMessage("Hello world", Role.USER);

// Sync request
ResponseEntity<ChatCompletion> response = this.openAiApi.chatCompletionEntity(
    new ChatCompletionRequest(List.of(this.chatCompletionMessage), "gpt-3.5-turbo", 0.8, false));

// Streaming request
Flux<ChatCompletionChunk> streamResponse = this.openAiApi.chatCompletionStream(
        new ChatCompletionRequest(List.of(this.chatCompletionMessage), "gpt-3.5-turbo", 0.8, true));
Copied!
```

Follow the [OpenAiApi.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/main/java/org/springframework/ai/openai/api/OpenAiApi.java)'s JavaDoc for further information.

### Low-level API Examples

- The [OpenAiApiIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/api/OpenAiApiIT.java) tests provide some general examples of how to use the lightweight library.

- The [OpenAiApiToolFunctionCallIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/api/tool/OpenAiApiToolFunctionCallIT.java) tests show how to use the low-level API to call tool functions.
  Based on the [OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling/parallel-function-calling) tutorial.

## API Key Management

Spring AI provides flexible API key management through the `ApiKey` interface and its implementations. The default implementation, `SimpleApiKey`, is suitable for most use cases, but you can also create custom implementations for more complex scenarios.

### Default Configuration

By default, Spring Boot auto-configuration will create an API key bean using the `spring.ai.openai.api-key` property:

```properties hljs
spring.ai.openai.api-key=your-api-key-here
Copied!
```

### Custom API Key Configuration

You can create a custom instance of `OpenAiApi` with your own `ApiKey` implementation using the builder pattern:

```java hljs
ApiKey customApiKey = new ApiKey() {
    @Override
    public String getValue() {
        // Custom logic to retrieve API key
        return "your-api-key-here";
    }
};

OpenAiApi openAiApi = OpenAiApi.builder()
    .apiKey(customApiKey)
    .build();

// Create a chat client with the custom OpenAiApi instance
OpenAiChatClient chatClient = new OpenAiChatClient(openAiApi);
Copied!
```

This is useful when you need to:

- Retrieve the API key from a secure key store

- Rotate API keys dynamically

- Implement custom API key selection logic

SearchCTRL + k

## OpenAI Transcriptions

Spring AI supports [OpenAI’s Transcription model](https://platform.openai.com/docs/api-reference/audio/createTranscription).

## Prerequisites

You will need to create an API key with OpenAI to access ChatGPT models.
Create an account at [OpenAI signup page](https://platform.openai.com/signup) and generate the token on the [API Keys page](https://platform.openai.com/account/api-keys).
The Spring AI project defines a configuration property named `spring.ai.openai.api-key` that you should set to the value of the `API Key` obtained from openai.com.
Exporting an environment variable is one way to set that configuration property:

## Auto-configuration

|     |                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | There has been a significant change in the Spring AI auto-configuration, starter modules' artifact names.<br>Please refer to the [upgrade notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) for more information. |

Spring AI provides Spring Boot auto-configuration for the OpenAI Transcription Client.
To enable it add the following dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file.

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-starter-model-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

### Transcription Properties

#### Connection Properties

The prefix `spring.ai.openai` is used as the property prefix that lets you connect to OpenAI.

|                                  |                                                                        |                                           |
| -------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| Property                         | Description                                                            | Default                                   |
| spring.ai.openai.base-url        | The URL to connect to                                                  | [api.openai.com](https://api.openai.com/) |
| spring.ai.openai.api-key         | The API Key                                                            | -                                         |
| spring.ai.openai.organization-id | Optionally you can specify which organization used for an API request. | -                                         |
| spring.ai.openai.project-id      | Optionally, you can specify which project is used for an API request.  | -                                         |

|     |                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | For users that belong to multiple organizations (or are accessing their projects through their legacy user API key), optionally, you can specify which organization and project is used for an API request.<br>Usage from these API requests will count as usage for the specified organization and project. |

#### Configuration Properties

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Enabling and disabling of the audio transcription auto-configurations are now configured via top level properties with the prefix `spring.ai.model.audio.transcription`.<br>To enable, spring.ai.model.audio.transcription=openai (It is enabled by default)<br>To disable, spring.ai.model.audio.transcription=none (or any value which doesn’t match openai)<br>This change is done to allow configuration of multiple models. |

The prefix `spring.ai.openai.audio.transcription` is used as the property prefix that lets you configure the retry mechanism for the OpenAI transcription model.

| Property                                                             | Description                                                                                                                                                                                                                                                                                                                      | Default                                   |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| spring.ai.model.audio.transcription                                  | Enable OpenAI Audio Transcription Model                                                                                                                                                                                                                                                                                          | openai                                    |
| spring.ai.openai.audio.transcription.base-url                        | The URL to connect to                                                                                                                                                                                                                                                                                                            | [api.openai.com](https://api.openai.com/) |
| spring.ai.openai.audio.transcription.api-key                         | The API Key                                                                                                                                                                                                                                                                                                                      | -                                         |
| spring.ai.openai.audio.transcription.organization-id                 | Optionally you can specify which organization used for an API request.                                                                                                                                                                                                                                                           | -                                         |
| spring.ai.openai.audio.transcription.project-id                      | Optionally, you can specify which project is used for an API request.                                                                                                                                                                                                                                                            | -                                         |
| spring.ai.openai.audio.transcription.options.model                   | ID of the model to use. Only whisper-1 (which is powered by our open source Whisper V2 model) is currently available.                                                                                                                                                                                                            | whisper-1                                 |
| spring.ai.openai.audio.transcription.options.response-format         | The format of the transcript output, in one of these options: json, text, srt, verbose_json, or vtt.                                                                                                                                                                                                                             | json                                      |
| spring.ai.openai.audio.transcription.options.prompt                  | An optional text to guide the model’s style or continue a previous audio segment. The prompt should match the audio language.                                                                                                                                                                                                    |                                           |
| spring.ai.openai.audio.transcription.options.language                | The language of the input audio. Supplying the input language in ISO-639-1 format will improve accuracy and latency.                                                                                                                                                                                                             |                                           |
| spring.ai.openai.audio.transcription.options.temperature             | The sampling temperature, between 0 and 1. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. If set to 0, the model will use log probability to automatically increase the temperature until certain thresholds are hit.                         | 0                                         |
| spring.ai.openai.audio.transcription.options.timestamp_granularities | The timestamp granularities to populate for this transcription. response_format must be set verbose_json to use timestamp granularities. Either or both of these options are supported: word, or segment. Note: There is no additional latency for segment timestamps, but generating word timestamps incurs additional latency. | segment                                   |

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | You can override the common `spring.ai.openai.base-url`, `spring.ai.openai.api-key`, `spring.ai.openai.organization-id` and `spring.ai.openai.project-id` properties.<br>The `spring.ai.openai.audio.transcription.base-url`, `spring.ai.openai.audio.transcription.api-key`, `spring.ai.openai.audio.transcription.organization-id` and `spring.ai.openai.audio.transcription.project-id` properties if set take precedence over the common properties.<br>This is useful if you want to use different OpenAI accounts for different models and different model endpoints. |

|     |                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------- |
|     | All properties prefixed with `spring.ai.openai.transcription.options` can be overridden at runtime. |

## Runtime Options

The `OpenAiAudioTranscriptionOptions` class provides the options to use when making a transcription.
On start-up, the options specified by `spring.ai.openai.audio.transcription` are used but you can override these at runtime.

For example:

```java hljs
OpenAiAudioApi.TranscriptResponseFormat responseFormat = OpenAiAudioApi.TranscriptResponseFormat.VTT;

OpenAiAudioTranscriptionOptions transcriptionOptions = OpenAiAudioTranscriptionOptions.builder()
    .language("en")
    .prompt("Ask not this, but ask that")
    .temperature(0f)
    .responseFormat(this.responseFormat)
    .build();
AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(audioFile, this.transcriptionOptions);
AudioTranscriptionResponse response = openAiTranscriptionModel.call(this.transcriptionRequest);
Copied!
```

## Manual Configuration

Add the `spring-ai-openai` dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file.

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

Next, create a `OpenAiAudioTranscriptionModel`

```java hljs
var openAiAudioApi = new OpenAiAudioApi(System.getenv("OPENAI_API_KEY"));

var openAiAudioTranscriptionModel = new OpenAiAudioTranscriptionModel(this.openAiAudioApi);

var transcriptionOptions = OpenAiAudioTranscriptionOptions.builder()
    .responseFormat(TranscriptResponseFormat.TEXT)
    .temperature(0f)
    .build();

var audioFile = new FileSystemResource("/path/to/your/resource/speech/jfk.flac");

AudioTranscriptionPrompt transcriptionRequest = new AudioTranscriptionPrompt(this.audioFile, this.transcriptionOptions);
AudioTranscriptionResponse response = openAiTranscriptionModel.call(this.transcriptionRequest);
Copied!
```

## Example Code

- The [OpenAiTranscriptionModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/audio/transcription/OpenAiTranscriptionModelIT.java) test provides some general examples how to use the library.

SearchCTRL + k

# OpenAI Text-to-Speech (TTS)

## Introduction

The Audio API provides a speech endpoint based on OpenAI’s TTS (text-to-speech) model, enabling users to:

- Narrate a written blog post.

- Produce spoken audio in multiple languages.

- Give real-time audio output using streaming.

## Prerequisites

1. Create an OpenAI account and obtain an API key. You can sign up at the [OpenAI signup page](https://platform.openai.com/signup) and generate an API key on the [API Keys page](https://platform.openai.com/account/api-keys).

2. Add the `spring-ai-openai` dependency to your project’s build file. For more information, refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section.

## Auto-configuration

|     |                                                                                                                                                                                                                                       |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | There has been a significant change in the Spring AI auto-configuration, starter modules' artifact names.<br>Please refer to the [upgrade notes](https://docs.spring.io/spring-ai/reference/upgrade-notes.html) for more information. |

Spring AI provides Spring Boot auto-configuration for the OpenAI Text-to-Speech Client.
To enable it add the following dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-starter-model-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file:

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-starter-model-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

## Speech Properties

### Connection Properties

The prefix `spring.ai.openai` is used as the property prefix that lets you connect to OpenAI.

|                                  |                                                                        |                                           |
| -------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
| Property                         | Description                                                            | Default                                   |
| spring.ai.openai.base-url        | The URL to connect to                                                  | [api.openai.com](https://api.openai.com/) |
| spring.ai.openai.api-key         | The API Key                                                            | -                                         |
| spring.ai.openai.organization-id | Optionally you can specify which organization used for an API request. | -                                         |
| spring.ai.openai.project-id      | Optionally, you can specify which project is used for an API request.  | -                                         |

|     |                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|     | For users that belong to multiple organizations (or are accessing their projects through their legacy user API key), optionally, you can specify which organization and project is used for an API request.<br>Usage from these API requests will count as usage for the specified organization and project. |

### Configuration Properties

|     |                                                                                                                                                                                                                                                                                                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Enabling and disabling of the audio speech auto-configurations are now configured via top level properties with the prefix `spring.ai.model.audio.speech`.<br>To enable, spring.ai.model.audio.speech=openai (It is enabled by default)<br>To disable, spring.ai.model.audio.speech=none (or any value which doesn’t match openai)<br>This change is done to allow configuration of multiple models. |

The prefix `spring.ai.openai.audio.speech` is used as the property prefix that lets you configure the OpenAI Text-to-Speech client.

| Property                                              | Description                                                                                              | Default                                   |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| spring.ai.model.audio.speech                          | Enable Audio Speech Model                                                                                | openai                                    |
| spring.ai.openai.audio.speech.base-url                | The URL to connect to                                                                                    | [api.openai.com](https://api.openai.com/) |
| spring.ai.openai.audio.speech.api-key                 | The API Key                                                                                              | -                                         |
| spring.ai.openai.audio.speech.organization-id         | Optionally you can specify which organization used for an API request.                                   | -                                         |
| spring.ai.openai.audio.speech.project-id              | Optionally, you can specify which project is used for an API request.                                    | -                                         |
| spring.ai.openai.audio.speech.options.model           | ID of the model to use. Only tts-1 is currently available.                                               | tts-1                                     |
| spring.ai.openai.audio.speech.options.voice           | The voice to use for the TTS output. Available options are: alloy, echo, fable, onyx, nova, and shimmer. | alloy                                     |
| spring.ai.openai.audio.speech.options.response-format | The format of the audio output. Supported formats are mp3, opus, aac, flac, wav, and pcm.                | mp3                                       |
| spring.ai.openai.audio.speech.options.speed           | The speed of the voice synthesis. The acceptable range is from 0.25 (slowest) to 4.0 (fastest).          | 1.0                                       |

|     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | You can override the common `spring.ai.openai.base-url`, `spring.ai.openai.api-key`, `spring.ai.openai.organization-id` and `spring.ai.openai.project-id` properties.<br>The `spring.ai.openai.audio.speech.base-url`, `spring.ai.openai.audio.speech.api-key`, `spring.ai.openai.audio.speech.organization-id` and `spring.ai.openai.audio.speech.project-id` properties if set take precedence over the common properties.<br>This is useful if you want to use different OpenAI accounts for different models and different model endpoints. |

|     |                                                                                             |
| --- | ------------------------------------------------------------------------------------------- |
|     | All properties prefixed with `spring.ai.openai.image.options` can be overridden at runtime. |

## Runtime Options

The `OpenAiAudioSpeechOptions` class provides the options to use when making a text-to-speech request.
On start-up, the options specified by `spring.ai.openai.audio.speech` are used but you can override these at runtime.

For example:

```java hljs
OpenAiAudioSpeechOptions speechOptions = OpenAiAudioSpeechOptions.builder()
    .model("tts-1")
    .voice(OpenAiAudioApi.SpeechRequest.Voice.ALLOY)
    .responseFormat(OpenAiAudioApi.SpeechRequest.AudioResponseFormat.MP3)
    .speed(1.0f)
    .build();

SpeechPrompt speechPrompt = new SpeechPrompt("Hello, this is a text-to-speech example.", this.speechOptions);
SpeechResponse response = openAiAudioSpeechModel.call(this.speechPrompt);
Copied!
```

## Manual Configuration

Add the `spring-ai-openai` dependency to your project’s Maven `pom.xml` file:

```xml hljs
<dependency>
    <groupId>org.springframework.ai</groupId>
    <artifactId>spring-ai-openai</artifactId>
</dependency>
Copied!
```

or to your Gradle `build.gradle` build file:

```groovy hljs
dependencies {
    implementation 'org.springframework.ai:spring-ai-openai'
}
Copied!
```

|     |                                                                                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     | Refer to the [Dependency Management](https://docs.spring.io/spring-ai/reference/getting-started.html#dependency-management) section to add the Spring AI BOM to your build file. |

Next, create an `OpenAiAudioSpeechModel`:

```java hljs
var openAiAudioApi = new OpenAiAudioApi(System.getenv("OPENAI_API_KEY"));

var openAiAudioSpeechModel = new OpenAiAudioSpeechModel(this.openAiAudioApi);

var speechOptions = OpenAiAudioSpeechOptions.builder()
    .responseFormat(OpenAiAudioApi.SpeechRequest.AudioResponseFormat.MP3)
    .speed(1.0f)
    .model(OpenAiAudioApi.TtsModel.TTS_1.value)
    .build();

var speechPrompt = new SpeechPrompt("Hello, this is a text-to-speech example.", this.speechOptions);
SpeechResponse response = this.openAiAudioSpeechModel.call(this.speechPrompt);

// Accessing metadata (rate limit info)
OpenAiAudioSpeechResponseMetadata metadata = this.response.getMetadata();

byte[] responseAsBytes = this.response.getResult().getOutput();
Copied!
```

## Streaming Real-time Audio

The Speech API provides support for real-time audio streaming using chunk transfer encoding. This means that the audio is able to be played before the full file has been generated and made accessible.

```java hljs
var openAiAudioApi = new OpenAiAudioApi(System.getenv("OPENAI_API_KEY"));

var openAiAudioSpeechModel = new OpenAiAudioSpeechModel(this.openAiAudioApi);

OpenAiAudioSpeechOptions speechOptions = OpenAiAudioSpeechOptions.builder()
    .voice(OpenAiAudioApi.SpeechRequest.Voice.ALLOY)
    .speed(1.0f)
    .responseFormat(OpenAiAudioApi.SpeechRequest.AudioResponseFormat.MP3)
    .model(OpenAiAudioApi.TtsModel.TTS_1.value)
    .build();

SpeechPrompt speechPrompt = new SpeechPrompt("Today is a wonderful day to build something people love!", this.speechOptions);

Flux<SpeechResponse> responseStream = this.openAiAudioSpeechModel.stream(this.speechPrompt);
Copied!
```

## Example Code

- The [OpenAiSpeechModelIT.java](https://github.com/spring-projects/spring-ai/blob/main/models/spring-ai-openai/src/test/java/org/springframework/ai/openai/audio/speech/OpenAiSpeechModelIT.java) test provides some general examples of how to use the library.
