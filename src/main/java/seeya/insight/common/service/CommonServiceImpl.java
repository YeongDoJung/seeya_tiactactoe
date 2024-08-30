package seeya.insight.common.service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import seeya.insight.app.util.FileUtils;
import seeya.insight.common.dao.CommonDAO;

import java.io.File;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/*******************************************************
 * @CLASSENAME  : seeya.insight.common.service
 * @AUTHOR      : 이병덕
 * @SINCE       : 2023.05.03
 * @VERSION     : 
 * @DESCRIPTION : 
 *******************************************************/
@Service("commonService")
@Log4j2
public class CommonServiceImpl implements CommonService{

    @Autowired
    private CommonDAO commonDAO;

    @Autowired
    private FileUtils fileUtils;

    /**
     *
     * 임시폴더로 파일업로드
     * @param request
     * @return
     * @throws Exception
     */
    public String tempFileUpload(HttpServletRequest request) throws Exception {
        MultipartHttpServletRequest multipartHttpServletRequest = (MultipartHttpServletRequest) request;
        Iterator<String> iterator = multipartHttpServletRequest.getFileNames();

        String result = "ERROR";

        MultipartFile multipartFile  = null;

        String FileExtension = "";
        String FileName = "";
        String FileMime = "";

        while (iterator.hasNext()) {
            multipartFile = multipartHttpServletRequest.getFile(iterator.next());

            if (multipartFile.isEmpty()) {
                result = "NOT_FILE";
            }else{
                FileMime      = multipartFile.getContentType();
                FileName      = multipartFile.getOriginalFilename();
                FileExtension = FileName.substring(FileName.lastIndexOf("."));   // 원본 파일의 확장자 추출
                FileExtension = FileExtension.toLowerCase();

                if (this.checkMimeType(FileMime, FileExtension)) {
//                    log.debug("------------------------------- CommonService.tempFileUpload s ------------------------");
                    result = fileUtils.tempFileUpload(request);
//                    log.debug("------------------------------- CommonService.tempFileUpload e ------------------------");
                }else{
                    result = "OVER_MIME";
                }
            }
        }

        return result;
    }

    /**
     * 파일의 속성(mime-type) 체크
     */
    public boolean checkMimeType(String fileMime, String fileExtension) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();  // 개체 생성

        map.put("fileMime", fileMime);
        map.put("fileExtension", fileExtension);

        String mimeCheck = commonDAO.checkMimeType(map);

