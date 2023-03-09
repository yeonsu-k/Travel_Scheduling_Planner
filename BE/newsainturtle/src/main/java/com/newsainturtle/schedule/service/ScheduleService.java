package com.newsainturtle.schedule.service;

import com.newsainturtle.schedule.dto.ScheduleLocationRequest;
import com.newsainturtle.schedule.dto.ScheduleRequest;
import com.newsainturtle.schedule.entity.Location;
import com.newsainturtle.schedule.entity.Schedule;
import com.newsainturtle.schedule.entity.ScheduleLocation;
import com.newsainturtle.schedule.entity.ScheduleMember;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.repository.LocationRepository;
import com.newsainturtle.schedule.repository.ScheduleMemberRepository;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.*;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final LocationRepository locationRepository;

    private final ScheduleMemberRepository scheduleMemberRepository;

    public String createSchedule(ScheduleRequest scheduleRequest, String email) {
        isNullScheduleLocation(scheduleRequest.getScheduleLocationRequestList());
        Schedule schedule = Schedule.builder()
                .hostEmail(email)
                .scheduleRegion(scheduleRequest.getScheduleRegion())
                .scheduleName(scheduleRequest.getScheduleName())
                .isPrivate(scheduleRequest.isPrivate())
                .scheduleStartDay(scheduleRequest.getScheduleStartDay())
                .scheduleEndDay(scheduleRequest.getScheduleEndDay())
                .scheduleStartLocation(scheduleRequest.getScheduleStartLocation())
                .scheduleEndLocation(scheduleRequest.getScheduleEndLocation())
                .vehicle(scheduleRequest.getVehicle())
                .scheduleLocations(scheduleRequest.getScheduleLocationRequestList().stream()
                        .map(scheduleLocation -> ScheduleLocation.builder()
                                .day(scheduleLocation.getDay())
                                .sequence(scheduleLocation.getSequence())
                                .startTime(scheduleLocation.getStartTime())
                                .endTime(scheduleLocation.getEndTime())
                                .location(findLocationById(scheduleLocation.getLocationId()))
                                .build()).collect(Collectors.toList()))
                .build();
        Long id = scheduleRepository.save(schedule).getScheduleId();
        scheduleMemberRepository.save(ScheduleMember.builder()
                .userEmail(email)
                .scheduleID(id)
                .build());
        return schedule.getScheduleName();
    }
    private Location findLocationById(Long locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new NullException());
    }

    private void isNullScheduleLocation(List<ScheduleLocationRequest> scheduleLocationRequestList) {
        if(scheduleLocationRequestList.isEmpty()) {
            throw new NullException(NULL_SCHEDULE_LOCATION_MESSAGE);
        }
    }
}
