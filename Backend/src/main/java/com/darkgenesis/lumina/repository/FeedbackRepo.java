package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {
    
}
