package com.etravelagency.hotels.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping("/api/home")
	public String index() {
		return "Hello World!";
	}
}