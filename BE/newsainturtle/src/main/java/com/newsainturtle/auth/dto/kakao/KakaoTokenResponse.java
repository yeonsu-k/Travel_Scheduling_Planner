package com.newsainturtle.auth.dto.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class KakaoTokenResponse {
    @JsonProperty("access_token")
    String accessToken;
}