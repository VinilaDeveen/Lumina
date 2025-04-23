package com.darkgenesis.lumina.dto;

import lombok.Data;

@Data
public class FeedbackAdditionRequest {
    
    private String feedbackEmail;
    private Integer rating;
    private String comment;
}
