package com.darkgenesis.lumina.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.dto.UserUpdateRequest;
import com.darkgenesis.lumina.dto.UserViewDto;
import com.darkgenesis.lumina.service.UserService;
import com.darkgenesis.lumina.utils.LogActivity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/lumina/user")
@CrossOrigin("*")
public class UserController {
    
    @Autowired
    private UserService userService;

    @LogActivity
    @GetMapping("/{userId}")
    public ResponseEntity<UserViewDto> viewUserById(@PathVariable Long userId){

        UserViewDto user = userService.viewUserById(userId);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @LogActivity
    @GetMapping("/role/{userRole}")
    public ResponseEntity<List<UserViewDto>> viewUserById(@PathVariable Role userRole){

        List<UserViewDto> users = userService.viewUserByRole(userRole);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @LogActivity
    @GetMapping("/employees/{userRole1}/{userRole2}")
    public ResponseEntity<List<UserViewDto>> viewUserById(@PathVariable Role userRole1, @PathVariable Role userRole2){

        List<UserViewDto> users = userService.viewUserExceptTwoRoles(userRole1, userRole2);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }

    @LogActivity
    @GetMapping("/universal-search")
    public ResponseEntity<List<UserViewDto>> universalSearch(@RequestParam String searchRequest){

        List<UserViewDto> userList = userService.universalSearch(searchRequest);
        return ResponseEntity.status(HttpStatus.OK).body(userList);
    }

    @LogActivity
    @GetMapping("/email")
    public ResponseEntity<UserViewDto> viewUserByEmail(@RequestParam String userEmail){

        UserViewDto user = userService.viewUserByEmail(userEmail);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @LogActivity
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody UserUpdateRequest userUpdateRequest){

        userService.updateUser(userId, userUpdateRequest);
        return ResponseEntity.status(HttpStatus.OK).body("User details successfully updated!");
    }

    @LogActivity
    @PutMapping("/password/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody String password){

        userService.updateUserPassword(userId, password);
        return ResponseEntity.status(HttpStatus.OK).body("User Password successfully updated!");
    } 
    
    @LogActivity
    @GetMapping("/getTotalDonors")
    public ResponseEntity<Long> getTotalDonors(){
        Long totalDonors = userService.getTotalDonors();
        return ResponseEntity.ok(totalDonors);
    }
  
    @LogActivity
    @PutMapping("/updateProfilePicture/{userId}")
    public ResponseEntity<String> addUserProfilePicture(@PathVariable Long userId, @RequestParam MultipartFile file) {

        try {
            userService.addUserProfilePicture(userId, file);
            return ResponseEntity.status(HttpStatus.OK).body("Profile picture uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }

    @LogActivity
    @GetMapping("viewProfilePicture/{userId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable Long userId) {
        return userService.viewUserProfilePicture(userId)
                .map(user -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                        .body(user.getProfilePicture()))
                .orElse(ResponseEntity.notFound().build());
    }

    @LogActivity
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully Deleted User");
    }
}
