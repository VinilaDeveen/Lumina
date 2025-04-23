package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.darkgenesis.lumina.Enum.DonationStatus;
import com.darkgenesis.lumina.Enum.LabStatus;
import com.darkgenesis.lumina.dto.DonationLabTestViewDto;
import com.darkgenesis.lumina.dto.LabTestCreationRequest;
import com.darkgenesis.lumina.dto.LabTestUpdateRequest;
import com.darkgenesis.lumina.dto.LabTestViewDto;
import com.darkgenesis.lumina.entity.Donation;
import com.darkgenesis.lumina.entity.LabTest;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.DonationNotFoundException;
import com.darkgenesis.lumina.exception.LabTestNotFoundException;
import com.darkgenesis.lumina.exception.UserNotFoundException;
import com.darkgenesis.lumina.repository.DonationRepo;
import com.darkgenesis.lumina.repository.LabTestRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.LabTestService;

@Service
public class LabTestServiceImpl implements LabTestService{
    
    @Autowired 
    private LabTestRepo labTestRepo;

    @Autowired
    private DonationRepo donationRepo;

    @Autowired
    private UserRepo userRepo;

    @Transactional
    @Override
    public LabTest createLabTest(LabTestCreationRequest labTestCreationRequest) {
        
        Donation donation = donationRepo.findById(labTestCreationRequest.getDonationId())
        .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ labTestCreationRequest.getDonationId()));

        LabTest labTest = new LabTest();

        labTest.setLabTestDate(LocalDate.now());
        labTest.setLabTestTime(LocalTime.now());
        labTest.setLabTestResult(labTestCreationRequest.getLabTestResult());

        if(labTestCreationRequest.getLabTestResult() == DonationStatus.ACCEPTED){
            donation.setLabStatus(LabStatus.ACCEPTED);
        }else if(labTestCreationRequest.getLabTestResult() == DonationStatus.REJECTED){
            donation.setLabStatus(LabStatus.REJECTED);
        }
        donationRepo.save(donation);
        
        labTest.setDonation(donation);

        labTest.setHemoglobin(labTestCreationRequest.getHemoglobin());
        labTest.setHIV1(labTestCreationRequest.isHIV1());
        labTest.setHIV2(labTestCreationRequest.isHIV2());
        labTest.setHepatitisB(labTestCreationRequest.isHepatitisB());
        labTest.setHepatitisC(labTestCreationRequest.isHepatitisC());
        labTest.setMalaria(labTestCreationRequest.isMalaria());
        labTest.setSyphilis(labTestCreationRequest.isSyphilis());

        return labTestRepo.save(labTest);
    }

    @Override
    public List<LabTestViewDto> viewAllLabTest() {
        
        List<LabTest> labTests = labTestRepo.findAll();

        List<LabTestViewDto> labTestList = labTests.stream().map(labTest ->{

            LabTestViewDto labTestViewDto = new LabTestViewDto();
            labTestViewDto.setLabTestId(labTest.getLabTestId());
            labTestViewDto.setLabTestDate(labTest.getLabTestDate());
            labTestViewDto.setLabTestTime(labTest.getLabTestTime());
            labTestViewDto.setLabTestResult(labTest.getLabTestResult());

            labTestViewDto.setUserId(labTest.getDonation().getUser().getUserId());
            labTestViewDto.setUserFirstName(labTest.getDonation().getUser().getUserFirstName());
            labTestViewDto.setUserLastName(labTest.getDonation().getUser().getUserLastName());
            labTestViewDto.setUserBloodType(labTest.getDonation().getUserBloodType());

            labTestViewDto.setHemoglobin(labTest.getHemoglobin());
            labTestViewDto.setHIV1(labTest.isHIV1());
            labTestViewDto.setHIV2(labTest.isHIV2());
            labTestViewDto.setHepatitisB(labTest.isHepatitisB());
            labTestViewDto.setHepatitisC(labTest.isHepatitisC());
            labTestViewDto.setMalaria(labTest.isMalaria());
            labTestViewDto.setSyphilis(labTest.isSyphilis());

            labTestViewDto.setDonationStatus(labTest.getDonation().getDonationStatus());
            
            return labTestViewDto;
        }).collect(Collectors.toList());

        return labTestList;
    }

    @Override
    public LabTestViewDto viewLabTestById(Long labTestId) {

        LabTest labTest = labTestRepo.findById(labTestId)
        .orElseThrow(()-> new LabTestNotFoundException("LabTest not found with the labTestId: "+ labTestId));

        LabTestViewDto labTestViewDto = new LabTestViewDto();

        labTestViewDto.setLabTestId(labTest.getLabTestId());
        labTestViewDto.setLabTestDate(labTest.getLabTestDate());
        labTestViewDto.setLabTestTime(labTest.getLabTestTime());
        labTestViewDto.setLabTestResult(labTest.getLabTestResult());

        labTestViewDto.setUserId(labTest.getDonation().getUser().getUserId());
        labTestViewDto.setUserFirstName(labTest.getDonation().getUser().getUserFirstName());
        labTestViewDto.setUserLastName(labTest.getDonation().getUser().getUserLastName());
        labTestViewDto.setUserBloodType(labTest.getDonation().getUserBloodType());

        labTestViewDto.setHemoglobin(labTest.getHemoglobin());
        labTestViewDto.setHIV1(labTest.isHIV1());
        labTestViewDto.setHIV2(labTest.isHIV2());
        labTestViewDto.setHepatitisB(labTest.isHepatitisB());
        labTestViewDto.setHepatitisC(labTest.isHepatitisC());
        labTestViewDto.setMalaria(labTest.isMalaria());
        labTestViewDto.setSyphilis(labTest.isSyphilis());

        labTestViewDto.setDonationStatus(labTest.getDonation().getDonationStatus());

        return labTestViewDto;
    }

    @Override
    public LabTest updateLabTest(Long labTestId, LabTestUpdateRequest labTestUpdateRequest) {
        
        LabTest labTest = labTestRepo.findById(labTestId)
        .orElseThrow(()-> new LabTestNotFoundException("LabTest not found with the labTestId: "+ labTestId));

        if(labTest == null){
            return null;
        }else{

            labTest.setLabTestDate(LocalDate.now());
            labTest.setLabTestTime(LocalTime.now());
            labTest.setLabTestResult(labTestUpdateRequest.getLabTestResult());

            labTest.setHemoglobin(labTestUpdateRequest.getHemoglobin());
            labTest.setHIV1(labTestUpdateRequest.isHIV1());
            labTest.setHIV2(labTestUpdateRequest.isHIV2());
            labTest.setHepatitisB(labTestUpdateRequest.isHepatitisB());
            labTest.setHepatitisC(labTestUpdateRequest.isHepatitisC());
            labTest.setMalaria(labTestUpdateRequest.isMalaria());
            labTest.setSyphilis(labTestUpdateRequest.isSyphilis());

            return labTestRepo.save(labTest);
        }
    }

    @Override
    public List<DonationLabTestViewDto> viewAllDonationLabTest() {
        
        List<LabTest> labTests = labTestRepo.findAll();

        List<DonationLabTestViewDto> donationLabTestList = labTests.stream().map(labTest ->{

            DonationLabTestViewDto donationLabTestViewDto = new DonationLabTestViewDto();
            donationLabTestViewDto.setDonationCollectionDate(labTest.getDonation().getDonationCollectionDate());
            donationLabTestViewDto.setDonationStartTime(labTest.getDonation().getDonationStartTime());
            donationLabTestViewDto.setUserId(labTest.getDonation().getUser().getUserId());
            donationLabTestViewDto.setDonorName(labTest.getDonation().getUser().getUserFirstName());
            donationLabTestViewDto.setUserBloodType(labTest.getDonation().getUserBloodType());
            donationLabTestViewDto.setDonationAmount(labTest.getDonation().getDonationAmount());
            donationLabTestViewDto.setDonationId(labTest.getDonation().getDonationID());
            donationLabTestViewDto.setLabTestResult(labTest.getLabTestResult());

            donationLabTestViewDto.setDonationStatus(labTest.getDonation().getDonationStatus());
            
            return donationLabTestViewDto;
        }).collect(Collectors.toList());

        return donationLabTestList;
    }

    @Override
    public LabTestViewDto viewLabTestByDonation(Long donationId) {

        Donation donation = donationRepo.findById(donationId)
        .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ donationId));

        LabTest labTest = labTestRepo.findByDonation(donation);

        User user = userRepo.findById(labTest.getDonation().getUser().getUserId())
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ labTest.getDonation().getUser().getUserId()));

        LabTestViewDto labTestViewDto = new LabTestViewDto();

        labTestViewDto.setLabTestId(labTest.getLabTestId());
        labTestViewDto.setLabTestDate(labTest.getLabTestDate());
        labTestViewDto.setLabTestTime(labTest.getLabTestTime());
        labTestViewDto.setLabTestResult(labTest.getLabTestResult());

        labTestViewDto.setUserId(user.getUserId());
        labTestViewDto.setUserFirstName(user.getUserFirstName());
        labTestViewDto.setUserNIC(user.getUserNIC());
        labTestViewDto.setUserLastName(user.getUserLastName());
        labTestViewDto.setUserDOB(user.getUserDOB());

        labTestViewDto.setUserBloodType(labTest.getDonation().getUserBloodType());


        labTestViewDto.setHemoglobin(labTest.getHemoglobin());
        labTestViewDto.setHIV1(labTest.isHIV1());
        labTestViewDto.setHIV2(labTest.isHIV2());
        labTestViewDto.setHepatitisB(labTest.isHepatitisB());
        labTestViewDto.setHepatitisC(labTest.isHepatitisC());
        labTestViewDto.setMalaria(labTest.isMalaria());
        labTestViewDto.setSyphilis(labTest.isSyphilis());

        labTestViewDto.setDonationStatus(labTest.getDonation().getDonationStatus());

        return labTestViewDto;
    }
}
