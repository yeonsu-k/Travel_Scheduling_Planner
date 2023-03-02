package com.newsainturtle.schedule.repository;

import com.newsainturtle.schedule.entity.Region;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@DisplayName("지역 레포지토리 테스트")
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
class RegionRepositoryTest {

    @Autowired
    private RegionRepository regionRepository;

    @Disabled
    @Test
    @DisplayName("레포지토리 Null 검사")
    public void RegionRepositoryIsNotNull() {
        assertThat(regionRepository).isNotNull();
    }

    @Test
    @DisplayName("지역 등록 테스트")
    public void CreateRegion() {
        // given
        final Region region = Region.builder()
                .regionName("대전")
                .build();

        // when
        final Region res = regionRepository.save(region);

        //then
        assertNotNull(res.getRegionName());
        assertEquals(res.getRegionName(),"대전");
    }

}