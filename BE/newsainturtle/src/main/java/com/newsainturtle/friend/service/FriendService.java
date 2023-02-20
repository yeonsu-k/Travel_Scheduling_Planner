package com.newsainturtle.friend.service;

import com.newsainturtle.friend.dto.UserSearchRequest;
import com.newsainturtle.friend.dto.UserSearchResponse;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class FriendService {
    private final UserRepository userRepository;

    public UserSearchResponse searchUser(UserSearchRequest userSearchRequest) {
        User user = userRepository.findByEmail(userSearchRequest.getEmail());
        if (user == null) {
            return UserSearchResponse.builder().isExist(false).build();
        }
        return UserSearchResponse.builder()
                .isExist(true)
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .build();
    }
}
