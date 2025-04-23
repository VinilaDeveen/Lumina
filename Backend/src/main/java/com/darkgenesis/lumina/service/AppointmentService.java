package com.darkgenesis.lumina.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.AppointmentScheduleRequest;
import com.darkgenesis.lumina.dto.AppointmentViewDto;
import com.darkgenesis.lumina.entity.Appointment;

@Service
public interface AppointmentService {
    
    Appointment scheduleAppointment(AppointmentScheduleRequest appointmentScheduleRequest);
    List<LocalTime> getAvailableTimeSlots(LocalDate date);
    Appointment deleteAppointment(Long appointmentId);
    List<AppointmentViewDto> getAllAppointments();
    List<AppointmentViewDto> getAppointmentsByUserId(Long userId);

    Long getTotalAppointmentsToday();
    Long getTotalAppointments();

}
