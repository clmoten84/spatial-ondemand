package com.maxar.spatialondemand.util;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * AppProps
 *
 * Use this class to fetch any application properties defined in application.properties
 * that the code might need to use at runtime.
 */
@Component
@Getter
public class AppProps {
    /*@Value("${test.value}")
    public String testValue;*/
}
