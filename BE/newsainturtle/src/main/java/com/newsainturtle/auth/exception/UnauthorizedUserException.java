package com.newsainturtle.auth.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.auth.constant.AuthConstant.UNAUTHORIZED_USER_ERROR_MESSAGE;


@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UnauthorizedUserException extends BadRequestException {
    public UnauthorizedUserException() {
        super(UNAUTHORIZED_USER_ERROR_MESSAGE);
    }
}