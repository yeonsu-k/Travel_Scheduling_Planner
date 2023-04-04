package com.newsainturtle.schedule.dto.webDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
public class OpenStreetResponse {

    @JsonProperty("routes")
    private List<OpenStreetInfoResponse> response;
}
