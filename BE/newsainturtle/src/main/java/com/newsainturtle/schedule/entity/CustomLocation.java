package com.newsainturtle.schedule.entity;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@Entity
@DiscriminatorValue("Custom")
public class CustomLocation extends Location{

    @Column(name = "coustom_schedule_id")
    private Long CustomScheduleId;
}
