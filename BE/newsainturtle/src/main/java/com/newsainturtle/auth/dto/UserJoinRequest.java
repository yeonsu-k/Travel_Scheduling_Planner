package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserJoinRequest {
    private String email;
    private String nickname;
    private String password;
    private boolean duplicatedCheck;

}
