package com.maxar.spatialondemand.unit;

import com.maxar.spatialondemand.util.EmailValidator;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
public class EmailValidatorTest {

    @Test
    public void whenEmailValid_ValidateSuccess() {
        Assert.assertTrue(EmailValidator.validate("ttaylor@gmail.com"));
        Assert.assertTrue(EmailValidator.validate("an.employee@maxar.net"));
        Assert.assertTrue(EmailValidator.validate("c.m@tlr.org"));
    }

    @Test
    public void whenEmailInvalid_ValidateFail() {
        Assert.assertFalse(EmailValidator.validate("drhorton@gmail.ogre"));
        Assert.assertFalse(EmailValidator.validate("swammy.pappy.yahoo.net"));
        Assert.assertFalse(EmailValidator.validate("maxar.is.cool@maxar.123"));
    }
}
