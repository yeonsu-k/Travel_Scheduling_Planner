package com.newsainturtle.schedule.service;

import com.newsainturtle.schedule.exception.DuplicateException;
import com.newsainturtle.schedule.dto.RegionResponse;
import com.newsainturtle.schedule.entity.Region;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionService {

    private final RegionRepository regionRepository;

    public String createRegion(String regionName) {
        isNullRegion(regionName);
        validateDuplicateRegion(regionName);
        regionRepository.save(Region.builder()
                .regionName(regionName)
                .build());
        return regionName;
    }

    public List<RegionResponse> findRegion() {
        List<Region> regions = regionRepository.findAll();
        isNullRegionList(regions);
        return regions.stream()
                .map(region -> RegionResponse.builder()
                        .regionName(region.getRegionName())
                        .build()
                ).collect(Collectors.toList());
    }

    public void validateDuplicateRegion(String regionName) {
        Region region = regionRepository.findByRegionName(regionName);
        if(region!=null) {
            throw new DuplicateException();
        }
    }

    public void isNullRegionList(List<Region> regions) {
        if(regions.isEmpty()) {
            throw new NullException();
        }
    }

    public void isNullRegion(String regionName) {
        if(regionName==null) {
            throw new NullException();
        }
    }
}
