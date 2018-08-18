package com.etravelagency.hotels.data;

import com.etravelagency.hotels.models.Hotel;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HotelRepository extends MongoRepository<Hotel, ObjectId> {
    Hotel findByName(String name);
}