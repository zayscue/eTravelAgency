package com.etravelagency.hotels.models;

public final class Room {
    private String roomNumber;
    private boolean occupied;
    private int floorNumber;
    private int numberOfBeds;

    public Room() {
    }

    public Room(String roomNumber, boolean occupied, int floorNumber, int numberOfBeds) {
        this.roomNumber = roomNumber;
        this.occupied = occupied;
        this.floorNumber = floorNumber;
        this.numberOfBeds = numberOfBeds;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(final String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public boolean getOccupied() {
        return occupied;
    }

    public void setOccupied(final boolean occupied) {
        this.occupied = occupied;
    }

    public int getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(final int floorNumber) {
        this.floorNumber = floorNumber;
    }

    public int getNumberOfBeds() {
        return numberOfBeds;
    }

    public void setNumberOfBeds(final int numberOfBeds) {
        this.numberOfBeds = numberOfBeds;
    }
}