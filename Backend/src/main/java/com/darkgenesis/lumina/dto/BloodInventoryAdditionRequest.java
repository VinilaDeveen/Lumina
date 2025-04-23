package com.darkgenesis.lumina.dto;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.DonationStatus;

import lombok.Data;

@Data
public class BloodInventoryAdditionRequest {

    private Long donationId;
    private Long donationAmount;
    private BloodType userBloodType;
    private DonationStatus labTestResult;
}
