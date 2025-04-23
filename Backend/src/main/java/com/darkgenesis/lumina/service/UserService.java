package com.darkgenesis.lumina.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.dto.UserUpdateRequest;
import com.darkgenesis.lumina.dto.UserViewDto;
import com.darkgenesis.lumina.entity.User;

@Service
public interface UserService {
    
    UserViewDto viewUserById(Long userId);
    List<UserViewDto> viewUserByRole(Role userRole);
    List<UserViewDto> viewUserExceptTwoRoles(Role userRole1, Role userRole2);
    List<UserViewDto> universalSearch(String searchRequest);
    User updateUser(Long userId, UserUpdateRequest userUpdateRequest);
    User updateUserPassword(Long userId, String Password);
    UserViewDto viewUserByEmail (String userEmail);

    Long getTotalDonors();

    User addUserProfilePicture(Long userId, MultipartFile file) throws IOException;
    Optional<User> viewUserProfilePicture(Long userId);

    User deleteUser(Long userId);
}
