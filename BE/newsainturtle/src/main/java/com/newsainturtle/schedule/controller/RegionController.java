package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.schedule.dto.RegionRequest;
import com.newsainturtle.schedule.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.newsainturtle.schedule.constant.ScheduleSuccessConstant.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/main")
public class RegionController {

    private final RegionService regionService;

    @PostMapping
    public ResponseEntity<BaseResponse> createRegion(@RequestBody RegionRequest regionRequest) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_REGION_SUCCESS_MESSAGE,
                regionService.createRegion(regionRequest))
                , HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<BaseResponse> findRegion() {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_REGION_SUCCESS_MESSAGE,
                regionService.findRegion())
                , HttpStatus.OK);
    }
}
