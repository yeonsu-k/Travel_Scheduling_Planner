package com.newsainturtle.notification.repository;

import com.newsainturtle.notification.entity.FriendNotification;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendNotificationRepository extends JpaRepository<FriendNotification, Long> {
    FriendNotification findBySendUserIdAndReceiveUser(Long sendUserId, User user);
    void deleteAllBySendUserId(Long sendUserId);
}
