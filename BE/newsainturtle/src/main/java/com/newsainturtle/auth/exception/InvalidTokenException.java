package com.newsainturtle.auth.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.auth.constant.AuthConstant.INVALID_TOKEN_MESSAGE;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class InvalidTokenException extends BadRequestException {
    public InvalidTokenException() {
        super(INVALID_TOKEN_MESSAGE);
    }
}