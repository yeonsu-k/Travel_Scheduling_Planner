package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserInfoResponse {
    private String email;
    private String nickname;
    private String profile;
}
