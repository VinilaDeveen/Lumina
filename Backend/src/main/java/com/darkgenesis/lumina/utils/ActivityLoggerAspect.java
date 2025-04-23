package com.darkgenesis.lumina.utils;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.darkgenesis.lumina.service.ActivityLogService;

@Aspect
@Component
public class ActivityLoggerAspect {
    

    private final ActivityLogService logService;

    public ActivityLoggerAspect(ActivityLogService logService) {
        this.logService = logService;
    }

    @Before("execution(* com.darkgenesis.lumina..*(..)) && @annotation(com.darkgenesis.lumina.utils.LogActivity)")
    public void logAction(JoinPoint joinPoint) {
        String action = joinPoint.getSignature().getName();
        String performedBy = getCurrentUser();
        logService.logActivity(action, performedBy);
    }

    @Before("execution(* com.darkgenesis.lumina.controller.AuthController.login(..))")
    public void logPreAuthentication(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        if (args.length > 0 && args[0] instanceof LoginRequest) {
            LoginRequest loginRequest = (LoginRequest) args[0];
            String email = loginRequest.getEmail();
            logService.logActivity("login", email);
        } else {
            logService.logActivity("login", "Anonymous User");
        }
    }

    @Before("execution(* com.darkgenesis.lumina.controller.AuthController.register(..))")
    public void logRegistration(JoinPoint joinPoint) {
     Object[] args = joinPoint.getArgs();
        if (args.length > 0 && args[0] instanceof RegisterRequest) {
            RegisterRequest registerRequest = (RegisterRequest) args[0];
            String email = registerRequest.getUserEmail();
            logService.logActivity("registration", email);
        } else {
            logService.logActivity("registration", "Anonymous User");
        }
    }

    private String getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                return ((UserDetails) principal).getUsername();
            } else {
                return principal.toString();
            }
        }
        return "Anonymous ";
    }
}