        return mimeCheck.equals("Y");
    }

    /**
     * 임시폴더 안에 있는 파일 목록 가져오기
     */
    @SuppressWarnings("static-access")
    public List<Map<String, Object>> getFileList(HttpServletRequest request) throws Exception {
        String serviceType = request.getParameter("strm");

        String filePath = fileUtils.baseDir + fileUtils.basePath + fileUtils.tempPath;

        filePath = filePath + request.getSession().getAttribute("strMyID") + "/" + serviceType + "/";

        return (List<Map<String, Object>>) fileUtils.getFileList(filePath);
    }

    /**
     * 임시폴더 초기화
     */
    public String tempDeleteFolder(Map<String, Object> map) throws Exception {
        return (String) fileUtils.tempDeleteFolder(map);
    }

    /**
     * 임시폴더 안에 있는 파일 중 1개 파일 삭제
     */
    public String tempDeleteFile(Map<String, Object> map) throws Exception {
        return (String) fileUtils.tempDeleteFile(map);
    }

    /**
     * 다운로드할 파일 정보
     */
    public Map<String, Object> getFileInfo(Map<String, Object> map) throws Exception {
        Map<String, Object> resultMap = null;

        switch ((String)map.get("strm")) {
            case "Board": // 게시판 첨부파일
                resultMap = commonDAO.getFileInfo(map); break;
        }

        return resultMap;
    }

    /**
     * 파일을 저장할 기본 경로
     * @return
     */
    @SuppressWarnings("static-access")
    public String getBaseDir() {
        return (String) fileUtils.baseDir;
    }

    /**
     * 파일존재여부 체크
     * @param filePath
     * @param fileName
     * @return
     * @throws Exception
     */
    public boolean checkFile(String filePath, String fileName) throws Exception {
        return fileUtils.isCheckFile(filePath , fileName);
    }

    /**
     * 파일 다운로드 : 공통
     * @param map
     * @param response
     * @return
     * @throws Exception
     */
    public String downloadFile(Map<String,Object> map , HttpServletResponse response) throws Exception {

        String result = "SUCCESS";

        String FileName         = (String) map.get("FileName");
        String originalFileName = (String) map.get("originalFileName");
        String FileDir          = (String) map.get("FileDir");

        // 파일 존재 여부 체크
        if (checkFile(FileDir, FileName)) {

            byte fileByte[] = org.apache.commons.io.FileUtils.readFileToByteArray(new File(FileDir + FileName));

            response.setContentType("application/octet-stream");
            response.setContentLength(fileByte.length);

            response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(originalFileName, "UTF-8") + "\";");
            response.setHeader("Content-Transfer-Encoding", "binary");
            response.getOutputStream().write(fileByte);

            response.getOutputStream().flush();
            response.getOutputStream().close();
        }else{
            result = "FAIL";
        }

        return result;
    }

    /**
     *                  에러페이지 내용
     */
    public Map<String, Object> getErrorPage(String errCode) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("errCode", "ERROR");
        map.put("errMessage", getErrMessage(errCode));

        return map;
    }

    /**
     * 오류 메시지
     */
    public String getErrMessage(String errCode) throws Exception {

        Map<String, Object> map = new HashMap<String, Object>();  // 개체 생성

        map.put("errCode", errCode);        // 로그 코드 - 코드등록

        String errMsg = (String) commonDAO.getErrMessage(map);

        if (errMsg == "" || errMsg == null) {
            errMsg = "Exception Error";
        }

        return errMsg;
    }

    /**
     * 엑셀파일 저장 경로
     */
    @SuppressWarnings("static-access")
    public String getExcelDir() {
        return (String) fileUtils.baseDir + fileUtils.basePath + fileUtils.excelPath;
    }

    /**
     * 로그인용 로그 메시지
     */
    public String getLoginLogMessage(String errCode) throws Exception {
        String errMsg = (String) commonDAO.getLoginLogMessage(errCode);

        return errMsg;
    }

    /**
     * 권한설정값 가져오기
     */
    public Map<String, Object> getPerm(Map<String, Object> map) throws Exception {
        return commonDAO.getPerm(map);
    }

    /**
     * URI로 메뉴코드 가져오기
     */
    public String getMenuCode(String menuURL) throws Exception {
        return commonDAO.getMenuCode(menuURL);
    }

    /**
     *
     * 사이드 메뉴 가져오기
     * @param request
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> getSideMenu(HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();

        String permCode = (String) session.getAttribute("strMyPerm");

        List<Map<String, Object>> list = null;

        if (permCode != null) {
            Map<String, Object> map = new HashMap<String, Object>();

            map.put("permCode", permCode);
            list = commonDAO.getSideMenu(map);
        }

        return list;
    }

    /**
     * 게시판 설정값 가져오기
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> getBoardSetting(String boardCode) throws Exception {
        return (Map<String, Object>) commonDAO.getBoardSetting(boardCode);
    }

    /**
     * 코드목록 : 각 페이지에서 사용
     */
    public List<Map<String, Object>> getCodeList(String Code) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("Code", Code);
        return commonDAO.getCodeList(map);
    }

    /**
     * 페이지 타이틀
     */
    public String getPageTitle(HttpServletRequest request) {
        HttpSession session = request.getSession();

        String menuCode = (String) session.getAttribute("menuCode");

        return commonDAO.getPageTitle(menuCode);
    }

    /**
     * 환경설정 가져오기
     */
    public String getConfigureValue(String Code) throws Exception {
        Map<String, Object> resultMap = new HashMap<String, Object>();  // 개체 생성

        resultMap.put("Code", Code);

        String result = (String) commonDAO.getConfigureValue(resultMap);

        if (Code.equals("attach")) {
            result = result.replaceAll(",", "||");
        }

        return result;
    }

    /**
     * 사용자 로그 기록
     * @param map
     * @throws Exception
     */
    public void regLog(Map<String, Object> map) throws Exception {
        //commonDAO.regLog(map);
    }

    /**
     * 코드리스트의 코드그룹명
     * @param code
     * @return
     * @throws Exception
     */
    public String getCodeGroupName(String code) throws Exception {
        Map<String, Object> map = new HashMap<String, Object>();

        map.put("code", code);

        return (String) commonDAO.getCodeGroupName(map);
    }

    /**
     * 특정페이지  권한에따른   MANAGE_YN  특정페이지 관리여부
     * 사용처 예) : 민감데이터 페이지 관리자가 로그인시 관리여부 확인 하여 권한이 있는사람만 민감데이터 알림여부 하기위함
     * @param map
     * @return
     * @throws Exception
     *
     */
    @SuppressWarnings("unchecked")
    public Map<String, Object> checkManageYn(Map<String, Object> map) throws Exception {
        return commonDAO.checkManageYn(map);
    }
}
