package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.AppointmentStatus;
import com.darkgenesis.lumina.dto.EligibilityTestRequest;
import com.darkgenesis.lumina.dto.EligibilityViewDto;
import com.darkgenesis.lumina.entity.Appointment;
import com.darkgenesis.lumina.entity.EligibilityTest;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.AppointmentNotFoundException;
import com.darkgenesis.lumina.exception.DonorNotFoundException;
import com.darkgenesis.lumina.repository.AppointmentRepo;
import com.darkgenesis.lumina.repository.EligibilityTestRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.EligibilityTestService;

import jakarta.transaction.Transactional;

@Service
public class EligibilityTestServiceImpl implements EligibilityTestService {
    
    @Autowired
    private EligibilityTestRepo eligibilityTestRepo;

    @Autowired 
    private AppointmentRepo appointmentRepo;

    @Autowired
    private UserRepo userRepo;

    @Transactional
    @Override
    public EligibilityTest addAppointmentTest(Long appointmentId, EligibilityTestRequest eligibilityTestRequest) {
        
        Appointment appointment = appointmentRepo.findById(appointmentId)
                .orElseThrow(() -> new AppointmentNotFoundException("Appointment not found with the appointmentId: "+ appointmentId));

        appointment.setAppointmentStatus(AppointmentStatus.COMPLETED);
        appointmentRepo.save(appointment);

        EligibilityTest eligibilityTest = new EligibilityTest();
            eligibilityTest.setUser(appointment.getUser());
            eligibilityTest.setTestDate(LocalDate.now());
            eligibilityTest.setTestTime(LocalTime.now());
            eligibilityTest.setQuestion1(eligibilityTestRequest.getQuestion1());
            eligibilityTest.setQuestion2(eligibilityTestRequest.getQuestion2());
            eligibilityTest.setQuestion3(eligibilityTestRequest.getQuestion3());
            eligibilityTest.setQuestion4(eligibilityTestRequest.getQuestion4());
            eligibilityTest.setQuestion5(eligibilityTestRequest.getQuestion5());
            eligibilityTest.setQuestion6(eligibilityTestRequest.getQuestion6());
            eligibilityTest.setQuestion7(eligibilityTestRequest.getQuestion7());
            eligibilityTest.setResult(validateAnswer(eligibilityTestRequest));
        return eligibilityTestRepo.save(eligibilityTest);

    }

    @Transactional
    @Override
    public EligibilityTest addUserTest(Long userId, EligibilityTestRequest eligibilityTestRequest) {
        
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new DonorNotFoundException("Donor not found with the userId: "+ userId));

        EligibilityTest eligibilityTest = new EligibilityTest();
            eligibilityTest.setUser(user);
            eligibilityTest.setTestDate(LocalDate.now());
            eligibilityTest.setTestTime(LocalTime.now());
            eligibilityTest.setQuestion1(eligibilityTestRequest.getQuestion1());
            eligibilityTest.setQuestion2(eligibilityTestRequest.getQuestion2());
            eligibilityTest.setQuestion3(eligibilityTestRequest.getQuestion3());
            eligibilityTest.setQuestion4(eligibilityTestRequest.getQuestion4());
            eligibilityTest.setQuestion5(eligibilityTestRequest.getQuestion5());
            eligibilityTest.setQuestion6(eligibilityTestRequest.getQuestion6());
            eligibilityTest.setQuestion7(eligibilityTestRequest.getQuestion7());
            eligibilityTest.setResult(validateAnswer(eligibilityTestRequest));
        return eligibilityTestRepo.save(eligibilityTest);

    }

    @Override
    public Boolean validateAnswer(EligibilityTestRequest eligibilityTestRequest) {
        return eligibilityTestRequest.getQuestion1() == false && eligibilityTestRequest.getQuestion2() == false 
        && eligibilityTestRequest.getQuestion3() == false && eligibilityTestRequest.getQuestion4() == false && 
        eligibilityTestRequest.getQuestion5() == false && eligibilityTestRequest.getQuestion6() == false && 
        eligibilityTestRequest.getQuestion7() == false;
    }


    @Override
    public List<EligibilityViewDto> viewAllEligibilityTests() {
        
        List<EligibilityTest> eligibilityTests = eligibilityTestRepo.findAll();

        List<EligibilityViewDto> eligibilityViewList = eligibilityTests.stream().map(eligibilitiTest ->{

            EligibilityViewDto eligibilityViewDto = new EligibilityViewDto();
            eligibilityViewDto.setUserFirstName(eligibilitiTest.getUser().getUserFirstName());
            eligibilityViewDto.setTestDate(eligibilitiTest.getTestDate());
            eligibilityViewDto.setTestTime(eligibilitiTest.getTestTime());
            eligibilityViewDto.setResult(eligibilitiTest.getResult());

            return eligibilityViewDto;
        }).collect(Collectors.toList());

        return eligibilityViewList;             
    }
}
