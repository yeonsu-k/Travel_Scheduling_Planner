package com.newsainturtle.user.controller;


import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.user.dto.ModifyProfileRequest;
import com.newsainturtle.user.dto.ModifyScheduleNameRequest;
import com.newsainturtle.user.dto.ModifyUserInfoRequest;
import com.newsainturtle.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import static com.newsainturtle.user.constant.UserConstant.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public ResponseEntity<BaseResponse> getUserInfo(@ApiIgnore Authentication authentication) throws Exception {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                GET_USER_INFO_SUCCESS_MESSAGE,
                userService.getUserInfo(email))
                , HttpStatus.OK);

    }
    @PostMapping
    public ResponseEntity<BaseResponse> modifyUserInfo(@ApiIgnore Authentication authentication, @RequestBody final ModifyUserInfoRequest modifyUserInfoRequest) throws Exception {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        userService.modifyUserInfo(email, modifyUserInfoRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                MODIFY_USER_INFO_SUCCESS_MESSAGE)
                , HttpStatus.OK);

    }

    @PostMapping("/profile")
    public ResponseEntity<BaseResponse> modifyProfile(@ApiIgnore Authentication authentication, @RequestBody final ModifyProfileRequest modifyProfileRequest) throws Exception {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                MODIFY_USER_PROFILE_SUCCESS_MESSAGE,
                userService.modifyProfile(email, modifyProfileRequest.getPath()))
                , HttpStatus.OK);
    }
    @PostMapping("/{schedule_id}")
    public ResponseEntity<BaseResponse> modifyScheduleName(@ApiIgnore Authentication authentication, @RequestBody final ModifyScheduleNameRequest modifyScheduleNameRequest, @PathVariable("schedule_id") Long schedule_id) {
        userService.modifyScheduleName(modifyScheduleNameRequest.getSchedule_name(),schedule_id);
        return new ResponseEntity<>(
                BaseResponse.from(true, MODIFY_SCHEDULE_NAME_SUCCESS_MESSAGE),
                HttpStatus.OK);
    }


}
