package com.newsainturtle.schedule.service;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.repository.FriendRepository;
import com.newsainturtle.notification.dto.LiveNotificationResponse;
import com.newsainturtle.notification.entity.NotificationStatus;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.notification.repository.ScheduleNotificationRepository;
import com.newsainturtle.notification.service.NotificationService;
import com.newsainturtle.schedule.dto.*;
import com.newsainturtle.schedule.dto.webDto.OpenStreetInfoResponse;
import com.newsainturtle.schedule.dto.webDto.OpenStreetResponse;
import com.newsainturtle.schedule.entity.*;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.exception.UnableToRequestFriendInviteException;
import com.newsainturtle.schedule.exception.UninvitedUsersException;
import com.newsainturtle.schedule.repository.LocationRepository;
import com.newsainturtle.schedule.repository.ScheduleMemberRepository;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.ParallelFlux;
import reactor.core.scheduler.Schedulers;

import java.util.*;
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
                .isPrivate(scheduleRequest.getIsPrivate())
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

    public List<ScheduleResponse> findTravels() {
        List<Schedule> scheduleList = scheduleRepository.findByPrivateTrue();
        if(6<scheduleList.size()) {
            Random random = new Random();
            int[] idx = new int[6];
            for(int i=0; i<6; i++) {
                idx[i] = random.nextInt(scheduleList.size());
                for(int j=0; j<i; j++) {
                    if(idx[j]==idx[i]) i--;
                }
            }
            List<Schedule> newList = new ArrayList<>();
            for(int i=0; i<6; i++) newList.add(scheduleList.get(idx[i]));
            return makeDto(newList);
        }
        else {
            return makeDto(scheduleList);
        }
    }

    public List<List<ScheduleLocationSetResponse>> setScheduleLocation(ScheduleLocationSetRequest scheduleLocationSetRequest) {
        int day = scheduleLocationSetRequest.getHotelList().size()+1;
        int cnt = scheduleLocationSetRequest.getPlaceList().size();
        int[] placeCnt = new int[day];
        if(cnt%day==0) {
            for(int i=0; i<day; i++) {
                placeCnt[i] = cnt/day+1;
            }
        }
        else {
            int num = cnt%day;
            for(int i=0; i<day; i++) {
                placeCnt[i] = cnt/day+1;
                if(0<num--) placeCnt[i]++;
            }
        }

        List<LocationSetRequest[]> dayList = new ArrayList<>();
        for(int i=0; i<day; i++) {
            dayList.add(new LocationSetRequest[placeCnt[i]+1]);
        }
        dayList.get(0)[0] = scheduleLocationSetRequest.getPointPlace().get(0);
        for(int i=1; i<day; i++) {
            dayList.get(i)[0] = scheduleLocationSetRequest.getHotelList().get(i-1);
        }
        List<Plc> place = new ArrayList<>();
        place = scheduleLocationSetRequest.getPlaceList()
                .stream()
                .map(locationSetRequest -> new Plc(locationSetRequest))
                .collect(Collectors.toList());
        for(int c=0; c<day; c++) {
            place = setDistance(place,dayList.get(c)[0]);
            Collections.sort(place);
            for(int i=1; i<placeCnt[c]; i++) {
                dayList.get(c)[i] = place.get(0).locationSetRequest;
                place.remove(0);
            }
        }
        for(int i=0; i<day-1; i++) {
            dayList.get(i)[placeCnt[i]] = scheduleLocationSetRequest.getHotelList().get(i);
        }
        dayList.get(day-1)[placeCnt[day-1]] = scheduleLocationSetRequest.getPointPlace().get(1);
        List<double[]> durationList = new ArrayList<>();
        for(int i=0; i<day; i++) {
            int n = dayList.get(i).length-1;
            for(int j=0; j<n; j++) {
                LocationSetRequest locationSetRequest1 = dayList.get(i)[j];
                LocationSetRequest locationSetRequest2 = dayList.get(i)[j+1];
                durationList.add(new double[]{locationSetRequest1.getLongtitude(),locationSetRequest1.getLatitude()
                        ,locationSetRequest2.getLongtitude(),locationSetRequest2.getLatitude()});
            }
        }
        Mono<List<OpenStreetResponse>> mono = findFlux(durationList).sequential().collectList();
        List<OpenStreetResponse> list = mono.block();
        List<List<ScheduleLocationSetResponse>> scheduleLocationSetResponse = new ArrayList<>();
        int listIdx = 0;
        for(int i=0; i<day; i++) {
            scheduleLocationSetResponse.add(new ArrayList<>());
            int min = 0;
            int hour = 10;
            for(int j=0; j<dayList.get(i).length; j++) {
                LocationSetRequest locationSetRequest = dayList.get(i)[j];
                String startTime = hour+":"+min;
                StringTokenizer st = new StringTokenizer(locationSetRequest.getTime(),":");
                hour += Integer.parseInt(st.nextToken());
                min += Integer.parseInt(st.nextToken());
                if(60<=min) {
                    min %= 60;
                    hour++;
                }
                String endTime = hour+":"+min;
                if(j==dayList.get(i).length-1) continue;
                OpenStreetInfoResponse openStreetInfoResponse = list.get(listIdx++).getResponse().get(0);
                int time = (int)Math.round(openStreetInfoResponse.getDuration()/60);
                min += time;
                if(60<=min) {
                    hour += min/60;
                    min %= 60;
                }
                scheduleLocationSetResponse.get(i).add(ScheduleLocationSetResponse
                        .builder()
                        .location(locationSetRequest)
                        .day(i+1L)
                        .sequence(j+1L)
                        .startTime(startTime)
                        .endTime(endTime)
                        .build());
            }
        }
        return scheduleLocationSetResponse;
    }
    private List<Plc> setDistance(List<Plc> place, LocationSetRequest target) {
        for(int i=0; i<place.size(); i++) {
            double d = distance(target, place.get(i).locationSetRequest);
            place.get(i).dist = d;
        }
        return place;
    }
    private class Plc implements Comparable<Plc> {
        LocationSetRequest locationSetRequest;
        double dist;
        Plc(LocationSetRequest locationSetRequest) {
            this.locationSetRequest = locationSetRequest;
            dist = 0;
        }

        @Override
        public int compareTo(Plc o) {
            return (int)(this.dist-o.dist);
        }
    }

    private Mono<OpenStreetResponse> findMono(double[] ll) {
        String url = "http://newsain.kro.kr:5000/route/v1/driving/"+ll[0]+","+ll[1]+";"+ll[2]+","+ll[3];
        WebClient webClient = WebClient.create();
        return webClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(OpenStreetResponse.class);
    }

    private ParallelFlux findFlux(List<double[]> url) {
        return Flux.fromIterable(url)
                .parallel()
                .runOn(Schedulers.elastic())
                .flatMap(this::findMono);
    }
    private double distance(LocationSetRequest locationSetRequest1, LocationSetRequest locationSetRequest2) {
        double lat1 = locationSetRequest1.getLatitude();
        double lon1 = locationSetRequest1.getLongtitude();
        double lat2 = locationSetRequest2.getLatitude();
        double lon2 = locationSetRequest2.getLongtitude();
        double theta = lon1 - lon2;
        double dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
                * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344;
        return (dist);
    }

    private double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    private double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }


    private List<ScheduleResponse> makeDto(List<Schedule> scheduleList) {
        return scheduleList
                .stream()
                .map(schedule -> ScheduleResponse.builder()
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
                        .build()
                ).collect(Collectors.toList());
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

