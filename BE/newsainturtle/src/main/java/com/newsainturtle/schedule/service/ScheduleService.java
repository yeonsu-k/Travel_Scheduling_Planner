package com.newsainturtle.schedule.service;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.repository.FriendRepository;
import com.newsainturtle.notification.dto.LiveNotificationResponse;
import com.newsainturtle.notification.entity.NotificationStatus;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.notification.repository.ScheduleNotificationRepository;
import com.newsainturtle.notification.service.NotificationService;
import com.newsainturtle.schedule.dto.*;
import com.newsainturtle.schedule.entity.*;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.exception.UnableToRequestFriendInviteException;
import com.newsainturtle.schedule.exception.UninvitedUsersException;
import com.newsainturtle.schedule.repository.LocationRepository;
import com.newsainturtle.schedule.repository.RegionRepository;
import com.newsainturtle.schedule.repository.ScheduleMemberRepository;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.*;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final LocationRepository locationRepository;

    private final ScheduleMemberRepository scheduleMemberRepository;

    private final UserRepository userRepository;
    private final ScheduleNotificationRepository scheduleNotificationRepository;
    private final FriendRepository friendRepository;

    private final NotificationService notificationService;

    @Transactional
    public String createSchedule(ScheduleRequest scheduleRequest, String email) {
        isNullScheduleLocation(scheduleRequest.getScheduleLocationRequestList());
        Schedule schedule = Schedule.builder()
                .hostEmail(email)
                .regionId(scheduleRequest.getRegionId())
                .scheduleName(scheduleRequest.getScheduleName())
                .isPrivate(scheduleRequest.isPrivate())
                .scheduleStartDay(scheduleRequest.getScheduleStartDay())
                .scheduleEndDay(scheduleRequest.getScheduleEndDay())
                .scheduleStartLocation(scheduleRequest.getScheduleStartLocation())
                .scheduleEndLocation(scheduleRequest.getScheduleEndLocation())
                .vehicle(scheduleRequest.getVehicle())
                .scheduleLocations(scheduleRequest.getScheduleLocationRequestList().stream()
                        .map(scheduleLocation -> ScheduleLocation.builder()
                                .day(scheduleLocation.getDay())
                                .sequence(scheduleLocation.getSequence())
                                .startTime(scheduleLocation.getStartTime())
                                .endTime(scheduleLocation.getEndTime())
                                .location(findLocationById(scheduleLocation.getLocationId()))
                                .build()).collect(Collectors.toList()))
                .build();
        Long id = scheduleRepository.save(schedule).getScheduleId();
        scheduleMemberRepository.save(ScheduleMember.builder()
                .userEmail(email)
                .scheduleId(id)
                .build());
        return schedule.getScheduleName();
    }

    public ScheduleResponse findSchedule(Long scheduleId) {
        Schedule schedule = findScheduleById(scheduleId);
        return ScheduleResponse.builder()
                .hostEmail(schedule.getHostEmail())
                .regionId(schedule.getRegionId())
                .scheduleName(schedule.getScheduleName())
                .isPrivate(schedule.isPrivate())
                .scheduleStartDay(schedule.getScheduleStartDay())
                .scheduleEndDay(schedule.getScheduleEndDay())
                .scheduleStartLocation(schedule.getScheduleStartLocation())
                .scheduleEndLocation(schedule.getScheduleEndLocation())
                .vehicle(schedule.getVehicle())
                .scheduleLocations(schedule.getScheduleLocations().stream()
                        .map(scheduleLocation -> ScheduleLocationResponse.builder()
                                .location(LocationResponse.builder()
                                        .locationId(scheduleLocation.getLocation().getLocationId())
                                        .regionId(scheduleLocation.getLocation().getRegionId())
                                        .locationName(scheduleLocation.getLocation().getLocationName())
                                        .address(scheduleLocation.getLocation().getAddress())
                                        .longitude(scheduleLocation.getLocation().getLongitude())
                                        .latitude(scheduleLocation.getLocation().getLatitude()).build())
                                .day(scheduleLocation.getDay())
                                .sequence(scheduleLocation.getSequence())
                                .startTime(scheduleLocation.getStartTime())
                                .endTime(scheduleLocation.getEndTime())
                                .build()).collect(Collectors.toList()))
                .build();

    }

    private Schedule findScheduleById(Long scheduleId) {
        return scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new NullException());
    }

    private Location findLocationById(Long locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new NullException());
    }

    private void isNullScheduleLocation(List<ScheduleLocationRequest> scheduleLocationRequestList) {
        if(scheduleLocationRequestList.isEmpty()) {
            throw new NullException(NULL_SCHEDULE_LOCATION_MESSAGE);
        }
    }

    @Transactional
    public void inviteFriend(String email, InviteFriendRequest inviteFriendEmailRequest) {
        long scheduleId = inviteFriendEmailRequest.getScheduleId();
        String friendEmail = inviteFriendEmailRequest.getEmail();

        User user = userRepository.findByEmail(email);
        ScheduleMember scheduleMemberUser = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, email);
        if(scheduleMemberUser == null){
            throw new UninvitedUsersException();
        }

        User receiveUser = userRepository.findByEmail(friendEmail);
        if (receiveUser == null || receiveUser.isWithdraw() || receiveUser.getEmail().equals(email)) {
            throw new UnableToRequestFriendInviteException();
        }

        Friend friend = friendRepository.findByFriend(user, receiveUser);
        ScheduleMember scheduleMemberFriend = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, friendEmail);
        if (friend != null && scheduleMemberFriend == null) {
            ScheduleNotification scheduleNotification = scheduleNotificationRepository.findByScheduleIdAndReceiveUser(scheduleId, receiveUser);
            if (scheduleNotification != null && scheduleNotification.getNotificationStatus() == NotificationStatus.REJECT) {
                scheduleNotificationRepository.deleteByNotificationId(scheduleNotification.getNotificationId());
            }
            if (scheduleNotification == null) {
                ScheduleNotification newScheduleNotification = ScheduleNotification.builder()
                        .sendUserId(user.getUserId())
                        .receiveUser(receiveUser)
                        .scheduleId(scheduleId)
                        .notificationStatus(NotificationStatus.NO_RESPONSE)
                        .build();
                scheduleNotificationRepository.save(newScheduleNotification);
                //상대방에게 알림 전송 (실시간 처리 필요)
                Schedule schedule = scheduleRepository.findById(scheduleId).orElse(null);
                notificationService.sendNewNotification(friendEmail, LiveNotificationResponse.builder()
                        .senderNickname(user.getNickname())
                        .type("schedule")
                        .content(schedule.getScheduleName())
                        .build());
                return;
            }
        }

        throw new UnableToRequestFriendInviteException();
    }


    public FriendListResponse selectFriendList(String email, Long scheduleId) {
        User user = userRepository.findByEmail(email);
        ScheduleMember scheduleMemberUser = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, email);
        if (scheduleMemberUser == null) {
            throw new UninvitedUsersException();
        }

        List<Friend> friendList = friendRepository.findByFriendList(user);
        List<FriendInfoResponse> friendInfoResponseList = new ArrayList<>();
        User friendUser;

        for (Friend friend : friendList) {
            if (friend.getRequestUser().equals(user)) {
                friendUser = friend.getReceiveUser();
            } else {
                friendUser = friend.getRequestUser();
            }
            String status = "초대";
            ScheduleMember scheduleMemberFriend = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, friendUser.getEmail());
            if (scheduleMemberFriend != null) {
                status = "참여중";
            } else {
                ScheduleNotification scheduleNotification = scheduleNotificationRepository.findByScheduleIdAndReceiveUser(scheduleId, friendUser);
                if (scheduleNotification != null && scheduleNotification.getNotificationStatus() == NotificationStatus.NO_RESPONSE) {
                    status = "요청보냄";
                }
            }
            friendInfoResponseList.add(FriendInfoResponse.builder()
                    .email(friendUser.getEmail())
                    .nickname(friendUser.getNickname())
                    .profile(friendUser.getProfile())
                    .status(status)
                    .build());
        }
        return FriendListResponse.builder().friends(friendInfoResponseList).build();
    }
}

