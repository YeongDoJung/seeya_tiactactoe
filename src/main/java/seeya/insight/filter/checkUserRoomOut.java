package seeya.insight.filter;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import seeya.insight.game.service.GameService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Log4j2
@WebFilter("/*")
public class checkUserRoomOut implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httprequest = (HttpServletRequest) request;
        HttpServletResponse httpresponse = (HttpServletResponse) response;
        HttpSession session = httprequest.getSession();
        if (session.getAttribute("seq") != null) {
            Map<String, Object> param = new HashMap<String, Object>();
            param.put("seq", session.getAttribute("seq"));
        }
        chain.doFilter(request, response);
    }
}