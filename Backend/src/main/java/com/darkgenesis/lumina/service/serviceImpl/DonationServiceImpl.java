package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.Year;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.darkgenesis.lumina.Enum.DonationStatus;
import com.darkgenesis.lumina.dto.DonationAdditionRequest;
import com.darkgenesis.lumina.dto.DonationLabTestDto;
import com.darkgenesis.lumina.dto.DonationUpdateRequest;
import com.darkgenesis.lumina.dto.DonationViewDto;
import com.darkgenesis.lumina.dto.MonthlyDonation;
import com.darkgenesis.lumina.dto.TopTenDonor;
import com.darkgenesis.lumina.dto.YearlyMonthlyDonation;
import com.darkgenesis.lumina.entity.Appointment;
import com.darkgenesis.lumina.entity.BloodCamp;
import com.darkgenesis.lumina.entity.Donation;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.AppointmentNotFoundException;
import com.darkgenesis.lumina.exception.BloodCampNotFoundException;
import com.darkgenesis.lumina.exception.DonationNotFoundException;
import com.darkgenesis.lumina.exception.UserNotFoundException;
import com.darkgenesis.lumina.repository.AppointmentRepo;
import com.darkgenesis.lumina.repository.BloodCampRepo;
import com.darkgenesis.lumina.repository.DonationRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.DonationService;

@Service
public class DonationServiceImpl implements DonationService {
    
    @Autowired
    private DonationRepo donationRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AppointmentRepo appointmentRepo;

    @Autowired
    private BloodCampRepo bloodCampRepo;

