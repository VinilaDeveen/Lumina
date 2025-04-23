package com.darkgenesis.lumina.utils;

import java.time.LocalDate;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.Gender;
import com.darkgenesis.lumina.Enum.Role;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterRequest {
    private String userFirstName;
    private String userLastName;
    private String userNIC;
    private String userEmail;
    private String userPassword;

    @Column(nullable = true)
    private String userAddressLine1;
    @Column(nullable = true)
    private String userAddressLine2;
    @Column(nullable = true)
    private String userAddressCity;
    @Column(nullable = true)
    private String userAddressZipCode;

    @Column(nullable = true)
    private String userMobile;
    @Column(nullable = true)
    private LocalDate userDOB;

    @JsonDeserialize(using = GenderDeserializer.class)
    private Gender userGender;

    @JsonDeserialize(using = BloodTypeDeserializer.class)
    private BloodType userBloodType;

    @JsonDeserialize(using = RoleDeserializer.class)
    private Role userRole;

    @Column(nullable = true)
    private LocalDate lastDonationDate;
}
