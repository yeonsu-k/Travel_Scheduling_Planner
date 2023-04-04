package com.newsainturtle.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
public class ScheduleLocationSetRequest {

    private List<LocationSetRequest> hotelList = new ArrayList<>();

    private List<LocationSetRequest> placeList = new ArrayList<>();

    private List<LocationSetRequest> pointPlace = new ArrayList<>();
}
