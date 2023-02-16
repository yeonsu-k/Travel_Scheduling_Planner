package com.newsainturtle.user.entity;

import com.newsainturtle.friend.entity.Friend;
import lombok.*;

import javax.persistence.*;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(length = 30)
    private String email;
    @Column(length = 20)
    private String nickname;
    @Column(length = 20)
    private String password;
    private boolean kakao;
    private String profile;
    private boolean withdraw;

    @OneToMany(cascade = CascadeType.ALL)
    private final List<Friend> friends = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "receiveUser", cascade = CascadeType.ALL)
    private List<Notification> notifications = new ArrayList<>();

    @Builder
    public User(String email, String nickname, String password, boolean kakao, String profile, boolean withdraw) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.kakao = kakao;
        this.profile = profile;
        this.withdraw = withdraw;
    }
}
