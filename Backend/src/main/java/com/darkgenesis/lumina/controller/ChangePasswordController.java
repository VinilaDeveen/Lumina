package com.darkgenesis.lumina.controller;

import java.time.Instant;
import java.util.Date;
import java.util.Objects;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.NewPassword;
import com.darkgenesis.lumina.dto.MailBody;
import com.darkgenesis.lumina.entity.ChangePassword;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.InvalidOtpException;
import com.darkgenesis.lumina.repository.ChangePasswordRepo;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.EmailService;

@RestController
@RequestMapping("/changePassword")
public class ChangePasswordController {
    
    private final UserRepo userRepo;
    private final EmailService emailService;

    private final ChangePasswordRepo changePasswordRepo;

    private final PasswordEncoder passwordEncoder;

    public ChangePasswordController(UserRepo userRepo, EmailService emailService, ChangePasswordRepo changePasswordRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.emailService = emailService;
        this.changePasswordRepo = changePasswordRepo;
        this.passwordEncoder = passwordEncoder;
    }


    @PostMapping("/sendOtp/{email}")
    public ResponseEntity<String> verifyEmail(@PathVariable String email) {

        ChangePassword changePassword = changePasswordRepo.findByEmail(email);
        if(changePassword != null){
            changePasswordRepo.deleteById(changePassword.getCpid());
        }

        User user = userRepo.findByUserEmail(email);

        if(user != null){
            int otp = otpGenerator();
            MailBody mailBody = MailBody.builder()
                    .to(email)
                    .text(                
                        "Dear " + user.getUserFirstName() + ",\n\n" +
                        "We received a request to change your password. Please use the One-Time Password (OTP) provided below to proceed:\n\n" +
                        "🔒 *Your OTP:* " + otp + "\n\n" +
                        "For your security, this OTP is valid for a limited time. If you did not request a password change, please ignore this email.\n\n" +
                        "Best regards,\n" +
                        "The Lumina Support Team\n\n" +
                        "---\n" +
                        "This is an automated message. Please do not reply directly to this email.")
                    .subject("OTP for Change Password request")
                    .build();
    
            ChangePassword cp = ChangePassword.builder()
                    .otp(otp)
                    .expirationTime(new Date(System.currentTimeMillis() + 3 * 60 * 1000))
                    .email(email)
                    .build();
    
            emailService.sendSimpleMessage(mailBody);
            changePasswordRepo.save(cp);
        }

        return ResponseEntity.ok("Email sent for verification!");
    }

    @PostMapping("/verifyOtp/{otp}/{email}")
    public ResponseEntity<String> verifyOtp(@PathVariable Integer otp, @PathVariable String email) {
        User user = userRepo.findByUserEmail(email);
        if(user != null){
            ChangePassword cp = changePasswordRepo.findByOtpAndEmail(otp, email)
                .orElseThrow(() -> new InvalidOtpException("Invalid OTP for email: " + email));

        if (cp.getExpirationTime().before(Date.from(Instant.now()))) {
            changePasswordRepo.deleteById(cp.getCpid());
            return new ResponseEntity<>("OTP has expired!", HttpStatus.EXPECTATION_FAILED);
        }
        }        

        return ResponseEntity.ok("OTP verified!");
    }

    @PostMapping("/changePassword/{email}")
    public ResponseEntity<String> changePasswordHandler(@RequestBody NewPassword changePassword,
                                                        @PathVariable String email) {
        if (!Objects.equals(changePassword.password(), changePassword.repeatPassword())) {
            return new ResponseEntity<>("Please enter the password again!", HttpStatus.EXPECTATION_FAILED);
        }

        String encodedPassword = passwordEncoder.encode(changePassword.password());
        userRepo.updatePassword(email, encodedPassword);

        return ResponseEntity.ok("Password has been changed!");
    }

    private Integer otpGenerator() {
        Random random = new Random();
        return random.nextInt(100_000, 999_999);
    }
}