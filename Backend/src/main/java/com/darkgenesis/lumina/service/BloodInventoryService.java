package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.BloodInventoryAdditionRequest;
import com.darkgenesis.lumina.dto.BloodInventoryPercentageResponse;
import com.darkgenesis.lumina.dto.BloodInventoryUpdateRequest;
import com.darkgenesis.lumina.dto.BloodInventoryViewDto;
import com.darkgenesis.lumina.dto.CapacitySummary;

@Service
public interface BloodInventoryService {
    
    String addToBloodInventory(BloodInventoryAdditionRequest bloodInventoryAdditionRequest);
    String rejectBloodFromBloodInventory(BloodInventoryAdditionRequest bloodInventoryAdditionRequest);

    String releaseFromBloodInventory(BloodInventoryUpdateRequest bloodInventoryUpdateRequest);
    List<BloodInventoryViewDto> viewAllBloodInventory();

    List<BloodInventoryPercentageResponse> getBloodInventoryPercentages();

    CapacitySummary getCapacitySummary();
}
