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

//    /**
//     * Return index.html
//     * @return
//     */
//    @RequestMapping("/")
//    public String index() {
//        return "index";
//    }

    @RequestMapping("/")
    public String home() {
        return "home";
    }
}
