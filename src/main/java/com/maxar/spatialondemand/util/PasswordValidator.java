package com.maxar.spatialondemand.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * PasswordValidator
 */
public class PasswordValidator {

    /**
     * Validates that the arg password meets minimum security requirements. Arg password
     * has to be at least 8 characters of alpha-numeric combination with a few allowable
     * special characters. All allowable characters are whitelisted in regex.
     * @param password
     * @return
     */
    public static boolean validate(String password) {
        Pattern pattern = Pattern.compile("[\\w!@#$%^&_]{8,}");
        Matcher matcher = pattern.matcher(password);
        return matcher.matches();
    }
}
