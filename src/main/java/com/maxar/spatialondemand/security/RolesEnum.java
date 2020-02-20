package com.maxar.spatialondemand.security;

/**
 * RolesEnum
 *
 * Defines allowable user roles
 */
public enum RolesEnum {
    ADMIN {
        @Override
        public String toString() {
            return "ADMIN";
        }
    },

    USER {
        @Override
        public String toString() {
            return "USER";
        }
    }
}
