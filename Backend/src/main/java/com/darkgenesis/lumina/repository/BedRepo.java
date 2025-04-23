package com.darkgenesis.lumina.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.darkgenesis.lumina.Enum.BedStatus;
import com.darkgenesis.lumina.entity.Bed;

@Repository
public interface BedRepo extends JpaRepository<Bed, Long> {
   
    List<Bed> findByDate(LocalDate date);

    Optional<Bed> findBedByDateAndTimeSlot(LocalDate date, LocalTime time);

    List<Bed> findByStatus(BedStatus status);

    List<Bed> findByDateAndAvailableBedsGreaterThan(LocalDate date, int availableBeds);
    
    @Query("SELECT b.status FROM Bed b WHERE b.date = :date")
    BedStatus findBedStatusByDate(@Param("date") LocalDate date);
}
