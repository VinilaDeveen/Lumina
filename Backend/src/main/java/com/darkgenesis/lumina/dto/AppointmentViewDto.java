package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.AppointmentStatus;

import lombok.Data;

@Data
public class AppointmentViewDto {

    private Long appointmentId;
    private LocalDate appointmentDate;
    private LocalTime startTime;
    private Long userId;
    private Long bedId;
    private AppointmentStatus appointmentStatus;
}
