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
    private String phoneNumber;
    private String company;
    private List<String> amenities;
    private List<RoomType> roomTypes;

    public Hotel() {
    }

    public Hotel(String name, 
                String street, 
                String city, 
                String state, 
                String zipCode, 
                String phoneNumber, 
                String company,
                List<String> amenities,
                List<RoomType> roomTypes) {
        this.name = name;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipcode = zipCode;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.amenities = amenities;
        this.roomTypes = roomTypes;
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

    public String getStreet() {
        return street;
    }

    public void setStreet(final String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(final String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(final String state) {
        this.state = state;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(final String zipcode) {
        this.zipcode = zipcode;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(final String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(final String company) {
        this.company = company;
    }

    public List<String> getAmenities() {
        return amenities;
    }

    public void setAmenities(final List<String> amenities) {
        this.amenities = amenities;
    }

    public List<RoomType> getRoomTypes() {
        return roomTypes;
    }

    public void setRoomTypes(final List<RoomType> roomTypes) {
        this.roomTypes = roomTypes;
    }
}