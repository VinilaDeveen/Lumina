package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.EligibilityTestRequest;
import com.darkgenesis.lumina.dto.EligibilityViewDto;
import com.darkgenesis.lumina.entity.EligibilityTest;

@Service
public interface EligibilityTestService {
    
    EligibilityTest addAppointmentTest(Long appointmentId,EligibilityTestRequest eligibilityTestRequest);
    EligibilityTest addUserTest(Long userId, EligibilityTestRequest eligibilityTestRequest);
    Boolean validateAnswer(EligibilityTestRequest eligibilityTestRequest);

    List<EligibilityViewDto> viewAllEligibilityTests();
}
