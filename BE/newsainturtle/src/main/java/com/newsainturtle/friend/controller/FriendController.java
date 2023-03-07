package com.newsainturtle.friend.controller;

import com.newsainturtle.common.dto.BaseResponse;
import com.newsainturtle.common.security.UserDetails;
import com.newsainturtle.friend.dto.*;
import com.newsainturtle.friend.service.FriendService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

import static com.newsainturtle.friend.constant.FriendConstant.*;

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

    @PostMapping("")
    @ApiOperation(value = "친구 요청", notes = "친구 요청")
    public ResponseEntity<BaseResponse> followFriend(@ApiIgnore Authentication authentication,
                                                     @RequestBody @Valid @ApiParam(value = "사용자 이메일", required = true)final FriendFollowRequest friendFollowRequest){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        friendService.followUser(email, friendFollowRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FRIEND_FOLLOW_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

    @GetMapping("")
    @ApiOperation(value = "친구 목록 조회", notes = "자신의 친구 목록 조회")
    public ResponseEntity<BaseResponse> followFriend(@ApiIgnore Authentication authentication){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        FriendListResponse friends = friendService.selectFriendList(email);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                SELECT_FRIEND_LIST_SUCCESS_MESSAGE,
                friends)
                , HttpStatus.OK);
    }

    @DeleteMapping("")
    @ApiOperation(value = "친구 삭제", notes = "친구 삭제")
    public ResponseEntity<BaseResponse> removeFriend(@ApiIgnore Authentication authentication,
                                                     @RequestBody @Valid @ApiParam(value = "사용자 이메일", required = true)final FriendRemoveRequest friendRemoveRequest){
        UserDetails userDetails = (UserDetails) authentication.getDetails();
        String email = userDetails.getUsername();
        friendService.removeFriend(email, friendRemoveRequest);
        return new ResponseEntity<>(BaseResponse.from(
                true,
                FRIEND_REMOVE_SUCCESS_MESSAGE)
                , HttpStatus.OK);
    }

}
