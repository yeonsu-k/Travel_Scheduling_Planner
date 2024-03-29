package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class BasicLocationRequest {

    private Long regionId;

    private String locationName;

    private String address;

    private Double longitude;

    private Double latitude;

    private boolean isHotel;

    private String locationURL;
}
