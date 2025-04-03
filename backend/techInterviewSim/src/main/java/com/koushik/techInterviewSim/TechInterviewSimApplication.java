package com.koushik.techInterviewSim;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
@OpenAPIDefinition(
    info = @Info(
        title = "Technical Interview Simulator API",
        version = "1.0.0",
        description = "REST API documentation for Technical Interview Simulator application",
        contact = @Contact(
            name = "Praneeth Koushik",
            email = "koushik@example.com",
            url = "https://github.com/koushik"
        ),
        license = @License(
            name = "MIT License",
            url = "https://opensource.org/licenses/MIT"
        )
    )
)
public class TechInterviewSimApplication {

    public static void main(String[] args) {
        SpringApplication.run(TechInterviewSimApplication.class, args);
    }
}
