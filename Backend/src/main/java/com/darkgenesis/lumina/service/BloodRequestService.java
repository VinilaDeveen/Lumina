package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.BloodRequestStatus;
import com.darkgenesis.lumina.dto.BloodRequestDto;
import com.darkgenesis.lumina.dto.BloodRequestViewDto;
import com.darkgenesis.lumina.entity.BloodRequest;

@Service
public interface BloodRequestService {

    BloodRequest createBloodRequest(BloodRequestDto bloodRequestDto);
    List<BloodRequestViewDto> viewAllBloodRequests();
    BloodRequestViewDto viewBloodRequestById(Long bloodRequestId);
    BloodRequest deleteBloodRequest(Long bloodRequestId);
    
    String handleBloodRequest(Long bloodRequestId, BloodRequestStatus bloodRequestStatus);

    Long getTotalBloodRequestsToday();
    Long getTotalBloodRequests();
}
