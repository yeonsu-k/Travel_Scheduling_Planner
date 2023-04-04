package com.newsainturtle.auth.controller;

import com.newsainturtle.auth.dto.*;
import com.newsainturtle.auth.dto.KakaoCodeUrlResponse;
import com.newsainturtle.auth.service.AuthService;
import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.newsainturtle.auth.constant.AuthConstant.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Api(description = "인증 관련 API")
public class AuthController {

    private final UserService userService;

    private final AuthService authService;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "로그인")
    public ResponseEntity<BaseResponse> login(@RequestBody @Valid @ApiParam(value = "로그인 정보", required = true) LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.login(loginRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                LOGIN_SUCCESS_MESSAGE,
                loginResponse)
                , HttpStatus.OK);
    }


    @Operation(summary = "이메일 중복 검사", description = "이메일 중복 검사를 수행합니다.")
    @PostMapping("/email")
    public ResponseEntity<BaseResponse> emailDuplicateCheck(@RequestBody final EmailDuplicateCheckRequest emailDuplicateCheckRequest) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                EMAIL_DUPLICATE_CHECK,
                userService.emailDuplicateCheck(emailDuplicateCheckRequest))
                , HttpStatus.OK);
    }

    @Operation(summary = "회원가입", description = "회원가입")
    @PostMapping("/join")
    public ResponseEntity<BaseResponse> joinUser(@RequestBody final UserJoinRequest userJoinRequest) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                SUCCESS_JOIN_USER_MESSAGE,
                userService.joinUser(userJoinRequest)), HttpStatus.OK);
    }

    @PostMapping("/token")
    @ApiOperation(value = "토큰 유효성 검사", notes = "새고로침 시 토큰 유효성 검사를 수행합니다.")
    public ResponseEntity<BaseResponse> checkAccessToken(@RequestBody @Valid @ApiParam(value = "accessToken", required = true) TokenCheckRequest tokenCheckRequest) {
        TokenCheckResponse tokenCheckResponse = authService.checkAccessToken(tokenCheckRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                VALID_TOKEN_SUCCESS_MESSAGE,
                tokenCheckResponse)
                , HttpStatus.OK);
    }

    @GetMapping("/kakao/code")
    @ApiOperation(value = "카카오 로그인을 위한 인가코드 url 받기", notes = "카카오 로그인을 위한 인가코드 url 받기")
    public ResponseEntity<BaseResponse> getKakaoAuthUrl() {
        KakaoCodeUrlResponse kakaoCodeURLResponse = authService.getKakaoAuthUrl();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                KAKAO_CODE_URL_SUCCESS_MESSAGE,
                kakaoCodeURLResponse)
                , HttpStatus.OK);
    }

    @GetMapping("/kakao/login")
    @ApiOperation(value = "카카오 로그인", notes = "카카오 로그인하기")
    public ResponseEntity<BaseResponse> getKakaoLogin(@RequestParam String code) {
        KakaoLoginResponse loginResponse = authService.loginKakao(code);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                KAKAO_LOGIN_SUCCESS_MESSAGE,
                loginResponse)
                , HttpStatus.OK);
    }
}
