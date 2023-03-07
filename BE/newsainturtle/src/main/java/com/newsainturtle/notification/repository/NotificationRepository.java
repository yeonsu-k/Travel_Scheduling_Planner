package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.Notification;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByReceiveUser(User user);

    Notification findByNotificationIdAndReceiveUser(Long notificationId, User user);

    @Transactional
    @Modifying
    @Query("DELETE FROM Notification n WHERE n.notificationId = ?1 AND n.receiveUser = ?2")
    void deleteByNotificationIdAndReceiveUser(Long notificationId, User user);

}
