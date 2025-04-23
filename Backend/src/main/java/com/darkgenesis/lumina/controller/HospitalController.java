package com.darkgenesis.lumina.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.HospitalRegisterRequest;
import com.darkgenesis.lumina.dto.HospitalUpdateRequest;
import com.darkgenesis.lumina.dto.HospitalViewDto;
import com.darkgenesis.lumina.entity.Hospital;
import com.darkgenesis.lumina.service.HospitalService;
import com.darkgenesis.lumina.utils.LogActivity;

@RestController
@RequestMapping("api/lumina/hospital")
@CrossOrigin("*")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    @LogActivity
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @PostMapping
    public ResponseEntity<String> createHospital(@RequestBody HospitalRegisterRequest hospitalRegisterRequest){

        hospitalService.createHospital(hospitalRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("New user successfully created!");
    }

    @GetMapping("/{hospitalId}")
    public ResponseEntity<HospitalViewDto> viewHospitalById(@PathVariable Long hospitalId){

        HospitalViewDto hospital = hospitalService.viewHospitalById(hospitalId);
        return ResponseEntity.status(HttpStatus.OK).body(hospital);
    }

    @PutMapping("/{hospitalId}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long hospitalId, @RequestBody HospitalUpdateRequest hospitalUpdateRequest){

        Hospital hospital = hospitalService.updateHospital(hospitalId, hospitalUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body(hospital);
    }

    @PatchMapping("password/{hospitalId}")
    public ResponseEntity<Hospital> updateHospitalPassword(@PathVariable Long hospitalId, @RequestBody String password){

        Hospital hospital = hospitalService.updateHospitalPassword(hospitalId, password);
        return ResponseEntity.status(HttpStatus.OK).body(hospital);
    }

}
