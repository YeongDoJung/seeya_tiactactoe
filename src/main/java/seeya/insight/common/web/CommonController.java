package seeya.insight.common.web;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import seeya.insight.app.util.CommandMap;
import seeya.insight.app.util.Common;
import seeya.insight.app.util.excel.ExcelUtil;
import seeya.insight.common.service.CommonService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.File;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*******************************************************
 * @CLASSENAME  : seeya.insight.common.web.CommonController
 * @AUTHOR      : 이병덕
 * @SINCE       : 2023.05.03
 * @VERSION     : 
 * @DESCRIPTION :
 *      - tempFileUpload        임시폴더로 파일업로드
 *      - getFileList           파일 목록 가져오기
 *      - tempDeleteFolder      임시폴더 초기화 : 임시폴더 삭제
 *      - tempDeleteFile        임시폴더 초기화 : 임시폴더 내의 파일 삭제\
 *      - checkAttachment       게시판 첨부파일 존재여부 체크
 *      - downloadFile          첨부파일 다운로드
 *      - goDownloadNameDir     파일명, 경로로 다운로드
 *      - downloadExcelFile     생성된 엑셀파일 다운로드
 *******************************************************/
@Controller
@Log4j2
public class CommonController {

    @Autowired
    private CommonService commonService;

    @Autowired
    private ExcelUtil excelUtil;


    /**
     * tempFileUpload 임시폴더로 파일업로드
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/ajax/tempFileUpload.do")
    public ModelAndView tempFileUpload(HttpServletRequest request) throws Exception{
        ModelAndView mv = new ModelAndView("jsonView");

        mv.addObject("errCode" , commonService.tempFileUpload(request));

        return mv;
    }

    /**
     * 파일 목록 가져오기
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/ajax/getFileList.do")
    public ModelAndView getFileList(HttpServletRequest request) throws Exception{
        ModelAndView mv = new ModelAndView("jsonView");

        List<Map<String,Object>> list = commonService.getFileList(request);

        mv.addObject("fileList" , list);
        return mv;
    }

    /**
     * 임시폴더 초기화 : 임시폴더 삭제
     * @param commandMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/ajax/tempDeleteFolder.do")
    public ModelAndView tempDeleteFolder(CommandMap commandMap) throws Exception{
        ModelAndView mv = new ModelAndView("jsonView");

        mv.addObject("errCode" , commonService.tempDeleteFolder(commandMap.getMap()));

        return mv;
    }

    /**
     * 임시폴더 초기화 : 임시폴더 내의 파일 삭제
     * @param commandMap
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/ajax/tempDeleteFile.do")
    public ModelAndView tempDeleteFile(CommandMap commandMap) throws Exception{
        ModelAndView mv = new ModelAndView("jsonView");

        mv.addObject("errCode" , commonService.tempDeleteFile(commandMap.getMap()));

        return mv;
    }

    /**
     * 게시판 첨부파일 존재여부 체크
     * @param commandMap
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping(value="/ajax/common/checkAttachment.do")
    public ModelAndView checkAttachment(CommandMap commandMap , HttpServletRequest request) throws Exception {
        ModelAndView mv = new ModelAndView("jsonView");
        boolean error = false;
        String strm = (String) commandMap.getMap().get("strm");

        Map<String, Object> map = null;

        if ("Board".equals(strm) || "ProofForm".equals(strm) || "ProofFile".equals(strm) || "AForm".equals(strm)) {
            map = commonService.getFileInfo(commandMap.getMap());
        } else {
            error = true;
        }

        if (map == null) error = true;

        if(!error) {
            String FileName = (String) map.get("FILE_NM");
            String FileDir  = (String) map.get("FILE_DIR");
            String baseDir  = (String) commonService.getBaseDir();

            FileDir = baseDir + FileDir;

            if (commonService.checkFile(FileDir, FileName)) {
                mv.addObject("errCode" , "SUCCESS");
            }else{
                mv.addObject("errCode" , "FAIL");
            }
        } else {
            mv.addObject("errCode" , "FAIL");
        }

        return mv;
    }

    /**
     * 첨부파일 다운로드
     * @param commandMap
     * @param response
     * @param request
     * @throws Exception
     */
    @RequestMapping(value="/common/goDownloadFile.do")
    public ModelAndView downloadFile(CommandMap commandMap , HttpServletResponse response , HttpServletRequest request) throws Exception{

        String result = "";

        // 다운로드 할 파일 정보 가져오기
        Map<String,Object> map = commonService.getFileInfo(commandMap.getMap());

        String FileName         = (String) map.get("FILE_NM");
        String originalFileName = (String) map.get("ORIGINAL_NAME");
        String FileDir          = (String) map.get("FILE_DIR");
        String baseDir          = (String) commonService.getBaseDir();

        FileDir = baseDir + FileDir;

        // 다운로드할 파일 정보를 담을 객체
        Map<String, Object> downloadMap = new HashMap<String, Object>();  // 개체 생성

        downloadMap.put("FileName"         , FileName);
        downloadMap.put("originalFileName" , originalFileName);
        downloadMap.put("FileDir"          , FileDir);

        // 파일 존재여부 체크 후 다운로드. 결과 텍스트 리턴
        result = commonService.downloadFile(downloadMap , response);

        if (result.equals("SUCCESS")) {
            return null;
        }else{
            ModelAndView mv = new ModelAndView("/err_page");
            mv.addObject("err", commonService.getErrorPage("E782"));  // 파일다운로드에실패하였습니다.

            return mv;
        }
    }

