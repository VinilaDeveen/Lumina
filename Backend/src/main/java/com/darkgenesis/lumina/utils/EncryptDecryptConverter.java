package com.darkgenesis.lumina.utils;

import org.jasypt.util.text.AES256TextEncryptor;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EncryptDecryptConverter implements AttributeConverter<String, String> {
    
    private static String ENCRYPTION_KEY = "aH3j!x5K@#Lw78@Qz&u9XkOp35B+2%4v";

    private final AES256TextEncryptor encryptor = new AES256TextEncryptor();

    public EncryptDecryptConverter() {
        encryptor.setPassword(ENCRYPTION_KEY);
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute != null ? encryptor.encrypt(attribute) : null;
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData != null ? encryptor.decrypt(dbData) : null;
    }
}