    @Transactional
    @Override
    public Donation addDonation(DonationAdditionRequest donationAdditionRequest) {

        User user = userRepo.findById(donationAdditionRequest.getUserId())
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ donationAdditionRequest.getUserId()));

        user.setLastDonationDate(LocalDate.now());
        userRepo.save(user);

        Donation donation = new Donation();

        if(donationAdditionRequest.getAppointmentId() != null){
            Appointment appointment = appointmentRepo.findById(donationAdditionRequest.getAppointmentId())
            .orElseThrow(()-> new AppointmentNotFoundException("Appointment not found with the appointmentId: "+ donationAdditionRequest.getAppointmentId()));
            donation.setAppointment(appointment);
        }

        if(donationAdditionRequest.getBloodCampId() != null){
            BloodCamp bloodCamp = bloodCampRepo.findById(donationAdditionRequest.getBloodCampId())
            .orElseThrow(()-> new BloodCampNotFoundException("BloodCamp not found with the bloodCampId: "+ donationAdditionRequest.getBloodCampId()));
            donation.setBloodCamp(bloodCamp);
        }

        donation.setDonationCollectionDate(LocalDate.now());
        donation.setDonationAmount(donationAdditionRequest.getDonationAmount());
        donation.setUserBloodType(user.getUserBloodType());
        donation.setUser(user);
        donation.setDonationExpiryDate(LocalDate.now().plusDays(35));
        donation.setDonationStatus(DonationStatus.PENDING);
        donation.setDonationStartTime(donationAdditionRequest.getDonationStartTime());
        donation.setDonationEndTime(donationAdditionRequest.getDonationEndTime());

        return donationRepo.save(donation);

    }

    @Override
    public List<DonationViewDto> viewAllDonations() {
        
        List<Donation> donations = donationRepo.findAll();

        List<DonationViewDto> donationList = donations.stream().map(donation ->{

            DonationViewDto donationViewDto = new DonationViewDto();
            donationViewDto.setDonationId(donation.getDonationID());
            donationViewDto.setUserId(donation.getUser().getUserId());
            donationViewDto.setDonorName(donation.getUser().getUserFirstName());
            donationViewDto.setDonationCollectionDate(donation.getDonationCollectionDate());
            donationViewDto.setDonationStartTime(donation.getDonationStartTime());
            donationViewDto.setDonationEndTime(donation.getDonationEndTime());
            donationViewDto.setDonationAmount(donation.getDonationAmount());
            donationViewDto.setUserBloodType(donation.getUserBloodType());
            donationViewDto.setDonationStatus(donation.getDonationStatus());

            return donationViewDto;
        }).collect(Collectors.toList());

        return donationList;
    }

    @Override
    public DonationViewDto viewDonationById(Long donationId) {
        
        Donation donation = donationRepo.findById(donationId)
        .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ donationId));

        DonationViewDto donationViewDto = new DonationViewDto();
        donationViewDto.setUserId(donation.getUser().getUserId());
        donationViewDto.setDonationId(donation.getDonationID());
        donationViewDto.setDonorName(donation.getUser().getUserFirstName());
        donationViewDto.setDonationCollectionDate(donation.getDonationCollectionDate());
        donationViewDto.setDonationStartTime(donation.getDonationStartTime());
        donationViewDto.setDonationEndTime(donation.getDonationEndTime());
        donationViewDto.setDonationAmount(donation.getDonationAmount());
        donationViewDto.setUserBloodType(donation.getUserBloodType());
        donationViewDto.setDonationStatus(donation.getDonationStatus());

        return donationViewDto;     
    }

    @Override
    public Donation updateDonation(Long donationId, DonationUpdateRequest donationUpdateRequest) {
        
        Donation donation = donationRepo.findById(donationId)
        .orElseThrow(()-> new DonationNotFoundException("Donation not found with the donationId: "+ donationId));

        if(donation == null){
            return null;
        } else {
            donation.setDonationAmount(donationUpdateRequest.getDonationAmount());
            donation.setDonationStartTime(donationUpdateRequest.getDonationStartTime());
            donation.setDonationEndTime(donationUpdateRequest.getDonationEndTime());
        }
        
        return donationRepo.save(donation);
    }

    @Override
    public List<DonationViewDto> viewAllDonationByUserId(Long userId) {

        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));
                
        List<Donation> donations = donationRepo.findDonationByUser(user);

        List<DonationViewDto> donationList = donations.stream().map(donation ->{

            DonationViewDto donationViewDto = new DonationViewDto();
            donationViewDto.setUserId(donation.getUser().getUserId());
            donationViewDto.setDonationId(donation.getDonationID());
            donationViewDto.setDonorName(donation.getUser().getUserFirstName());
            donationViewDto.setDonationCollectionDate(donation.getDonationCollectionDate());
            donationViewDto.setDonationStartTime(donation.getDonationStartTime());
            donationViewDto.setDonationEndTime(donation.getDonationEndTime());
            donationViewDto.setDonationAmount(donation.getDonationAmount());
            donationViewDto.setUserBloodType(donation.getUserBloodType());
            donationViewDto.setDonationStatus(donation.getDonationStatus());

            return donationViewDto;
        }).collect(Collectors.toList());

        return donationList;
    }

    @Override
    public Long getTotalDonationsToday() {
        return donationRepo.countDonationsToday();
    }

    @Override
    public Long getTotalDonations() {
        return donationRepo.count();
    }

    @Override
    public Long getTotalBloodDonated() {
        return donationRepo.getTotalBloodAmount();
    }

    @Override
    public Long getTotalBloodDonatedToday() {
        return donationRepo.getTotalBloodAmountToday(LocalDate.now()); 
    }

    @Override
    public List<TopTenDonor> getTopTenDonor(){

        List<TopTenDonor> topTenDonors = donationRepo.findTopTenDonors();
        return topTenDonors.stream().limit(5).toList();
    }

    @Override
    public List<MonthlyDonation> getMonthlyDonations() {
        
        return donationRepo.getTotalBloodAmountByMonth(LocalDate.now().getYear());

    }

    @Override
    public List<MonthlyDonation> getMonthlyDonationsCount() {

        return donationRepo.getMonthlyDonationCount(LocalDate.now().getYear());
    }

    @Override
    public List<YearlyMonthlyDonation> getYearlyMonthlyDonations() {

        int currentYear = Year.now().getValue();
        int startYear = currentYear - 3;

        return donationRepo.getTotalBloodAmountByMonthRange(startYear, currentYear);
    }

    @Override
    public List<DonationLabTestDto> viewAllDonationLabTest() {
        List<Donation> donations = donationRepo.findAll();

        List<DonationLabTestDto> donationLabList = donations.stream().map(donation ->{

            DonationLabTestDto donationLabTestDto = new DonationLabTestDto();

            donationLabTestDto.setLabStatus(donation.getLabStatus());
            donationLabTestDto.setDonationId(donation.getDonationID());
            donationLabTestDto.setUserId(donation.getUser().getUserId());
            donationLabTestDto.setDonorName(donation.getUser().getUserFirstName());
            donationLabTestDto.setDonationCollectionDate(donation.getDonationCollectionDate());
            donationLabTestDto.setDonationStartTime(donation.getDonationStartTime());
            donationLabTestDto.setDonationEndTime(donation.getDonationEndTime());
            donationLabTestDto.setDonationAmount(donation.getDonationAmount());
            donationLabTestDto.setUserBloodType(donation.getUserBloodType());
            donationLabTestDto.setDonationStatus(donation.getDonationStatus());

            return donationLabTestDto;
        }).collect(Collectors.toList());

        return donationLabList;
    }
}
