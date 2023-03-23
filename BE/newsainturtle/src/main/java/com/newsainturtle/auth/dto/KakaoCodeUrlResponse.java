package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class KakaoCodeUrlResponse {
    private String url;
}