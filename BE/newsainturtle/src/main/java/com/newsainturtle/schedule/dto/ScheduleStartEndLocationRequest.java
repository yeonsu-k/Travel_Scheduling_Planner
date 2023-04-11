package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ScheduleStartEndLocationRequest {
    private String startLocation;
    private String endLocation;

    @Builder
    public ScheduleStartEndLocationRequest(String startLocation, String endLocation) {
        this.startLocation = startLocation;
        this.endLocation = endLocation;
    }
}
