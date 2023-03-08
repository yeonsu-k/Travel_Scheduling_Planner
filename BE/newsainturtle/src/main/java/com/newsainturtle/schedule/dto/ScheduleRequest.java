package com.newsainturtle.schedule.dto;

import lombok.Getter;

import java.util.List;
import java.util.ArrayList;

@Getter
public class ScheduleRequest {

    private String scheduleRegion;

    private String scheduleName;

    private boolean isPrivate;

    private String scheduleStartDay;

    private String scheduleEndDay;

    private String scheduleStartLocation;

    private String scheduleEndLocation;

    private String vehicle;

    private List<ScheduleLocationRequest> scheduleLocationRequestList = new ArrayList<>();
}
