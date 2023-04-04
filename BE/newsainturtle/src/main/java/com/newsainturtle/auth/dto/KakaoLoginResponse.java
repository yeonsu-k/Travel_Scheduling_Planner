package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoLoginResponse {
    private String accessToken;
    private String profile;
    private String nickname;
    private String email;
}