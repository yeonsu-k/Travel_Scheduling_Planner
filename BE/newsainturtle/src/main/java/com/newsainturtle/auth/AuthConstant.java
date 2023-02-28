package com.newsainturtle.auth;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthConstant {
    public static final String LOGIN_SUCCESS_MESSAGE = "로그인이 완료되었습니다.";

    public static final String UNAUTHORIZED_USER_ERROR_MESSAGE = "존재하지 않는 회원입니다.";
}
