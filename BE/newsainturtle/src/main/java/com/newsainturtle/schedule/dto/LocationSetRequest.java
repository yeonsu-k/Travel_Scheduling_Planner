package com.newsainturtle.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationSetRequest {

    private Long lcationId;

    private Long regionId;

    private String locationName;

    private String address;

    private double longtitude;

    private double latitude;

    private boolean hotel;

    private String time;
}
