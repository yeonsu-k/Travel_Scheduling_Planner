package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LocationRepository extends JpaRepository<Location,Long> {

    List<Location> findByLocationNameContains(String keyword);
}
