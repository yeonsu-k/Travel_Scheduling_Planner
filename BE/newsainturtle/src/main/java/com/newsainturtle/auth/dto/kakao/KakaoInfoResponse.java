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
    boolean hasEmail;
    @JsonProperty("email_needs_agreement")
    boolean emailNeedsAgreement;
    @JsonProperty("profile_nickname_needs_agreement")
    boolean profileNicknameNeedsAgreement;
    @JsonProperty("is_email_valid")
    boolean isEmailValid;
    @JsonProperty("email")
    String email;
    @JsonProperty("profile")
    KakaoNicknameResponse profile;
}