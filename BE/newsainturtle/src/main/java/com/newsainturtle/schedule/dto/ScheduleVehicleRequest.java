package com.newsainturtle.schedule.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ScheduleVehicleRequest {

    private String vehicle;

    @Builder
    public ScheduleVehicleRequest(String vehicle) {
        this.vehicle = vehicle;
    }
}
