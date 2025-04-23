package com.darkgenesis.lumina.service.serviceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.Enum.UserStatus;
import com.darkgenesis.lumina.dto.UserUpdateRequest;
import com.darkgenesis.lumina.dto.UserViewDto;
import com.darkgenesis.lumina.entity.User;
import com.darkgenesis.lumina.exception.UserNotFoundException;
import com.darkgenesis.lumina.repository.UserRepo;
import com.darkgenesis.lumina.service.UserService;

@Service
public class UserServiceImpl implements UserService {
    
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserViewDto viewUserById(Long userId) {
        
        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        UserViewDto userViewDto = new UserViewDto();
        userViewDto.setUserId(user.getUserId());
        userViewDto.setUserFirstName(user.getUserFirstName());
        userViewDto.setUserLastName(user.getUserLastName());
        userViewDto.setUserNIC(user.getUserNIC());
        userViewDto.setUserEmail(user.getUserEmail());
        userViewDto.setUserAddressLine1(user.getUserAddressLine1());
        userViewDto.setUserAddressLine2(user.getUserAddressLine2());
        userViewDto.setUserAddressCity(user.getUserAddressCity());
        userViewDto.setUserAddressZipCode(user.getUserAddressZipCode());
        userViewDto.setUserMobile(user.getUserMobile());
        userViewDto.setUserDOB(user.getUserDOB());
        userViewDto.setUserBloodType(user.getUserBloodType());
        userViewDto.setUserRole(user.getUserRole());
        userViewDto.setUserGender(user.getUserGender());
        userViewDto.setLastDonationDate(user.getLastDonationDate());

        return userViewDto;
    }

    @Override
    public List<UserViewDto> viewUserByRole(Role userRole) {
        
        List<User> users = userRepo.findUsersByRole(userRole);

        List<UserViewDto> userList = users.stream().map(user ->{

            UserViewDto userViewDto = new UserViewDto();
            userViewDto.setUserId(user.getUserId());
            userViewDto.setUserFirstName(user.getUserFirstName());
            userViewDto.setUserLastName(user.getUserLastName());
            userViewDto.setUserNIC(user.getUserNIC());
            userViewDto.setUserEmail(user.getUserEmail());
            userViewDto.setUserAddressLine1(user.getUserAddressLine1());
            userViewDto.setUserAddressLine2(user.getUserAddressLine2());
            userViewDto.setUserAddressCity(user.getUserAddressCity());
            userViewDto.setUserAddressZipCode(user.getUserAddressZipCode());
            userViewDto.setUserMobile(user.getUserMobile());
            userViewDto.setUserDOB(user.getUserDOB());
            userViewDto.setUserBloodType(user.getUserBloodType());
            userViewDto.setUserRole(user.getUserRole());
            userViewDto.setUserGender(user.getUserGender());
            userViewDto.setLastDonationDate(user.getLastDonationDate());

            return userViewDto;
        }).collect(Collectors.toList());

        return userList;             
    }

    @Override
    public List<UserViewDto> universalSearch(String searchRequest) {
        
        Long userId = null;
        try {
            userId = Long.parseLong(searchRequest);
        } catch (NumberFormatException ignored) {
        }

        List<User> users = userRepo.findByUserIdOrUserNICOrUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrUserEmailContainingIgnoreCase(userId, searchRequest, searchRequest, searchRequest, searchRequest);

        List<UserViewDto> userList = users.stream().map(user ->{

            UserViewDto userViewDto = new UserViewDto();
            userViewDto.setUserId(user.getUserId());
            userViewDto.setUserFirstName(user.getUserFirstName());
            userViewDto.setUserLastName(user.getUserLastName());
            userViewDto.setUserNIC(user.getUserNIC());
            userViewDto.setUserEmail(user.getUserEmail());
            userViewDto.setUserAddressLine1(user.getUserAddressLine1());
            userViewDto.setUserAddressLine2(user.getUserAddressLine2());
            userViewDto.setUserAddressCity(user.getUserAddressCity());
            userViewDto.setUserAddressZipCode(user.getUserAddressZipCode());
            userViewDto.setUserMobile(user.getUserMobile());
            userViewDto.setUserDOB(user.getUserDOB());
            userViewDto.setUserBloodType(user.getUserBloodType());
            userViewDto.setUserRole(user.getUserRole());
            userViewDto.setUserGender(user.getUserGender());
            userViewDto.setLastDonationDate(user.getLastDonationDate());

            return userViewDto;
        }).collect(Collectors.toList());

        return userList;             
    }

