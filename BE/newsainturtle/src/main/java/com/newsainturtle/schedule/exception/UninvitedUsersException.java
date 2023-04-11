package com.newsainturtle.schedule.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.UNINVITED_USERS_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UninvitedUsersException extends BadRequestException {
    public UninvitedUsersException() {
        super(UNINVITED_USERS_MESSAGE);
    }
}