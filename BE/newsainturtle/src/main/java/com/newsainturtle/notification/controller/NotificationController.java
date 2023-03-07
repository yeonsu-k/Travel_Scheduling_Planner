package com.newsainturtle.notification.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.notification.dto.NotificationListResponse;
import com.newsainturtle.notification.service.NotificationService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import static com.newsainturtle.notification.constant.NotificationConstant.SELECT_NOTIFICATION_LIST_SUCCESS_MESSAGE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notification")
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("")
    @ApiOperation(value = "알림 조회", notes = "사용자가 받은 알림 목록 조회")
    public ResponseEntity<BaseResponse> selectNotificationList(@ApiIgnore Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        NotificationListResponse notificationListResponse = notificationService.selectNotificationList(email);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                SELECT_NOTIFICATION_LIST_SUCCESS_MESSAGE,
                notificationListResponse)
                , HttpStatus.OK);
    }
}
