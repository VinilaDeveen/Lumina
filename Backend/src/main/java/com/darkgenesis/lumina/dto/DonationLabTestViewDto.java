package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.DonationStatus;

import lombok.Data;

@Data
public class DonationLabTestViewDto {
    
    private Long donationId;
    private LocalDate donationCollectionDate;
    private LocalTime donationStartTime;
    private Long donationAmount;
    private BloodType userBloodType;
    private DonationStatus labTestResult;
    private Long userId;
    private String donorName;

    private DonationStatus donationStatus;
}
