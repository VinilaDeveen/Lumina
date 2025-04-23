package com.darkgenesis.lumina.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.dto.HospitalRegisterRequest;
import com.darkgenesis.lumina.dto.HospitalUpdateRequest;
import com.darkgenesis.lumina.dto.HospitalViewDto;
import com.darkgenesis.lumina.entity.Hospital;
import com.darkgenesis.lumina.exception.HospitalNotFoundException;
import com.darkgenesis.lumina.repository.HospitalRepo;
import com.darkgenesis.lumina.service.HospitalService;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepo hospitalRepo;

    @Override
    public Hospital createHospital(HospitalRegisterRequest hospitalRegisterRequest) {
        if (hospitalRegisterRequest == null) {
            throw new IllegalArgumentException("User register request cannot be null");
        }

        Hospital existingHospital = hospitalRepo.findByHospitalEmail(hospitalRegisterRequest.getHospitalEmail());

        if(existingHospital != null){
            throw new IllegalArgumentException("User register request cannot be null");
        }

        Hospital hospital = new Hospital();

        hospital.setHospitalName(hospitalRegisterRequest.getHospitalName());
        hospital.setHospitalEmail(hospitalRegisterRequest.getHospitalEmail());
        hospital.setHospitalMobile(hospitalRegisterRequest.getHospitalMobile());
        hospital.setHospitalPassword(hospitalRegisterRequest.getHospitalPassword());
        hospital.setRole(Role.HOSPITAL);

        hospital.setHospitalAddressLine1(hospitalRegisterRequest.getHospitalAddressLine1());
        hospitalRegisterRequest.setHospitalAddressLine2(hospitalRegisterRequest.getHospitalAddressLine2());
        hospital.setHospitalAddressCity(hospitalRegisterRequest.getHospitalAddressCity());
        hospital.setHospitalAddressZipCode(hospitalRegisterRequest.getHospitalAddressZipCode());

        return hospitalRepo.save(hospital); 
    }

    @Override
    public HospitalViewDto viewHospitalById(Long hospitalId) {
        
        Hospital hospital = hospitalRepo.findById(hospitalId)
        .orElseThrow(()-> new HospitalNotFoundException("Hospital not found with the hospitalId: "+ hospitalId));

        HospitalViewDto hospitalViewDto = new HospitalViewDto();
        hospitalViewDto.setHospitalId(hospitalId);
        hospitalViewDto.setHospitalName(hospital.getHospitalName());
        hospitalViewDto.setHospitalEmail(hospital.getHospitalEmail());
        hospitalViewDto.setHospitalMobile(hospital.getHospitalMobile());

        hospitalViewDto.setHospitalAddressLine1(hospital.getHospitalAddressLine1());
        hospitalViewDto.setHospitalAddressLine2(hospital.getHospitalAddressLine2());
        hospitalViewDto.setHospitalAddressCity(hospital.getHospitalAddressCity());
        hospitalViewDto.setHospitalAddressZipCode(hospital.getHospitalAddressZipCode());

        return hospitalViewDto;
    }

    @Override
    public Hospital updateHospital(Long hospitalId, HospitalUpdateRequest hospitalUpdateRequest) {
        
        Hospital hospital = hospitalRepo.findById(hospitalId)
        .orElseThrow(()-> new HospitalNotFoundException("Hospital not found with the hospitalId: "+ hospitalId));

        if(hospital == null){
            return null;
        }else{

            hospital.setHospitalName(hospitalUpdateRequest.getHospitalName());
            hospital.setHospitalEmail(hospitalUpdateRequest.getHospitalEmail());
            hospital.setHospitalMobile(hospitalUpdateRequest.getHospitalMobile());
            
            hospital.setHospitalAddressLine1(hospitalUpdateRequest.getHospitalAddressLine1());
            hospital.setHospitalAddressLine2(hospitalUpdateRequest.getHospitalAddressLine2());
            hospital.setHospitalAddressCity(hospitalUpdateRequest.getHospitalAddressCity());
            hospital.setHospitalAddressZipCode(hospitalUpdateRequest.getHospitalAddressZipCode());

            return hospitalRepo.save(hospital);
        }
    }

    @Override
    public Hospital updateHospitalPassword(Long hospitalId, String Password){

        Hospital hospital = hospitalRepo.findById(hospitalId)
        .orElseThrow(()-> new HospitalNotFoundException("Hospital not found with the hospitalId: "+ hospitalId));

        hospital.setHospitalPassword(Password);

        return hospitalRepo.save(hospital);
    }
    
}
