package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class InviteFriendRequest {

    @Email
    String email;

    @NotNull
    Long scheduleId;

    @Builder
    public InviteFriendRequest(String email, Long scheduleId) {
        this.email = email;
        this.scheduleId = scheduleId;
    }
}
