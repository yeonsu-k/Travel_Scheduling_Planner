package com.newsainturtle.auth.dto.kakao;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class KakaoInfoMapResponse {
    @JsonProperty("kakao_account")
    private KakaoInfoResponse kakaoAccount;
}