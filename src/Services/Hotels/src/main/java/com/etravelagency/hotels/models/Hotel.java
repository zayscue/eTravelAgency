package com.etravelagency.hotels.models;

import org.bson.types.ObjectId;
import java.util.List;

public final class Hotel {
    private ObjectId id;
    private String name;
    private String street;
    private String city;
    private String state;
    private String zipcode;
    private String country;
    private String company;
    private List<String> amenities;

    public Hotel() {
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(final ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }
}