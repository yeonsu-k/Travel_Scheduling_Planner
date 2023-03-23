package com.newsainturtle.schedule.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.NOT_FOUND_MESSAGE;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends BadRequestException {

    public NotFoundException() {
        super(NOT_FOUND_MESSAGE);
    }
}
