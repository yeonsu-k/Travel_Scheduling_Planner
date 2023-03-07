package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity(name = "schedule_member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_member_id")
    private Long scheduleMemberId;

    @Column(name = "user_email")
    private String userEmail;


    @Column(name = "schedule_id")
    private Long schedule;

    @Builder
    public ScheduleMember(Long scheduleMemberId, String userEmail, Long schedule){
        this.scheduleMemberId = scheduleMemberId;
        this.userEmail = userEmail;
        this.schedule = schedule;
    }

}
