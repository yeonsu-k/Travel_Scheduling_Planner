package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.isPrivate = true ")
    List<Schedule> findByPrivateTrue();
}
