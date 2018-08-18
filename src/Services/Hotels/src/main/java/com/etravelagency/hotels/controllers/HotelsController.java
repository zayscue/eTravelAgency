package com.etravelagency.hotels.controllers;

import java.util.List;

import com.etravelagency.hotels.data.HotelRepository;
import com.etravelagency.hotels.models.Hotel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotelsController {

    @Autowired
    private HotelRepository hotels;

    @RequestMapping("/api/hotels")
    public List<Hotel> getAll() {
        return hotels.findAll();
    }
}