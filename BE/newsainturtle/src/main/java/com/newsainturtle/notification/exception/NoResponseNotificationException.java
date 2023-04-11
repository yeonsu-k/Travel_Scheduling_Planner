package com.newsainturtle.notification.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.notification.constant.NotificationConstant.NO_RESPONSE_NOTIFICATION_MESSAGE;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NoResponseNotificationException extends BadRequestException {
    public NoResponseNotificationException() {
        super(NO_RESPONSE_NOTIFICATION_MESSAGE);
    }
}