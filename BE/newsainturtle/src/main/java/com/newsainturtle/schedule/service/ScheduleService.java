package com.newsainturtle.schedule.service;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.repository.FriendRepository;
import com.newsainturtle.notification.entity.NotificationStatus;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.notification.repository.ScheduleNotificationRepository;
import com.newsainturtle.schedule.dto.*;
import com.newsainturtle.schedule.entity.Location;
import com.newsainturtle.schedule.entity.Region;
import com.newsainturtle.schedule.entity.Schedule;
import com.newsainturtle.schedule.entity.ScheduleMember;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.exception.UnableToRequestFriendInviteException;
import com.newsainturtle.schedule.repository.LocationRepository;
import com.newsainturtle.schedule.repository.RegionRepository;
import com.newsainturtle.schedule.repository.ScheduleMemberRepository;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.newsainturtle.schedule.constant.ScheduleErrorConstant.NULL_SCHEDULE_LOCATION_MESSAGE;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final LocationRepository locationRepository;

    private final ScheduleMemberRepository scheduleMemberRepository;
    private final RegionRepository regionRepository;

    private final UserRepository userRepository;
    private final ScheduleNotificationRepository scheduleNotificationRepository;
    private final FriendRepository friendRepository;

    @Transactional
    public void createSchedule(ScheduleRequest scheduleRequest, String email) {
        Region region = regionRepository.findByRegionName(scheduleRequest.getRegionName());
        final Schedule schedule = Schedule.builder()
                .isPrivate(false)
                .scheduleRegion(region.getRegionName())
                .hostEmail(email)
                .build();
        scheduleRepository.save(schedule);
        final ScheduleMember scheduleMember = ScheduleMember.builder()
                .scheduleId(schedule.getScheduleId())
                .userEmail(email)
                .build();
        scheduleMemberRepository.save(scheduleMember);
    }

    @Transactional
    public void modifySchedulePeriod(String username, SchedulePeriodRequest schedulePeriodRequest, Long schedule_id) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()) {
            final Schedule result = schedule.get();
            result.updatePeriod(schedulePeriodRequest);
        }
    }

    @Transactional
    public void modifyScheduleStartEndLocation(String username, ScheduleStartEndLocationRequest scheduleStartEndLocationRequest, Long schedule_id) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()) {
            final Schedule result = schedule.get();
            result.updateStartEndLocation(scheduleStartEndLocationRequest);
        }
    }

    @Transactional
    public void modifyScheduleVehicle(String username, ScheduleVehicleRequest scheduleVehicleRequest, Long schedule_id) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()) {
            final Schedule result = schedule.get();
            result.updateVehicle(scheduleVehicleRequest);
        }
    }

    public ScheduleResponse findSchedule(Long scheduleId) {
        Schedule schedule = findScheduleById(scheduleId);
        return ScheduleResponse.builder()
                .hostEmail(schedule.getHostEmail())
                .scheduleRegion(schedule.getScheduleRegion())
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
                                        .regionId(scheduleLocation.getLocation().getRegion().getRegionId())
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
        if (scheduleLocationRequestList.isEmpty()) {
            throw new NullException(NULL_SCHEDULE_LOCATION_MESSAGE);
        }
    }

    @Transactional
    public void inviteFriend(String email, InviteFriendRequest inviteFriendEmailRequest) {
        long scheduleId = inviteFriendEmailRequest.getScheduleId();
        String friendEmail = inviteFriendEmailRequest.getEmail();
        User receiveUser = userRepository.findByEmail(friendEmail);

        if (receiveUser == null || receiveUser.isWithdraw() || receiveUser.getEmail().equals(email)) {
            throw new UnableToRequestFriendInviteException();
        }

        User user = userRepository.findByEmail(email);
        Friend friend = friendRepository.findByFriend(user, receiveUser);
        ScheduleMember scheduleMemberUser = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, email);
        ScheduleMember scheduleMemberFriend = scheduleMemberRepository.findByScheduleIdAndUserEmail(scheduleId, friendEmail);
        if (friend != null && scheduleMemberUser != null && scheduleMemberFriend == null) {
            ScheduleNotification scheduleNotification = scheduleNotificationRepository.findByScheduleIdAndReceiveUser(scheduleId, receiveUser);
            if (scheduleNotification != null && scheduleNotification.getNotificationStatus() == NotificationStatus.REJECT) {
                scheduleNotificationRepository.deleteByNotificationId(scheduleNotification.getNotificationId());
            }
            if (scheduleNotification == null) {
                //상대방에게 알림 전송 (실시간 처리 필요)
                ScheduleNotification newScheduleNotification = ScheduleNotification.builder()
                        .sendUserId(user.getUserId())
                        .receiveUser(receiveUser)
                        .scheduleId(scheduleId)
                        .notificationStatus(NotificationStatus.NO_RESPONSE)
                        .build();

                scheduleNotificationRepository.save(newScheduleNotification);
                return;
            }
        }

        throw new UnableToRequestFriendInviteException();
    }
}