    /**
     * 파일명, 경로로 다운로드
     * @param commandMap
     * @param response
     * @param request
     * @throws Exception
     */
    @RequestMapping(value="/common/goDownloadNameDir.do")
    public ModelAndView goDownloadNameDir(CommandMap commandMap , HttpServletResponse response , HttpServletRequest request) throws Exception{

        String result = "";

        String FileName         = (String) commandMap.getMap().get("fileName");
        String FileDir          = (String) commandMap.getMap().get("fileDir");
        String baseDir          = (String) commonService.getBaseDir();

        FileDir = baseDir + FileDir;

        // 다운로드할 파일 정보를 담을 객체
        Map<String, Object> downloadMap = new HashMap<String, Object>();  // 개체 생성

        downloadMap.put("FileName"         , FileName);
        downloadMap.put("originalFileName" , FileName);
        downloadMap.put("FileDir"          , FileDir);

        // 파일 존재여부 체크 후 다운로드. 결과 텍스트 리턴
        result = commonService.downloadFile(downloadMap , response);

        if (result.equals("SUCCESS")) {
            return null;
        }else{
            ModelAndView mv = new ModelAndView("/err_page");
            mv.addObject("err", commonService.getErrorPage("E782")); // 파일다운로드에실패하였습니다.

            return mv;
        }
    }

    /**
     * 생성된 엑셀파일 다운로드
     * @param commandMap
     * @param response
     * @param request
     * @throws Exception
     */
    @RequestMapping(value="/common/downloadExcelFile.do")
    public void downloadExcelFile(CommandMap commandMap , HttpServletResponse response , HttpServletRequest request) throws Exception{

        String FileName         = (String) commandMap.getMap().get("excelName");
        String originalFileName = (String) commandMap.getMap().get("category") + "_" + FileName;
        String FileDir          = (String) commonService.getExcelDir();

        byte fileByte[] = FileUtils.readFileToByteArray(new File(FileDir + FileName));

        response.setContentType("application/octet-stream");
        response.setContentLength(fileByte.length);

        response.setHeader("Content-Disposition", "attachment; fileName=\"" + URLEncoder.encode(originalFileName,"UTF-8")+"\";");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.getOutputStream().write(fileByte);

        response.getOutputStream().flush();
        response.getOutputStream().close();
    }
}
