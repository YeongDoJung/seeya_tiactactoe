package seeya.insight.user.web;

import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import seeya.insight.game.service.GameServiceImpl;
import seeya.insight.user.service.UserService;

import java.io.IOException;
import java.util.*;

@Controller("UserController")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private GameServiceImpl gameService;

    @RequestMapping("/signup")
    public String userJoinView(HttpServletRequest request) {
        return "signup";
    }

    @RequestMapping("/ajax/signUpForm")
    @ResponseBody
    public Map<String, Object> signUp(HttpServletRequest request, Map<String, Object> param) {
        param.put("userId", request.getParameter("userId"));
        param.put("userPw", request.getParameter("userPw"));
        param.put("userNickname", request.getParameter("userNickname"));
        param.put("userEmail", request.getParameter("userEmail"));
        return userService.signUp(param);
    }

    @RequestMapping("/login")
    public String userLoginView(HttpServletRequest request, Map<String, Object> map) {
        return "/login";
    }

    @RequestMapping("/ajax/login")
    @ResponseBody
    public Map<String, Object> userLogin(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", request.getParameter("userId"));
        param.put("userPw", request.getParameter("userPw"));
        return userService.userLogin(param, session);
    }

    @RequestMapping("/logout")
    public String userLogout(HttpSession session) {
        session.invalidate();
        return "/";
    }

    @RequestMapping("/find_id")
    public String userFindId(HttpServletRequest request, Map<String, Object> map) {
        return "find_id";
    }

    @RequestMapping("/ajax/findId")
    @ResponseBody
    public Map<String, Object> userFindIdForm(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userEmail", request.getParameter("userEmail"));
        return userService.userFindId(param, session);
    }

    @RequestMapping("/ajax/returnId")
    @ResponseBody
    public Map<String, Object> userReturnId(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("inputCode", request.getParameter("inputCode"));
        param.put("userEmail", session.getAttribute("userEmail"));

        return userService.userReturnId(param, session);
    }

    @RequestMapping("/check_id")
    public String userCheckId(HttpServletRequest request, Map<String, Object> map) {
        return "check_id";
    }

    @RequestMapping("find_pw")
    public String userFindPw(HttpServletRequest request, Map<String, Object> map) {
        return "find_pw";
    }

    @RequestMapping("/ajax/findPw")
    @ResponseBody
    public Map<String, Object> userFindPwForm(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", request.getParameter("userId"));
        param.put("userEmail", request.getParameter("userEmail"));
        return userService.userFindPw(param, session);
    }

    @RequestMapping("code_id")
    public String userCodeId(HttpServletRequest request, Map<String, Object> map) {
        return "code_id";
    }

    @RequestMapping("code_pw")
    public String userCodePw(HttpServletRequest request, Map<String, Object> map) {
        return "code_pw";
    }

    @RequestMapping("/ajax/returnPw")
    @ResponseBody
    public boolean userReturnPW(HttpServletRequest request, HttpSession session) {
        String inputCode = request.getParameter("inputCode");
        return Objects.equals(inputCode, session.getAttribute("randomCodes"));
    }

    @RequestMapping("change_pw")
    public String changePw(HttpServletRequest request) {
        return "change_pw";
    }

    @RequestMapping("/ajax/changePw")
    @ResponseBody
    public int userChangePw(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", session.getAttribute("userId"));
        param.put("userPw", request.getParameter("userPw"));
        return userService.userChangePw(param);
    }

    @RequestMapping("/main/{id}")
    public ModelAndView mainPage(HttpServletRequest request, HttpSession session, @PathVariable("id") String nowPage) {
        ModelAndView mv = new ModelAndView("main");
        Map<String, Object> param = new HashMap<String, Object>();
        param.put("userId", session.getAttribute("userId"));
        Map<String, Object> map = userService.userGameScoreInfo(param);
        session.setAttribute("userWin", map.get("userWin"));
        session.setAttribute("userDraw", map.get("userDraw"));
        session.setAttribute("userLose", map.get("userLose"));
        mv.addObject("nowPage", nowPage);
        return mv;
    }

    @RequestMapping("/ajax/rankerInfo")
    @ResponseBody
    public List<Map<String, Object>> rankerInfo(HttpServletRequest request, HttpSession session) {
        return userService.getRanker();
    }

    @RequestMapping("/ajax/changePwAtMain")
    @ResponseBody
    public int changePwAtMain(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", session.getAttribute("userId"));
        param.put("userPw", request.getParameter("newPw"));
        session.invalidate();
        return userService.userChangePw(param);
    }

    @RequestMapping("/ajax/changeNickname")
    @ResponseBody
    public String userChangeNickname(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("newName", request.getParameter("newName"));
        param.put("userNickname", session.getAttribute("userNickname"));
        param.put("userId", session.getAttribute("userId"));
        if (Objects.equals(param.get("newName").toString(), param.get("userNickname").toString())) {
            return "same";
        }
        else {
            String result = userService.userChangeNickname(param);
            if (Objects.equals(result, "done")) {
                session.setAttribute("userNickname", param.get("newName").toString());
            }
            return result;
        }
    }

    @RequestMapping("/ajax/resetScore")
    @ResponseBody
    public int userResetScore(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", session.getAttribute("userId"));
        return userService.userResetScore(param);
    }

    @RequestMapping("/ajax/unregister")
    @ResponseBody
    public String userDelete(HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", session.getAttribute("userId"));
        String result = userService.userDelete(param);
        if (Objects.equals(result, "success")) {
            session.invalidate();
        }
        return result;
    }

    @RequestMapping("/ajax/updateUserScore")
    @ResponseBody
    public Map<String, Object> updateUserScore(HttpServletRequest request, HttpSession session) {
        Map<String, Object> param = new HashMap<>();
        param.put("winner", request.getParameter("winner"));
        param.put("seq", request.getParameter("seq"));
        param.put("me", request.getParameter("me"));
        param.put("userId", session.getAttribute("userId"));
        userService.updateUserScore(param, session);
        return userService.userGameScoreInfo(param);
    }

    @RequestMapping("/ajax/updateIcon")
    public void userUpdateIcon(@RequestParam("icon") MultipartFile file, HttpSession session) throws IOException {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", session.getAttribute("userId"));
        userService.userUpdateIcon(param, file);
    }

    @RequestMapping("/ajax/loadIcon")
    @ResponseBody
    public String loadIcon(HttpServletRequest request) {
        Map<String, Object> param = new HashMap<>();
        param.put("userId", request.getParameter("userId"));
        return userService.loadIcon(param);
    }
}
//    public String userRecord(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
//
//    public int userRecordUpdate(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
//
//    public int userInfo(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
//
//    public int userInfoUpdate(HttpServletRequest request, Map<String, Object> map) {
//        return ;
//    }
//