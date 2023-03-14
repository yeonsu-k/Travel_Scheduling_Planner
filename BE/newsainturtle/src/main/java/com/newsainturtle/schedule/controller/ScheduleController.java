package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.schedule.dto.InviteFriendRequest;
import com.newsainturtle.schedule.dto.SchedulePeriodRequest;
import com.newsainturtle.schedule.dto.ScheduleRequest;
import com.newsainturtle.schedule.dto.ScheduleStartEndLocationRequest;
import com.newsainturtle.schedule.dto.ScheduleVehicleRequest;
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
        scheduleService.createSchedule(scheduleRequest, userDetails.getUsername());
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_SCHEDULE_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }
    @PostMapping("/period/{schedule_id}")
    @Operation(summary = "일정생성-1 여행 기간 설정", description = "일정의 시작 날짜와 끝 날짜를 저장합니다.")
    public ResponseEntity<BaseResponse> modifySchedulePeriod(@ApiIgnore Authentication authentication, @RequestBody SchedulePeriodRequest schedulePeriodRequest ,@PathVariable Long schedule_id) {
        UserDetails userDetails = (UserDetails)authentication.getDetails();
        scheduleService.modifySchedulePeriod(userDetails.getUsername(), schedulePeriodRequest, schedule_id);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                MODIFY_SCHEDULE_PERIOD_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

    @PostMapping("/start/{schedule_id}")
    @Operation(summary = "일정생성-1 여행 시작/도착지 설정", description = "일정의 시작 장소와 끝 장소를 저장합니다.")
    public ResponseEntity<BaseResponse> modifyScheduleStartEndLocation(@ApiIgnore Authentication authentication, @RequestBody ScheduleStartEndLocationRequest scheduleStartEndLocationRequest , @PathVariable Long schedule_id) {
        UserDetails userDetails = (UserDetails)authentication.getDetails();
        scheduleService.modifyScheduleStartEndLocation(userDetails.getUsername(), scheduleStartEndLocationRequest, schedule_id);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                MODIFY_SCHEDULE_START_END_DAY_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

    @PostMapping("/vehicle/{schedule_id}")
    @Operation(summary = "일정생성-1 이동수단 변경", description = "일정의 이동 수단을 저장합니다.")
    public ResponseEntity<BaseResponse> modifyScheduleVehicle(@ApiIgnore Authentication authentication, @RequestBody ScheduleVehicleRequest scheduleVehicleRequest , @PathVariable Long schedule_id) {
        UserDetails userDetails = (UserDetails)authentication.getDetails();
        scheduleService.modifyScheduleVehicle(userDetails.getUsername(),scheduleVehicleRequest , schedule_id);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                MODIFY_SCHEDULE_VEHICLE_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }


    @GetMapping("/{schedule_id}")
    public ResponseEntity<BaseResponse> findSchedule(@PathVariable("schedule_id") Long scheduleId) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_SCHEDULE_SUCCESS_MESSAGE,
                scheduleService.findSchedule(scheduleId))
                , HttpStatus.OK);
    }

    @PostMapping("/friend")
    @ApiOperation(value = "일정 공유 - 친구 초대", notes = "일정 공유를 위한 친구 초대")
    public ResponseEntity<BaseResponse> inviteFriend(@ApiIgnore Authentication authentication,
                                                     @RequestBody @Valid @ApiParam(value = "초대하는 친구 이메일", required = true) final InviteFriendRequest inviteFriendEmailRequest) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        scheduleService.inviteFriend(email, inviteFriendEmailRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                INVITE_FRIEND_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }
}
