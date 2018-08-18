package com.etravelagency.hotels.models;

import java.util.List;

public final class RoomType {
    private String description;
    private double priceRate;
    private int availableRooms;
    private List<Room> rooms;

    public RoomType() {
    }

    public RoomType(String description, double priceRate, int availableRooms, List<Room> rooms) {
        this.description = description;
        this.priceRate = priceRate;
        this.availableRooms = availableRooms;
        this.rooms = rooms;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public double getPriceRate() {
        return priceRate;
    }

    public void setPriceRate(final double priceRate) {
        this.priceRate = priceRate;
    }

    public int getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(final int availableRooms) {
        this.availableRooms = availableRooms;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(final List<Room> rooms) {
        this.rooms = rooms;
    }
}