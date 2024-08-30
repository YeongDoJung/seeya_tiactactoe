package seeya.insight.user.dao;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Repository;
import seeya.insight.mapper.common.CommonMapper;

import java.util.HashMap;
import java.util.Map;

@Repository
public class UserDAO extends CommonMapper{
    public int countUserById(Object param) {
        return (int) selectOne("user.countUserById", param);
    }
    public Map<String, Object> getUser(Object param) {
        return (Map<String, Object>) selectOne("user.getUser", param);
    }
    public int countUserByNickname(Object param) {
        return (int) selectOne("user.countUserByNickname", param);
    }
    public int checkisthisnickname(Object param) {
        return (int) selectOne("user.checkisthisnickname", param);
    }
    public String getUserByNickname(Object param) {
        return (String) selectOne("user.getUserByNickname", param);
    }
    public Map<String, Object> getUserByEmail(Object param) {
        return (Map<String, Object>) selectOne("user.getUserByEmail", param);
    }
    public int signup(Object param) {
        return (int) insert("user.signup", param);
    }
    public int checkUserByIDandEmail(Object param) {
        return (int) selectOne("user.checkUserByIDandEmail", param);
    }
    public int userChangePw(Object param) {
        return (int) update("user.userChangePw", param);
    }
    public int checkNickname(Object param) { return (int) selectOne("user.checkNickname", param); }
    public int userChangeNickname(Object param) {
        return (int) update("user.userChangeNickname", param);
    }
    public Map<String, Object> userGameScoreInfo(Object param) {
        return (Map<String, Object>) selectOne("user.userGameScoreInfo", param);
    }
    public int userGameBaseInfo(Object param) {
        return (int) insert("user.userGameBaseInfo", param);
    }

    public int userResetScore(Object param) {
        return (int) update("user.userResetScore", param);
    }
    public int userDelete(Object param) {
        delete("user.userDeleteForeignKey", param);
        return (int) delete("user.userDelete", param);
    }
    public int updateUserScore(Object param) {
        return (int) update("user.updateUserScore", param); }
}
