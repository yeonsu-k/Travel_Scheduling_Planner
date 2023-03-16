package com.newsainturtle.schedule.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.UNABLE_INVITE_FRIEND_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UnableToRequestFriendInviteException extends BadRequestException {
    public UnableToRequestFriendInviteException() {
        super(UNABLE_INVITE_FRIEND_MESSAGE);
    }
}