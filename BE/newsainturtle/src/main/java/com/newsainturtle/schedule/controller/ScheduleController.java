package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.schedule.dto.InviteFriendRequest;
import com.newsainturtle.schedule.dto.*;
import com.newsainturtle.schedule.service.ScheduleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

import static com.newsainturtle.schedule.constant.ScheduleSuccessConstant.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
@Api(description = "일정 관련 컨트롤러")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    @Operation(summary = "메인페이지에서 일정 생성", description = "메인 페이지에서 지역을 선택해 일정을 생성합니다.")
    public ResponseEntity<BaseResponse> createSchedule(@ApiIgnore Authentication authentication, @RequestBody ScheduleRequest scheduleRequest) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_SCHEDULE_SUCCESS_MESSAGE,
                scheduleService.createSchedule(scheduleRequest, userDetails.getUsername()))
                , HttpStatus.OK);
    }

    @GetMapping("/{schedule_id}")
    @ApiOperation(value = "일정 조회", notes = "아이디에 해당하는 일정을 조회합니다.")
    public ResponseEntity<BaseResponse> findSchedule(@PathVariable("schedule_id") Long scheduleId) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_SCHEDULE_SUCCESS_MESSAGE,
                scheduleService.findSchedule(scheduleId))
                , HttpStatus.OK);
    }

    @GetMapping("/travels")
    @ApiOperation(value = "여행기 조회", notes = "추천 여행기를 조회합니다.")
    public ResponseEntity<BaseResponse> findTravels() {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_TRAVELS_SUCCESS_MESSAGE,
                scheduleService.findTravels())
                , HttpStatus.OK);
    }

    @PostMapping("/friend")
    @ApiOperation(value = "일정 공유 - 친구 초대", notes = "일정 공유를 위한 친구 초대")
    public ResponseEntity<BaseResponse> inviteFriend(@ApiIgnore Authentication authentication,
                                                     @RequestBody @Valid @ApiParam(value = "초대하는 친구 이메일과 일정번호", required = true) final InviteFriendRequest inviteFriendEmailRequest) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        scheduleService.inviteFriend(email, inviteFriendEmailRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                INVITE_FRIEND_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

    @GetMapping("/friend/{schedule_id}")
    @ApiOperation(value = "일정 공유 - 친구 목록 조회", notes = "일정 공유를 위한 친구 목록 조회")
    public ResponseEntity<BaseResponse> selectFriendList(@ApiIgnore Authentication authentication,
                                                         @PathVariable(name = "schedule_id") Long scheduleId) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        FriendListResponse friendListResponse = scheduleService.selectFriendList(email, scheduleId);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                SELECT_FRIEND_LIST_SUCCESS_MESSAGE,
                friendListResponse)
                , HttpStatus.OK);
    }
}
