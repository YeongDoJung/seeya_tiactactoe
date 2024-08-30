package seeya.insight.common.dao;

import org.springframework.stereotype.Repository;
import seeya.insight.mapper.common.CommonMapper;

import java.util.List;
import java.util.Map;

/*******************************************************
 * @CLASSENAME  : seeya.insight.common.dao
 * @AUTHOR      : 이병덕
 * @SINCE       : 2023.05.03
 * @VERSION     : 
 * @DESCRIPTION : 
 *******************************************************/
@Repository("commonDAO")
public class CommonDAO extends CommonMapper {

    /**
     * 파일의 속성(mime-type) 체크
     * @param map
     * @return
     * @throws Exception
     */
    public String checkMimeType(Map<String, Object> map) throws Exception{
        return (String) selectOne("common.checkMimeType" , map);
    }

    /**
     * 다운로드할 파일 정보
     * @param map
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getFileInfo(Map<String, Object> map) throws Exception{
        return (Map<String, Object>)selectOne("common.getFileInfo", map);
    }

    /**
     * 에러메시지
     */
    public String getErrMessage(Map<String, Object> map) throws Exception{
        return (String) selectOne("common.getErrMessage" , map);
    }

    /**
     * 로그인용 로그 메시지
     */
    public String getLoginLogMessage(String errCode) throws Exception{
        return (String) selectOne("common.getLoginLogMessage" , errCode);
    }

    /**
     * 권한설정값 가져오기
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getPerm(Map<String, Object> map) throws Exception{
        return (Map<String, Object>) selectOne("common.getPerm" , map);
    }

    /**
     * URI로 메뉴코드 가져오기
     */
    public String getMenuCode(String menuURL) {
        return (String) selectOne("common.getMenuCode" , menuURL);
    }

    /**
     * 왼쪽 메뉴 가져오기
     * @param map
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "deprecation" })
    public List<Map<String, Object>> getSideMenu(Map<String, Object> map) throws Exception {
        return (List<Map<String, Object>>) list("common.getSideMenu" , map);
    }

    /**
     * 게시판 설정값 가져오기
     * @param boardCode
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
    public Object getBoardSetting(String boardCode) throws Exception{
        return (Map<String, Object>) selectOne("common.getBoardSetting" , boardCode);
    }

    /**
     * 코드목록 : 각 페이지에서 사용
     * @param map
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "unchecked", "deprecation" })
    public List<Map<String, Object>> getCodeList(Map<String, Object> map) throws Exception{
        return (List<Map<String, Object>>) list("common.getCodeList", map);
    }

    /**
     * 페이지 타이틀
     * @param menuCode
     * @return
     */
    public String getPageTitle(String menuCode) {
        return (String) selectOne("common.getPageTitle" , menuCode);
    }

    /**
     * 환경설정 가져오기
     * @param resultMap
     * @return
     * @throws Exception
     */
    public String getConfigureValue(Map<String, Object> resultMap) throws Exception{
        return (String) selectOne("common.getConfigureValue" , resultMap);
    }

    /**
     * 로그 기록
     * @param map
     * @throws Exception
     */
    public void regLog(Map<String, Object> map) throws Exception{
        insert("common.regLog" , map);
    }

    /**
     * 코드리스트의 코드그룹명
     * @param map
     * @return
     * @throws Exception
     */
    public String getCodeGroupName(Map<String, Object> map) throws Exception{
        return (String) selectOne("common.getCodeGroupName" , map);
    }

    /**
     * 특정페이지  권한에따른   MANAGE_YN  특정페이지 관리여부
     * 사용처 예) : 민감데이터 페이지 관리자가 로그인시 관리여부 확인 하여 권한이 있는사람만 민감데이터 알림여부 하기위함
     * @param map
     * @return
     */
    @SuppressWarnings("unchecked")
    public Map<String,Object> checkManageYn(Map<String, Object> map) {
        return (Map<String, Object>)selectOne("common.checkManageYn", map);
    }
}