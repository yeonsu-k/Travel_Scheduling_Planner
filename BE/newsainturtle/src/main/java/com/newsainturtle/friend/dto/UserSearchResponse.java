package com.newsainturtle.friend.dto;

import com.newsainturtle.common.dto.BaseResponse;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

@Getter
@SuperBuilder
public class UserSearchResponse extends BaseResponse {
    private boolean isExist;
    private String profile;
    private String email;
    private String nickname;
}