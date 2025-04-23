package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodCampStatus;

import lombok.Data;

@Data
public class BloodCampViewDto {
    
    private Long bloodCampId;
    private LocalDate bloodCampDate;
    private LocalTime bloodCampStartingTime;
    private LocalTime bloodCampEndingTime;
    private String bloodCampLocation;
    private int bloodCampDonorCount;

    private BloodCampStatus bloodCampStatus;
}
