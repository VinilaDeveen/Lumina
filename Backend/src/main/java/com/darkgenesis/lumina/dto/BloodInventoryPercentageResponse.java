package com.darkgenesis.lumina.dto;

import com.darkgenesis.lumina.Enum.BloodType;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BloodInventoryPercentageResponse {
    
     private BloodType bloodType;
     private Integer bloodpercentage;
}
