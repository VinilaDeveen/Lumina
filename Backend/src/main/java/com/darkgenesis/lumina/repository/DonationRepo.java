package com.darkgenesis.lumina.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.dto.MonthlyDonation;
import com.darkgenesis.lumina.dto.TopTenDonor;
import com.darkgenesis.lumina.dto.YearlyMonthlyDonation;
import com.darkgenesis.lumina.entity.Donation;
import com.darkgenesis.lumina.entity.User;

@Repository
public interface DonationRepo extends JpaRepository<Donation, Long> {

    List<Donation> findDonationByUser(User user);
    List<Donation> findByDonationExpiryDateBefore(LocalDate expiryDate);

    @Query("SELECT COUNT(d) FROM Donation d WHERE DATE(d.donationCollectionDate) = CURRENT_DATE")
    Long countDonationsToday();

    @Query("SELECT COALESCE(SUM(b.donationAmount), 0) FROM Donation b")
    Long getTotalBloodAmount();

    @Query("SELECT COALESCE(SUM(b.donationAmount), 0) FROM Donation b WHERE b.donationCollectionDate = :today")
    Long getTotalBloodAmountToday(LocalDate today);

    @Query("SELECT new com.darkgenesis.lumina.dto.TopTenDonor(d.user.userId, d.user.userFirstName, SUM(d.donationAmount)) " +
           "FROM Donation d " +
           "GROUP BY d.user.userId, d.user.userFirstName " +
           "ORDER BY SUM(d.donationAmount) DESC")
    List<TopTenDonor> findTopTenDonors();

    @Query("SELECT new com.darkgenesis.lumina.dto.MonthlyDonation(MONTH(b.donationCollectionDate), COALESCE(SUM(b.donationAmount), 0)) " +
       "FROM Donation b " +
       "WHERE YEAR(b.donationCollectionDate) = :year " +
       "GROUP BY MONTH(b.donationCollectionDate) " +
       "ORDER BY MONTH(b.donationCollectionDate)")
    List<MonthlyDonation> getTotalBloodAmountByMonth(@Param("year") int year);

    @Query("SELECT new com.darkgenesis.lumina.dto.MonthlyDonation(MONTH(b.donationCollectionDate), COUNT(b)) " +
       "FROM Donation b " +
       "WHERE YEAR(b.donationCollectionDate) = :year " +
       "GROUP BY MONTH(b.donationCollectionDate) " +
       "ORDER BY MONTH(b.donationCollectionDate)")
    List<MonthlyDonation> getMonthlyDonationCount(@Param("year") int year);

    @Query("SELECT new com.darkgenesis.lumina.dto.YearlyMonthlyDonation(YEAR(b.donationCollectionDate), MONTH(b.donationCollectionDate), COALESCE(SUM(b.donationAmount), 0)) " +
       "FROM Donation b " +
       "WHERE YEAR(b.donationCollectionDate) BETWEEN :startYear AND :endYear " +
       "GROUP BY YEAR(b.donationCollectionDate), MONTH(b.donationCollectionDate) " +
       "ORDER BY YEAR(b.donationCollectionDate), MONTH(b.donationCollectionDate)")
   List<YearlyMonthlyDonation> getTotalBloodAmountByMonthRange(@Param("startYear") int startYear, @Param("endYear") int endYear);
}
