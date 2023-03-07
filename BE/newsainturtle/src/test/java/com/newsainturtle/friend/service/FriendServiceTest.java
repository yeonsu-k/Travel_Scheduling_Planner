package com.newsainturtle.friend.service;

import com.newsainturtle.friend.dto.*;
import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.friend.exception.NotFriendRelationException;
import com.newsainturtle.friend.exception.UnableToRequestFriendFollowException;
import com.newsainturtle.friend.exception.UnauthorizedFriendException;
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

import java.util.ArrayList;
import java.util.List;

import static com.newsainturtle.friend.constant.FriendConstant.*;
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
            //then
            assertAll(
                    () -> assertTrue(result.isExist()),
                    () -> assertEquals(result.getStatus(), "본인")
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
            //then
            assertAll(
                    () -> assertTrue(result.isExist()),
                    () -> assertEquals(result.getStatus(), "친구")
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
            //then
            assertAll(
                    () -> assertTrue(result.isExist()),
                    () -> assertEquals(result.getStatus(), "요청완료")
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
            final UserSearchResponse result = friendService.searchUser(email, userSearchRequest);
            //then
            assertAll(
                    () -> assertTrue(result.isExist()),
                    () -> assertEquals(result.getStatus(), "친구요청")
            );
        }

    }

    @Nested
    @DisplayName("친구 요청 테스트")
    class FriendFollowTest {
        @Test
        @DisplayName("[실패] - 친구 요청을 할 수 없는 사용자")
        void 친구요청을할수없는사용자() {
            //given
            final String email = "test127@naver.com";
            final FriendFollowRequest friendFollowRequest = FriendFollowRequest.builder()
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
            doReturn(receiveUser).when(userRepository).findByEmail(friendFollowRequest.getEmail());
            doReturn(friend).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);

            //when
            UnableToRequestFriendFollowException result = assertThrows(UnableToRequestFriendFollowException.class,
                    () -> friendService.followUser(email, friendFollowRequest));
            //then
            assertEquals(FRIEND_FOLLOW_FAIL_MESSAGE, result.getMessage());
        }

        @Test
        @DisplayName("[성공] - 친구 요청 보냄")
        void 친구요청성공_친구요청보냄() {
            //given
            final String email = "test127@naver.com";
            final FriendFollowRequest friendFollowRequest = FriendFollowRequest.builder()
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
            doReturn(receiveUser).when(userRepository).findByEmail(friendFollowRequest.getEmail());
            doReturn(null).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);
            //when
            friendService.followUser(email, friendFollowRequest);
            //then

        }

        @Test
        @DisplayName("[성공] - 요청 수락, 친구됨")
        void 친구요청성공_친구요청수락() {
            //given
            final String email = "test127@naver.com";
            final FriendFollowRequest friendFollowRequest = FriendFollowRequest.builder()
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
                    .receiveUser(requestUser)
                    .requestUser(receiveUser)
                    .build();

            doReturn(requestUser).when(userRepository).findByEmail(email);
            doReturn(receiveUser).when(userRepository).findByEmail(friendFollowRequest.getEmail());
            doReturn(null).when(friendRepository).findByRequestUserAndReceiveUser(requestUser, receiveUser);
            doReturn(friend).when(friendRepository).findByRequestUserAndReceiveUser(receiveUser, requestUser);
            //when
            friendService.followUser(email, friendFollowRequest);
            //then

        }
    }

    @Nested
    @DisplayName("친구 목록 조회 테스트")
    class SelectFriendListTest {
        @Test
        @DisplayName("[성공] - 친구 목록 조회")
        void 친구목록조회() {
            final String email = "yunaghgh@naver.com";
            final User user = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User friendUser1 = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final Friend friend = Friend.builder()
                    .isAccept(true)
                    .receiveUser(user)
                    .requestUser(friendUser1)
                    .build();
            List<Friend> friendList = new ArrayList<>();
            friendList.add(friend);

            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(friendList).when(friendRepository).findByFriendList(user);

            //when
            FriendListResponse result = friendService.selectFriendList(email);
            //then
            assertEquals(result.getFriends().size(), 1);
        }
    }

    @Nested
    @DisplayName("친구 삭제 테스트")
    class RemoveFriendTest {
        @Test
        @DisplayName("[실패] - 요청한 친구가 사용자가 아님")
        void 친구가사용자가아닌경우() {
            //given
            final String email = "test127@naver.com";
            final FriendRemoveRequest friendRemoveRequest = FriendRemoveRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User user = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(null).when(userRepository).findByEmail(friendRemoveRequest.getEmail());
            //when
            UnauthorizedFriendException result = assertThrows(UnauthorizedFriendException.class,
                    () -> friendService.removeFriend(email, friendRemoveRequest));
            //then
            assertEquals(UNAUTHORIZED_FRIEND_ERROR_MESSAGE, result.getMessage());
        }

        @Test
        @DisplayName("[실패] - 친구 사이 아님")
        void 친구사이가아닌경우() {
            //given
            final String email = "test127@naver.com";
            final FriendRemoveRequest friendRemoveRequest = FriendRemoveRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User user = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User friendUser = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(friendUser).when(userRepository).findByEmail(friendRemoveRequest.getEmail());
            //when
            NotFriendRelationException result = assertThrows(NotFriendRelationException.class,
                    () -> friendService.removeFriend(email, friendRemoveRequest));
            //then
            assertEquals(NOT_FRIEND_RELATION_ERROR_MESSAGE, result.getMessage());
        }

        @Test
        @DisplayName("[성공] - 친구 맞음 -> 친구 삭제")
        void 친구삭제() {
            //given
            final String email = "test127@naver.com";
            final FriendRemoveRequest friendRemoveRequest = FriendRemoveRequest.builder()
                    .email("yunaghgh@naver.com")
                    .build();
            final User user = User.builder()
                    .email("test127@naver.com")
                    .nickname("johnny")
                    .password("pwd127")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();
            final User friendUser = User.builder()
                    .email("yunaghgh@naver.com")
                    .nickname("Kuuuna98")
                    .password("pwd1234")
                    .kakao(false)
                    .profile("path")
                    .withdraw(false)
                    .build();

            final Friend friend = Friend.builder()
                    .isAccept(false)
                    .receiveUser(user)
                    .requestUser(friendUser)
                    .build();
            doReturn(user).when(userRepository).findByEmail(email);
            doReturn(friendUser).when(userRepository).findByEmail(friendRemoveRequest.getEmail());
            doReturn(friend).when(friendRepository).findByFriend(user, friendUser);

            //when
            friendService.removeFriend(email, friendRemoveRequest);
        }
    }
}