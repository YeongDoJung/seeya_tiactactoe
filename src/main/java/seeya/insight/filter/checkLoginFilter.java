package seeya.insight.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;

import java.io.IOException;
import java.util.Objects;

@Log4j2
@WebFilter("/*")
public class checkLoginFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httprequest = (HttpServletRequest) request;
        HttpServletResponse httpresponse = (HttpServletResponse) response;
        HttpSession session = httprequest.getSession();
        if (Objects.equals(httprequest.getRequestURI(), "/main")) {
            if (!httpresponse.isCommitted()) {
                httpresponse.sendRedirect("/main/1");
                return;
            }
        }
        if (session.getAttribute("userId") == null &&
                (!Objects.equals(httprequest.getRequestURI(), "/login") || httprequest.getRequestURI().equals("/logout")))
        {
            httpresponse.sendRedirect("/");
            return;
        }
        if (session.getAttribute("userId") != null && Objects.equals(httprequest.getRequestURI(), "/login")) {
            httpresponse.sendRedirect("/main/1");
            return;
        }
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {

    }
}


