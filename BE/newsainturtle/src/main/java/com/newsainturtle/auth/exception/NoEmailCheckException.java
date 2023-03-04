package com.newsainturtle.auth.exception;

import com.newsainturtle.auth.constant.AuthConstant;
import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
public class NoEmailCheckException extends BadRequestException {
        public NoEmailCheckException(){
            super(AuthConstant.NO_EMAIL_CHECK_ERROR_MESSAGE);
        }
}
