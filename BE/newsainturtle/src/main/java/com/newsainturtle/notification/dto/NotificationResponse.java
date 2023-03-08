package com.newsainturtle.notification.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationResponse {
    private Long notificationId;
    private String senderNickname;
    private String type;
    private String content;
    private String status;
}