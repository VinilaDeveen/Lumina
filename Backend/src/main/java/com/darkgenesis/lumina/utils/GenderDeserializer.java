package com.darkgenesis.lumina.utils;

import java.io.IOException;

import com.darkgenesis.lumina.Enum.Gender;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class GenderDeserializer extends JsonDeserializer<Gender>{
        @Override
    public Gender deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String value = parser.getText();
        if (value == null || value.isEmpty()) {
            return null;
        }
        return Gender.valueOf(value.toUpperCase());
    }
}
