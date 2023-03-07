package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationRepository extends JpaRepository<Location,Long> {
}
