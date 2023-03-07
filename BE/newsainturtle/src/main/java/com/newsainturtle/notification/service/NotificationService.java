package com.newsainturtle.notification.service;

import com.newsainturtle.notification.dto.NotificationListResponse;
import com.newsainturtle.notification.dto.NotificationResponse;
import com.newsainturtle.notification.entity.FriendNotification;
import com.newsainturtle.notification.entity.Notification;
import com.newsainturtle.notification.entity.NotificationStatus;
import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.notification.exception.NoResponseNotificationException;
import com.newsainturtle.notification.exception.NotUserOwnNotificationException;
import com.newsainturtle.notification.repository.NotificationRepository;
import com.newsainturtle.schedule.entity.Schedule;
import com.newsainturtle.schedule.repository.ScheduleRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {
    private final UserRepository userRepository;
    private final NotificationRepository notificationRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional(readOnly = true)
    public NotificationListResponse selectNotificationList(String email) {
        User user = userRepository.findByEmail(email);
        List<Notification> notifications = notificationRepository.findByReceiveUser(user);
        List<NotificationResponse> notificationResponses = new ArrayList<>();

        for (Notification notification : notifications) {
            User sender = userRepository.findById(notification.getSendUserId()).orElse(null);
            if (sender == null || sender.isWithdraw()) {
                continue; //알림 데이터 삭제?
            }
            String type, content;
            if (notification instanceof FriendNotification) {
                type = "friend";
                content = "친구 요청";
            } else {
                type = "schedule";
                Schedule schedule = scheduleRepository.findById(((ScheduleNotification) notification).getScheduleId()).orElse(null);
                if (schedule == null) {
                    continue; //알림 데이터 삭제?
                } else {
                    content = schedule.getScheduleName();
                }
            }

            notificationResponses.add(NotificationResponse.builder()
                    .notificationId(notification.getNotificationId())
                    .senderNickname(sender.getNickname())
                    .type(type)
                    .content(content)
                    .status(notification.getNotificationStatus().name())
                    .build());
        }
        return NotificationListResponse.builder().notifications(notificationResponses).build();
    }

    public void removeNotification(String email, Long notificationId) {
        User user = userRepository.findByEmail(email);
        Notification notification = notificationRepository.findByNotificationIdAndReceiveUser(notificationId, user);
        if (notification == null) {
            throw new NotUserOwnNotificationException();
        }
        if (notification.getNotificationStatus() == NotificationStatus.NO_RESPONSE) {
            throw new NoResponseNotificationException();
        }
        notificationRepository.deleteByNotificationIdAndReceiveUser(notificationId, user);
    }

    public void removeNotificationAll(String email) {
        User user = userRepository.findByEmail(email);
        notificationRepository.deleteByReceiveUser(user);
    }
}