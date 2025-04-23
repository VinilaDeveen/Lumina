package com.darkgenesis.lumina.utils;

import java.io.IOException;

import com.darkgenesis.lumina.Enum.BloodType;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class BloodTypeDeserializer extends JsonDeserializer<BloodType> {
    @Override
    public BloodType deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String value = parser.getText();
        if (value == null || value.isEmpty()) {
            return null;
        }
        return BloodType.valueOf(value);
    }
}
