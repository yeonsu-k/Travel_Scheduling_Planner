package com.newsainturtle.notification.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class NotificationListResponse {
    private List<NotificationResponse> notifications;
}