package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class YearlyMonthlyDonation {
    private int year;
    private int month;
    private Long totalDonation;

    public YearlyMonthlyDonation(int year, int month, Long totalDonation) {
        this.year = year;
        this.month = month;
        this.totalDonation = totalDonation;
    }
}

