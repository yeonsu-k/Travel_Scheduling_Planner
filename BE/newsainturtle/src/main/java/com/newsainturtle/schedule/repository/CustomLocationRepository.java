package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.CustomLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomLocationRepository extends JpaRepository<CustomLocation,Long> {
}
