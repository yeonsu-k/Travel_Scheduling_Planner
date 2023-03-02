package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ModifyProfileRequest {
    private String path;

    @Builder
    public ModifyProfileRequest(String path) {
        this.path = path;
    }
}
