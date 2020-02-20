package com.maxar.spatialondemand.controllers.web;

import com.maxar.spatialondemand.util.AppProps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    /**
     * Load application home
     * @return
     */
    @GetMapping("/")
    public String home() {
        return "home";
    }

    /**
     * Load application login page
     * @return
     */
    @GetMapping("/login")
    public String login() { return "login"; }

    /**
     * Load SOD Admin page
     * @return
     */
    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }
}
