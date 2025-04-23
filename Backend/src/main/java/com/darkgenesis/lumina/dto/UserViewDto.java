package com.darkgenesis.lumina.dto;

import java.time.LocalDate;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.Gender;
import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.Enum.UserStatus;

import lombok.Data;

@Data
public class UserViewDto {
    
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String userNIC;
    private String userEmail;

    private String userAddressLine1;
    private String userAddressLine2;
    private String userAddressCity;
    private String userAddressZipCode;

    private String userMobile;
    private LocalDate userDOB;
    private Gender userGender;
    private BloodType userBloodType;
    private Role userRole;
    private UserStatus userStatus;

    private LocalDate lastDonationDate;
}
