package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class TopTenDonor {
    
    private Long userId;
    private String userFirstName;
    private Long totalBloodAmount;

    public TopTenDonor(Long userId, String userFirstName, Long totalBloodAmount) {
        this.userId = userId;
        this.userFirstName = userFirstName;
        this.totalBloodAmount = totalBloodAmount;
    }
    
}
