package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.DonationAdditionRequest;
import com.darkgenesis.lumina.dto.DonationLabTestDto;
import com.darkgenesis.lumina.dto.DonationUpdateRequest;
import com.darkgenesis.lumina.dto.DonationViewDto;
import com.darkgenesis.lumina.dto.MonthlyDonation;
import com.darkgenesis.lumina.dto.TopTenDonor;
import com.darkgenesis.lumina.dto.YearlyMonthlyDonation;
import com.darkgenesis.lumina.entity.Donation;

@Service
public interface DonationService {
    
    Donation addDonation(DonationAdditionRequest donationAdditionRequest);
    List<DonationViewDto> viewAllDonations();
    List<DonationViewDto> viewAllDonationByUserId(Long userId);
    DonationViewDto viewDonationById(Long donationId);
    Donation updateDonation(Long donationId, DonationUpdateRequest donationUpdateRequest);

    Long getTotalDonationsToday();
    Long getTotalDonations();

    Long getTotalBloodDonated();
    Long getTotalBloodDonatedToday();

    List<TopTenDonor> getTopTenDonor();

    List<MonthlyDonation> getMonthlyDonations();
    List<MonthlyDonation> getMonthlyDonationsCount();

    List<YearlyMonthlyDonation> getYearlyMonthlyDonations();

    List<DonationLabTestDto> viewAllDonationLabTest();
}
