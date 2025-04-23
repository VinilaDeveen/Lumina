package com.darkgenesis.lumina.configuration;

import org.springframework.context.annotation.Configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.cfg.CoercionAction;
import com.fasterxml.jackson.databind.cfg.CoercionInputShape;

import jakarta.annotation.PostConstruct;

@Configuration
public class JacksonConfig {

    private final ObjectMapper objectMapper;

    public JacksonConfig(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @PostConstruct
    public void configure() {
        objectMapper.coercionConfigFor(Enum.class)
                .setCoercion(CoercionInputShape.EmptyString, CoercionAction.AsNull);
    }
}
