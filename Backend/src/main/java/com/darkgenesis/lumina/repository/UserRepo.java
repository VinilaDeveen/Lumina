package com.darkgenesis.lumina.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.darkgenesis.lumina.Enum.Role;
import com.darkgenesis.lumina.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.userRole = 'DONOR' AND " +
    "(CAST(u.userId AS string) = :userId OR " +
    "u.userNIC = :userNIC OR " +
    "LOWER(u.userFirstName) LIKE LOWER(CONCAT('%', :userFirstName, '%')) OR " +
    "LOWER(u.userLastName) LIKE LOWER(CONCAT('%', :userLastName, '%')) OR " +
    "LOWER(u.userEmail) LIKE LOWER(CONCAT('%', :userEmail, '%')))")
    List<User> findByUserIdOrUserNICOrUserFirstNameContainingIgnoreCaseOrUserLastNameContainingIgnoreCaseOrUserEmailContainingIgnoreCase(
        Long userId, String userNIC, String userFirstName, String userLastName, String userEmail);

    @Query("SELECT u FROM User u WHERE u.userRole = 'DONOR' AND u.userId = :userId")
    Optional<User> findByUserIdAndUserRole(Long userId);
    
    User findByUserEmail(String userEmail);
    
    User findByUserEmailOrUserNIC(String userEmail, String userNIC);

    @Query("SELECT u FROM User u WHERE u.userRole <> :userRole1 AND u.userRole <> :userRole2")
    List<User> findAllUsersExceptTwoRoles(@Param("userRole1") Role userRole1, @Param("userRole2") Role userRole2);

    @Query("SELECT u FROM User u WHERE u.userRole = :userRole")
    List<User> findUsersByRole(@Param("userRole") Role userRole);

    Long countByUserRole(Role role);

    @Transactional
    @Modifying
    @Query("update User u set u.userPassword = ?2 where u.userEmail = ?1")
    void updatePassword(String email, String password);
}
