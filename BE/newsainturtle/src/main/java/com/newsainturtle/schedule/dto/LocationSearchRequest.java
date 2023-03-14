package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LocationSearchRequest {

    private String keyword;


    @Builder
    public LocationSearchRequest(String keyword) {
        this.keyword = keyword;
    }
}
