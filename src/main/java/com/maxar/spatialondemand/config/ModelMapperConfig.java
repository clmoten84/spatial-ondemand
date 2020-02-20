package com.maxar.spatialondemand.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManagerFactory;

@Configuration
public class ModelMapperConfig {
    @Bean
    public ModelMapper modelMapper(EntityManagerFactory emFactory) {
        // Add a global configuration to fetch handle lazily loaded fields
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration().setPropertyCondition(context -> emFactory.getPersistenceUnitUtil().isLoaded(context.getSource()));
        return mapper;
    }
}
