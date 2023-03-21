package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CustomLocationRequest {

    private Long regionId;

    private String locationName;

    private String address;

    private Double longitude;

    private Double latitude;

    private boolean isHotel;
}
