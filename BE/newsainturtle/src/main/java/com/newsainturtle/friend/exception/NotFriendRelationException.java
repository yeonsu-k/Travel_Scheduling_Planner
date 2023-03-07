package com.newsainturtle.friend.exception;

import com.newsainturtle.common.exception.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import static com.newsainturtle.friend.constant.FriendConstant.NOT_FRIEND_RELATION_ERROR_MESSAGE;


@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotFriendRelationException extends BadRequestException {
    public NotFriendRelationException() {
        super(NOT_FRIEND_RELATION_ERROR_MESSAGE);
    }
}