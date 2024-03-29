package com.newsainturtle.user.exception;


import com.newsainturtle.common.exception.BadRequestException;
import com.newsainturtle.user.constant.UserConstant;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class NotHostException extends BadRequestException {
    public NotHostException() {
        super(UserConstant.NOT_HOST_ERROR_MESSAGE);
    }
}
