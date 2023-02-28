package com.newsainturtle.friend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserSearchResponse {
    private boolean isExist;
    private String profile;
    private String email;
    private String nickname;
}