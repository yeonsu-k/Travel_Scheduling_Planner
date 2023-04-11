package com.newsainturtle.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter
@NoArgsConstructor
public class FriendRemoveRequest {
    @Email
    private String email;

    @Builder
    public FriendRemoveRequest(String email) {
        this.email = email;
    }
}
