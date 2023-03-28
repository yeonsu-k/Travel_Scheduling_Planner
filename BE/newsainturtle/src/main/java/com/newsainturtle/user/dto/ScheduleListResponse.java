package com.newsainturtle.user.dto;


import com.newsainturtle.schedule.entity.Schedule;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Getter
@Builder
public class ScheduleListResponse {

    private Long schedule_id;
    private String host;
    private Long regionId;
    private String schedule_name;
    private String start_day;
    private String end_day;
    private LocalDateTime modifiedTime;
    private boolean isPrivate;
    private boolean isMine;

    public static ScheduleListResponse of(Optional<Schedule> schedule, String email){
        boolean responseIsMine = false;
        if(Objects.equals(schedule.get().getHostEmail(), email))  responseIsMine = true;
        boolean finalResponseIsMine = responseIsMine;
        return schedule.map(value -> ScheduleListResponse.builder()
                .schedule_id(value.getScheduleId())
                .host(value.getHostEmail())
                .regionId(value.getRegionId())
                .schedule_name(value.getScheduleName())
                .start_day(value.getScheduleStartDay())
                .end_day(value.getScheduleEndDay())
                .modifiedTime(value.getModifiedTime())
                .isPrivate(value.isPrivate())
                .isMine(finalResponseIsMine)
                .build()).orElse(null);
    }


}
