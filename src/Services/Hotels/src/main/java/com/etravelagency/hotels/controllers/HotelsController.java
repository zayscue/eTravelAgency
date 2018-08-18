package com.etravelagency.hotels.controllers;

import java.util.List;

import com.etravelagency.hotels.HotelsApplication;
import com.etravelagency.hotels.data.HotelRepository;
import com.etravelagency.hotels.data.IRepositoryBase;
import com.etravelagency.hotels.models.Hotel;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HotelsController {

    @RequestMapping("/api/hotels")
    public List<Hotel> getAll() {
        HotelRepository hotels = new HotelRepository(HotelsApplication.Database);
        return hotels.getAll();
    }
}