package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class CapacitySummary {
    
    private Long filledCapacity;
    private Long freeCapacity;

    public CapacitySummary(Long filledCapacity, Long freeCapacity) {
        this.filledCapacity = filledCapacity;
        this.freeCapacity = freeCapacity;
    }
}
