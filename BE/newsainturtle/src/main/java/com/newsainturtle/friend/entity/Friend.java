package com.newsainturtle.friend.entity;

import com.newsainturtle.user.entity.User;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "friend")
public class Friend {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long friendId;

    @Column(name = "is_accept")
    @ColumnDefault("false")
    private boolean isAccept;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User requestUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User receiveUser;

    @Builder
    public Friend(boolean isAccept, User requestUser, User receiveUser) {
        this.isAccept = isAccept;
        this.requestUser = requestUser;
        this.receiveUser = receiveUser;
    }

    public Friend update(boolean isAccept){
        this.isAccept = isAccept;
        return this;
    }

}
