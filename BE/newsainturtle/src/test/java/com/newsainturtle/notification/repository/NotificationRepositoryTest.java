package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.FriendNotification;
import com.newsainturtle.notification.entity.Notification;
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

import static org.junit.jupiter.api.Assertions.assertEquals;

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
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Notification friendNotification1 = FriendNotification.builder()
                    .receiveUser(user)
                    .sendUserId(1L)
                    .isAccept(false)
                    .build();
            final Notification friendNotification2 = FriendNotification.builder()
                    .receiveUser(user)
                    .sendUserId(1L)
                    .isAccept(true)
                    .build();
            final Notification scheduleNotification1 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(1L)
                    .isAccept(false)
                    .notificationId(1L)
                    .build();
            final Notification scheduleNotification2 = ScheduleNotification.builder()
                    .receiveUser(user)
                    .sendUserId(1L)
                    .isAccept(true)
                    .notificationId(2L)
                    .build();
            userRepository.save(user);
            notificationRepository.save(friendNotification1);
            notificationRepository.save(friendNotification2);
            notificationRepository.save(scheduleNotification1);
            notificationRepository.save(scheduleNotification2);

            //when
            List<Notification> result = notificationRepository.findByReceiveUser(user);

            //then
            assertEquals(result.size(), 4);
        }
    }
}