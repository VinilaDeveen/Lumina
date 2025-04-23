package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.DonationLabTestViewDto;
import com.darkgenesis.lumina.dto.LabTestCreationRequest;
import com.darkgenesis.lumina.dto.LabTestUpdateRequest;
import com.darkgenesis.lumina.dto.LabTestViewDto;
import com.darkgenesis.lumina.entity.LabTest;

@Service
public interface LabTestService {
    
    LabTest createLabTest(LabTestCreationRequest labTestCreationRequest);
    List<LabTestViewDto> viewAllLabTest();
    LabTestViewDto viewLabTestById(Long labTestId);
    LabTest updateLabTest(Long labTestId, LabTestUpdateRequest labTestUpdateRequest);

    List<DonationLabTestViewDto> viewAllDonationLabTest();

    LabTestViewDto viewLabTestByDonation(Long donationId);
}
