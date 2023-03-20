package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LocationResponse {

    private Long locationId;
    private Long regionId;
    private String locationName;
    private String address;
    private String profile;
    private double longitude;
    private double latitude;
    private boolean isHotel;
}
