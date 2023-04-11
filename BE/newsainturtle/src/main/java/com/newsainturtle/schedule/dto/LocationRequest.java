package com.newsainturtle.schedule.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
public class LocationRequest {

    private Long regionId;

    private String locationName;

    private boolean isHotel;
}
