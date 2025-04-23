package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.DonationStatus;
import com.darkgenesis.lumina.dto.BloodInventoryAdditionRequest;
import com.darkgenesis.lumina.dto.BloodInventoryPercentageResponse;
import com.darkgenesis.lumina.dto.BloodInventoryUpdateRequest;
import com.darkgenesis.lumina.dto.BloodInventoryViewDto;
import com.darkgenesis.lumina.dto.CapacitySummary;
import com.darkgenesis.lumina.entity.BloodInventory;
import com.darkgenesis.lumina.entity.Donation;
import com.darkgenesis.lumina.exception.DonationNotFoundException;
import com.darkgenesis.lumina.repository.BloodInventoryRepo;
import com.darkgenesis.lumina.repository.DonationRepo;
import com.darkgenesis.lumina.service.BloodInventoryService;

@Service
public class BloodInventoryServiceImpl implements BloodInventoryService {

    @Autowired
    private BloodInventoryRepo bloodInventoryRepo;

    @Autowired
    private DonationRepo donationRepo;

    @Override
    public String addToBloodInventory(BloodInventoryAdditionRequest bloodInventoryAdditionRequest) {
        
        if(bloodInventoryAdditionRequest.getLabTestResult() == DonationStatus.ACCEPTED){
            BloodInventory bloodInventory = bloodInventoryRepo.findByBloodType(bloodInventoryAdditionRequest.getUserBloodType());

            bloodInventory.setAmount(bloodInventory.getAmount() + bloodInventoryAdditionRequest.getDonationAmount());
            bloodInventoryRepo.save(bloodInventory);

            Donation donation = donationRepo.findById(bloodInventoryAdditionRequest.getDonationId())
            .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ bloodInventoryAdditionRequest.getDonationId()));
            donation.setDonationStatus(DonationStatus.ACCEPTED);
            donationRepo.save(donation);
            return "Blood successfully added to the inventory!";
        }else{
            return "Cannot add rejected blood to the inventory!";
        }
    }

    @Override
    public String rejectBloodFromBloodInventory(BloodInventoryAdditionRequest bloodInventoryAdditionRequest) {

        if(bloodInventoryAdditionRequest.getLabTestResult() == DonationStatus.REJECTED){

            Donation donation = donationRepo.findById(bloodInventoryAdditionRequest.getDonationId())
            .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ bloodInventoryAdditionRequest.getDonationId()));
            donation.setDonationStatus(DonationStatus.REJECTED);
            donationRepo.save(donation);
            return "Blood successfully rejected!";
        }else{
            return "Cannot dispose accepted blood from the inventory!";
        }
    }

    @Override
    public String releaseFromBloodInventory(BloodInventoryUpdateRequest bloodInventoryUpdateRequest) {
        BloodInventory bloodInventory = bloodInventoryRepo.findByBloodType(bloodInventoryUpdateRequest.getBloodType());

        if(bloodInventory.getAmount() >= bloodInventoryUpdateRequest.getAmount()){
            bloodInventory.setAmount(bloodInventory.getAmount() - bloodInventoryUpdateRequest.getAmount());
            bloodInventoryRepo.save(bloodInventory);

            return "Successfully released from the Blood Inventory!";
        }else{
            return "Insufficient Blood available in the Blood inventory!";
        }
    }

    @Override
    public List<BloodInventoryViewDto> viewAllBloodInventory() {

        List<Donation> expiredDonations = donationRepo.findByDonationExpiryDateBefore(LocalDate.now());

        for (Donation donation : expiredDonations) {
        
            BloodInventory bloodInventory = bloodInventoryRepo.findByBloodType(donation.getUserBloodType());

            bloodInventory.setAmount(bloodInventory.getAmount() - donation.getDonationAmount());
            bloodInventoryRepo.save(bloodInventory);

            donation.setDonationStatus(DonationStatus.EXPIRED);
        }
        
        List<BloodInventory> bloodInventories = bloodInventoryRepo.findAll();

        List<BloodInventoryViewDto> bloodInventoryList = bloodInventories.stream().map(bloodInventory ->{

            BloodInventoryViewDto bloodInventoryViewDto = new BloodInventoryViewDto();
            bloodInventoryViewDto.setBloodType(bloodInventory.getBloodType());
            bloodInventoryViewDto.setAmount(bloodInventory.getAmount());

            return bloodInventoryViewDto;
        }).collect(Collectors.toList());

        return bloodInventoryList;             
    } 
    
    @Override
    public List<BloodInventoryPercentageResponse> getBloodInventoryPercentages() {

        List<BloodInventory> inventories = bloodInventoryRepo.findAll();

        List<BloodInventoryPercentageResponse> inventoryList = inventories.stream()
            .map(inventory -> {
                Integer bloodPercentage = (int) ((inventory.getAmount() * 100) / inventory.getMaxCapacity());
                return new BloodInventoryPercentageResponse(inventory.getBloodType(), bloodPercentage);
            })
            .collect(Collectors.toList());

        return inventoryList;
    }

    @Override
    public CapacitySummary getCapacitySummary() {
        
        return bloodInventoryRepo.getCapacitySummary();
    }
}
