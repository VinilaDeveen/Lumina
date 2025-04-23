package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.BloodInventory;
import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.dto.CapacitySummary;


@Repository
public interface BloodInventoryRepo extends JpaRepository<BloodInventory, Long> {
    
    BloodInventory findByBloodType(BloodType bloodType);

    @Query("SELECT new com.darkgenesis.lumina.dto.CapacitySummary( " +
           "COALESCE(SUM(b.amount), 0), COALESCE(SUM(b.maxCapacity - b.amount), 0)) " +
           "FROM BloodInventory b")
    CapacitySummary getCapacitySummary();
}
