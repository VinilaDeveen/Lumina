package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.DonationLabTestViewDto;
import com.darkgenesis.lumina.dto.LabTestCreationRequest;
import com.darkgenesis.lumina.dto.LabTestUpdateRequest;
import com.darkgenesis.lumina.dto.LabTestViewDto;
import com.darkgenesis.lumina.service.LabTestService;

@RestController
@RequestMapping("api/lumina/labTest")
@CrossOrigin("*")
public class LabTestController {
    
    @Autowired
    private LabTestService labTestService;

    @PostMapping
    public ResponseEntity<String> createLabTest(@RequestBody LabTestCreationRequest labTestCreationRequest){
        labTestService.createLabTest(labTestCreationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("LabTest successfully created!");

    }

    @PutMapping("/{labTestId}")
    public ResponseEntity<String> updateLabTest(@PathVariable Long labTestId, @RequestBody LabTestUpdateRequest labTestUpdateRequest){
        labTestService.updateLabTest(labTestId, labTestUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body("LabTest successfully updated!");
    }

    @GetMapping
    public ResponseEntity<List<LabTestViewDto>> viewAllLabTest(){
        List<LabTestViewDto> labTests = labTestService.viewAllLabTest();
        return ResponseEntity.status(HttpStatus.OK).body(labTests);
    }

    @GetMapping("/{labTestId}")
    public ResponseEntity<LabTestViewDto> viewLabTestById(@PathVariable Long labTestId){
        LabTestViewDto labTest = labTestService.viewLabTestById(labTestId);
        return ResponseEntity.status(HttpStatus.OK).body(labTest);
    }

    @GetMapping("/donationLabTests")
    public ResponseEntity<List<DonationLabTestViewDto>> viewAllDonationLabTest(){
        List<DonationLabTestViewDto> donationLabTests = labTestService.viewAllDonationLabTest();
        return ResponseEntity.status(HttpStatus.OK).body(donationLabTests);
    }

    @GetMapping("/donation/{donationId}")
    public ResponseEntity<LabTestViewDto> viewLabTestByDonation(@PathVariable Long donationId){
        LabTestViewDto labTest = labTestService.viewLabTestByDonation(donationId);
        return ResponseEntity.status(HttpStatus.OK).body(labTest);
    }


}
