package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class AppointmentScheduleRequest {
    
    private Long userId;
    private LocalDate date;
    private LocalTime startTime;
}
