package com.darkgenesis.lumina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.Appointment;
import com.darkgenesis.lumina.entity.User;

@Repository
public interface AppointmentRepo extends JpaRepository<Appointment, Long> {
    
    @Query("SELECT COUNT(d) FROM Appointment d WHERE DATE(d.appointmentDate) = CURRENT_DATE")
    Long countDonationsToday();

    List<Appointment> findByUser(User user);
}
