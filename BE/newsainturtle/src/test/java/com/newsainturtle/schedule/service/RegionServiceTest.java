package com.newsainturtle.schedule.service;

import com.newsainturtle.schedule.entity.Region;
import com.newsainturtle.schedule.repository.RegionRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DisplayName("지역 서비스 테스트")
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@ExtendWith(MockitoExtension.class)
class RegionServiceTest {

    @Autowired
    private RegionRepository regionRepository;

    @Test
    @DisplayName("지역 리스트 조회 테스트")
    public void SearchListRegion() {
        // given
        final Region region = Region.builder()
                .regionName("대전")
                .build();
        final Region region2 = Region.builder()
                .regionName("서울")
                .build();

        // when
        regionRepository.save(region);
        regionRepository.save(region2);
        List<Region> list = regionRepository.findAll();

        // then
        assertEquals(list.get(0).getRegionName(),"대전");
        assertEquals(list.get(1).getRegionName(),"서울");
    }
}