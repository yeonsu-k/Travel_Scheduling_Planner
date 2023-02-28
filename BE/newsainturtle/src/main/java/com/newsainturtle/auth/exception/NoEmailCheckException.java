package com.newsainturtle.auth.exception;

import com.newsainturtle.auth.constant.AuthConstant;
import com.newsainturtle.common.exception.BadRequestException;

public class NoEmailCheckException extends BadRequestException {
        public NoEmailCheckException(){
            super(AuthConstant.NO_EMAIL_CHECK_ERROR_MESSAGE);
        }
}
