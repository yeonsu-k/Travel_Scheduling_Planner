package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegionRepository extends JpaRepository<Region,Long> {

    Region findByRegionName(String regionName);
}
