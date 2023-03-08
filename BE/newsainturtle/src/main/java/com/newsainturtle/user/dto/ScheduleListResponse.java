package com.newsainturtle.user.dto;


import com.newsainturtle.schedule.entity.Schedule;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Optional;

@Getter
@Builder
public class ScheduleListResponse {

    private String host;
    private String region_name;
    private String schedule_name;
    private String start_day;
    private String end_day;
    private LocalDateTime modifiedTime;
    private boolean isPrivate;

    public static ScheduleListResponse of(Optional<Schedule> schedule){
        return schedule.map(value -> ScheduleListResponse.builder()
                .host(value.getHostEmail())
                .region_name(value.getScheduleRegion())
                .schedule_name(value.getScheduleName())
                .start_day(value.getScheduleStartDay())
                .end_day(value.getScheduleEndDay())
                .modifiedTime(value.getModifiedTime())
                .isPrivate(value.isPrivate())
                .build()).orElse(null);
    }


}
