package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.BloodCampStatus;
import com.darkgenesis.lumina.dto.BloodCampRegisterRequest;
import com.darkgenesis.lumina.dto.BloodCampViewDto;
import com.darkgenesis.lumina.entity.BloodCamp;

@Service
public interface BloodCampService {

    List<BloodCampViewDto> getAllBloodCamps();
    BloodCampViewDto getBloodCampById(Long bloodCampId);
    BloodCamp addBloodCamp(BloodCampRegisterRequest bloodCampRegisterRequest);
    BloodCamp deleteBloodCamp(Long bloodCampId);

    BloodCamp handleBloodCamp(Long bloodCampId, BloodCampStatus bloodCampStatus);

    List<BloodCampViewDto> getBloodCampByUser(Long userId);
}
