package com.newsainturtle.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserBasicInfoResponse{
    private String email;
}
