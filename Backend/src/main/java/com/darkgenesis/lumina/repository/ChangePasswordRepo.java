package com.darkgenesis.lumina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darkgenesis.lumina.entity.ChangePassword;

public interface ChangePasswordRepo extends JpaRepository<ChangePassword, Integer>{
    
    Optional<ChangePassword> findByOtpAndEmail(Integer otp, String email);

    ChangePassword findByEmail(String email);
}
