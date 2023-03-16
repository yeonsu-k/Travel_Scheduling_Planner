package com.newsainturtle.schedule.dto;

import com.newsainturtle.schedule.entity.Location;
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

    public static LocationResponse of(Location location){
        return LocationResponse.builder()
                .locationId(location.getLocationId())
                .regionId(location.getRegion().getRegionId())
                .locationName(location.getLocationName())
                .address(location.getAddress())
                .profile("")
                .longitude(location.getLongitude())
                .latitude(location.getLatitude())
                .isHotel(location.isHotel())
                .build();
    }
}
