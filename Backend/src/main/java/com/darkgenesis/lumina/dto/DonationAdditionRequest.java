package com.darkgenesis.lumina.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class DonationAdditionRequest {
    
    private Long donationAmount;
    private Long userId;
    private Long appointmentId;
    private Long bloodCampId;
    private LocalTime donationStartTime;
    private LocalTime donationEndTime;
}
