package com.newsainturtle.user.controller;


import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.user.dto.ModifyProfileRequest;
import com.newsainturtle.user.dto.ModifyScheduleNameRequest;
import com.newsainturtle.user.dto.ModifyUserInfoRequest;
import com.newsainturtle.user.service.UserService;
import io.swagger.annotations.Api;

import io.swagger.v3.oas.annotations.Operation;
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
@Api(description = "마이페이지 및 유저 관련 컨트롤러")
public class UserController {
    private final UserService userService;

    @Operation(summary = "사용자 정보 조회", description = "Access Token을 받아 사용자 정보를 조회합니다.")
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


    @Operation(summary = "사용자 정보 수정", description = "사용자 정보를 수정합니다.")
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

    @Operation(summary = "프로필 사진 수정", description = "프로필 사진을 수정합니다.")
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

    @Operation(summary = "일정 이름 수정", description = "일정 이름을 수정합니다.")
    @PostMapping("/{schedule_id}")
    public ResponseEntity<BaseResponse> modifyScheduleName(@ApiIgnore Authentication authentication, @RequestBody final ModifyScheduleNameRequest modifyScheduleNameRequest, @PathVariable("schedule_id") Long schedule_id) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        userService.modifyScheduleName(modifyScheduleNameRequest.getSchedule_name(),schedule_id, email);
        return new ResponseEntity<>(
                BaseResponse.from(true, MODIFY_SCHEDULE_NAME_SUCCESS_MESSAGE),
                HttpStatus.OK);
    }

    @Operation(summary = "일정 목록 조회", description = "일정 목록을 조회합니다.")
    @GetMapping("/schedule_list")
    public ResponseEntity<BaseResponse> getScheduleList(@ApiIgnore Authentication authentication) throws Exception{
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                GET_USER_SCHEDULE_LIST_SUCCESS_MESSAGE,
                userService.getScheduleList(email)
        ), HttpStatus.OK);
    }


    @Operation(summary = "일정 공개 여부 수정", description = "일정 공개 여부를 수정합니다.")
    @PostMapping("/open/{schedule_id}")
    public ResponseEntity<BaseResponse> modifyIsPrivate(@ApiIgnore Authentication authentication, @PathVariable("schedule_id") Long schedule_id) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        userService.modifyScheduleIsPrivate(schedule_id,email);
        return new ResponseEntity<>(
                BaseResponse.from(true, MODIFY_SCHEDULE_IS_PRIVATE_SUCCESS_MESSAGE),
                HttpStatus.OK);
    }

    @Operation(summary = "일정 삭제", description = "일정을 삭제합니다.")
    @DeleteMapping("/{schedule_id}")
    public ResponseEntity<BaseResponse> deleteSchedule(@ApiIgnore Authentication authentication, @PathVariable("schedule_id") Long schedule_id){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        userService.deleteSchedule(schedule_id, email);
        return new ResponseEntity<>(
                BaseResponse.from(true, DELETE_SCHEDULE_SUCCESS_MESSAGE),
                HttpStatus.OK);
    }


}
