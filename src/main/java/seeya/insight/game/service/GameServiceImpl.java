package seeya.insight.game.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import seeya.insight.game.dao.GameDAO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service("gameService")
public class GameServiceImpl implements GameService {

    @Autowired
    private GameDAO gameDAO;

    public Map<String, Object> getGameInfo(Map<String, Object> param) {
        Map<String, Object> result = gameDAO.getGameInfo(param);
        result.put("userNickname", param.get("userNickname"));
        String board = result.get("BOARD").toString();
        String[] boardArray = convertBoard(board);
        String whosTurn = getCurrentTurn(boardArray);
        result.put("whosTurn", whosTurn);
        String isWinnerExist = calculateWinner(boardArray);
        if (isWinnerExist == null) {
            result.put("winner", null);
            return result;
        }
        else {
            result.put("winner", isWinnerExist);
            return result;
        }
    }

    public String updateGameInfo(Map<String, Object> param) {
        String[] boardArrray = convertBoard(param.get("board").toString());
        String whosTurn = getCurrentTurn(boardArrray);
        boardArrray[Integer.parseInt((String) param.get("selected"))] = whosTurn;
        String afterboard = String.join(",", boardArrray);
        param.put("board", afterboard);
        gameDAO.updateGameInfo(param);
        return afterboard;
    }

    public int endGame(Map<String, Object> param) {
        return gameDAO.endGame(param);
    }

    public List<Map<String, Object>> gameList(Map<String, Object> param) {
        int nowPage = (Integer.parseInt((String) param.get("nowPage")));
        int someParam = (nowPage - 1)*3;
        param.put("nowPage", someParam);
        param.put("listCount", 3);
        return gameDAO.gameList(param);
    }

    public int getGameListTotal() {
        return gameDAO.getGameListTotal();
    }

    public int gameCreate(Map<String, Object> param) {
        return gameDAO.gameCreate(param);
    }

    public int gameJoin(Map<String, Object> param) {

        Map<String, Object> check = gameDAO.getGameInfo(param);
        if (check.get("PLAYER2") == null) {
            return gameDAO.gameJoin(param);
        }
        else {
            return 0;
        }
    }

    public String calculateWinner(String[] squares) {
        int[][] lines = {
                {0, 1, 2},
                {3, 4, 5},
                {6, 7, 8},
                {0, 3, 6},
                {1, 4, 7},
                {2, 5, 8},
                {0, 4, 8},
                {2, 4, 6}
        };
        for (int i = 0; i < lines.length; i++) {
            int a = lines[i][0];
            int b = lines[i][1];
            int c = lines[i][2];

            if (squares[a] != "" && squares[a].equals(squares[b]) && squares[a].equals(squares[c])) {
                return squares[a];
            }
        }
        boolean isDraw = true;
        for (String square : squares) {
            if (square == "" || square.isEmpty()) {
                isDraw = false;
                break;
            }
        }
        if (isDraw) {
            return "draw";
        }
        return null;
    }

    public String getCurrentTurn(String[] board) {
        int countO = 0;
        int countX = 0;

        for (Object cell : board) {
            if ("O".equals(cell)) {
                countO++;
            } else if ("X".equals(cell)) {
                countX++;
            }
        }
        return (countO <= countX) ? "O" : "X";
    }

    public String[] convertBoard(String boardString) {
        String[] boardArray = boardString.split(",", -1);
        return boardArray;
    }

}

