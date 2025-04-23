package com.darkgenesis.lumina.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.entity.ActivityLog;
import com.darkgenesis.lumina.repository.ActivityLogRepo;

@Service
public class ActivityLogService {
        private final ActivityLogRepo repository;

    public ActivityLogService(ActivityLogRepo repository) {
        this.repository = repository;
    }

    public void logActivity(String action, String performedBy) {
        ActivityLog log = new ActivityLog();
        log.setAction(action);
        log.setTimestamp(LocalDateTime.now());
        log.setPerformedBy(performedBy);
        repository.save(log);
    }

    public List<ActivityLog> viewAllActivityLogs(){
        List<ActivityLog> activityLogs = repository.findAll();
        return activityLogs;
    }
}
