package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "host_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hostId;

    @Column(name = "schedule_region")
    private String scheduleRegion;

    @Column(name = "schedule_name")
    private String scheduleName;

    @Column(name = "is_private")
    private boolean isPrivate;

    @Column(name = "schedule_start_day")
    private String scheduleStartDay;

    @Column(name = "schedule_end_day")
    private String scheduleEndDay;

    @Column(name = "schedule_start_location")
    private String scheduleStartLocation;

    @Column(name = "schedule_end_location")
    private String scheduleEndLocation;

    private String vehicle;

    @CreatedDate
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(name = "modified_time")
    private LocalDateTime modifiedTime;

    @Builder
    public Schedule(String scheduleRegion, String scheduleName, boolean isPrivate, String scheduleStartDay,
                    String scheduleEndDay, String scheduleStartLocation, String scheduleEndLocation, String vehicle) {
        this.scheduleRegion = scheduleRegion;
        this.scheduleName = scheduleName;
        this.isPrivate = isPrivate;
        this.scheduleStartDay = scheduleStartDay;
        this.scheduleEndDay = scheduleEndDay;
        this.scheduleStartLocation = scheduleStartLocation;
        this.scheduleEndLocation = scheduleEndLocation;
        this.vehicle = vehicle;
    }
}
