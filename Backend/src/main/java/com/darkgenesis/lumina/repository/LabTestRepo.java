package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.Donation;
import com.darkgenesis.lumina.entity.LabTest;

@Repository
public interface LabTestRepo extends JpaRepository<LabTest, Long> {
    
    LabTest findByDonation(Donation donation);
}
