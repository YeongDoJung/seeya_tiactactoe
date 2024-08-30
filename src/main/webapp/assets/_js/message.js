/**
 * alert, popup에 나타나는 메지시 
 */

var message = "";

var messageError  = "예기치 못한 오류가 발생하였습니다.";
var messageSave   = "저장하였습니다.";
var messageEdit   = "수정하였습니다.";
var messageDelete = "삭제되었습니다.";
var messageProcess = "처리되었습니다.";

messageCommon = function(code) {
    var arr = code.split("^$$^");
    switch (arr[0]) {
        case "F010" : message = arr[1] + "(은)는 첨부할 수 없는 파일형식입니다.";                                  break;
        case "F020" : message = "제한 용량 "+ arr[1] + "MB를 초과하였습니다.";                                     break;  
        case "F030" : message = "첨부파일 등록을 위한 초기화를 실패하였습니다.";                                   break;  
        case "F050" : message = "파일 삭제를 실패하였습니다.";                                                     break;  
        case "F060" : message = "파일 최대 허용갯수("+ arr[1] +")를 초과하였습니다.";                              break;  
        case "F070" : message = "파일 확장자와 속성이 일치하지 않습니다.";                                         break;  
        case "F080" : message = "파일명에 특수문자를 사용할 수 없습니다.";                                         break;  
        
        // 코드 등록
        case "E109" : message = "코드그룹을 선택 해 주세요.";                                                      break;
        case "E110" : message = "코드키가 올바르지 않습니다.";                                                     break;
        case "E113" : message = "게시판코드가 올바르지 않습니다.";                                                 break;  
        case "E115" : message = "권한코드를 적어주세요.";                                                          break;          
        case "E116" : message = "코드는 영문으로 시작하여 영문 + 숫자, 최대 9자까지 가능합니다.";                  break;  
        
        case "E120" : message = "코드명을 적어주세요.";                                                            break;  
        case "E123" : message = "게시판명이 올바르지 않습니다.";                                                   break;
        case "E125" : message = "권한명을 적어주세요.";                                                            break;  
        case "E126" : message = "코드명은 최대 20바이트까지 쓸 수 있습니다.";                                      break;  

        case "E135" : message = "메뉴명은 최대 20바이트까지 쓸 수 있습니다.";                                      break;  
        case "E137" : message = "이동경로를 적어 주세요.";                                                         break;  
        
        case "E150" : message = "숫자만 입력할 수 있습니다.";                                                      break;  
                case "E400" : message = "잘못된 경로로 오셨습니다.";                                               break;  
        
        case "E600"  : message = "사용자명을 적어주세요.";                                                         break;  
        case "E610"  : message = "아이디는 영문으로 시작하여 6자 이상 12자 이하로 적어주세요.";                    break; 
        case "E620"  : message = "아이디는 영문으로 시작하여 6자 이상 12자 이하로 적어주세요.";                    break; 
        case "E630"  : message = "비밀번호는 영문, 숫자, 특수문자로 8자리 이상 15자리 이하로 구성되어야 합니다.";  break; 
        case "E640"  : message = "비밀번호와 비밀번호 확인이 일치하지 않습니다.";                                  break;  
        case "E650"  : message = "사용자의 권한을 선택 해 주세요.";                                                break;  
        case "E660"  : message = "전화번호 정보가 올바르지 않습니다.";                                             break;  
        case "E670"  : message = "모바일 정보가 올바르지 않습니다.";                                               break;  
        case "E680"  : message = "이메일 정보가 올바르지 않습니다.";                                               break;  
        case "E690"  : message = "IP 정보가 올바르지 않습니다.";                                                   break;  
        
        case "E301" : message = "구분을 선택 해 주세요.";                                                          break;  
        case "E302" : message = "내용은 10글자 이상 적어주세요.";                                                  break;  
        case "E304" : message = "제목은 5byte 이상 100byte이하로 적어주세요.";                                     break;  
        case "E305" : message = "2글자 이상 입력 해 주셔야 검색을 할 수 있습니다.";                                break;         
        
        case "EP01" : message = "권한이 변경되었습니다.";                                                          break;        
        case "perm" : message = "사용 권한이 없습니다.";                                                           break;  

        case "QDEL" : message = "정말 게시물을 삭제하시겠습니까?";                                                 break;  
    }

    return message;
}