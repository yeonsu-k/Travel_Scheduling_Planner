package com.newsainturtle.common.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.common.CommonConstant.*;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class JwtException extends BadRequestException {
    public JwtException() {
        super(JWT_ERROR_MESSAGE);
    }
}