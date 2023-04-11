package com.newsainturtle.auth.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.auth.constant.AuthConstant.UNAVAILABLE_EMAIL_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UnavailableEmailException extends BadRequestException {
    public UnavailableEmailException() {
        super(UNAVAILABLE_EMAIL_MESSAGE);
    }
}