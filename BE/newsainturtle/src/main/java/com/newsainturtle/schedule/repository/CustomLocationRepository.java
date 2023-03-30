package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.CustomLocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CustomLocationRepository extends JpaRepository<CustomLocation,Long> {

    @Query("SELECT c FROM CustomLocation c WHERE c.regionId = :regionId and c.customHostEmail = :email and c.locationName LIKE %:locationName% and c.isHotel = :isHotel")
    List<CustomLocation> findByRegionIdAAndLocationNameAndHotel(@Param("regionId") Long RegionId, @Param("email") String email,
                                                          @Param("locationName") String locationName, @Param("isHotel") boolean isHotel);

    @Query("SELECT c FROM CustomLocation c WHERE c.regionId = :regionId and c.customHostEmail = :email and c.isHotel = :isHotel")
    List<CustomLocation> findAllByRegionIdAndIsHotel(@Param("regionId") Long RegionId,
                                                     @Param("email") String email, @Param("isHotel") boolean isHotel);
}
