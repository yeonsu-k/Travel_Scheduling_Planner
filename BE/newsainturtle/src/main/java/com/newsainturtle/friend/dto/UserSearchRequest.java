package com.newsainturtle.friend.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
public class UserSearchRequest {
    @NotBlank
    private String email;
}
