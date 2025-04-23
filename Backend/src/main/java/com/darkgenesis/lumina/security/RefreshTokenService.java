package com.darkgenesis.lumina.security;

import java.time.Instant;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.entity.RefreshToken;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.repository.RefreshTokenRepository;
import com.darkgenesis.lumina.repository.UserRepo;

@Service
public class RefreshTokenService {

    private final UserRepo userRepo;

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenService(UserRepo userRepo, RefreshTokenRepository refreshTokenRepository) {
        this.userRepo = userRepo;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(String username) {

        long refreshTokenValidity = 8 * 60 * 60 * 1000;

        User user = userRepo.findByUserEmail(username);

        RefreshToken existingRefreshToken = user.getRefreshToken();

        if (existingRefreshToken != null) {

            existingRefreshToken.setRefreshToken(UUID.randomUUID().toString());
            existingRefreshToken.setExpirationTime(Instant.now().plusMillis(refreshTokenValidity));
            return refreshTokenRepository.save(existingRefreshToken);
        }

        RefreshToken refreshToken = RefreshToken.builder()
        .refreshToken(UUID.randomUUID().toString())
        .expirationTime(Instant.now().plusMillis(refreshTokenValidity))
        .user(userRepo.findByUserEmail(username))
        .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyRefreshToken(String refreshToken) {
        RefreshToken refToken = refreshTokenRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new RuntimeException("Refresh token not found!"));

        if (refToken.getExpirationTime().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(refToken);
            throw new RuntimeException("Refresh Token expired");
        }

        return refToken;
    }
}
