package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodRequestStatus;
import com.darkgenesis.lumina.Enum.BloodType;

import lombok.Data;

@Data
public class BloodRequestViewDto {
    
    private Long bloodRequestId;
    private LocalDate requestDate;
    private LocalTime requestTime;
    private BloodRequestStatus bloodRequestStatus;
    private Long requestAmount;
    private BloodType bloodType;

}
