package com.darkgenesis.lumina.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.BedStatus;

@Service
public interface BedService {
    
    void initializeBeds();
    String updateBedStatus(LocalDate date, BedStatus status);
    String setTotalBeds(int totalBeds);
    String setHolidays(List<LocalDate> holidays);

    BedStatus findStatusByDate(LocalDate date);
}
