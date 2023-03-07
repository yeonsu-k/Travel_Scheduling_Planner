package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.FriendNotification;
import com.newsainturtle.notification.entity.Notification;
import com.newsainturtle.notification.entity.NotificationStatus;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DisplayName("알림 레포지토리 테스트")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class NotificationRepositoryTest {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private NotificationRepository notificationRepository;

    @Nested
    @DisplayName("알림 목록 조회")
    class SelectNotificationList {
        @Test
        @DisplayName("[성공] - 알림 목록 조회")
        void 알림목록조회() {
            //given
            final User user = User.builder()
                    .email("test@naver.com")
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
                    .notificationStatus(NotificationStatus.ACCEPT)
                    .build();
            final Notification scheduleNotification1 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.NO_RESPONSE)
                    .scheduleId(1L)
                    .build();
            final Notification scheduleNotification2 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.REJECT)
                    .scheduleId(2L)
                    .build();
            userRepository.save(user);
            notificationRepository.save(friendNotification1);
            notificationRepository.save(scheduleNotification1);
            notificationRepository.save(scheduleNotification2);

            //when
            List<Notification> result = notificationRepository.findByReceiveUser(user);

            //then
            assertEquals(result.size(), 3);
        }
    }

    @Nested
    @DisplayName("알림 개별 삭제")
    class DeleteNotification {
        @Test
        @DisplayName("사용자 소유의 알림이 아님")
        void 사용자알림이아님() {
            //given
            final User user = User.builder()
                    .email("test@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User sender = User.builder()
                    .email("test11@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Notification friendNotification1 = FriendNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.ACCEPT)
                    .build();

            userRepository.save(user);
            userRepository.save(sender);
            notificationRepository.save(friendNotification1);

            //when
            Notification result = notificationRepository.findByNotificationIdAndReceiveUser(friendNotification1.getNotificationId(), sender);
            //then
            assertNull(result);
        }

        @Test
        @DisplayName("알림 삭제")
        void 알림삭제() {
            //given
            final User user = User.builder()
                    .email("test@naver.com")
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
                    .notificationStatus(NotificationStatus.ACCEPT)
                    .build();
            final Notification scheduleNotification1 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.NO_RESPONSE)
                    .scheduleId(1L)
                    .build();
            final Notification scheduleNotification2 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.REJECT)
                    .scheduleId(2L)
                    .build();
            userRepository.save(user);
            notificationRepository.save(friendNotification1);
            notificationRepository.save(scheduleNotification1);
            notificationRepository.save(scheduleNotification2);

            //when
            Notification result1 = notificationRepository.findByNotificationIdAndReceiveUser(scheduleNotification1.getNotificationId(), user);
            notificationRepository.deleteByNotificationIdAndReceiveUser(scheduleNotification1.getNotificationId(), user);
            Notification result2 = notificationRepository.findByNotificationIdAndReceiveUser(scheduleNotification1.getNotificationId(), user);
            //then
            assertAll(
                    () -> assertNotNull(result1),
                    () -> assertNull(result2)
            );
        }
    }

    @Nested
    @DisplayName("알림 전체 삭제")
    class DeleteNotificationALL {
        @Test
        @DisplayName("알림 전체 삭제")
        void 알림전체삭제() {
            //given
            final User user = User.builder()
                    .email("test@naver.com")
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
                    .notificationStatus(NotificationStatus.ACCEPT)
                    .build();
            final Notification scheduleNotification1 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.NO_RESPONSE)
                    .scheduleId(1L)
                    .build();
            final Notification scheduleNotification2 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(sender.getUserId())
                    .notificationStatus(NotificationStatus.REJECT)
                    .scheduleId(2L)
                    .build();
            userRepository.save(user);
            notificationRepository.save(friendNotification1);
            notificationRepository.save(scheduleNotification1);
            notificationRepository.save(scheduleNotification2);

            //when
            List<Notification> result1 = notificationRepository.findByReceiveUser(user);
            notificationRepository.deleteByReceiveUser(user);
            List<Notification> result2 = notificationRepository.findByReceiveUser(user);
            //then
            assertAll(
                    () -> assertEquals(result1.size(),3),
                    () -> assertEquals(result2.size(),1)
            );
        }
    }
}