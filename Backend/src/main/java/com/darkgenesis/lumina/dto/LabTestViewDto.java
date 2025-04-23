package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.DonationStatus;

import lombok.Data;

@Data
public class LabTestViewDto {
    
    private Long userId;
    private Long labTestId;
    private String userFirstName;
    private String userLastName;
    private BloodType userBloodType;
    
    private LocalDate labTestDate;
    private LocalTime labTestTime;

    private DonationStatus labTestResult;

    private Double hemoglobin;

    private boolean HIV1;
    private boolean HIV2;
    private boolean hepatitisB;
    private boolean hepatitisC;
    private boolean malaria;
    private boolean syphilis;

    private DonationStatus donationStatus;

    private String userNIC;
    private LocalDate userDOB;
}
