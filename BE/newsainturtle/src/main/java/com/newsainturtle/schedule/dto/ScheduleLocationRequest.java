package com.newsainturtle.schedule.dto;

import lombok.Getter;

@Getter
public class ScheduleLocationRequest {

    private Long locationId;

    private Long day;

    private Long sequence;

    private String startTime;

    private String endTime;
}
