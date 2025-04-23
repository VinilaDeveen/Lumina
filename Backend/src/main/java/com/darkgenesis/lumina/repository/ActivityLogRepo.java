package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darkgenesis.lumina.entity.ActivityLog;

public interface ActivityLogRepo extends JpaRepository<ActivityLog, Long> {
    
}
