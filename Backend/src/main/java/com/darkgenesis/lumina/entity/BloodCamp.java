package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.darkgenesis.lumina.Enum.BloodCampStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class BloodCamp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodCampId;

    private LocalDate bloodCampDate;
    private LocalTime bloodCampStartingTime;
    private LocalTime bloodCampEndingTime;
    private String bloodCampLocation;
    private int bloodCampDonorCount;

    @Enumerated(EnumType.STRING)
    private BloodCampStatus bloodCampStatus;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "bloodCamp")
    private List<Donation> donations;
}
