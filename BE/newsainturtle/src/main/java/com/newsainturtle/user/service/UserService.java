package com.newsainturtle.user.service;

import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.auth.dto.UserJoinRequest;
import com.newsainturtle.auth.dto.UserJoinResponse;
import com.newsainturtle.auth.exception.NoEmailCheckException;
import com.newsainturtle.user.dto.UserBasicInfoRequest;
import com.newsainturtle.user.dto.UserBasicInfoResponse;
import com.newsainturtle.user.dto.UserInfoResponse;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public EmailDuplicateCheckResponse emailDuplicateCheck(EmailDuplicateCheckRequest emailDuplicateCheckRequest) {
        User user = userRepository.findByEmail(emailDuplicateCheckRequest.getEmail());
        //중복 x -> 가입 가능함
        if (user == null) {
            return EmailDuplicateCheckResponse.builder().DuplicateCheck(true).build();
        }
        //중복 o -> 가입 불가능함
        return EmailDuplicateCheckResponse.builder().DuplicateCheck(false).build();
    }

    public UserBasicInfoResponse emailCheck(UserBasicInfoRequest userBasicInfoRequest) {
        User user = userRepository.findByEmail(userBasicInfoRequest.getEmail());
        if (user == null) {
            return null;
        }
        return UserBasicInfoResponse.builder()
                .email(user.getEmail())
                .build();
    }

    @Transactional
    public UserJoinResponse joinUser(UserJoinRequest userJoinRequest) {
        if (!userJoinRequest.isDuplicatedCheck()) {
            throw new NoEmailCheckException();
        }
        final String encodedPassword = new BCryptPasswordEncoder().encode(userJoinRequest.getPassword());
        final User user = User.builder()
                .email(userJoinRequest.getEmail())
                .nickname(userJoinRequest.getNickname())
                .password(encodedPassword)
                .profile("")
                .withdraw(false)
                .kakao(false)
                .build();
        final User result = userRepository.save(user);
        return UserJoinResponse.builder()
                .email(result.getEmail())
                .nickname(result.getNickname()).build();
    }

    public UserInfoResponse getUserInfo(String email) {
        User user = userRepository.findByEmail(email);
        return UserInfoResponse.builder().
                email(user.getEmail()).
                nickname(user.getNickname()).
                profile(user.getProfile()).
                build();
    }
}
