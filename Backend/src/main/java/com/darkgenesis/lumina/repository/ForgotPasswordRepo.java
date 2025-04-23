package com.darkgenesis.lumina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darkgenesis.lumina.entity.ForgotPassword;

public interface ForgotPasswordRepo extends JpaRepository<ForgotPassword, Integer> {
    
    Optional<ForgotPassword> findByOtpAndEmail(Integer otp, String email);

    ForgotPassword findByEmail(String email);
}
