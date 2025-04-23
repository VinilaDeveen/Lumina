package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.darkgenesis.lumina.Enum.BloodRequestStatus;
import com.darkgenesis.lumina.dto.BloodRequestDto;
import com.darkgenesis.lumina.dto.BloodRequestViewDto;
import com.darkgenesis.lumina.entity.BloodInventory;
import com.darkgenesis.lumina.entity.BloodRequest;
import com.darkgenesis.lumina.exception.BloodRequestNotFoundException;
import com.darkgenesis.lumina.repository.BloodInventoryRepo;
import com.darkgenesis.lumina.repository.BloodRequestRepo;
import com.darkgenesis.lumina.service.BloodRequestService;

@Service
public class BloodRequestServiceImpl implements BloodRequestService {

    @Autowired
    private BloodRequestRepo bloodRequestRepo;

    @Autowired
    private BloodInventoryRepo bloodInventoryRepo;

    @Override
    public BloodRequest createBloodRequest(BloodRequestDto bloodRequestDto) {
        
        BloodRequest bloodRequest = new BloodRequest();

        bloodRequest.setRequestDate(LocalDate.now());
        bloodRequest.setRequestTime(LocalTime.now());
        bloodRequest.setRequestAmount(bloodRequestDto.getRequestAmount());
        bloodRequest.setBloodType(bloodRequestDto.getBloodType());
        bloodRequest.setBloodRequestStatus(BloodRequestStatus.PENDING);

        return bloodRequestRepo.save(bloodRequest);
    }

    @Override
    public List<BloodRequestViewDto> viewAllBloodRequests() {
        List<BloodRequest> bloodRequests = bloodRequestRepo.findAll();
        
        List<BloodRequestViewDto> bloodViewList = bloodRequests.stream().map(bloodRequest ->{

            BloodRequestViewDto bloodRequestViewDto = new BloodRequestViewDto();
            bloodRequestViewDto.setBloodRequestId(bloodRequest.getBloodRequestId());
            bloodRequestViewDto.setRequestTime(bloodRequest.getRequestTime());
            bloodRequestViewDto.setRequestDate(bloodRequest.getRequestDate());
            bloodRequestViewDto.setBloodRequestStatus(bloodRequest.getBloodRequestStatus());
            bloodRequestViewDto.setRequestAmount(bloodRequest.getRequestAmount());
            bloodRequestViewDto.setBloodType(bloodRequest.getBloodType());

            return bloodRequestViewDto;
        }).collect(Collectors.toList());

        return bloodViewList;
    }

    @Override
    public BloodRequestViewDto viewBloodRequestById(Long bloodRequestId) {
        BloodRequest bloodRequest = bloodRequestRepo.findById(bloodRequestId)
        .orElseThrow(()->new BloodRequestNotFoundException("BloodRequest not found with the bloodRequestId: "+ bloodRequestId));

        BloodRequestViewDto bloodRequestViewDto = new BloodRequestViewDto();
        bloodRequestViewDto.setBloodRequestId(bloodRequestId);
        bloodRequestViewDto.setRequestTime(bloodRequest.getRequestTime());
        bloodRequestViewDto.setRequestDate(bloodRequest.getRequestDate());
        bloodRequestViewDto.setBloodRequestStatus(bloodRequest.getBloodRequestStatus());
        bloodRequestViewDto.setRequestAmount(bloodRequest.getRequestAmount());
        bloodRequestViewDto.setBloodType(bloodRequest.getBloodType());

        return bloodRequestViewDto;
    }

    @Override
    public BloodRequest deleteBloodRequest(Long bloodRequestId) {
        
        BloodRequest existingBloodRequest = bloodRequestRepo.findById(bloodRequestId)
        .orElseThrow(()->new BloodRequestNotFoundException("BloodRequest not found with the bloodRequestId: "+ bloodRequestId));

        existingBloodRequest.setBloodRequestStatus(BloodRequestStatus.DELETED);

        return bloodRequestRepo.save(existingBloodRequest);
    }

    @Transactional
    @Override
    public String handleBloodRequest(Long bloodRequestId, BloodRequestStatus bloodRequestStatus) {

        BloodRequest bloodRequest = bloodRequestRepo.findById(bloodRequestId)
        .orElseThrow(()->new BloodRequestNotFoundException("BloodRequest not found with the bloodRequestId: "+ bloodRequestId));
        bloodRequest.setBloodRequestStatus(bloodRequestStatus);
        bloodRequestRepo.save(bloodRequest);
        
        if(bloodRequestStatus == BloodRequestStatus.ACCEPTED){
            
            BloodInventory bloodInventory = bloodInventoryRepo.findByBloodType(bloodRequest.getBloodType());

            if(bloodInventory.getAmount() >= bloodRequest.getRequestAmount()){
                bloodInventory.setAmount(bloodInventory.getAmount() - bloodRequest.getRequestAmount());
                bloodInventoryRepo.save(bloodInventory);

                return "Successfully released from the Blood Inventory!";
            }else{

                return "Insufficient Blood available in the Blood inventory!";
            }  
        }

        return "BloodRequst successfully rejected!";
    }

    @Override
    public Long getTotalBloodRequestsToday() {
        return bloodRequestRepo.countBloodRequestsToday();
    }

    @Override
    public Long getTotalBloodRequests() {
        return bloodRequestRepo.count();
    }
    
}
