package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.darkgenesis.lumina.Enum.BedStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class Bed {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bedId;

    private LocalDate date;

    private LocalTime timeSlot;

    private int totalBeds;

    private int availableBeds;

    @Enumerated(EnumType.STRING)
    private BedStatus status;

    @OneToMany(mappedBy = "bed")
    private List<Appointment> appointments;
}
