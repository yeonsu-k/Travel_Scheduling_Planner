package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.ScheduleNotification;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface ScheduleNotificationRepository extends JpaRepository<ScheduleNotification, Long> {

    ScheduleNotification findByScheduleIdAndReceiveUser(Long scheduleId, User receiveUser);

    @Transactional
    @Modifying
    @Query("DELETE FROM ScheduleNotification n WHERE n.notificationId = ?1")
    void deleteByNotificationId(Long notificationId);

    void deleteAllByScheduleId(Long scheduleId);
}
