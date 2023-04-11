package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn(name = "DTYPE")
public abstract class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "location_name", length = 20)
    private String locationName;

    @Column(length = 50)
    private String address;

    private double longitude;

    private double latitude;

    @Column(name = "is_hotel")
    private boolean isHotel;

    @Column(name = "location_url")
    private String locationURL;
}
