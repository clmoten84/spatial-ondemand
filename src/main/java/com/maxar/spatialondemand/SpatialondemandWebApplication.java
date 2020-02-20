package com.maxar.spatialondemand;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EntityScan(basePackages = "com.maxar.spatialondemand.model")
@EnableJpaRepositories(basePackages = "com.maxar.spatialondemand.repository")
@EnableSpringDataWebSupport
public class SpatialondemandWebApplication {
	public static void main(String[] args) {
		SpringApplication.run(SpatialondemandWebApplication.class, args);
	}
}
