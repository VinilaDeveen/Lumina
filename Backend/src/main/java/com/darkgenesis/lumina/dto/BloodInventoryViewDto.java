package com.darkgenesis.lumina.dto;

import com.darkgenesis.lumina.Enum.BloodType;

import lombok.Data;

@Data
public class BloodInventoryViewDto {
    private BloodType bloodType;
    private Long amount;
}
