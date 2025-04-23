package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class EligibilityTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long eligibilityTestId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    private Boolean question1;
    private Boolean question2;
    private Boolean question3;
    private Boolean question4;
    private Boolean question5;
    private Boolean question6;
    private Boolean question7;


    private Boolean result;

    private LocalDate testDate;

    private LocalTime testTime;

}
