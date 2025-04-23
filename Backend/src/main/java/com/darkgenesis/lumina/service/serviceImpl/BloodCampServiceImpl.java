package com.darkgenesis.lumina.service.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.BloodCampStatus;
import com.darkgenesis.lumina.dto.BloodCampRegisterRequest;
import com.darkgenesis.lumina.dto.BloodCampViewDto;
import com.darkgenesis.lumina.entity.BloodCamp;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.BloodCampNotFoundException;
import com.darkgenesis.lumina.exception.UserNotFoundException;
import com.darkgenesis.lumina.repository.BloodCampRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.BloodCampService;

@Service
public class BloodCampServiceImpl implements BloodCampService{

    @Autowired
    private BloodCampRepo bloodCampRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<BloodCampViewDto> getAllBloodCamps() {
        List<BloodCamp> bloodCamps = bloodCampRepo.findAll();

        List<BloodCampViewDto> bloodCampList = bloodCamps.stream().map(bloodCamp ->{

            BloodCampViewDto bloodCampViewDto = new BloodCampViewDto();
            bloodCampViewDto.setBloodCampId(bloodCamp.getBloodCampId());
            bloodCampViewDto.setBloodCampDate(bloodCamp.getBloodCampDate());
            bloodCampViewDto.setBloodCampStartingTime(bloodCamp.getBloodCampStartingTime());
            bloodCampViewDto.setBloodCampEndingTime(bloodCamp.getBloodCampEndingTime());
            bloodCampViewDto.setBloodCampDonorCount(bloodCamp.getBloodCampDonorCount());
            bloodCampViewDto.setBloodCampLocation(bloodCamp.getBloodCampLocation());
            bloodCampViewDto.setBloodCampStatus(bloodCamp.getBloodCampStatus());


            return bloodCampViewDto;
        }).collect(Collectors.toList());

        return bloodCampList;
    }

    @Override
    public BloodCamp addBloodCamp(BloodCampRegisterRequest bloodCampRegisterRequest) {

        User user = userRepo.findById(bloodCampRegisterRequest.getUserId())
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ bloodCampRegisterRequest.getUserId()));

        BloodCamp bloodCamp = new BloodCamp();
        bloodCamp.setUser(user);
        bloodCamp.setBloodCampDate(bloodCampRegisterRequest.getBloodCampDate());
        bloodCamp.setBloodCampStartingTime(bloodCampRegisterRequest.getBloodCampStartingTime());
        bloodCamp.setBloodCampEndingTime(bloodCampRegisterRequest.getBloodCampEndingTime());
        bloodCamp.setBloodCampDonorCount(bloodCampRegisterRequest.getBloodCampDonorCount());
        bloodCamp.setBloodCampLocation(bloodCampRegisterRequest.getBloodCampLocation());

        bloodCamp.setBloodCampStatus(BloodCampStatus.PENDING);

        return bloodCampRepo.save(bloodCamp);
    }

    @Override
    public BloodCamp deleteBloodCamp(Long bloodCampId) {

        BloodCamp existingBloodCamp = bloodCampRepo.findById(bloodCampId)
        .orElseThrow(()-> new BloodCampNotFoundException("BloodCamp not found with the bloodCampId: "+ bloodCampId));
        
        existingBloodCamp.setBloodCampStatus(BloodCampStatus.DELETED);
        
        return bloodCampRepo.save(existingBloodCamp);
    }

    @Override
    public BloodCampViewDto getBloodCampById(Long bloodCampId) {
        
        BloodCamp bloodCamp = bloodCampRepo.findById(bloodCampId)
        .orElseThrow(()-> new BloodCampNotFoundException("BloodCamp not found with the bloodCampId: "+ bloodCampId));

        BloodCampViewDto bloodCampViewDto = new BloodCampViewDto();
        bloodCampViewDto.setBloodCampId(bloodCamp.getBloodCampId());
        bloodCampViewDto.setBloodCampDate(bloodCamp.getBloodCampDate());
        bloodCampViewDto.setBloodCampStartingTime(bloodCamp.getBloodCampStartingTime());
        bloodCampViewDto.setBloodCampEndingTime(bloodCamp.getBloodCampEndingTime());
        bloodCampViewDto.setBloodCampDonorCount(bloodCamp.getBloodCampDonorCount());
        bloodCampViewDto.setBloodCampLocation(bloodCamp.getBloodCampLocation());
        bloodCampViewDto.setBloodCampStatus(bloodCamp.getBloodCampStatus());

        return bloodCampViewDto;
    }

    @Override
    public BloodCamp handleBloodCamp(Long bloodCampId, BloodCampStatus bloodCampStatus) {
        
        BloodCamp bloodCamp = bloodCampRepo.findById(bloodCampId)
        .orElseThrow(()-> new BloodCampNotFoundException("BloodCamp not found with the bloodCampId: "+ bloodCampId));

        bloodCamp.setBloodCampStatus(bloodCampStatus);
        return bloodCampRepo.save(bloodCamp);
    }

    @Override
    public List<BloodCampViewDto> getBloodCampByUser(Long userId) {
        
        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        List<BloodCamp> bloodCamps = bloodCampRepo.findByUser(user);
        
        List<BloodCampViewDto> bloodCampList = bloodCamps.stream().map(bloodCamp ->{

            BloodCampViewDto bloodCampViewDto = new BloodCampViewDto();
            bloodCampViewDto.setBloodCampId(bloodCamp.getBloodCampId());
            bloodCampViewDto.setBloodCampDate(bloodCamp.getBloodCampDate());
            bloodCampViewDto.setBloodCampStartingTime(bloodCamp.getBloodCampStartingTime());
            bloodCampViewDto.setBloodCampEndingTime(bloodCamp.getBloodCampEndingTime());
            bloodCampViewDto.setBloodCampDonorCount(bloodCamp.getBloodCampDonorCount());
            bloodCampViewDto.setBloodCampLocation(bloodCamp.getBloodCampLocation());
            bloodCampViewDto.setBloodCampStatus(bloodCamp.getBloodCampStatus());


            return bloodCampViewDto;
        }).collect(Collectors.toList());

        return bloodCampList;
    }
        
}
