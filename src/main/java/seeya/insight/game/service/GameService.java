package seeya.insight.game.service;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface GameService {
    Map<String, Object> getGameInfo(Map<String, Object> param);

    String updateGameInfo(Map<String, Object> param);

    int endGame(Map<String, Object> param);

    List<Map<String, Object>> gameList(Map<String, Object> param);

    int getGameListTotal();

    int gameCreate(Map<String, Object> param);

    int gameJoin(Map<String, Object> param);

    String calculateWinner(String[] squares);

    String getCurrentTurn(String[] board);

}
