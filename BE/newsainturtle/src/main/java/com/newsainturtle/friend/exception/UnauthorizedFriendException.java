package com.newsainturtle.friend.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.friend.constant.FriendConstant.UNAUTHORIZED_FRIEND_ERROR_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class UnauthorizedFriendException extends BadRequestException {
    public UnauthorizedFriendException() {
        super(UNAUTHORIZED_FRIEND_ERROR_MESSAGE);
    }
}