package com.maxar.spatialondemand.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Getter
public class AppProps {

    @Value("${test.value}")
    public String testValue;
}
