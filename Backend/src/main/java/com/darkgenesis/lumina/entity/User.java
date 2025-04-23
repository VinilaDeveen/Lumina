package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.darkgenesis.lumina.Enum.BloodType;
import com.darkgenesis.lumina.Enum.Gender;
import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.Enum.UserStatus;
import com.darkgenesis.lumina.utils.EncryptDecryptConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @NotBlank(message ="First Name Cannot be Blank")
    @Convert(converter = EncryptDecryptConverter.class)
    private String userFirstName;

    @NotBlank(message ="Last Name Cannot be Blank")
    @Convert(converter = EncryptDecryptConverter.class)
    private String userLastName;

    @NotBlank(message ="NIC Cannot be Blank")
    @Column(unique = true)
    @Size(min = 10, max = 12, message = "NIC must be between 10 and 12 characters long")
    private String userNIC;

    @NotBlank(message ="Email Cannot be Blank")
    @Column(unique = true)
    @Email(message = "Enter Valid Email")
    private String userEmail;
 
    @NotBlank(message ="Password Cannot be Blank")
    @Size(min = 8, message = "Password must have at least 8 characters")
    private String userPassword;

    @Convert(converter = EncryptDecryptConverter.class)
    private String userAddressLine1;

    @Convert(converter = EncryptDecryptConverter.class)
    private String userAddressLine2;

    @Convert(converter = EncryptDecryptConverter.class)
    private String userAddressCity;

    @Convert(converter = EncryptDecryptConverter.class)
    private String userAddressZipCode;

    @Size(min = 10, message = "Password must have at least 10 characters")
    @Convert(converter = EncryptDecryptConverter.class)
    private String userMobile;

    @NotNull(message ="DOB Cannot be Blank")
    @Past(message = "Date of birth must be in the past")
    private LocalDate userDOB;

    @Enumerated(EnumType.STRING)
    private Gender userGender;

    @Enumerated(EnumType.STRING)
    private BloodType userBloodType;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private RefreshToken refreshToken;

    @Enumerated(EnumType.STRING)
    private Role userRole;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @OneToMany(mappedBy = "user")
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "user")
    private List<EligibilityTest> eligibilityTests;

    @OneToMany(mappedBy = "user")
    private List<Donation> donations;

    @OneToMany(mappedBy = "user")
    private List<BloodCamp> bloodCamps;

    private LocalDate lastDonationDate;

    @Lob
    private byte[] profilePicture;

    @Enumerated(EnumType.STRING)
    private UserStatus userStatus;

    @PrePersist
    protected void onCreate(){
        if(this.userStatus == null){
            this.userStatus = UserStatus.ACTIVE;
        }
    }
}
