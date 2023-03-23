package com.newsainturtle.auth.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.auth.constant.AuthConstant.KAKAO_LOGIN_ERROR_MESSAGE;

public class KakaoLoginException extends BadRequestException {
    public KakaoLoginException() {
        super(KAKAO_LOGIN_ERROR_MESSAGE);
    }
}