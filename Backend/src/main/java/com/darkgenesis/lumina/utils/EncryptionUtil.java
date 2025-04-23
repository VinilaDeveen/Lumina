package com.darkgenesis.lumina.utils;

import org.jasypt.util.text.AES256TextEncryptor;

public class EncryptionUtil {
    private static String ENCRYPTION_KEY = "aH3j!x5K@#Lw78@Qz&u9XkOp35B+2%4v";

    public static String encrypt(String data) {
        AES256TextEncryptor encryptor = new AES256TextEncryptor();
        encryptor.setPassword(ENCRYPTION_KEY);
        return encryptor.encrypt(data);
    }

    public static String decrypt(String encryptedData) {
        AES256TextEncryptor encryptor = new AES256TextEncryptor();
        encryptor.setPassword(ENCRYPTION_KEY);
        return encryptor.decrypt(encryptedData);
    }
}
