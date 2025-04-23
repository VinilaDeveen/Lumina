package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class HospitalViewDto {
    
    private Long hospitalId;
    private String hospitalName;
    private String hospitalEmail;
    private String hospitalPassword;

    private String hospitalAddressLine1;
    private String hospitalAddressLine2;
    private String hospitalAddressCity;
    private String hospitalAddressZipCode;

    private String hospitalMobile;
}
