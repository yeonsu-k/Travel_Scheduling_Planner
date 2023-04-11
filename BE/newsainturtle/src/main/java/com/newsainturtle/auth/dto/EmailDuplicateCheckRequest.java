package com.newsainturtle.auth.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
public class EmailDuplicateCheckRequest {
    private String email;

    @Builder
    public EmailDuplicateCheckRequest(String email) {
        this.email = email;
    }
}
