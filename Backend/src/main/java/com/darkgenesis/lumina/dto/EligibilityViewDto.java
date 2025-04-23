package com.darkgenesis.lumina.dto;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.Data;

@Data
public class EligibilityViewDto {
    
    private String userFirstName;

    private LocalDate testDate;
    private LocalTime testTime;

    private Boolean result;

}
