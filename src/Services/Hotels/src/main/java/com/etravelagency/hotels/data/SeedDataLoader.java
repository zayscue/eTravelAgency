package com.etravelagency.hotels.data;

import java.util.Arrays;
import java.util.List;

import com.etravelagency.hotels.models.Hotel;
import com.etravelagency.hotels.models.Room;
import com.etravelagency.hotels.models.RoomType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class SeedDataLoader implements ApplicationRunner {
    private static final List<Hotel> PRECONFIGURED_HOTELS = Arrays.asList(new Hotel[] {
        new Hotel("Marriott at Research Triangle Park", 
                "4700 Guardian Drive",
                "Durham",
                "North Carolina",
                "27703",
                "919-941-6200",
                "Marriott",
                Arrays.asList(new String[] {
                    "High Speed Internet",
                    "Cable TV",
                    "Continental Breakfast",
                    "Gym",
                    "Indoor Pool",
                    "Room Service"
                }),
                Arrays.asList(new RoomType[] { 
                    new RoomType("1 King Bed, Deluxe Guest Room",
                                190.00,
                                1,
                                Arrays.asList(new Room[] {
                                    new Room("114", false, 1, 1)
                                })
                    )
                })
        )
    });

    private HotelRepository hotels;

    @Autowired
    public SeedDataLoader(HotelRepository hotels) {
        this.hotels = hotels;
    }

    public void run(ApplicationArguments args) {
        if(hotels.count() == 0) {
            hotels.saveAll(PRECONFIGURED_HOTELS);
        }
    }
}