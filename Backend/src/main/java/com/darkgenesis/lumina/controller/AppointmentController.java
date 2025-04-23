package com.darkgenesis.lumina.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.AppointmentScheduleRequest;
import com.darkgenesis.lumina.dto.AppointmentViewDto;
import com.darkgenesis.lumina.service.AppointmentService;
import com.darkgenesis.lumina.utils.LogActivity;

@RestController
@RequestMapping("api/lumina/appointment")
@CrossOrigin("*")
public class AppointmentController {
    
    @Autowired
    private AppointmentService appointmentService;

    @LogActivity
    @PostMapping
    public ResponseEntity<String> scheduleAppointment(@RequestBody AppointmentScheduleRequest appointmentScheduleRequest) {
        appointmentService.scheduleAppointment(appointmentScheduleRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Appointment scheduled successfully.");
    }

    @LogActivity
    @GetMapping("/available-slots")
    public ResponseEntity<List<LocalTime>> getAvailableTimeSlots(@RequestParam LocalDate date) {
        List<LocalTime> availableSlots = appointmentService.getAvailableTimeSlots(date);
        return ResponseEntity.ok(availableSlots);
    }

    @LogActivity
    @DeleteMapping("/{appointmentId}")
    public void deleteAppointment(@PathVariable Long appointmentId){
        appointmentService.deleteAppointment(appointmentId);
    }

    @LogActivity
    @GetMapping
    public ResponseEntity<List<AppointmentViewDto>> getAllAppointment() {
        List<AppointmentViewDto> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.status(HttpStatus.OK).body(appointments);
    }

    @LogActivity
    @GetMapping("/donor/{userId}")
    public ResponseEntity<List<AppointmentViewDto>> getAppointmentByUserId(@PathVariable Long userId) {
        List<AppointmentViewDto> appointments = appointmentService.getAppointmentsByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(appointments);
    }

    @LogActivity
    @GetMapping("/getTotalAppointmentsToday")
    public ResponseEntity<Long> getTotalAppointmentsToday() {
        Long todaysAppointments = appointmentService.getTotalAppointmentsToday();
        return ResponseEntity.status(HttpStatus.OK).body(todaysAppointments);
    }

    @LogActivity
    @GetMapping("/getTotalAppointments")
    public ResponseEntity<Long> getTotalAppointments() {
        Long totalAppointments = appointmentService.getTotalAppointments();
        return ResponseEntity.status(HttpStatus.OK).body(totalAppointments);
    }
}
