package com.newsainturtle.user.service;

import com.newsainturtle.auth.dto.EmailDuplicateCheckRequest;
import com.newsainturtle.auth.dto.EmailDuplicateCheckResponse;
import com.newsainturtle.user.dto.UserBasicInfoRequest;
import com.newsainturtle.user.dto.UserBasicInfoResponse;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
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
            return new EmailDuplicateCheckResponse(false);
        }
        //중복 o -> 가입 불가능함
        return new EmailDuplicateCheckResponse(true);
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
}
