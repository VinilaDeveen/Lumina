package com.darkgenesis.lumina.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<String> handleDataIntegrityViolationException (DataIntegrityViolationException dataIntegrityViolationException){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Data integrity error occured: " + dataIntegrityViolationException.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid argument: " + ex.getMessage());
    }

    @ExceptionHandler(value = UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException (UserNotFoundException userNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: " + userNotFoundException.getMessage());
    }
    
    @ExceptionHandler(value = DonorNotFoundException.class)
    public ResponseEntity<String> handleDonorNotFoundException (DonorNotFoundException donorNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: " + donorNotFoundException.getMessage());
    }  
    
    @ExceptionHandler(value = DonorNotEligibleException.class)
    public ResponseEntity<String> handleDonorNotEligibleException (DonorNotEligibleException donorNotEligibleException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An unexpected error occured: " + donorNotEligibleException.getMessage());
    }   

    @ExceptionHandler(value = BedsNotAvailableException.class)
    public ResponseEntity<String> handlerBedsNotAvailableException (BedsNotAvailableException bedsNotAvailableException) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("An unexpected error occured: " + bedsNotAvailableException.getMessage());
    } 

    @ExceptionHandler(value = AppointmentNotFoundException.class)
    public ResponseEntity<String> handlerAppointmentNotFoundException (AppointmentNotFoundException appointmentNotFoundException) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: " + appointmentNotFoundException.getMessage());
    } 

    @ExceptionHandler(BloodCampNotFoundException.class)
    public ResponseEntity<String> handleBloodCampNotFoundExceptionHandler(BloodCampNotFoundException bloodCampNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ bloodCampNotFoundException.getMessage());
    }

    @ExceptionHandler(DonationNotFoundException.class)
    public ResponseEntity<String> handleDonationNotFoundExceptionHandler(DonationNotFoundException donationNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ donationNotFoundException.getMessage());
    }

    @ExceptionHandler(LabTestNotFoundException.class)
    public ResponseEntity<String> handleLabTestNotFoundExceptionHandler(LabTestNotFoundException labTestNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ labTestNotFoundException.getMessage());
    }

    @ExceptionHandler(HospitalNotFoundException.class)
    public ResponseEntity<String> handleHospitalNotFoundException(HospitalNotFoundException hospitalNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ hospitalNotFoundException.getMessage());
    }

    @ExceptionHandler(FeedbackNotFoundException.class)
    public ResponseEntity<String> handleFeedbackNotFoundException(FeedbackNotFoundException feedbackNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ feedbackNotFoundException.getMessage());
    }

    @ExceptionHandler(value = BloodRequestNotFoundException.class)
    public ResponseEntity<String> handleBloodRequestNotFoundException(BloodRequestNotFoundException bloodRequestNotFoundException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ bloodRequestNotFoundException.getMessage());
    }

    @ExceptionHandler(value = InvalidOtpException.class)
    public ResponseEntity<String> handleInvalidOtpException(InvalidOtpException invalidOtpException){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("An unexpected error occured: "+ invalidOtpException.getMessage());
    }

}
