package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyScheduleNameRequest {
    private String schedule_name;

    @Builder
    public ModifyScheduleNameRequest(String schedule_name) {
        this.schedule_name = schedule_name;
    }
}
