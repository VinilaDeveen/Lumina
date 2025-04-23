package com.darkgenesis.lumina.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.darkgenesis.lumina.entity.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    
    Optional<RefreshToken> findByRefreshToken(String refreshToken);

}
