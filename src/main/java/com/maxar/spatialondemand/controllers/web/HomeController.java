package com.maxar.spatialondemand.controllers.web;

import com.maxar.spatialondemand.util.AppProps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @Autowired
    private AppProps appProps;

    /**
     * Load application home
     * @return
     */
    @RequestMapping("/")
    public String home() {
        return "home";
    }
}
