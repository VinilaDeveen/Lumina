package com.darkgenesis.lumina.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.Enum.UserStatus;
import com.darkgenesis.lumina.dto.MailBody;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.security.JwtService;
import com.darkgenesis.lumina.security.RefreshTokenService;
import com.darkgenesis.lumina.utils.AuthResponse;
import com.darkgenesis.lumina.utils.LoginRequest;
import com.darkgenesis.lumina.utils.RegisterRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    

    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public User register(RegisterRequest registerRequest) {

        if (registerRequest == null) {
                throw new IllegalArgumentException("User register request cannot be null");
        }
    
        User existingUser = userRepo.findByUserEmailOrUserNIC(registerRequest.getUserEmail(), registerRequest.getUserNIC());
        if(existingUser != null && UserStatus.ACTIVE.equals(existingUser.getUserStatus())){
                throw new IllegalArgumentException("User already exists");
        }else if(existingUser != null && UserStatus.INACTIVE.equals(existingUser.getUserStatus())){

                existingUser.setUserFirstName(registerRequest.getUserFirstName());
                existingUser.setUserLastName(registerRequest.getUserLastName());
                existingUser.setUserPassword(passwordEncoder.encode(registerRequest.getUserPassword()));
                existingUser.setUserAddressLine1(registerRequest.getUserAddressLine1());
                existingUser.setUserAddressLine2(registerRequest.getUserAddressLine2());
                existingUser.setUserAddressCity(registerRequest.getUserAddressCity());
                existingUser.setUserAddressZipCode(registerRequest.getUserAddressZipCode());
                existingUser.setUserMobile(registerRequest.getUserMobile());
                existingUser.setUserDOB(registerRequest.getUserDOB());
                existingUser.setUserRole(registerRequest.getUserRole() != null ? registerRequest.getUserRole() : Role.DONOR);
                existingUser.setUserStatus(UserStatus.ACTIVE);
                
                if(registerRequest.getLastDonationDate() != null){
                        existingUser.setLastDonationDate(registerRequest.getLastDonationDate());
                }
                User activatedUser = userRepo.save(existingUser);

                MailBody mailBody = MailBody.builder()
                    .to(existingUser.getUserEmail())
                    .text(                
                        "Dear " + existingUser.getUserFirstName() + ",\n\n" +
                        "Welcome to Lumina!\n\n" +
                        "Your account has been successfully created, and you can now access all our features and services.\n\n" +
                        "Here are your account details:\n" +
                        "🔑 Username: " + existingUser.getUsername() + "\n" +
                        "To get started, log in to your account\n" +
                        "If you have any questions or need support, please feel free to contact our team\n\n" +
                        "Best regards,\n" +
                        "The Lumina Support Team\n\n" +
                        "---\n" +
                        "This is an automated message. Please do not reply directly to this email."
                        )
                    .subject("User account successfully created! 👏")
                    .build();

                    emailService.sendSimpleMessage(mailBody);

        return activatedUser;

        }else{
                var user = User.builder()
                        .userFirstName(registerRequest.getUserFirstName())
                        .userLastName(registerRequest.getUserLastName())
                        .userNIC(registerRequest.getUserNIC())
                        .userEmail(registerRequest.getUserEmail())
                        .userPassword(passwordEncoder.encode(registerRequest.getUserPassword()))
                        .userAddressLine1(registerRequest.getUserAddressLine1())
                        .userAddressLine2(registerRequest.getUserAddressLine2())
                        .userAddressCity(registerRequest.getUserAddressCity())
                        .userAddressZipCode(registerRequest.getUserAddressZipCode())
                        .userMobile(registerRequest.getUserMobile())
                        .userDOB(registerRequest.getUserDOB())
                        .userGender(registerRequest.getUserGender())
                        .userBloodType(registerRequest.getUserBloodType())
                        .lastDonationDate(registerRequest.getLastDonationDate())
                        .userRole(registerRequest.getUserRole() != null ? registerRequest.getUserRole() : Role.DONOR)
                        .build();

                User savedUser = userRepo.save(user);
        

                MailBody mailBody = MailBody.builder()
                    .to(user.getUserEmail())
                    .text(                
                        "Dear " + user.getUserFirstName() + ",\n\n" +
                        "Welcome to Lumina!\n\n" +
                        "Your account has been successfully created, and you can now access all our features and services.\n\n" +
                        "Here are your account details:\n" +
                        "🔑 Username: " + user.getUsername() + "\n" +
                        "To get started, log in to your account\n" +
                        "If you have any questions or need support, please feel free to contact our team\n\n" +
                        "Best regards,\n" +
                        "The Lumina Support Team\n\n" +
                        "---\n" +
                        "This is an automated message. Please do not reply directly to this email."
                        )
                    .subject("User account successfully created! 👏")
                    .build();

                    emailService.sendSimpleMessage(mailBody);

        return savedUser;
        }
    }

    public AuthResponse login(LoginRequest loginRequest) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                        )
        );

        var user = userRepo.findByUserEmail(loginRequest.getEmail());
        var accessToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(loginRequest.getEmail());

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }
}
