package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RegionResponse {

    private String regionName;

    private String regionImageURL;

    private String englishName;

    private String contents;

    @Builder
    public RegionResponse(String regionName, String regionImageURL, String englishName, String contents) {
        this.regionName = regionName;
        this.regionImageURL = regionImageURL;
        this.englishName = englishName;
        this.contents = contents;
    }
}
