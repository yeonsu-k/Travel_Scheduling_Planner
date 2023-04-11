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
public class KakaoInfoResponse {
    @JsonProperty("has_email")
    private boolean hasEmail;
    @JsonProperty("email_needs_agreement")
    private boolean emailNeedsAgreement;
    @JsonProperty("profile_nickname_needs_agreement")
    private boolean profileNicknameNeedsAgreement;
    @JsonProperty("is_email_valid")
    private boolean isEmailValid;
    @JsonProperty("email")
    private String email;
    @JsonProperty("profile")
    private KakaoNicknameResponse profile;
}