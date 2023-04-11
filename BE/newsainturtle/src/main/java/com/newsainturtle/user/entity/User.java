package com.newsainturtle.user.entity;

import com.newsainturtle.friend.entity.Friend;
import com.newsainturtle.notification.entity.Notification;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
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

    @Column(length = 30, unique = true)
    private String email;
    @Column(length = 20)
    private String nickname;
    @Column(length = 60)
    private String password;
    private boolean kakao;
    private String profile;
    private boolean withdraw;


    @Builder
    public User(String email, String nickname, String password, boolean kakao, String profile, boolean withdraw) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
        this.kakao = kakao;
        this.profile = profile;
        this.withdraw = withdraw;
    }
    public void setProfile(String path){
        this.profile = path;
    }
    public void setNickname(String nickname){
        this.nickname = nickname;
    }
    public void setPassword(String password){
        this.password = new BCryptPasswordEncoder().encode(password);
    }
    public void withDrawUser(){
        this.nickname = null;
        this.password = null;
        this.profile = null;
        this.withdraw = true;
    }
}
