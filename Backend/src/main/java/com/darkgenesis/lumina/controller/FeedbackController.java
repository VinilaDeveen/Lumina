package com.darkgenesis.lumina.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.darkgenesis.lumina.dto.FeedbackAdditionRequest;
import com.darkgenesis.lumina.dto.FeedbackViewDto;
import com.darkgenesis.lumina.service.FeedbackService;

@RestController
@RequestMapping("/api/lumina/feedback")
@CrossOrigin("*")
public class FeedbackController {
    
    @Autowired
    private FeedbackService feedbackService;

    @PostMapping
    public ResponseEntity<String> addFeedback(@RequestBody FeedbackAdditionRequest feedbackAdditionRequest){

        feedbackService.addFeedBack(feedbackAdditionRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("Feedback successfully added!");
    }

    @GetMapping
    public ResponseEntity<List<FeedbackViewDto>> viewAllFeedback(){

        List<FeedbackViewDto> feedbackList = feedbackService.viewAllFeedback();
        return ResponseEntity.status(HttpStatus.OK).body(feedbackList);
    }

    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long feedbackId){
        feedbackService.deleteFeedBack(feedbackId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted Feedback");
    }
}
