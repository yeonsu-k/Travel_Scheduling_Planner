package com.newsainturtle.schedule.constant;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class ScheduleErrorConstant {

    public static final String NULL_ERROR_MESSAGE = "데이터가 NULL 입니다.";

    public static final String NULL_SCHEDULE_LOCATION_MESSAGE = "일정 장소가 없습니다.";

    public static final String REGION_DUPLICATE_MESSAGE = "지역 등록이 중복되었습니다.";

    public static final String UNABLE_INVITE_FRIEND_MESSAGE = "친구 초대에 실패하였습니다.";
}
