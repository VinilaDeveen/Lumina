package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.BloodInventoryAdditionRequest;
import com.darkgenesis.lumina.dto.BloodInventoryPercentageResponse;
import com.darkgenesis.lumina.dto.BloodInventoryUpdateRequest;
import com.darkgenesis.lumina.dto.BloodInventoryViewDto;
import com.darkgenesis.lumina.dto.CapacitySummary;
import com.darkgenesis.lumina.service.BloodInventoryService;
import com.darkgenesis.lumina.utils.LogActivity;

import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/lumina/bloodinventory")
@CrossOrigin("*")
public class BloodInventoryController {
    
    @Autowired
    private BloodInventoryService bloodInventoryService;

    @LogActivity
    @PutMapping("/add")
    public ResponseEntity<String> addToBloodInventory(@RequestBody BloodInventoryAdditionRequest bloodInventoryAdditionRequest){
        String response = bloodInventoryService.addToBloodInventory(bloodInventoryAdditionRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @LogActivity
    @PutMapping("/reject")
    public ResponseEntity<String> rejectBloodFromBloodInventory(@RequestBody BloodInventoryAdditionRequest bloodInventoryAdditionRequest){
        String response = bloodInventoryService.rejectBloodFromBloodInventory(bloodInventoryAdditionRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @LogActivity
    @PutMapping("/release")
    public ResponseEntity<String> releaseFromBloodInventory(@RequestBody BloodInventoryUpdateRequest bloodInventoryUpdateRequest){
        String response = bloodInventoryService.releaseFromBloodInventory(bloodInventoryUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @LogActivity
    @GetMapping
    public ResponseEntity<List<BloodInventoryViewDto>> viewAllBloodInventory() {
        List<BloodInventoryViewDto> bloodInventoryList = bloodInventoryService.viewAllBloodInventory();
        return ResponseEntity.status(HttpStatus.OK).body(bloodInventoryList);
    }

    @LogActivity
    @GetMapping("/percentage")
    public ResponseEntity<List<BloodInventoryPercentageResponse>> getBloodInventoryPercentages() {
        List<BloodInventoryPercentageResponse> bloodInventoryPercentages = bloodInventoryService.getBloodInventoryPercentages();
        return ResponseEntity.status(HttpStatus.OK).body(bloodInventoryPercentages);
    }

    @LogActivity
    @GetMapping("/capacitySummary")
    public ResponseEntity<CapacitySummary> getCapacitySummary() {
        CapacitySummary capacitySummary = bloodInventoryService.getCapacitySummary();
        return ResponseEntity.status(HttpStatus.OK).body(capacitySummary);
    }
    
                    
}
