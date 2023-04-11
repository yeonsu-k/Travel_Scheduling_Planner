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

    @Column(name = "english_name", length = 50)
    private String englishName;

    private String contents;

    @Builder
    public Region(String regionName, String regionImageURL, String englishName, String contents) {
        this.regionName = regionName;
        this.regionImageURL = regionImageURL;
        this.englishName = englishName;
        this.contents = contents;
    }
}
