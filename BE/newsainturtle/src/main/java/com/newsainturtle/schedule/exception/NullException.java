package com.newsainturtle.schedule.exception;

import com.newsainturtle.common.exception.BadRequestException;
import com.newsainturtle.schedule.constant.ScheduleErrorConstant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NullException extends BadRequestException {

    public NullException() {
        super(ScheduleErrorConstant.NULL_ERROR_MESSAGE);
    }

    public NullException(String message) {
        super(message);
    }
}
