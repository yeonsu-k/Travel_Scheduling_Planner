package com.newsainturtle.schedule.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SchedulePeriodRequest {
    private String start_day;
    private String end_day;

    @Builder
    public SchedulePeriodRequest(String start_day, String end_day) {
        this.start_day = start_day;
        this.end_day = end_day;
    }
}
