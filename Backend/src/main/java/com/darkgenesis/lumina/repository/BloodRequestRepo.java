package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.BloodRequest;

@Repository
public interface BloodRequestRepo extends JpaRepository<BloodRequest, Long> {
    
    @Query("SELECT COUNT(d) FROM BloodRequest d WHERE DATE(d.requestDate) = CURRENT_DATE")
    Long countBloodRequestsToday();
}
