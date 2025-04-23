package com.darkgenesis.lumina.service.serviceImpl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darkgenesis.lumina.Enum.FeedbackStatus;
import com.darkgenesis.lumina.dto.FeedbackAdditionRequest;
import com.darkgenesis.lumina.dto.FeedbackViewDto;
import com.darkgenesis.lumina.entity.Feedback;
import com.darkgenesis.lumina.exception.FeedbackNotFoundException;
import com.darkgenesis.lumina.repository.FeedbackRepo;
import com.darkgenesis.lumina.service.FeedbackService;

@Service
public class FeedBackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Override
    public Feedback addFeedBack(FeedbackAdditionRequest feedbackAdditionRequest) {
        
        Feedback feedback = new Feedback();
        feedback.setFeedbackEmail(feedbackAdditionRequest.getFeedbackEmail());
        feedback.setFeedbackDate(LocalDate.now());
        feedback.setFeedbackTime(LocalTime.now());
        feedback.setRating(feedbackAdditionRequest.getRating());
        feedback.setComment(feedbackAdditionRequest.getComment());
        
        return feedbackRepo.save(feedback);

    }

    @Override
    public List<FeedbackViewDto> viewAllFeedback() {
        
        List<Feedback> feedbacks = feedbackRepo.findAll();

        List<FeedbackViewDto> feedbackList = feedbacks.stream().map(feedback ->{

            FeedbackViewDto feedbackViewDto = new FeedbackViewDto();

            feedbackViewDto.setFeedbackId(feedback.getFeedbackId());
            feedbackViewDto.setFeedbackEmail(feedback.getFeedbackEmail());
            feedbackViewDto.setComment(feedback.getComment());
            feedbackViewDto.setRating(feedback.getRating());
            feedbackViewDto.setFeedbackStatus(feedback.getFeedbackStatus());

            return feedbackViewDto;
        }).collect(Collectors.toList());

        return feedbackList;
    }

    @Override
    public Feedback deleteFeedBack(Long feedbackId) {
        
        Feedback existingFeedback = feedbackRepo.findById(feedbackId)
        .orElseThrow(()-> new FeedbackNotFoundException("Feedback not found with the feedbackId: "+ feedbackId));

        existingFeedback.setFeedbackStatus(FeedbackStatus.DELETED);
        return feedbackRepo.save(existingFeedback);
    }
    
}
