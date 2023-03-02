package com.newsainturtle.friend.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.friend.constant.FriendConstant.FRIEND_FOLLOW_FAIL_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UnableToRequestFriendFollowException extends BadRequestException {
    public UnableToRequestFriendFollowException() {
        super(FRIEND_FOLLOW_FAIL_MESSAGE);
    }
}