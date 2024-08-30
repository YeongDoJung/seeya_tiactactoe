package seeya.insight.game.dao;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import seeya.insight.mapper.common.CommonMapper;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class GameDAO extends CommonMapper {

    public Map<String, Object> getGameInfo(Map<String, Object> param) {
        return (Map<String, Object>) selectOne("game.getGameInfo", param);
    }

    public int updateGameInfo(Map<String, Object> param) {
        return (int) update("game.updateGameInfo", param);
    }

    public int endGame(Map<String, Object> param) {
        return (int) update("game.endGame", param);
    }

    public List<Map<String, Object>> gameList(Map<String, Object> param) {
        return (List<Map<String, Object>>) list("game.gameList", param);
    }

    public int getGameListTotal() {
        return (int) selectOne("game.getGameListTotal");
    }

    public int gameCreate(Map<String, Object> param) {
        insert("game.gameCreate", param);
        return (int) param.get("SEQ");
    }

    public int gameJoin(Map<String, Object> param) {
        return (int) update("game.gameJoin", param);
    }

    public List<Map<String, Object>> getRanker() {
        return (List<Map<String, Object>>) list("game.getRanker");
    }
}
