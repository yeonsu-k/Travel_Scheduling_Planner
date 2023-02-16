package com.newsainturtle.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Builder
@Getter
public class EmailDuplicateCheckRequest {
    private String email;
}
