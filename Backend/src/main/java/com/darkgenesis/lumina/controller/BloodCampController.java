package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.Enum.BloodCampStatus;
import com.darkgenesis.lumina.dto.BloodCampRegisterRequest;
import com.darkgenesis.lumina.dto.BloodCampViewDto;
import com.darkgenesis.lumina.service.BloodCampService;
import com.darkgenesis.lumina.utils.LogActivity;

@RestController
@RequestMapping("api/lumina/bloodcamp")
@CrossOrigin("*")
public class BloodCampController {
    
    @Autowired
    private BloodCampService bloodCampService;

    @LogActivity
    @GetMapping()
    public ResponseEntity<List<BloodCampViewDto>> getAllBloodCamps(){
        List<BloodCampViewDto> bloodCamps = bloodCampService.getAllBloodCamps();
        return ResponseEntity.status(HttpStatus.OK).body(bloodCamps);
    }

    @LogActivity
    @GetMapping("/{bloodCampId}")
    public ResponseEntity<BloodCampViewDto> getBloodCampById(@PathVariable Long bloodCampId){
        BloodCampViewDto bloodCampViewDto = bloodCampService.getBloodCampById(bloodCampId);
        return ResponseEntity.status(HttpStatus.OK).body(bloodCampViewDto);
    }

    @LogActivity
    @PostMapping()
    public ResponseEntity<String> addBloodCamp(@RequestBody BloodCampRegisterRequest bloodCampRegisterRequest){
        bloodCampService.addBloodCamp(bloodCampRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Blood Camp successfully added!"); 
    }

    @LogActivity
    @DeleteMapping("/{bloodCampId}")
    public void deleteBloodCamp(@PathVariable Long bloodCampId){
        bloodCampService.deleteBloodCamp(bloodCampId);
    }

    @LogActivity
    @PatchMapping("/{bloodCampId}")
    public ResponseEntity<String> handleBloodCamp(@PathVariable Long bloodCampId, @RequestParam BloodCampStatus bloodCampStatus){

        bloodCampService.handleBloodCamp(bloodCampId, bloodCampStatus);
        return ResponseEntity.status(HttpStatus.OK).body("BloodCamp Status successfully updated!");
    }

    @LogActivity
    @GetMapping("/viewUserBloodCamps/{userId}")
    public ResponseEntity<List<BloodCampViewDto>> getBloodCampByUser(@PathVariable Long userId){
        List<BloodCampViewDto> bloodCamps = bloodCampService.getBloodCampByUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body(bloodCamps);
    }
}
