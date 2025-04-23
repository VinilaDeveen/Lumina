package com.darkgenesis.lumina.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.darkgenesis.lumina.Enum.FeedbackStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Entity
@Data
public class Feedback {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    private LocalDate feedbackDate;
    private LocalTime feedbackTime;

    private Integer rating;
    private String comment;

 
    private String feedbackEmail;

    @Enumerated(EnumType.STRING)
    private FeedbackStatus feedbackStatus;

    @PrePersist
    protected void onCreate(){
        if(this.feedbackStatus == null){
            this.feedbackStatus = FeedbackStatus.ACCEPTABLE;
        }
    }

}