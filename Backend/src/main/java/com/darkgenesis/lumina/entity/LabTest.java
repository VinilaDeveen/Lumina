package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.DonationStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class LabTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long labTestId;
    private LocalDate labTestDate;
    private LocalTime labTestTime;

    @Enumerated(EnumType.STRING)
    private DonationStatus LabTestResult;

    private Double hemoglobin;

    private boolean HIV1;
    private boolean HIV2;
    private boolean hepatitisB;
    private boolean hepatitisC;
    private boolean malaria;
    private boolean syphilis;

    @OneToOne
    @JoinColumn(name = "donationId")
    private Donation donation;
}
