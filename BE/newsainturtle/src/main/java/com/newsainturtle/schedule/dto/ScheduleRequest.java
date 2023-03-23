package com.newsainturtle.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;


@Getter
@NoArgsConstructor
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
