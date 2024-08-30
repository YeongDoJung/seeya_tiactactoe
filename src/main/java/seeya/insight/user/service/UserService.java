package seeya.insight.user.service;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface UserService {

    Map<String, Object> signUp(Map<String, Object> param);

    Map<String, Object> userFindId(Map<String, Object> param, HttpSession session);

    Map<String, Object> userFindPw(Map<String, Object> param, HttpSession session);

    Map<String, Object> userReturnId(Map<String, Object> param, HttpSession session);

    Map<String, Object> userLogin(Map<String, Object> param, HttpSession session);

    int userChangePw(Map<String, Object> param);

    String userChangeNickname(Map<String, Object> param);

    Map<String, Object> userGameScoreInfo(Map<String, Object> param);

    int userResetScore(Map<String, Object> param);

    String userDelete(Map<String, Object> param);

    void updateUserScore(Map<String, Object> param, HttpSession session);

    void updateUserScoreAct(String player, String isWin);

    List<Map<String, Object>> getRanker();

    void userUpdateIcon(Map<String, Object> param, MultipartFile file);

    String loadIcon(Map<String, Object> param);

}
