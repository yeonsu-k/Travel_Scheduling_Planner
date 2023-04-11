package com.newsainturtle.schedule.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationSetRequest {

    private Long locationId;

    private String locationName;

    private String address;

    private double longitude;

    private double latitude;

    private String time;

    private String locationURL;
}
