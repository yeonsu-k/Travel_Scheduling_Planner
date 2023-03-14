package com.newsainturtle.schedule.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class FriendListResponse {
    private List<FriendInfoResponse> friends;
}