package com.maxar.spatialondemand.security;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(8);
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(PasswordEncoder passwordEncoder,
               @Qualifier("appUserDetailsService") UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder);
        daoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return daoAuthenticationProvider;
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        // Very permissive config - uncomment this during development to prevent
        // having to login to perform actions in the browser.
        /*httpSecurity
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/**").permitAll()
                .antMatchers("/", "/login").permitAll()
                .and().csrf().csrfTokenRepository(new CookieCsrfTokenRepository());*/

        // Locked down config - uncomment this for integration and production security.
        httpSecurity
                .authorizeRequests()
                .antMatchers(HttpMethod.POST, "/api/users").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/users/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.POST, "/api/roles").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/api/roles/**").hasAuthority("ADMIN")
                .antMatchers(HttpMethod.GET, "/admin").hasAuthority("ADMIN")
                .antMatchers("/login", "/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/login")
                .defaultSuccessUrl("/", true)
                .failureUrl("/login?authfail=true")
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID", "XSRF-TOKEN")
                .permitAll()
                .and()
                .csrf()
                .csrfTokenRepository(new CookieCsrfTokenRepository());

        //TODO: implement session management configuration
    }

    /*@Configuration
    @Order(1)
    public static class APISecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity httpSecurity) throws Exception {
            // Very permissive security config
        *//*httpSecurity
                .authorizeRequests()
                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/**").permitAll()
                .antMatchers("/", "/login").permitAll()
                .and().csrf().csrfTokenRepository(new CookieCsrfTokenRepository());*//*

            httpSecurity
                    .antMatcher("/api/**")
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.POST, "/api/roles").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/api/roles/**").hasRole("ADMIN")
                    .anyRequest().authenticated()
                    .and()
                    .httpBasic()
                    .and()
                    .csrf()
                    .csrfTokenRepository(new CookieCsrfTokenRepository());
        }
    }*/

    /*@Configuration
    public static class FormLoginSecurityConfig extends WebSecurityConfigurerAdapter {
        @Override
        protected void configure(HttpSecurity httpSecurity) throws Exception {
            *//*httpSecurity
                    .authorizeRequests()
                    .antMatchers(HttpMethod.POST, "/api/users").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/api/users/**").hasRole("ADMIN")
                    .antMatchers(HttpMethod.POST, "/api/roles").hasRole("ADMIN")
                    .antMatchers(HttpMethod.DELETE, "/api/roles/**").hasRole("ADMIN")
                    .antMatchers("/login", "/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/", true)
                    .failureUrl("/login?authfail=true")
                    .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout=true")
                    .deleteCookies("JSESSIONID")
                    .permitAll()
                    .and()
                    .csrf()
                    .csrfTokenRepository(new CookieCsrfTokenRepository());*//*

            httpSecurity
                    .authorizeRequests()
                    .antMatchers("/login", "/css/**", "/js/**", "/img/**", "/webjars/**").permitAll()
                    .antMatchers(HttpMethod.POST, "/login").permitAll()
                    .anyRequest().authenticated()
                    .and()
                    .formLogin()
                    .loginPage("/login")
                    .defaultSuccessUrl("/", true)
                    .failureUrl("/login?authfail=true")
                    .and()
                    .logout()
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout=true")
                    .deleteCookies("JSESSIONID")
                    .permitAll()
                    .and()
                    .csrf()
                    .csrfTokenRepository(new CookieCsrfTokenRepository());
        }
    }*/
}
