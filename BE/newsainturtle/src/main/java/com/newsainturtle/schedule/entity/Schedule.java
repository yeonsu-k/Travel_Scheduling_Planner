package com.newsainturtle.schedule.entity;

import com.newsainturtle.schedule.dto.SchedulePeriodRequest;
import com.newsainturtle.schedule.dto.ScheduleStartEndLocationRequest;
import com.newsainturtle.schedule.dto.ScheduleVehicleRequest;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long scheduleId;

    @Column(name = "host_email")
    private String hostEmail;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "schedule_name", length = 20)
    private String scheduleName;

    @Column(name = "is_private")
    private boolean isPrivate;

    @Column(name = "schedule_start_day", length = 10)
    private String scheduleStartDay;

    @Column(name = "schedule_end_day", length = 10)
    private String scheduleEndDay;

    @Column(name = "schedule_start_location", length = 20)
    private String scheduleStartLocation;

    @Column(name = "schedule_end_location", length = 20)
    private String scheduleEndLocation;

    private String vehicle;

    @CreatedDate
    @Column(name = "create_time")
    private LocalDateTime createTime;

    @LastModifiedDate
    @Column(name = "modified_time")
    private LocalDateTime modifiedTime;

    @ElementCollection
    @CollectionTable(name = "schedule_location",
            joinColumns = @JoinColumn(name = "schedule_id"))
    private List<ScheduleLocation> scheduleLocations = new ArrayList<>();

    @Builder
    public Schedule(String hostEmail, Long regionId, String scheduleName, boolean isPrivate, String scheduleStartDay,
                    String scheduleEndDay, String scheduleStartLocation, String scheduleEndLocation, String vehicle,
                    List<ScheduleLocation> scheduleLocations) {
        this.hostEmail = hostEmail;
        this.regionId = regionId;
        this.scheduleName = scheduleName;
        this.isPrivate = isPrivate;
        this.scheduleStartDay = scheduleStartDay;
        this.scheduleEndDay = scheduleEndDay;
        this.scheduleStartLocation = scheduleStartLocation;
        this.scheduleEndLocation = scheduleEndLocation;
        this.vehicle = vehicle;
        this.scheduleLocations = scheduleLocations;
    }
    public void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    public void changeIsPrivate() {
        this.isPrivate = !(this.isPrivate);
    }
}
