package com.newsainturtle.schedule.service;

import com.newsainturtle.schedule.dto.BasicLocationRequest;
import com.newsainturtle.schedule.dto.CustomLocationRequest;
import com.newsainturtle.schedule.dto.LocationRequest;
import com.newsainturtle.schedule.dto.LocationResponse;
import com.newsainturtle.schedule.entity.BasicLocation;
import com.newsainturtle.schedule.entity.CustomLocation;
import com.newsainturtle.schedule.entity.Location;
import com.newsainturtle.schedule.exception.NotFoundException;
import com.newsainturtle.schedule.exception.NullException;
import com.newsainturtle.schedule.repository.BasicLocationRepository;
import com.newsainturtle.schedule.repository.CustomLocationRepository;
import com.newsainturtle.schedule.repository.LocationRepository;
import com.newsainturtle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    private final BasicLocationRepository basicLocationRepository;

    private final CustomLocationRepository customLocationRepository;

    private final UserRepository userRepository;

    public void createBasicLocation(BasicLocationRequest basicLocationRequest) {
        BasicLocation basicLocation = BasicLocation.builder()
                .regionId(basicLocationRequest.getRegionId())
                .locationName(basicLocationRequest.getLocationName())
                .address(basicLocationRequest.getAddress())
                .longitude(basicLocationRequest.getLongitude())
                .latitude(basicLocationRequest.getLatitude())
                .isHotel(basicLocationRequest.isHotel())
                .locationURL(basicLocationRequest.getLocationURL())
                .build();
        basicLocationRepository.save(basicLocation);
    }

    public void createCustomLocation(CustomLocationRequest customLocationRequest, String email) {
        isNullUser(email);
        CustomLocation customLocation = CustomLocation.builder()
                .regionId(customLocationRequest.getRegionId())
                .locationName(customLocationRequest.getLocationName())
                .address(customLocationRequest.getAddress())
                .longitude(customLocationRequest.getLongitude())
                .latitude(customLocationRequest.getLatitude())
                .isHotel(customLocationRequest.isHotel())
                .customHostEmail(email)
                .build();
        customLocationRepository.save(customLocation);
    }

    public List<LocationResponse> findLocation(LocationRequest locationRequest, String email) {
        isNullUser(email);
        List<LocationResponse> locationResponseList = new ArrayList<>();
        locationResponseList.addAll(findBasicLocation(locationRequest));
        locationResponseList.addAll(findCustomLocation(locationRequest,email));
        return locationResponseList;
    }

    public List<LocationResponse> findRecommendLocationList(Long regionId, String email, boolean isHotel) {
        isNullUser(email);
        List<LocationResponse> locationResponseList = new ArrayList<>();
        locationResponseList.addAll(findRecommendBasicLocationList(regionId,isHotel));
        locationResponseList.addAll(findRecommendCustomLocationList(regionId,email,isHotel));
        return locationResponseList;
    }

    public LocationResponse findLocationInfo(Long locationId) {
        Location location = findLocationById(locationId);
        return LocationResponse.builder()
                .locationId(location.getLocationId())
                .regionId(location.getRegionId())
                .locationName(location.getLocationName())
                .address(location.getAddress())
                .longitude(location.getLongitude())
                .latitude(location.getLatitude())
                .isHotel(location.isHotel())
                .lcoationURL(location.getLocationURL())
                .build();
    }

    private Location findLocationById(Long locationId) {
        return locationRepository.findById(locationId)
                .orElseThrow(() -> new NotFoundException());
    }

    private void isNullUser(String email) {
        if(userRepository.findByEmail(email)==null) {
            throw new NullException();
        }
    }

    private List<LocationResponse> findBasicLocation(LocationRequest locationRequest) {
        return basicLocationRepository.findByRegionIdAndLocationNameAndIsHotel(locationRequest.getRegionId(), locationRequest.getLocationName(), locationRequest.isHotel())
                .stream()
                .map(location -> LocationResponse.builder()
                        .locationId(location.getLocationId())
                        .regionId(location.getRegionId())
                        .locationName(location.getLocationName())
                        .address(location.getAddress())
                        .longitude(location.getLongitude())
                        .latitude(location.getLatitude())
                        .isHotel(location.isHotel())
                        .lcoationURL(location.getLocationURL())
                        .build()
                ).collect(Collectors.toList());
    }

    private List<LocationResponse> findCustomLocation(LocationRequest locationRequest, String email) {
        return customLocationRepository.findByRegionIdAAndLocationNameAndHotel(locationRequest.getRegionId(), email, locationRequest.getLocationName(), locationRequest.isHotel())
                .stream()
                .map(location -> LocationResponse.builder()
                        .locationId(location.getLocationId())
                        .regionId(location.getRegionId())
                        .locationName(location.getLocationName())
                        .address(location.getAddress())
                        .longitude(location.getLongitude())
                        .latitude(location.getLatitude())
                        .isHotel(location.isHotel())
                        .lcoationURL(location.getLocationURL())
                        .build()
                ).collect(Collectors.toList());
    }

    private List<LocationResponse> findRecommendBasicLocationList(Long regionId, boolean isHotel) {
        return basicLocationRepository.findAllByRegionIdAndIsHotel(regionId,isHotel)
                .stream()
                .map(location -> LocationResponse.builder()
                        .locationId(location.getLocationId())
                        .regionId(location.getRegionId())
                        .locationName(location.getLocationName())
                        .address(location.getAddress())
                        .longitude(location.getLongitude())
                        .latitude(location.getLatitude())
                        .isHotel(location.isHotel())
                        .lcoationURL(location.getLocationURL())
                        .build()
                ).collect(Collectors.toList());
    }
    private List<LocationResponse> findRecommendCustomLocationList(Long regionId, String email, boolean isHotel) {
        return customLocationRepository.findAllByRegionIdAndIsHotel(regionId,email,isHotel)
                .stream()
                .map(location -> LocationResponse.builder()
                        .locationId(location.getLocationId())
                        .regionId(location.getRegionId())
                        .locationName(location.getLocationName())
                        .address(location.getAddress())
                        .longitude(location.getLongitude())
                        .latitude(location.getLatitude())
                        .isHotel(location.isHotel())
                        .lcoationURL(location.getLocationURL())
                        .build()
                ).collect(Collectors.toList());
    }

}
