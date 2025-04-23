package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class MonthlyDonation {
    
    private int month;
    private Long totalAmount;

    public MonthlyDonation(Integer month, Long totalAmount) {
        this.month = month != null ? month : 0;
        this.totalAmount = totalAmount != null ? totalAmount : 0;
    }
    
}
