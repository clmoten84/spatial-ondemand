package com.maxar.spatialondemand.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidator {

    /**
     * Validates that the arg email is actually a valid email address
     * @param email
     * @return
     */
    public static boolean validate(String email) {
        Pattern pattern = Pattern.compile("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$");
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
