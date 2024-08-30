package seeya.insight.game.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import seeya.insight.game.service.GameService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller("GameController")
public class GameController {
    @Autowired
    private GameService gameService;

    @RequestMapping("/ajax/getGameInfo")
    @ResponseBody
    public Map<String, Object> getGameInfo(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("seq", request.getParameter("seq"));
        param.put("userNickname", session.getAttribute("userNickname"));
        return gameService.getGameInfo(param);
    }

    @RequestMapping("/ajax/updateGameInfo")
    @ResponseBody
    public String updateGameInfo(HttpServletRequest request) {
        Map<String, Object> param = new HashMap<>();
        param.put("seq", request.getParameter("seq"));
        param.put("board", request.getParameter("board"));
        param.put("selected", request.getParameter("selected"));
        return gameService.updateGameInfo(param);
    }

    @RequestMapping("/ajax/gameList")
    @ResponseBody
    public String gameList(HttpServletRequest request) {
        Map<String, Object> result = new HashMap<String, Object>();
        Map<String, Object> param = new HashMap<>();
        param.put("nowPage", request.getParameter("nowPage"));
        int gameListTotal = gameService.getGameListTotal();
        List<Map<String, Object>> list = gameService.gameList(param);

        result.put("gameListTotal", gameListTotal);
        result.put("gameList", list);

        return JSONObject.toJSONString(result);
    }

    @RequestMapping("/ajax/gameCreate")
    @ResponseBody
    public int gameCreate(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("title", request.getParameter("title"));
        param.put("player1", session.getAttribute("userNickname"));
        param.put("board", ",,,,,,,,");
        param.put("status", "w");
        param.put("rgtr_id", session.getAttribute("userId"));
        param.put("reg_dt", LocalDate.now().toString());
        int seq = gameService.gameCreate(param);
        session.setAttribute("seq", seq);
        return seq;
    }

    @RequestMapping("/ajax/gameJoin")
    @ResponseBody
    public int gameJoin(HttpServletRequest request, Map<String, Object> map) {
        HttpSession session = request.getSession();
        Map<String, Object> param = new HashMap<>();
        param.put("seq", request.getParameter("seq"));
        param.put("player2", session.getAttribute("userNickname"));
        int result = gameService.gameJoin(param);
        if ( result == 1 ) {
            session.setAttribute("seq", request.getParameter("seq"));
        }
        return result;
    }

    @RequestMapping("/game_room")
    public String gameView(HttpServletRequest request, Map<String, Object> map) {
        return "game_room";
    }

    @RequestMapping("/ajax/justEnd")
    public void justEnd(HttpServletRequest request) {
        Map<String, Object> param = new HashMap<>();
        param.put("seq", request.getParameter("seq"));
        gameService.endGame(param);
    }

//    public int gameForm(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
//
//    public String gameStatus(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
}
