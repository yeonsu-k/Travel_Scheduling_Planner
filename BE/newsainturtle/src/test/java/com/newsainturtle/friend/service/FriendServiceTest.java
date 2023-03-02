package com.newsainturtle.friend.service;

import com.newsainturtle.friend.dto.UserSearchRequest;
import com.newsainturtle.friend.dto.UserSearchResponse;
import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.repository.FriendRepository;
import com.newsainturtle.user.entity.User;
import com.newsainturtle.user.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
@DisplayName("친구 서비스 테스트")
class FriendServiceTest {

    @InjectMocks
    private FriendService friendService;
    @Mock
    private UserRepository userRepository;
    @Mock
    private FriendRepository friendRepository;

    @Nested
    @DisplayName("사용자 검색 테스트")
    class UserSearchTest {
        @Test
        @DisplayName("[성공] - 사용자 없음")
        void notExistUser() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            doReturn(null).when(userRepository).findByEmail(userSearchRequest.getEmail());
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertFalse(result.isExist());
        }

        @Test
        @DisplayName("[성공] - 사용자 없음(탈퇴한 사용자)")
        void WithdrawUser() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(true)
                    .build();

            doReturn(user).when(userRepository).findByEmail(userSearchRequest.getEmail());
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertFalse(result.isExist());
        }

        @Test
        @DisplayName("[성공] - 사용자 있음(본인)")
        void searchForMe() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("test127@naver.com")
                    .build();
            final User user = User.builder()
                    .email("test127@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            doReturn(user).when(userRepository).findByEmail(userSearchRequest.getEmail());
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertAll(
                    ()-> assertTrue(result.isExist()),
                    ()-> assertEquals(result.getStatus(),"본인")
            );
        }

        @Test
        @DisplayName("[성공] - 사용자 있음(친구)")
        void searchForFriend() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User receiveUser = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User requestUser = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Friend friend = Friend.builder()
                    .isAccept(true)
                    .receiveUser(receiveUser)
                    .requestUser(requestUser)
                    .build();

            doReturn(requestUser).when(userRepository).findByEmail(email);
            doReturn(receiveUser).when(userRepository).findByEmail(userSearchRequest.getEmail());
            doReturn(friend).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertAll(
                    ()-> assertTrue(result.isExist()),
                    ()-> assertEquals(result.getStatus(),"친구")
            );
        }

        @Test
        @DisplayName("[성공] - 사용자 있음(이미 요청 보냄)")
        void alreadyFriendRequestSent() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User receiveUser = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User requestUser = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Friend friend = Friend.builder()
                    .isAccept(false)
                    .receiveUser(receiveUser)
                    .requestUser(requestUser)
                    .build();

            doReturn(requestUser).when(userRepository).findByEmail(email);
            doReturn(receiveUser).when(userRepository).findByEmail(userSearchRequest.getEmail());
            doReturn(friend).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertAll(
                    ()-> assertTrue(result.isExist()),
                    ()-> assertEquals(result.getStatus(),"요청완료")
            );
        }

        @Test
        @DisplayName("[성공] - 사용자 있음(친구 요청 보내기 가능)")
        void noFriendRequestSent() {
            //given
            final String email = "test127@naver.com";
            final UserSearchRequest userSearchRequest = UserSearchRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User receiveUser = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User requestUser = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            doReturn(requestUser).when(userRepository).findByEmail(email);
            doReturn(receiveUser).when(userRepository).findByEmail(userSearchRequest.getEmail());
            doReturn(null).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);
            //when
            final UserSearchResponse result = friendService.searchUser(email,userSearchRequest);
            //then
            assertAll(
                    ()-> assertTrue(result.isExist()),
                    ()-> assertEquals(result.getStatus(),"친구요청")
            );
        }

    }
}