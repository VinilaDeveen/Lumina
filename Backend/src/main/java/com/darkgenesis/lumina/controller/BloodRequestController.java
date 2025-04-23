package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.Enum.BloodRequestStatus;
import com.darkgenesis.lumina.dto.BloodRequestDto;
import com.darkgenesis.lumina.dto.BloodRequestViewDto;
import com.darkgenesis.lumina.service.BloodRequestService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/lumina/bloodRequest")
@CrossOrigin("*")
public class BloodRequestController {
    
    @Autowired
    private BloodRequestService bloodRequestService;

    @PatchMapping("/{bloodRequestId}")
    public ResponseEntity<String> handleBloodRequest(@PathVariable Long bloodRequestId, @RequestParam BloodRequestStatus bloodRequestStatus){

        String response = bloodRequestService.handleBloodRequest(bloodRequestId, bloodRequestStatus);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/getTotalBloodRequestsToday")
    public ResponseEntity<Long> getTotalBloodRequestsToday() {
        Long todaysBloodRequests = bloodRequestService.getTotalBloodRequestsToday();
        return ResponseEntity.status(HttpStatus.OK).body(todaysBloodRequests);
    }

    @GetMapping("/getTotalBloodRequests")
    public ResponseEntity<Long> getTotalBloodRequests() {
        Long totalBloodRequests = bloodRequestService.getTotalBloodRequests();
        return ResponseEntity.status(HttpStatus.OK).body(totalBloodRequests);
    }

    @PostMapping
    public ResponseEntity<String> createBloodRequest(@RequestBody BloodRequestDto bloodRequestDto) {
        bloodRequestService.createBloodRequest(bloodRequestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body("BloodRequest successfully created!");
    }

    @GetMapping
    public ResponseEntity<List<BloodRequestViewDto>> viewAllBloodRequests() {
        List<BloodRequestViewDto> bloodRequestList = bloodRequestService.viewAllBloodRequests();
        return ResponseEntity.status(HttpStatus.OK).body(bloodRequestList);
    }

    @GetMapping("/{bloodRequestId}")
    public ResponseEntity<BloodRequestViewDto> viewBloodRequestById(@PathVariable Long bloodRequestId) {
        BloodRequestViewDto bloodRequestViewDto = bloodRequestService.viewBloodRequestById(bloodRequestId);
        return ResponseEntity.status(HttpStatus.OK).body(bloodRequestViewDto);
    }
    
    @DeleteMapping("/{bloodRequestId}")
    public void deleteBloodRequest(@PathVariable Long bloodRequestId){
        bloodRequestService.deleteBloodRequest(bloodRequestId);
    }
}
