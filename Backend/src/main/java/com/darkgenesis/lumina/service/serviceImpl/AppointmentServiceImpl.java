package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.AppointmentStatus;
import com.darkgenesis.lumina.Enum.BedStatus;
import com.darkgenesis.lumina.dto.AppointmentScheduleRequest;
import com.darkgenesis.lumina.dto.AppointmentViewDto;
import com.darkgenesis.lumina.entity.Appointment;
import com.darkgenesis.lumina.entity.Bed;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.AppointmentNotFoundException;
import com.darkgenesis.lumina.exception.BedsNotAvailableException;
import com.darkgenesis.lumina.exception.DonorNotEligibleException;
import com.darkgenesis.lumina.exception.DonorNotFoundException;
import com.darkgenesis.lumina.repository.AppointmentRepo;
import com.darkgenesis.lumina.repository.BedRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.AppointmentService;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    
    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private BedRepo bedRepo;

    @Override
    public Appointment scheduleAppointment(AppointmentScheduleRequest appointmentScheduleRequest) {
        User user = userRepo.findByUserIdAndUserRole(appointmentScheduleRequest.getUserId())
                .orElseThrow(() -> new DonorNotFoundException("Donor not found with the userId: "+ appointmentScheduleRequest.getUserId()));

        if (user.getLastDonationDate() != null && user.getLastDonationDate().plusMonths(4).isAfter(LocalDate.now())) {
            throw new DonorNotEligibleException("Donor is not eligible to donate blood until " + user.getLastDonationDate().plusMonths(4));
        } 

        LocalDate date = appointmentScheduleRequest.getDate();
        LocalTime startTime = appointmentScheduleRequest.getStartTime();

        Bed bed = bedRepo.findBedByDateAndTimeSlot(date, startTime).orElseThrow(() -> 
            new BedsNotAvailableException("No bed schedule found for the selected date and time"));

        if (bed.getStatus() == BedStatus.HOLIDAY) {
            throw new BedsNotAvailableException("Selected date is a holiday: " + date);
        }

        if (bed.getAvailableBeds() <= 0) {
            throw new BedsNotAvailableException("No available beds for the selected date and time");
        }

        user.setLastDonationDate(date);

        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setAppointmentDate(date);
        appointment.setStartTime(startTime);
        appointment.setBed(bed);
        appointment.setAppointmentStatus(AppointmentStatus.PENDING);

        appointmentRepo.save(appointment);

        bed.setAvailableBeds(bed.getAvailableBeds() - 1);
        bedRepo.save(bed);

        return appointment;
    }

    @Override
    public List<LocalTime> getAvailableTimeSlots(LocalDate date) {

        List<Bed> beds = bedRepo.findByDateAndAvailableBedsGreaterThan(date, 0);
        return beds.stream()
                   .map(Bed::getTimeSlot)
                   .sorted()
                   .collect(Collectors.toList());
    }

    @Override
    public Appointment deleteAppointment(Long appointmentId) {
        
        Appointment existingAppointment = appointmentRepo.findById(appointmentId)
        .orElseThrow(()-> new AppointmentNotFoundException("Appointment not found with the appointmentId: "+ appointmentId));

        existingAppointment.setAppointmentStatus(AppointmentStatus.DELETED);
        return appointmentRepo.save(existingAppointment);
    }

    @Override
    public List<AppointmentViewDto> getAllAppointments() {
        List<Appointment> appointments = appointmentRepo.findAll();

        List<AppointmentViewDto> appoinmentList = appointments.stream().map(appoinment ->{
            AppointmentViewDto appoinmentViewDto = new AppointmentViewDto();

            appoinmentViewDto.setAppointmentId(appoinment.getId());
            appoinmentViewDto.setAppointmentDate(appoinment.getAppointmentDate());
            appoinmentViewDto.setStartTime(appoinment.getStartTime());
            appoinmentViewDto.setUserId(appoinment.getUser().getUserId());
            appoinmentViewDto.setBedId(appoinment.getBed().getBedId());
            appoinmentViewDto.setAppointmentStatus(appoinment.getAppointmentStatus()
                                                                                                    );
            return appoinmentViewDto;
        })
        .collect(Collectors.toList());

        return appoinmentList;
    }

    @Override
    public List<AppointmentViewDto> getAppointmentsByUserId(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new DonorNotFoundException("Donor not found with the userId: "+ userId));

        List<Appointment> appointments = appointmentRepo.findByUser(user);

        List<AppointmentViewDto> appoinmentList = appointments.stream().map(appoinment ->{
            AppointmentViewDto appoinmentViewDto = new AppointmentViewDto();

            appoinmentViewDto.setAppointmentId(appoinment.getId());
            appoinmentViewDto.setAppointmentDate(appoinment.getAppointmentDate());
            appoinmentViewDto.setStartTime(appoinment.getStartTime());
            appoinmentViewDto.setUserId(appoinment.getUser().getUserId());
            appoinmentViewDto.setBedId(appoinment.getBed().getBedId());
            appoinmentViewDto.setAppointmentStatus(appoinment.getAppointmentStatus()
                                                                                                    );
            return appoinmentViewDto;
        })
        .collect(Collectors.toList());

        return appoinmentList;
    }

    @Override
    public Long getTotalAppointmentsToday() {
        return appointmentRepo.countDonationsToday();
    }

    @Override
    public Long getTotalAppointments() {
        return appointmentRepo.count();
    }

}
