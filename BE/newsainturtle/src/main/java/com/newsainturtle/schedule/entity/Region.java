package com.newsainturtle.schedule.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "region_name", length = 20)
    private String regionName;

    @Column(name = "region_image_url")
    private String regionImageURL;

    @Builder
    public Region(String regionName, String regionImageURL) {
        this.regionName = regionName;
        this.regionImageURL = regionImageURL;
    }
}
