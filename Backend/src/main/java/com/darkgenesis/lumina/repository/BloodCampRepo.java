package com.darkgenesis.lumina.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.entity.BloodCamp;
import com.darkgenesis.lumina.entity.User;

@Repository
public interface BloodCampRepo extends JpaRepository<BloodCamp, Long>{

    List<BloodCamp> findByUser(User user);
}