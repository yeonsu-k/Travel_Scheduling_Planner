package com.newsainturtle.notification.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@SuperBuilder
@DiscriminatorValue("Friend")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class FriendNotification extends Notification {

}
