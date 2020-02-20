package com.maxar.spatialondemand.unit;

import com.maxar.spatialondemand.util.PasswordValidator;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
public class PasswordValidatorTest {

    @Test
    public void whenPasswordValid_ValidationSuccess() {
        Assert.assertTrue(PasswordValidator.validate("!8HellO4!"));
        Assert.assertTrue(PasswordValidator.validate("!@#$%^&_H98"));
        Assert.assertTrue(PasswordValidator.validate("spatialondemand"));
        Assert.assertTrue(PasswordValidator.validate("SPATIALONDEMAND"));
    }

    @Test
    public void whenPasswordInvalid_ValidationFail() {
        Assert.assertFalse(PasswordValidator.validate("hello"));
        Assert.assertFalse(PasswordValidator.validate("!<b>Hello</b>"));
        Assert.assertFalse(PasswordValidator.validate("{some.code}"));
    }
}
