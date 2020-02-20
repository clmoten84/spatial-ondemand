package com.maxar.spatialondemand.unit;

import com.maxar.spatialondemand.util.PasswordEncryptor;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
public class PasswordEncryptorTest {

    private PasswordEncryptor passwordEncryptor = new PasswordEncryptor();

    @Test
    public void hashPasswordTest() {
        String plainTextPass = "P@$$word";
        String hashedPass = passwordEncryptor.hashPassword(plainTextPass);

        Assert.assertNotNull(hashedPass);
        Assert.assertFalse(hashedPass.isEmpty());
    }

    @Test
    public void checkPasswordTest() {
        String plainTextPass = "P@$$word";
        String hashedPass = passwordEncryptor.hashPassword(plainTextPass);

        Assert.assertTrue(passwordEncryptor.verifyPassword(plainTextPass, hashedPass));
    }
}
