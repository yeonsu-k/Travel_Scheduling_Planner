package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.schedule.constant.ScheduleSuccessConstant;
import com.newsainturtle.schedule.dto.ScheduleRequest;
import com.newsainturtle.schedule.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.newsainturtle.schedule.constant.ScheduleSuccessConstant.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<BaseResponse> createSchedule(@RequestBody ScheduleRequest scheduleRequest) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_SCHEDULE_SUCCESS_MESSAGE,
                scheduleService.createSchedule(scheduleRequest))
                , HttpStatus.OK);
    }
}
