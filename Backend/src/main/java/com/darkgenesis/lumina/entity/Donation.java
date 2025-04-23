package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.DonationStatus;
import com.darkgenesis.lumina.Enum.LabStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class Donation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long donationID;

    private LocalDate donationExpiryDate;
    private LocalDate donationCollectionDate;
    private Long donationAmount;
    private LocalTime donationStartTime;
    private LocalTime donationEndTime;

    @Enumerated(EnumType.STRING)
    private BloodType userBloodType;

    @Enumerated(EnumType.STRING)
    private DonationStatus donationStatus;

    @Enumerated(EnumType.STRING)
    private LabStatus labStatus;

    @PrePersist
    protected void onCreate(){
        if(this.labStatus == null){
            this.labStatus = LabStatus.PENDING;
        }
    }

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToOne(mappedBy = "donation")
    private LabTest labTest;

    @ManyToOne
    @JoinColumn(name = "bloodCampId")
    private BloodCamp bloodCamp;

    @OneToOne
    @JoinColumn(name = "appointmentId")
    private Appointment appointment;
}
