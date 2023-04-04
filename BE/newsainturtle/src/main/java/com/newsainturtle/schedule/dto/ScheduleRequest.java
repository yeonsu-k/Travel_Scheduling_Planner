package com.newsainturtle.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.*;


@Getter
@NoArgsConstructor
public class ScheduleRequest {

    private Long regionId;

    private String scheduleName;

    private Boolean isPrivate;

    private String scheduleStartDay;

    private String scheduleEndDay;

    private String scheduleStartLocation;

    private String scheduleEndLocation;

    private String vehicle;

    private List<ScheduleLocationRequest> scheduleLocationRequestList = new ArrayList<>();

}
