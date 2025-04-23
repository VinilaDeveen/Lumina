package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.entity.ActivityLog;
import com.darkgenesis.lumina.service.ActivityLogService;
import com.darkgenesis.lumina.utils.LogActivity;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("api/lumina/actvityLog")
@CrossOrigin("*")
public class ActivityLogController {
    
    @Autowired
    private ActivityLogService activityLogService;

    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping
    public ResponseEntity<List<ActivityLog>> viewAllActivityLogs() {
        List<ActivityLog> activityLogs = activityLogService.viewAllActivityLogs();
        return ResponseEntity.status(HttpStatus.OK).body(activityLogs);
    }
    

}
