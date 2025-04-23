package com.darkgenesis.lumina.entity;

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
public class BloodInventory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bloodInventoryId;

    private Long amount;

    @Enumerated(EnumType.STRING)
    private BloodType bloodType;

    private Long maxCapacity;
}
