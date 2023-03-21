package com.newsainturtle.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LiveNotificationResponse {
    private String senderNickname;
    private String type;
    private String content;
}