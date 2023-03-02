package com.newsainturtle.friend.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.friend.dto.UserSearchRequest;
import com.newsainturtle.friend.dto.UserSearchResponse;
import com.newsainturtle.friend.service.FriendService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

import static com.newsainturtle.friend.constant.FriendConstant.FRIEND_SEARCH_SUCCESS_MESSAGE;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/friend")
public class FriendController {

    private final FriendService friendService;

    @PostMapping("/search")
    @ApiOperation(value = "사용자 검색", notes = "친구 요청을 위한 사용자 검색")
    public ResponseEntity<BaseResponse> searchUser(@ApiIgnore Authentication authentication,
                                                   @RequestBody @Valid @ApiParam(value = "사용자 이메일", required = true)final UserSearchRequest userSearchRequest){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        UserSearchResponse userSearchResponse = friendService.searchUser(email, userSearchRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FRIEND_SEARCH_SUCCESS_MESSAGE,
                userSearchResponse)
                , HttpStatus.OK);
    }

}
