package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegionResponse {

    private String regionName;

    @Builder
    public RegionResponse(String regionName) {
        this.regionName = regionName;
    }
}
