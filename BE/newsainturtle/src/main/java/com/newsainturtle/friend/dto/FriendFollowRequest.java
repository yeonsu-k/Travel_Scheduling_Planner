package com.newsainturtle.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Getter
@NoArgsConstructor
public class FriendFollowRequest {
    @Email
    String email;

    @Builder
    public FriendFollowRequest(String email) {
        this.email = email;
    }
}
