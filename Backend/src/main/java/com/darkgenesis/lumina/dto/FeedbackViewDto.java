package com.darkgenesis.lumina.dto;

import lombok.Data;

import com.darkgenesis.lumina.Enum.FeedbackStatus;

@Data
public class FeedbackViewDto {
    
    private Long feedbackId;
    private String feedbackEmail;
    private Integer rating;
    private String comment;
    private FeedbackStatus feedbackStatus;
}
