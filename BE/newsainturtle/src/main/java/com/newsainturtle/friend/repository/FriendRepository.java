package com.newsainturtle.friend.repository;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FriendRepository extends JpaRepository<Friend, Long> {
    Friend findByRequestUserAndReceiveUser(User requestUser, User receiveUser);

    @Query("SELECT f FROM Friend f WHERE (f.requestUser = ?1 OR f.receiveUser = ?1) AND f.isAccept = true")
    List<Friend> findByFriendList(User user);
}