    @Override
    public User updateUser(Long userId, UserUpdateRequest userUpdateRequest) {
        
        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        user.setUserFirstName(userUpdateRequest.getUserFirstName());
        user.setUserLastName(userUpdateRequest.getUserLastName());
        user.setUserNIC(userUpdateRequest.getUserNIC());
        user.setUserEmail(userUpdateRequest.getUserEmail());
        user.setUserAddressLine1(userUpdateRequest.getUserAddressLine1());
        user.setUserAddressLine2(userUpdateRequest.getUserAddressLine2());
        user.setUserAddressCity(userUpdateRequest.getUserAddressCity());
        user.setUserAddressZipCode(userUpdateRequest.getUserAddressZipCode());
        user.setUserMobile(userUpdateRequest.getUserMobile());
        user.setUserDOB(userUpdateRequest.getUserDOB());
        user.setUserBloodType(userUpdateRequest.getUserBloodType());
        user.setUserGender(userUpdateRequest.getUserGender());

        return userRepo.save(user); 
    }

    @Override
    public User updateUserPassword(Long userId, String Password){

        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        user.setUserPassword(passwordEncoder.encode(Password));

        return userRepo.save(user);
    }

    @Override
    public Long getTotalDonors() {
        return userRepo.countByUserRole(Role.DONOR);
    }

    @Override
    public UserViewDto viewUserByEmail(String userEmail) {
        User user = userRepo.findByUserEmail(userEmail);

        UserViewDto userViewDto = new UserViewDto();
        userViewDto.setUserId(user.getUserId());
        userViewDto.setUserFirstName(user.getUserFirstName());
        userViewDto.setUserLastName(user.getUserLastName());
        userViewDto.setUserNIC(user.getUserNIC());
        userViewDto.setUserEmail(user.getUserEmail());
        userViewDto.setUserAddressLine1(user.getUserAddressLine1());
        userViewDto.setUserAddressLine2(user.getUserAddressLine2());
        userViewDto.setUserAddressCity(user.getUserAddressCity());
        userViewDto.setUserAddressZipCode(user.getUserAddressZipCode());
        userViewDto.setUserMobile(user.getUserMobile());
        userViewDto.setUserDOB(user.getUserDOB());
        userViewDto.setUserBloodType(user.getUserBloodType());
        userViewDto.setUserRole(user.getUserRole());
        userViewDto.setUserGender(user.getUserGender());
        userViewDto.setLastDonationDate(user.getLastDonationDate());

        return userViewDto;
    }

    @Override
    public List<UserViewDto> viewUserExceptTwoRoles(Role userRole1, Role userRole2) {
        
        List<User> users = userRepo.findAllUsersExceptTwoRoles(userRole1, userRole2);

        List<UserViewDto> userList = users.stream().map(user ->{

            UserViewDto userViewDto = new UserViewDto();
            userViewDto.setUserId(user.getUserId());
            userViewDto.setUserFirstName(user.getUserFirstName());
            userViewDto.setUserLastName(user.getUserLastName());
            userViewDto.setUserNIC(user.getUserNIC());
            userViewDto.setUserEmail(user.getUserEmail());
            userViewDto.setUserAddressLine1(user.getUserAddressLine1());
            userViewDto.setUserAddressLine2(user.getUserAddressLine2());
            userViewDto.setUserAddressCity(user.getUserAddressCity());
            userViewDto.setUserAddressZipCode(user.getUserAddressZipCode());
            userViewDto.setUserMobile(user.getUserMobile());
            userViewDto.setUserDOB(user.getUserDOB());
            userViewDto.setUserBloodType(user.getUserBloodType());
            userViewDto.setUserRole(user.getUserRole());
            userViewDto.setUserGender(user.getUserGender());
            userViewDto.setLastDonationDate(user.getLastDonationDate());
            userViewDto.setUserStatus(user.getUserStatus());

            return userViewDto;
        }).collect(Collectors.toList());

        return userList;             
    }

    @Override
    public User addUserProfilePicture(Long userId, MultipartFile file) throws IOException {
        
        User user = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        user.setProfilePicture(file.getBytes());
        return userRepo.save(user);
    }

    @Override
    public Optional<User> viewUserProfilePicture(Long userId) {
        return userRepo.findById(userId);
    }

    @Override
    public User deleteUser(Long userId) {
        
        User existingUser = userRepo.findById(userId)
        .orElseThrow(()-> new UserNotFoundException("User not found with the userId: "+ userId));

        existingUser.setUserStatus(UserStatus.INACTIVE);
        return userRepo.save(existingUser);
    }
}
