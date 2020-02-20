package com.maxar.spatialondemand.security;

import com.maxar.spatialondemand.model.UserAcct;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.Nullable;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;

@Component
public class UserAcctToUserDetails implements Converter<UserAcct, UserDetails> {

    @Nullable
    @Override
    public UserDetails convert(UserAcct userAcct) {
        UserDetailsImpl userDetails = new UserDetailsImpl();

        if (userAcct != null) {
            userDetails.setId(userAcct.getId());
            userDetails.setUsername(userAcct.getUsername());
            userDetails.setPassword(userAcct.getPassword());
            userDetails.setEmail(userAcct.getEmail());

            Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
            userAcct.getRoles().forEach(role -> authorities.add(new SimpleGrantedAuthority(role.getRoleName())));

            userDetails.setAuthorities(authorities);
        }

        return userDetails;
    }
}
