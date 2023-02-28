package com.newsainturtle.auth.controller;
import com.newsainturtle.auth.dto.LoginRequest;
import com.newsainturtle.auth.dto.LoginResponse;
import com.newsainturtle.auth.service.AuthService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import javax.validation.Valid;

import static com.newsainturtle.auth.AuthConstant.*;
import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.newsainturtle.auth.constant.AuthConstant.EMAIL_DUPLICATE_CHECK;
import static com.newsainturtle.auth.constant.AuthConstant.SUCCESS_JOIN_USER_MESSAGE;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
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

    @GetMapping("/email")
    public ResponseEntity<BaseResponse> emailDuplicateCheck(@RequestBody final EmailDuplicateCheckRequest emailDuplicateCheckRequest){
        return new ResponseEntity<>(BaseResponse.from(
                true,
                EMAIL_DUPLICATE_CHECK,
                userService.emailDuplicateCheck(emailDuplicateCheckRequest))
                , HttpStatus.OK);
    }
    @PostMapping("/join")
    public ResponseEntity<BaseResponse> joinUser(@RequestBody final UserJoinRequest userJoinRequest){
        return new ResponseEntity<>(BaseResponse.from(
                true,
                SUCCESS_JOIN_USER_MESSAGE,
                userService.joinUser(userJoinRequest)), HttpStatus.OK);
    }

}
