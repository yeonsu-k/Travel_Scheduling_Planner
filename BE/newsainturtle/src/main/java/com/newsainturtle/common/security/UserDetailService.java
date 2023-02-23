package com.newsainturtle.common.security;

import com.newsainturtle.user.dto.UserBasicInfoRequest;
import com.newsainturtle.user.dto.UserBasicInfoResponse;
import com.newsainturtle.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

    public final UserService userService;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserBasicInfoResponse user = userService.emailCheck(UserBasicInfoRequest.builder().email(username).build());
        if (user != null) {
            UserDetails userDetails = new UserDetails(user);
            return userDetails;
        }
        return null;
    }
}
