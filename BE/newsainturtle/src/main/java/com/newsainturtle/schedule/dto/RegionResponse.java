package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegionResponse {

    private Long regionId;

    private String regionName;

    private String regionImageURL;

    private String englishName;

    private String contents;

    @Builder
    public RegionResponse(Long regionId, String regionName, String regionImageURL, String englishName, String contents) {
        this.regionId = regionId;
        this.regionName = regionName;
        this.regionImageURL = regionImageURL;
        this.englishName = englishName;
        this.contents = contents;
    }
}
