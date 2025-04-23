package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.Hospital;

@Repository
public interface HospitalRepo extends JpaRepository<Hospital, Long> {
    
    Hospital findByHospitalEmail(String hospitalEmail);
}
