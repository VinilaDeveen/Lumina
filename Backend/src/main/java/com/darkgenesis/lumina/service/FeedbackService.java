package com.darkgenesis.lumina.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.dto.FeedbackAdditionRequest;
import com.darkgenesis.lumina.dto.FeedbackViewDto;
import com.darkgenesis.lumina.entity.Feedback;

@Service
public interface FeedbackService {
    
    Feedback addFeedBack(FeedbackAdditionRequest feedbackAdditionRequest);
    List<FeedbackViewDto> viewAllFeedback();

    Feedback deleteFeedBack(Long feedbackId);
}
