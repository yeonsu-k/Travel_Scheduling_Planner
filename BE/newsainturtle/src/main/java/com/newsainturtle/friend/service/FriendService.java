package com.newsainturtle.friend.service;

import com.newsainturtle.friend.dto.UserSearchRequest;
import com.newsainturtle.friend.dto.UserSearchResponse;
import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.repository.FriendRepository;
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
    private final FriendRepository friendRepository;

    public UserSearchResponse searchUser(String email, UserSearchRequest userSearchRequest) {
        User user = userRepository.findByEmail(userSearchRequest.getEmail());
        if (user == null || user.isWithdraw()) {
            return UserSearchResponse.builder().isExist(false).build();
        }
        String status = checkUserRelationships(email,user);
        return UserSearchResponse.builder()
                .isExist(true)
                .email(user.getEmail())
                .nickname(user.getNickname())
                .profile(user.getProfile())
                .status(status)
                .build();
    }

    String checkUserRelationships(String email, User receiveUser){
        if(receiveUser.getEmail().equals(email)){
            return  "본인";
        }else {
            User requestUser = userRepository.findByEmail(email);
            Friend friend = friendRepository.findByRequestUserAndReceiveUser(requestUser,receiveUser);
            if(friend == null){
                friend = friendRepository.findByRequestUserAndReceiveUser(receiveUser,requestUser);
                if(friend == null || !friend.isAccept()){
                    return "친구요청";
                }
            }else if(!friend.isAccept()){
                return "요청완료";
            }
        }
        return "친구";
    }
}
