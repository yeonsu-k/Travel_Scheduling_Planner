package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenCheckResponse {
    private String profile;
    private String nickname;
}
