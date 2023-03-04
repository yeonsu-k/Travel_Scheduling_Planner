package com.newsainturtle.friend.repository;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    Friend findByRequestUserAndReceiveUser(User requestUser, User receiveUser);
}