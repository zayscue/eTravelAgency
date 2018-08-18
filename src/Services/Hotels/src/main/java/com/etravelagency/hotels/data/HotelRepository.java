package com.etravelagency.hotels.data;

import com.etravelagency.hotels.models.Hotel;
import com.mongodb.client.MongoDatabase;

public class HotelRepository extends RepositoryBase<Hotel> {
    public static final String COLLECTION_NAME = "hotels";

    public HotelRepository(MongoDatabase database) {
        super(database, COLLECTION_NAME, Hotel.class);
    }
}