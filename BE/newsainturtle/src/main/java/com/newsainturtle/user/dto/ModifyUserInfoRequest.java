package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ModifyUserInfoRequest {
    private String nickname;
    private String password;
    private String newPassword;
}
