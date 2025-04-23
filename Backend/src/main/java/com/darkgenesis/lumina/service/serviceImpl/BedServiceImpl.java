package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.BedStatus;
import com.darkgenesis.lumina.entity.Bed;
import com.darkgenesis.lumina.repository.BedRepo;
import com.darkgenesis.lumina.service.BedService;

@Service
public class BedServiceImpl implements BedService {
    
    @Autowired
    private BedRepo bedRepo;

    private int totalBeds;
    private List<LocalDate> holidays = new ArrayList<>();

    @Override
    public String updateBedStatus(LocalDate date, BedStatus status) {
        List<Bed> beds = bedRepo.findByDate(date);
    
        beds.forEach(bed -> {
            if (status == BedStatus.HOLIDAY && bed.getStatus() == BedStatus.ACTIVE) {
                bed.setStatus(BedStatus.HOLIDAY);
            } else if (status == BedStatus.ACTIVE && bed.getStatus() == BedStatus.HOLIDAY) {
                bed.setStatus(BedStatus.ACTIVE);
                bed.setAvailableBeds(bed.getTotalBeds());
            }
    
            bedRepo.save(bed);
        });

        return "Bed status updated for date: " + date + " with status toggled to " + status;
    }

    @Override
    public void initializeBeds() {
        for (int i = 0; i < 365; i++) {
            LocalDate date = LocalDate.now().plusDays(i);

            boolean isHoliday = holidays.contains(date);
            BedStatus status = isHoliday ? BedStatus.HOLIDAY : BedStatus.ACTIVE;
            int bedsForDay = isHoliday ? 0 : totalBeds;


            for (int hour = 9; hour < 17; hour++) {
                LocalTime timeSlot = LocalTime.of(hour, 0);

                Bed bed = bedRepo.findBedByDateAndTimeSlot(date, timeSlot).orElse(new Bed());
                bed.setDate(date);
                bed.setTimeSlot(timeSlot);
                bed.setTotalBeds(totalBeds);
                bed.setAvailableBeds(bedsForDay);
                bed.setStatus(status);

                bedRepo.save(bed);
            }
        }
    }

    @Override
    public String setTotalBeds(int totalBeds) {
        this.totalBeds = totalBeds;
        initializeBeds();
        return "Total beds set to " + totalBeds;
    }

    @Override
    public String setHolidays(List<LocalDate> holidays) {
        this.holidays = holidays;
        initializeBeds();
        return "Holidays set successfully.";
    }

    @Override
    public BedStatus findStatusByDate(LocalDate date) {
        
        return bedRepo.findBedStatusByDate(date);
    }

}
