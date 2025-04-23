package com.darkgenesis.lumina.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.EligibilityTest;

@Repository
public interface EligibilityTestRepo extends JpaRepository<EligibilityTest, Long> {
}
