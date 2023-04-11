package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class ScheduleLocation {

    private Long day;

    private Long sequence;

    @Column(name = "start_time")
    private String startTime;

    @Column(name = "end_time")
    private String endTime;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @Builder
    public ScheduleLocation(Long day, Long sequence, String startTime, String endTime,
                            Location location) {
        this.day = day;
        this.sequence = sequence;
        this.startTime = startTime;
        this.endTime = endTime;
        this.location = location;
    }
}
