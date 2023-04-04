package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.BasicLocation;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BasicLocationRepository extends JpaRepository<BasicLocation,Long> {

    @Query(value = "SELECT c FROM BasicLocation c WHERE c.regionId = :regionId and c.locationName LIKE %:locationName% and c.isHotel = :isHotel")
    List<BasicLocation> findByRegionIdAndLocationNameAndIsHotel(@Param("regionId") Long RegionId,
                                                                @Param("locationName") String locationName, @Param("isHotel") boolean isHotel);

    @Query(value = "SELECT c FROM BasicLocation c WHERE c.regionId = :regionId and c.isHotel = :isHotel")
    List<BasicLocation> findAllByRegionIdAndIsHotel(@Param("regionId") Long RegionId, @Param("isHotel") boolean isHotel, Pageable pageable);
}
