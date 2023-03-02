package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_member_id")
    private Long scheduleMemberId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "schedule_id")
    private Long schedule;
}
