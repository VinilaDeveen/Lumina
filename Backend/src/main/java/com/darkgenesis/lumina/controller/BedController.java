package com.darkgenesis.lumina.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.Enum.BedStatus;
import com.darkgenesis.lumina.service.BedService;
import com.darkgenesis.lumina.utils.LogActivity;

@RestController
@RequestMapping("api/lumina/bed")
@CrossOrigin("*")
public class BedController {
    
    @Autowired
    private BedService bedService;

    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @PostMapping("/setTotalBeds")
    public ResponseEntity<String> setTotalBeds(@RequestParam int totalBeds) {
        String response = bedService.setTotalBeds(totalBeds);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @PostMapping("/setHolidays")
    public ResponseEntity<String> setHolidays(@RequestBody List<String> holidayDates) {
        List<LocalDate> holidays = holidayDates.stream()
                .map(LocalDate::parse)
                .toList();
        String response = bedService.setHolidays(holidays);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @PatchMapping("/updateBedStatus")
    public ResponseEntity<String> updateBedStatus(@RequestParam String date, @RequestParam String status) {
        LocalDate bedDate = LocalDate.parse(date);
        BedStatus bedStatus = BedStatus.valueOf(status.toUpperCase());
        String response = bedService.updateBedStatus(bedDate, bedStatus);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping("")
    public ResponseEntity<BedStatus> bedStatus(@RequestParam LocalDate date){
        BedStatus bedStatus = bedService.findStatusByDate(date);
        return ResponseEntity.status(HttpStatus.OK).body(bedStatus);
    }
}
