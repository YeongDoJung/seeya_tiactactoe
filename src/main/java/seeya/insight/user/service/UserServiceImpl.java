package seeya.insight.user.service;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seeya.insight.game.dao.GameDAO;
import seeya.insight.user.dao.UserDAO;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service("userService")
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDAO userDAO;
    @Autowired
    private GameDAO gameDAO;

    public Map<String, Object> signUp(Map<String, Object> param) {
        Map<String, Object> result = new HashMap<>();
        int isIdExist = userDAO.countUserById(param);
        int isNicknameExist = userDAO.countUserByNickname(param);
        if (isIdExist == 1) {
            result.put("isIdExist", 1);
        }
        if (isNicknameExist == 1) {
            result.put("isNicknameExist", 1);
        }
        if (isIdExist == 0 && isNicknameExist == 0) {
            userDAO.signup(param);
            userDAO.userGameBaseInfo(param);
            result.put("signUp", 1);
        }
        return result;
    }

    public Map<String, Object> userFindId(Map<String, Object> param, HttpSession session) {
        Map<String, Object> isUserExist = userDAO.getUserByEmail(param);
        Map<String, Object> result = new HashMap<>();
        if (isUserExist.get("USER_ID") != null) {
            result.put("isUserExist", true);
            session.setAttribute("userId", isUserExist.get("USER_ID"));
            session.setAttribute("userEmail", isUserExist.get("USER_EML"));
            long randomCodes = Math.round(Math.random()*1000000);
            session.setAttribute("randomCodes", randomCodes);
            result.put("randomCodes", randomCodes);
        }
        else {
            result.put("isUserExist", false);
        }
        return result;
    }

    public Map<String, Object> userReturnId(Map<String, Object> param, HttpSession session) {
        Map<String, Object> result = new HashMap<>();
        if (!Objects.equals(param.get("inputCode").toString(), session.getAttribute("randomCodes").toString())) {
            result.put("result", false);
        }
        else {
            Map<String, Object> userInfo = userDAO.getUserByEmail(param);
            result.put("result", true);
            result.put("userId", userInfo.get("USER_ID"));
            result.put("userNickname", userInfo.get("USER_NICNM"));
        }
        return result;
    }

    public Map<String, Object> userFindPw(Map<String, Object> param, HttpSession session) {
        int isUserExist = userDAO.checkUserByIDandEmail(param);
        Map<String, Object> result = new HashMap<>();
        if (isUserExist == 1) {
            session.setAttribute("userId", param.get("userId"));
            session.setAttribute("userEmail", param.get("userEmail"));
            String randomCodes = String.valueOf(Math.round(Math.random() * 1000000));
            session.setAttribute("randomCodes", randomCodes);
            result.put("isUserExist", true);
            result.put("randomCodes", randomCodes);
        }
        else {
            result.put("isUserExist", false);
        }
        return result;
    }

    public Map<String, Object> userLogin(Map<String, Object> param, HttpSession session) {
        Map<String, Object> result = userDAO.getUser(param);
        if (result.get("USER_ID") != null) {
            session.setAttribute("userId", result.get("USER_ID"));
            session.setAttribute("userPw", result.get("USER_PW"));
            session.setAttribute("userNickname", result.get("USER_NICNM"));
            session.setAttribute("userEmail", result.get("USER_EML"));
            result.put("result", 1);
        }
        else {
            result.put("result", 0);
        }
        return result;
    }

    public int userChangePw(Map<String, Object> param) {
        return userDAO.userChangePw(param);
    }

    public String userChangeNickname(Map<String, Object> param) {
        if (userDAO.checkNickname(param) == 1) {
            return "using";
        }
        else {
            int result = userDAO.userChangeNickname(param);
            if (result == 1) {
                return "done";
            }
            else {
                return "fail";
            }
        }
    }

    public Map<String, Object> userGameScoreInfo(Map<String, Object> param) {
        Map<String, Object> result = userDAO.userGameScoreInfo(param);
        Map<String, Object> _result = new HashMap<String, Object>();
        if (result == null) {
            userDAO.userGameBaseInfo(param);
            _result.put("userWin", 0);
            _result.put("userLose", 0);
            _result.put("userDraw", 0);
        }
        else {
            _result.put("userWin", result.get("WIN"));
            _result.put("userLose", result.get("LOSE"));
            _result.put("userDraw", result.get("DRAW"));
        }
        return _result;
    }

    public int userResetScore(Map<String, Object> param) {
        return userDAO.userResetScore(param);
    }

    public String userDelete(Map<String, Object> param) {
        int result = userDAO.userDelete(param);
        if (result == 1) {
            removeIcon((String) param.get("userId"));
            return "success";
        }
        else {
            return "fail";
        }
    }

    public void updateUserScore(Map<String, Object> param, HttpSession session) {
        Map<String, Object> gameInfo = gameDAO.getGameInfo(param);
        String p1 = (String) gameInfo.get("PLAYER1");
        String p2 = (String) gameInfo.get("PLAYER2");
        String winner = (String) param.get("winner");
        if (Objects.equals(gameInfo.get("STATUS").toString(), "p")) {
            gameDAO.endGame(param);
            if (Objects.equals(winner, "O")) {
                updateUserScoreAct(p1, "win");
                updateUserScoreAct(p2, "lose");
            }
            else if (Objects.equals(winner, "X")) {
                updateUserScoreAct(p1, "lose");
                updateUserScoreAct(p2, "win");
            }
            else if (Objects.equals(winner, "draw")) {
                updateUserScoreAct(p1, "draw");
                updateUserScoreAct(p2, "draw");
            }
        }
    }

    public void updateUserScoreAct(String player, String isWin) {
        String userId = userDAO.getUserByNickname(player);
        Map<String, Object> param = new HashMap<>();
        param.put("userId", userId);
        Map<String, Object> userScore = userDAO.userGameScoreInfo(param);
        userScore.put("userId", userId);
        if (Objects.equals(isWin, "win")) {
            int userWin = (int) userScore.get("WIN");
            int updatedUserWin = userWin + 1;
            userScore.put("WIN", updatedUserWin);
        }
        else if (Objects.equals(isWin, "lose")) {
            int userLose = (int) userScore.get("LOSE");
            userLose += 1;
            int updatedUserLose = userLose + 1;
            userScore.put("LOSE", updatedUserLose);
        }
        else if (Objects.equals(isWin, "draw")) {
            int userDraw = (int) userScore.get("DRAW");
            userDraw += 1;
            int updatedUserDraw = userDraw + 1;
            userScore.put("DRAW", updatedUserDraw);
        }
        userDAO.updateUserScore(userScore);
    }

    public List<Map<String, Object>> getRanker() {
        return gameDAO.getRanker();
    }

    public void userUpdateIcon(Map<String, Object> param, MultipartFile file) {
        String userId = (String) param.get("userId");
        if ( userDAO.checkisthisnickname(param) == 1) {
            param.put("userNickname", userId);
            userId = userDAO.getUserByNickname(param);
        }
        String uploadFolder = "D:/workspace/practice/01_TTT/2024cms/src/main/webapp/assets/images/users/";
        boolean isRemoved = removeIcon(userId);
        String extend = file.getOriginalFilename().split("\\.")[1];
        String fp = uploadFolder + userId + '.' + extend;
        File saveFile = new File(fp);
        try {
            file.transferTo(saveFile);
        }
        catch (IOException ignored) {
        }
    }

    public String loadIcon(Map<String, Object> param) {
        String[] extenders = {".png", ".jpeg", ".jpg", ".webp", ".jfif"};
        String basePath = "D:/workspace/practice/01_TTT/2024cms/src/main/webapp/assets/images/users/";
        String showPath = "/assets/images/users/";
        String id = (String) param.get("userId");
        String result = "/assets/images/profile_icon.png";
        for (String ext : extenders) {
            String fp = basePath + id + ext;
            File f = new File(fp);
            if (f.exists()) {
                result = showPath + id + ext;
                break;
            }
        }
        return result;
    }

    public boolean removeIcon(String userId) {
        String uploadFolder = "D:/workspace/practice/01_TTT/2024cms/src/main/webapp/assets/images/users/";
        String[] extenders = {".png", ".jpeg", ".jpg", ".webp"};
        for (String ext : extenders) {
            String fp = uploadFolder + userId + ext;
            File f = new File(fp);
            if (f.exists()) {
                return f.delete();
            }
        }
        return false;
    }
}
