package com.darkgenesis.lumina.dto;

import com.darkgenesis.lumina.Enum.BloodType;

import lombok.Data;

@Data
public class BloodRequestDto {
    
    private Long requestAmount;
    private BloodType bloodType;
}
