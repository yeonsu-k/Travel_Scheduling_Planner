package com.newsainturtle.schedule.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LocationResponse {

    private Long locationId;

    private Long regionId;

    private String locationName;

    private String address;

    private double longitude;

    private double latitude;

    private boolean isHotel;

    private String lcoationURL;
}
