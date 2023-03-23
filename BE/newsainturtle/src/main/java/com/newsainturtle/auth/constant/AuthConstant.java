package com.newsainturtle.auth.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthConstant {
    public static final String EMAIL_DUPLICATE_CHECK= "이메일 중복 검사가 완료되었습니다.";
    public static final String NO_EMAIL_CHECK_ERROR_MESSAGE = "이메일 중복 검사를 완료해주세요.";
    public static final String SUCCESS_JOIN_USER_MESSAGE = "회원 가입이 완료 되었습니다.";
    public static final String LOGIN_SUCCESS_MESSAGE = "로그인이 완료되었습니다.";
    public static final String VALID_TOKEN_SUCCESS_MESSAGE = "유효한 토큰입니다.";

    public static final String UNAUTHORIZED_USER_ERROR_MESSAGE = "존재하지 않는 회원입니다.";
    public static final String INVALID_TOKEN_MESSAGE = "유효하지 않은 토큰입니다.";
    public static final String UNAVAILABLE_EMAIL_MESSAGE = "해당 이메일로 가입할 수 없습니다.";
    public static final String KAKAO_LOGIN_ERROR_MESSAGE = "카카오 로그인에 실패하였습니다.";

    public static final String KAKAO_AUTH_URL = "https://kauth.kakao.com";
    public static final String KAKAO_API_URL = "https://kapi.kakao.com";
}
