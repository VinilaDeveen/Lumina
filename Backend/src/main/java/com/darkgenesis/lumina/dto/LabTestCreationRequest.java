package com.darkgenesis.lumina.dto;

import com.darkgenesis.lumina.Enum.DonationStatus;

import lombok.Data;

@Data
public class LabTestCreationRequest {

    private Long donationId;

    private DonationStatus labTestResult;

    private Double hemoglobin;

    private boolean HIV1;
    private boolean HIV2;
    private boolean hepatitisB;
    private boolean hepatitisC;
    private boolean malaria;
    private boolean syphilis;
}
