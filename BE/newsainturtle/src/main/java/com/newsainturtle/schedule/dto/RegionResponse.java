package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegionResponse {

    private String regionName;

    private String regionImageURL;

    @Builder
    public RegionResponse(String regionName, String regionImageURL) {
        this.regionName = regionName;
        this.regionImageURL = regionImageURL;
    }
}
