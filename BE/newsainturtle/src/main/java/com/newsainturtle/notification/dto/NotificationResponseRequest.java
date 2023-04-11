package com.newsainturtle.notification.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class NotificationResponseRequest {
    @NotNull
    private Long notificationId;
    @NotNull
    private Boolean isAccept;
    @NotBlank
    private String type;

    @Builder
    public NotificationResponseRequest(Long notificationId, Boolean isAccept, String type) {
        this.notificationId = notificationId;
        this.isAccept = isAccept;
        this.type = type;
    }
}
