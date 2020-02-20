package com.maxar.spatialondemand.security;

import com.maxar.spatialondemand.model.UserAcct;
import com.maxar.spatialondemand.repository.UserAcctRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Qualifier("appUserDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserAcctRepo userAcctRepo;
    private UserAcctToUserDetails userAcctToUserDetails;

    @Autowired
    public UserDetailsServiceImpl(UserAcctRepo userAcctRepo, UserAcctToUserDetails userAcctToUserDetails) {
        this.userAcctRepo = userAcctRepo;
        this.userAcctToUserDetails = userAcctToUserDetails;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserAcct userAcct = userAcctRepo.findUserAcctByUsername(userName);

        if (userAcct == null)
            throw new UsernameNotFoundException(userName);

        return userAcctToUserDetails.convert(userAcct);
    }
}
