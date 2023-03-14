package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class ScheduleRequest {

    private String regionName;

    @Builder
    public ScheduleRequest(String regionName) {
        this.regionName = regionName;
    }
}
