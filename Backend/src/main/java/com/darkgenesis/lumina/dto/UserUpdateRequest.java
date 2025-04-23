package com.darkgenesis.lumina.dto;

import java.time.LocalDate;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.Gender;
import com.darkgenesis.lumina.utils.BloodTypeDeserializer;
import com.darkgenesis.lumina.utils.GenderDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import lombok.Data;

@Data
public class UserUpdateRequest {
    
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

    @JsonDeserialize(using = GenderDeserializer.class)
    private Gender userGender;

    @JsonDeserialize(using = BloodTypeDeserializer.class)
    private BloodType userBloodType;
}
