package com.newsainturtle.auth.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class TokenCheckRequest {
    @NotBlank
    private String accessToken;

    @Builder
    public TokenCheckRequest(String accessToken) {
        this.accessToken = accessToken;
    }
}
