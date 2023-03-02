package com.newsainturtle.user.controller;


import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import static com.newsainturtle.user.constant.UserConstant.GET_USER_INFO_SUCCESS_MESSAGE;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<BaseResponse> getUserInfo(@ApiIgnore Authentication authentication) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                GET_USER_INFO_SUCCESS_MESSAGE,
                userService.getUserInfo(email))
                , HttpStatus.OK);

    }
}
