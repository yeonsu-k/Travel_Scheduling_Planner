package com.newsainturtle.notification.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.notification.constant.NotificationConstant.NOT_USER_OWN_NOTIFICATION_MESSAGE;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotUserOwnNotificationException extends BadRequestException {
    public NotUserOwnNotificationException() {
        super(NOT_USER_OWN_NOTIFICATION_MESSAGE);
    }
}