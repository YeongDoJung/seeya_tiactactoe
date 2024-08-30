package seeya.insight.config.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import seeya.insight.filter.checkLoginFilter;
import seeya.insight.filter.checkUserRoomOut;

@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean<checkLoginFilter> checkLogin() {
        FilterRegistrationBean<checkLoginFilter> filterRegistrationBean = new FilterRegistrationBean<>(new checkLoginFilter());
        filterRegistrationBean.addUrlPatterns("/main/*");
        filterRegistrationBean.addUrlPatterns("/main");
        filterRegistrationBean.addUrlPatterns("/game_room");
        filterRegistrationBean.addUrlPatterns("/login");
        filterRegistrationBean.addUrlPatterns("/logout");
        filterRegistrationBean.setOrder(1);

        return filterRegistrationBean;
    }

    @Bean
    public FilterRegistrationBean<checkUserRoomOut> checkUserRoomOut() {
        FilterRegistrationBean<checkUserRoomOut> filterRegistrationBean = new FilterRegistrationBean<>(new checkUserRoomOut());
        filterRegistrationBean.addUrlPatterns("/main/*");
        filterRegistrationBean.setOrder(2);

        return filterRegistrationBean;
    }
}
