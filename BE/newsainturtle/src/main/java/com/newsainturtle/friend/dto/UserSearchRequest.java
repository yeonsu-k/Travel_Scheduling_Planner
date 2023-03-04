package com.newsainturtle.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter
@NoArgsConstructor
public class UserSearchRequest {
    @Email
    private String email;

    @Builder
    public UserSearchRequest(String email) {
        this.email = email;
    }
}
