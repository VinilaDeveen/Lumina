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

import com.darkgenesis.lumina.dto.DonationAdditionRequest;
import com.darkgenesis.lumina.dto.DonationLabTestDto;
import com.darkgenesis.lumina.dto.DonationUpdateRequest;
import com.darkgenesis.lumina.dto.DonationViewDto;
import com.darkgenesis.lumina.dto.MonthlyDonation;
import com.darkgenesis.lumina.dto.TopTenDonor;
import com.darkgenesis.lumina.dto.YearlyMonthlyDonation;
import com.darkgenesis.lumina.service.DonationService;

@RestController
@RequestMapping("api/lumina/donation")
@CrossOrigin("*")
public class DonationController {
    
    @Autowired
    private DonationService donationService;

    @PostMapping
    public ResponseEntity<String> addDonation(@RequestBody DonationAdditionRequest DonationAdditionRequest){
        donationService.addDonation(DonationAdditionRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Donation successfully added!");

    }

    @PutMapping("/{donationId}")
    public ResponseEntity<String> updateDonation(@PathVariable Long donationId, @RequestBody DonationUpdateRequest donationUpdateRequest){
        donationService.updateDonation(donationId, donationUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Donation successfully updated!");
    }

    @GetMapping
    public ResponseEntity<List<DonationViewDto>> viewAllDonations(){
        List<DonationViewDto> donations = donationService.viewAllDonations();
        return ResponseEntity.status(HttpStatus.OK).body(donations);
    }

    @GetMapping("/{donationId}")
    public ResponseEntity<DonationViewDto> viewDonationById(@PathVariable Long donationId){
        DonationViewDto donation = donationService.viewDonationById(donationId);
        return ResponseEntity.status(HttpStatus.OK).body(donation);
    }

    @GetMapping("donor/{userId}")
    public ResponseEntity<List<DonationViewDto>> viewDonationByUserId(@PathVariable Long userId){
        List<DonationViewDto> donations = donationService.viewAllDonationByUserId(userId);
        return ResponseEntity.status(HttpStatus.OK).body(donations);
    }

    @GetMapping("/getTotalDonationsToday")
    public ResponseEntity<Long> getTotalDonationsToday() {
        Long todaysDonations = donationService.getTotalDonationsToday();
        return ResponseEntity.status(HttpStatus.OK).body(todaysDonations);
    }

    @GetMapping("/getTotalDonations")
    public ResponseEntity<Long> getTotalDonations() {
        Long totalDonations = donationService.getTotalDonations();
        return ResponseEntity.status(HttpStatus.OK).body(totalDonations);
    }

    @GetMapping("/totalBloodDonated")
    public ResponseEntity<Long> getTotalBloodDonated() {
        Long totalBloodDonated = donationService.getTotalBloodDonated();
        return ResponseEntity.status(HttpStatus.OK).body(totalBloodDonated);
    }
    
    @GetMapping("/totalBloodDonatedToday")
    public ResponseEntity<Long> getTotalBloodDonatedToday() {
        Long totalBloodDonatedToday = donationService.getTotalBloodDonatedToday();
        return ResponseEntity.status(HttpStatus.OK).body(totalBloodDonatedToday);
    }

    @GetMapping("/topTenDonors")
    public ResponseEntity<List<TopTenDonor>> getTopTenDonor() {
        List<TopTenDonor> topTenDonorList = donationService.getTopTenDonor();
        return ResponseEntity.status(HttpStatus.OK).body(topTenDonorList);
    }

    @GetMapping("/getMonthlyDonations")
    public ResponseEntity<List<MonthlyDonation>> getMonthlyDonations() {
        List<MonthlyDonation> monthlyDonations = donationService.getMonthlyDonations();
        return ResponseEntity.status(HttpStatus.OK).body(monthlyDonations);
    }  

    @GetMapping("/getMonthlyDonationCount")
    public ResponseEntity<List<MonthlyDonation>> getMonthlyDonationCount() {
        List<MonthlyDonation> monthlyDonationCount = donationService.getMonthlyDonationsCount();
        return ResponseEntity.status(HttpStatus.OK).body(monthlyDonationCount);
    }  

    @GetMapping("/getYearlyMonthlyDonation")
    public ResponseEntity<List<YearlyMonthlyDonation>> getYearlyMonthlyDonation(){
        List<YearlyMonthlyDonation> yearlyMonthlyDonations = donationService.getYearlyMonthlyDonations();
        return ResponseEntity.status(HttpStatus.OK).body(yearlyMonthlyDonations);
    }

    @GetMapping("/donationLabTest")
    public ResponseEntity<List<DonationLabTestDto>> viewAllDonationLabTest(){
        List<DonationLabTestDto> donations = donationService.viewAllDonationLabTest();
        return ResponseEntity.status(HttpStatus.OK).body(donations);
    }
}
