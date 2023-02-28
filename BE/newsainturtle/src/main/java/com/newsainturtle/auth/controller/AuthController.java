package com.newsainturtle.auth.controller;

import com.newsainturtle.auth.dto.LoginRequest;
import com.newsainturtle.auth.dto.LoginResponse;
import com.newsainturtle.auth.service.AuthService;
import com.newsainturtle.common.dto.BaseResponse;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.newsainturtle.auth.AuthConstant.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

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
}
