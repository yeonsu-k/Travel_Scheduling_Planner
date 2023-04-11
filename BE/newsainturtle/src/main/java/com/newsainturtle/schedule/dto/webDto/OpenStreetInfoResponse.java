package com.newsainturtle.schedule.dto.webDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class OpenStreetInfoResponse {

    @JsonProperty("distance")
    private double distance;

    @JsonProperty("duration")
    private double duration;
}
