package com.newsainturtle.schedule.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.schedule.dto.BasicLocationRequest;
import com.newsainturtle.schedule.dto.CustomLocationRequest;
import com.newsainturtle.schedule.dto.LocationRequest;
import com.newsainturtle.schedule.service.LocationService;
import io.swagger.annotations.ApiOperation;
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

    @PostMapping("/location")
    @ApiOperation(value = "장소 이름 조회", notes = "장소 이름을 조회합니다.")
    public ResponseEntity<BaseResponse> findLocation(@ApiIgnore Authentication authentication,
                                                     @RequestBody LocationRequest locationRequest) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_LOCATION_SUCCESS_MESSAGE,
                locationService.findLocation(locationRequest,email))
                , HttpStatus.OK);
    }

    @GetMapping("/location/{is_hotel}/{region_id}")
    @ApiOperation(value = "추천 장소 조회", notes = "추천 장소를 조회합니다.")
    public ResponseEntity<BaseResponse> findRecommendLocation(@ApiIgnore Authentication authentication,
                                                     @PathVariable("is_hotel") boolean isHotel,
                                                     @PathVariable("region_id") Long regionId) {
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_LOCATION_SUCCESS_MESSAGE,
                locationService.findRecommendLocationList(regionId,email,isHotel))
                , HttpStatus.OK);
    }

    @GetMapping("/location/{location_id}")
    @ApiOperation(value = "장소 상세 조회", notes = "장소를 상세 조회합니다.")
    public ResponseEntity<BaseResponse> findLocationInfo(@PathVariable("location_id") Long locationId) {
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FIND_LOCATION_SUCCESS_MESSAGE,
                locationService.findLocationInfo(locationId))
                , HttpStatus.OK);
    }
}
