package com.newsainturtle.schedule.service;

import com.newsainturtle.schedule.dto.RegionRequest;
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

    public String createRegion(RegionRequest regionRequest) {
        isNullRegion(regionRequest.getRegionName());
        validateDuplicateRegion(regionRequest.getRegionName());
        regionRepository.save(Region.builder()
                .regionName(regionRequest.getRegionName())
                .regionImageURL(regionRequest.getRegionImageURL())
                .englishName(regionRequest.getEnglishName())
                .contents(regionRequest.getContents())
                .build());
        return regionRequest.getRegionName();
    }

    public List<RegionResponse> findRegionList() {
        List<Region> regions = regionRepository.findAll();
        isNullRegionList(regions);
        return regions.stream()
                .map(region -> RegionResponse.builder()
                        .regionId(region.getRegionId())
                        .regionName(region.getRegionName())
                        .regionImageURL(region.getRegionImageURL())
                        .englishName(region.getEnglishName())
                        .contents(region.getContents())
                        .build()
                ).collect(Collectors.toList());
    }

    public RegionResponse findRegion(Long regionId) {
        Region region = isNullRegion(regionId);
        return RegionResponse.builder()
                .regionId(region.getRegionId())
                .regionName(region.getRegionName())
                .regionImageURL(region.getRegionImageURL())
                .englishName(region.getEnglishName())
                .contents(region.getContents())
                .build();
    }

    private void validateDuplicateRegion(String regionName) {
        Region region = regionRepository.findByRegionName(regionName);
        if(region!=null) {
            throw new DuplicateException();
        }
    }

    private Region isNullRegion(Long regionId) {
        return regionRepository.findById(regionId)
                .orElseThrow(() -> new NullException());
    }

    private void isNullRegionList(List<Region> regions) {
        if(regions.isEmpty()) {
            throw new NullException();
        }
    }

    private void isNullRegion(String regionName) {
        if(regionName==null) {
            throw new NullException();
        }
    }
}
