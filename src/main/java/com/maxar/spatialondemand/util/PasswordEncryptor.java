package com.maxar.spatialondemand.util;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

/**
 * PasswordEncryptor
 *
 * Handles generating salts and hashes of plain text passwords for at-rest storage.
 * Also includes logic for verifying user provided password credentials.
 */
@Component
public class PasswordEncryptor {
    /**
     * Generates a hash of the arg plain text password for at-rest storage
     * @param plainTextPassword
     * @return
     * @throws IllegalArgumentException
     */
    public String hashPassword(String plainTextPassword) throws IllegalArgumentException {
        if (plainTextPassword != null && !plainTextPassword.isEmpty()) {
            int workload = 8;
            String salt = BCrypt.gensalt(workload);
            return BCrypt.hashpw(plainTextPassword, salt);
        }
        else {
            throw new IllegalArgumentException("Password arg cannot be null or empty.");
        }
    }

    /**
     * Verifies computed hash of arg plain text password with that of the at-rest hash
     * in the database
     * @param plainTextPassword
     * @param passwordHash
     * @return
     * @throws IllegalArgumentException
     */
    public boolean verifyPassword(String plainTextPassword, String passwordHash) throws IllegalArgumentException {
        if (plainTextPassword != null && passwordHash != null) {
            return BCrypt.checkpw(plainTextPassword, passwordHash);
        }
        else {
            throw new IllegalArgumentException("Args for verifying passwords cannot be null.");
        }
    }
}
