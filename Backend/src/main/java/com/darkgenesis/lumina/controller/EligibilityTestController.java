package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.EligibilityTestRequest;
import com.darkgenesis.lumina.dto.EligibilityViewDto;
import com.darkgenesis.lumina.service.EligibilityTestService;

@RestController
@RequestMapping("api/lumina/eligibilityTest")
@CrossOrigin("*")
public class EligibilityTestController {
    
    @Autowired
    private EligibilityTestService eligibilityTestService;

    @PostMapping("/appointment")
    public ResponseEntity<Boolean> addAppointmentTest (@RequestParam Long appointmentId, @RequestBody EligibilityTestRequest eligibilityTestRequest) {
        eligibilityTestService.addAppointmentTest(appointmentId,eligibilityTestRequest);
        return ResponseEntity.status(HttpStatus.OK).body(eligibilityTestService.validateAnswer(eligibilityTestRequest));
    }

    @PostMapping("/user")
    public ResponseEntity<Boolean> addUserTest (@RequestParam Long userId, @RequestBody EligibilityTestRequest eligibilityTestRequest) {
        eligibilityTestService.addUserTest(userId, eligibilityTestRequest);
        return ResponseEntity.status(HttpStatus.OK).body(eligibilityTestService.validateAnswer(eligibilityTestRequest));
    }

    @GetMapping
    public ResponseEntity<List<EligibilityViewDto>> viewAllEligibilityTest(){
        List<EligibilityViewDto> eligibilityViewList = eligibilityTestService.viewAllEligibilityTests();
        return ResponseEntity.status(HttpStatus.OK).body(eligibilityViewList);
    }
}
