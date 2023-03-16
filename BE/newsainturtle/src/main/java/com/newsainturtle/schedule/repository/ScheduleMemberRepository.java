package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.ScheduleMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleMemberRepository extends JpaRepository<ScheduleMember,Long> {
    List<ScheduleMember> findAllByUserEmail(String email);

    ScheduleMember findByScheduleIdAndUserEmail(Long scheduleId, String email);
}
