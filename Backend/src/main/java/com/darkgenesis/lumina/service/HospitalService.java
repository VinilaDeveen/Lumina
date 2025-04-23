package com.darkgenesis.lumina.service;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.HospitalRegisterRequest;
import com.darkgenesis.lumina.dto.HospitalUpdateRequest;
import com.darkgenesis.lumina.dto.HospitalViewDto;
import com.darkgenesis.lumina.entity.Hospital;

@Service
public interface HospitalService {
    Hospital createHospital(HospitalRegisterRequest hospitalRegisterRequest);
    HospitalViewDto viewHospitalById(Long hospitalId);
    Hospital updateHospital(Long hospitalId, HospitalUpdateRequest hospitalUpdateRequest);
    Hospital updateHospitalPassword(Long hospitalId, String Password);
}
