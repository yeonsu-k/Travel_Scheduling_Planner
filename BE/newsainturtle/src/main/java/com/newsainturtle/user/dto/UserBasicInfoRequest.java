package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter
@NoArgsConstructor
public class UserBasicInfoRequest {
    @Email
    private String email;

    @Builder
    public UserBasicInfoRequest(String email) {
        this.email = email;
    }
}
