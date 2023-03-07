package com.newsainturtle.friend.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class FriendConstant {
    public static final String FRIEND_SEARCH_SUCCESS_MESSAGE = "사용자 검색에 성공했습니다.";
    public static final String FRIEND_FOLLOW_SUCCESS_MESSAGE = "친구 요청이 완료되었습니다.";
    public static final String SELECT_FRIEND_LIST_SUCCESS_MESSAGE = "친구목록 조회에 성공했습니다.";

    public static final String FRIEND_FOLLOW_FAIL_MESSAGE = "친구 요청에 실패하였습니다.";
    public static final String UNAUTHORIZED_FRIEND_ERROR_MESSAGE = "존재하지 않는 회원입니다.";
    public static final String NOT_FRIEND_RELATION_ERROR_MESSAGE = "존재하지 않는 회원입니다.";
}
