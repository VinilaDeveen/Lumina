package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class HospitalRegisterRequest {
    
    private String hospitalName;
    private String hospitalEmail;
    private String hospitalPassword;

    private String hospitalAddressLine1;
    private String hospitalAddressLine2;
    private String hospitalAddressCity;
    private String hospitalAddressZipCode;

    private String hospitalMobile;
}
