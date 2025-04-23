package com.darkgenesis.lumina.entity;

import com.darkgenesis.lumina.Enum.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Hospital {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospitalId;

    private String hospitalName;
    private String hospitalEmail;
    private String hospitalPassword;

    private String hospitalAddressLine1;
    private String hospitalAddressLine2;
    private String hospitalAddressCity;
    private String hospitalAddressZipCode;

    private String hospitalMobile;

    @Enumerated(EnumType.STRING)
    private Role role;
}