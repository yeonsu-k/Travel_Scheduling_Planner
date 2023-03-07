package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.Notification;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiveUser(User user);
}
