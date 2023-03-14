package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.schedule.dto.ScheduleRequest;
import com.newsainturtle.schedule.service.ScheduleService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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
        UserDetails userDetails = (UserDetails)authentication.getDetails();
        scheduleService.createSchedule(scheduleRequest,userDetails.getUsername());
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_SCHEDULE_SUCCESS_MESSAGE)
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
}
