package com.newsainturtle.notification.service;

import com.newsainturtle.notification.dto.NotificationListResponse;
import com.newsainturtle.notification.entity.FriendNotification;
import com.newsainturtle.notification.entity.Notification;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.notification.repository.NotificationRepository;
import com.newsainturtle.schedule.entity.Schedule;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
@DisplayName("알림 서비스 테스트")
class NotificationServiceTest {

    @InjectMocks
    private NotificationService notificationService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private NotificationRepository notificationRepository;
    @Mock
    private ScheduleRepository scheduleRepository;

    @Nested
    @DisplayName("알림 조회 테스트")
    class SelectNotificationListTest {
        @Test
        @DisplayName("[성공] - 알림 없음")
        void nullNotificationList() {
            //given
            final String email = "yunaghgh@naver.com";
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            List<Notification> notifications = new ArrayList<>();

            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(notifications).when(notificationRepository).findByReceiveUser(user);
            //when
            final NotificationListResponse result = notificationService.selectNotificationList(email);
            //then
            assertEquals(result.getNotifications().size(), 0);
        }

        @Test
        @DisplayName("[성공] - 알림 있음")
        void getNotificationList() {
            //given
            final String email = "yunaghgh@naver.com";
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User sender = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Notification friendNotification1 = FriendNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(Notification.Status.ACCEPT)
                    .build();
            final Notification scheduleNotification1 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(Notification.Status.NO_RESPONSE)
                    .scheduleId(1L)
                    .build();
            final Notification scheduleNotification2 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(Notification.Status.REJECT)
                    .scheduleId(2L)
                    .build();
            final Optional<Schedule> schedule1 = Optional.of(Schedule.builder()
                    .scheduleName("부산 여행")
                    .build());
            final Optional<Schedule> schedule2 = Optional.of(Schedule.builder()
                    .scheduleName("서울 여행")
                    .build());

            List<Notification> notifications = new ArrayList<>();
            notifications.add(friendNotification1);
            notifications.add(scheduleNotification1);
            notifications.add(scheduleNotification2);

            final Optional<User> optionalSender = Optional.of(User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build());

            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(optionalSender).when(userRepository).findById(sender.getUserId());
            doReturn(schedule1).when(scheduleRepository).findById(1L);
            doReturn(schedule2).when(scheduleRepository).findById(2L);
            doReturn(notifications).when(notificationRepository).findByReceiveUser(user);
            //when
            final NotificationListResponse result = notificationService.selectNotificationList(email);
            //then
            assertAll(
                    () -> assertNotNull(result.getNotifications()),
                    () -> assertEquals(result.getNotifications().size(), 3)
            );
        }
    }
}