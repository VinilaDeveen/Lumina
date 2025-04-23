package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class BloodCampRegisterRequest {

    private LocalDate bloodCampDate;
    private LocalTime bloodCampStartingTime;
    private LocalTime bloodCampEndingTime;
    private String bloodCampLocation;
    private int bloodCampDonorCount;

    private Long userId;
}
