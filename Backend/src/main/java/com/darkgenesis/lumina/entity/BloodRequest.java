package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodRequestStatus;
import com.darkgenesis.lumina.Enum.BloodType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BloodRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodRequestId;

    private LocalDate requestDate;
    private LocalTime requestTime;

    @Enumerated(EnumType.STRING)
    private BloodRequestStatus bloodRequestStatus;

    private Long requestAmount;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;
}
