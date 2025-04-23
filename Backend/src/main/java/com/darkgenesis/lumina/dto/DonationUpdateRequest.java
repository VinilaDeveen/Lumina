package com.darkgenesis.lumina.dto;

import java.time.LocalTime;

import lombok.Data;

@Data
public class DonationUpdateRequest {
    
    private Long donationAmount;
    private LocalTime donationStartTime;
    private LocalTime donationEndTime;
}
