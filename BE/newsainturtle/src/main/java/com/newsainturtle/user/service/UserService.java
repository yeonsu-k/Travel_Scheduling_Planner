package com.newsainturtle.user.service;

import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.auth.dto.UserJoinResponse;
import com.newsainturtle.auth.exception.NoEmailCheckException;
import com.newsainturtle.friend.repository.FriendRepository;
import com.newsainturtle.notification.repository.FriendNotificationRepository;
import com.newsainturtle.notification.repository.NotificationRepository;
import com.newsainturtle.schedule.entity.Schedule;
import com.newsainturtle.schedule.entity.ScheduleMember;
import com.newsainturtle.schedule.repository.ScheduleMemberRepository;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.dto.*;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.exception.NotEqualsPasswordException;
import com.newsainturtle.user.exception.NotHostException;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final ScheduleMemberRepository scheduleMemberRepository;
    private final FriendRepository friendRepository;
    private final NotificationRepository notificationRepository;
    private final FriendNotificationRepository friendNotificationRepository;

    public EmailDuplicateCheckResponse emailDuplicateCheck(EmailDuplicateCheckRequest emailDuplicateCheckRequest) {
        User user = userRepository.findByEmail(emailDuplicateCheckRequest.getEmail());
        //중복 x -> 가입 가능함
        if (user == null) {
            return EmailDuplicateCheckResponse.builder().DuplicateCheck(true).build();
        }
        //중복 o -> 가입 불가능함
        return EmailDuplicateCheckResponse.builder().DuplicateCheck(false).build();
    }

    public UserBasicInfoResponse emailCheck(UserBasicInfoRequest userBasicInfoRequest) {
        User user = userRepository.findByEmail(userBasicInfoRequest.getEmail());
        if (user == null) {
            return null;
        }
        return UserBasicInfoResponse.builder()
                .email(user.getEmail())
                .build();
    }

    @Transactional
    public UserJoinResponse joinUser(UserJoinRequest userJoinRequest) {
        if (!userJoinRequest.isDuplicatedCheck()) {
            throw new NoEmailCheckException();
        }
        final String encodedPassword = new BCryptPasswordEncoder().encode(userJoinRequest.getPassword());
        final User user = User.builder()
                .email(userJoinRequest.getEmail())
                .nickname(userJoinRequest.getNickname())
                .password(encodedPassword)
                .profile("")
                .withdraw(false)
                .kakao(false)
                .build();
        final User result = userRepository.save(user);
        return UserJoinResponse.builder()
                .email(result.getEmail())
                .nickname(result.getNickname()).build();
    }

    public UserInfoResponse getUserInfo(String email) {
        User user = userRepository.findByEmail(email);
        return UserInfoResponse.builder().
                email(user.getEmail()).
                nickname(user.getNickname()).
                profile(user.getProfile()).
                build();
    }
    @Transactional
    public ProfileResponse modifyProfile(String email, String path){
        User user = userRepository.findByEmail(email);
        user.setProfile(path);
        return ProfileResponse.builder().path(path).build();
    }

    @Transactional
    public void modifyUserInfo(String email, ModifyUserInfoRequest modifyUserInfoRequest) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findByEmail(email);
        if(!encoder.matches(modifyUserInfoRequest.getPassword(), user.getPassword())){
            throw new NotEqualsPasswordException();
        }
        if(!modifyUserInfoRequest.getNewPassword().equals("")) user.setPassword(modifyUserInfoRequest.getNewPassword());
        user.setNickname(modifyUserInfoRequest.getNickname());
    }

    @Transactional
    public void modifyScheduleName(String schedule_name, Long schedule_id, String email) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()){
            if(schedule.get().getHostEmail().equals(email))   schedule.ifPresent(value -> value.setScheduleName(schedule_name));
            else{
                throw new NotHostException();
            }
        }

    }

    public List<ScheduleListResponse> getScheduleList(String email) {
        List<ScheduleMember> list = scheduleMemberRepository.findAllByUserEmail(email);
        List<Optional<Schedule>> schedule_list = new ArrayList<>();
        for (ScheduleMember scheduleMember : list) {
            schedule_list.add(scheduleRepository.findById(scheduleMember.getScheduleId()));
        }
        List<ScheduleListResponse> result = new ArrayList<>();
        for (Optional<Schedule> schedule : schedule_list) {
            result.add(ScheduleListResponse.of(schedule, email));
        }
        return result;
    }

    @Transactional
    public void modifyScheduleIsPrivate(Long schedule_id, String email) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()){
            if(schedule.get().getHostEmail().equals(email)) schedule.ifPresent(Schedule::changeIsPrivate);
            else{
                throw new NotHostException();
            }
        }

    }

    @Transactional
    public void deleteSchedule(Long schedule_id, String email) {
        Optional<Schedule> schedule = scheduleRepository.findById(schedule_id);
        if(schedule.isPresent()){
            if(Objects.equals(schedule.get().getHostEmail(), email)){
                scheduleRepository.deleteById(schedule_id);
                scheduleMemberRepository.deleteAllByScheduleId(schedule_id);
            }
            else{
                scheduleMemberRepository.deleteByScheduleIdAndUserEmail(schedule_id, email);
            }
        }
    }

    @Transactional
    public void withdrawUser(String email) {
        User user = userRepository.findByEmail(email);
        user.withDrawUser();
        friendRepository.deleteAllByRequestUserOrReceiveUser(user, user);
        notificationRepository.deleteByReceiveUser(user);
        friendNotificationRepository.deleteAllBySendUserId(user.getUserId());
    }
}
