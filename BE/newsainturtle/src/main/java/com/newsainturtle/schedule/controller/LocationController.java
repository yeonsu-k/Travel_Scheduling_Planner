package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.schedule.dto.BasicLocationRequest;
import com.newsainturtle.schedule.dto.CustomLocationRequest;
import com.newsainturtle.schedule.service.LocationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import static com.newsainturtle.schedule.constant.ScheduleSuccessConstant.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule")
public class LocationController {

    private final LocationService locationService;

    @PostMapping("/basiclocation")
    @ApiOperation(value = "기본 장소 생성", notes = "기본 장소를 생성합니다.")
    public ResponseEntity<BaseResponse> createBasicLocation(@RequestBody BasicLocationRequest basicLocationRequest) {
        locationService.createBasicLocation(basicLocationRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_BASIC_LOCATION_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

    @PostMapping("/customlocation")
    @ApiOperation(value = "사용자 장소 생성", notes = "사용자 장소를 생성합니다.")
    public ResponseEntity<BaseResponse> createBasicLocation(@ApiIgnore Authentication authentication,
                                                            @RequestBody CustomLocationRequest customLocationRequest) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        locationService.createCustomLocation(customLocationRequest,email);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                CREATE_CUSTOM_LOCATION_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }
}
