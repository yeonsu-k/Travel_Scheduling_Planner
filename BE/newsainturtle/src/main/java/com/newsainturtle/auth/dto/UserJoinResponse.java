package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserJoinResponse {
    private String email;
    private String nickname;
}
