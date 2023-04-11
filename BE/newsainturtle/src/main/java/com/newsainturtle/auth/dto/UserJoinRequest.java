package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserJoinRequest {
    private String email;
    private String nickname;
    private String password;
    private boolean duplicatedCheck;

    @Builder
    public UserJoinRequest(String email, String nickname, String password, boolean duplicatedCheck) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.duplicatedCheck = duplicatedCheck;
    }
}
