var lastDatepickerEventTS = 0;
$(document).ready(function () {
    //라디오 버튼 스타일 처리
    $(".ui-radio").each(function () {
        $(this).buttonset();
        $(this).css("display", "block")
    });

    // 메시지 출력 영역 숨기기
    $("#divMessage").hide();
    //$("#divLoading").hide();

    $('.quantity').css('imeMode','disabled').keypress(function(event) {
        if(event.which && (event.which < 48 || event.which > 57) && (event.which != 45) ) {
            event.preventDefault();
        }
    }).keyup(function(){
        if( $(this).val() != null && $(this).val() != '' ) {
            var minus = "";
            var tmps = $(this).val().replace(/[^(-?)0-9]/g, '');
            tmps = tmps.replace(/,/gi, ""); // 가로

            if (tmps == "-" || tmps < 0) {
                minus = "-";
            }

            tmps = tmps.replace(/-/gi, ""); // 가로
            var tmps2 = tmps.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,'$1,');

            $(this).val(minus + tmps2);
        }
    });

    // 날짜 범위 선택 : 시작일 ~ 종료일
    $('.input-daterange').datepicker({
        todayHighlight: true,

        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    });

    // ekko-lightbox
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });

    $.pDefault = function(event){
        event.preventDefault();
    }

    /*$(".i-checks").iClick({
        checkboxClass : "icheckbox_square-green",
        radioClass : "iradio_square-green"
    });*/

    _modalDefault();
    _number();
    _mobileFormat(); // 전화번호, 핸드폰 번호
    _tooltip();
    ymdDateFormat();


});

var _modalDefault = function(){
        // 기본 모달창 띄우기 : 중간 크기
        $("#modalPublic").on("shown.bs.modal" , function(e) {
            var link = $(e.relatedTarget);
            var color_header = link.attr("data-head-color");

            $(".modal-content").html("");

            color_header = color_header ? color_header + " modal-header" : "modal-header";

            $(this).find("#modal-default").removeClass();
            $(this).find("#modal-default").addClass("modal-dialog fadeInSize");

            $(this).find("#modal-default").addClass("colored-header "+ color_header);

            $(this).find(".modal-content").load(link.attr("link"));
        });

        // 큰 모달창 띄우기
        $("#modalPublic-lg").on("shown.bs.modal" , function(e) {
            var link = $(e.relatedTarget);
            var color_header = link.attr("data-head-color");

            $(".modal-content").html("");

            color_header = color_header ? color_header + " modal-header" : "modal-header";

            $(this).find("#modal-lg").removeClass();
            $(this).find("#modal-lg").addClass("modal-dialog modal-lg fadeInSize");

            $(this).find("#modal-lg").addClass("colored-header "+ color_header);

            $(this).find(".modal-content").load(link.attr("link"));
        });

        // 중간 모달창 띄우기
        $("#modalPublic-md").on("shown.bs.modal", function(e) {
            var link = $(e.relatedTarget);
            var color_header = link.attr("data-head-color");

            $(".modal-content").html("");

            color_header = color_header ? color_header + " modal-header" : "modal-header";

            $(this).find("#modal-md").removeClass();
            $(this).find("#modal-md").addClass("modal-dialog modal-md fadeInSize");

            $(this).find("#modal-md").addClass("colored-header "+ color_header);

            $(this).find(".modal-content").load(link.attr("link"));
        });

        // 작은 모달창 띄우기
        $("#modalPublic-sm").on("shown.bs.modal", function(e) {
            var link = $(e.relatedTarget);
            var color_header = link.attr("data-head-color");

            $(".modal-content").html("");

            color_header = color_header ? color_header + " modal-header" : "modal-header";

            $(this).find("#modal-sm").removeClass();
            $(this).find("#modal-sm").addClass("modal-dialog modal-sm fadeInSize");

            $(this).find("#modal-sm").addClass("colored-header "+ color_header);

            $(this).find(".modal-content").load(link.attr("link"));
        });
    },
    _number = function(){
        $('.number').css('imeMode','disabled').keypress(function(event) {
            if(event.which && (event.which < 48 || event.which > 57) ) {
                event.preventDefault();
            }
        }).keyup(function(){
            if( $(this).val() != null && $(this).val() != '' ) {
                //var tmps = $(this).val().replace(/[^0-9]/g, '');
                var tmps = $(this).val().replace(/[^0-9]/g, '');

                $(this).val(tmps);
            }
        });
    },
    _mobileFormat = function () {

        $('.tel-format').css('imeMode','disabled').keypress(function(event) {
            if (event.which && (event.which < 48 || event.which > 57)) {
                event.preventDefault();
            }
        }).keyup(function(){
            var nums = $(this).val();

            nums = nums.replace(/[^0-9]/g , "");

            if (nums.length > 11) {
                nums = nums.substr(0, 11);
            }

            var pattern = /^(\d{3})-?(\d{3,4})-?(\d{4})$/;

            var result = "";

            if(!nums) return false;

            var match = pattern.exec(nums);

            if(match) {
                result = match[1]+"-"+match[2]+"-"+match[3];
            } else {
                result = nums;
            }
            $(this).val(result);
        });
    },
    _tooltip = function(){
        $(".tip-icon").mouseover(function (){
            var activeTip = $(this).attr("data-id");
            $("#"+activeTip).show();
        });

        $(".tip-icon").mouseleave(function(){
            var activeTip = $(this).attr("data-id");
            $("#"+activeTip).hide();
        });
    }

var ymdDateFormat = function () {

    $('.ymd-type').css('imeMode','disabled').keypress(function(event) {
        if (event.which && (event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    }).keyup(function(){
        var nums = $(this).val();

        nums = nums.replace(/[^0-9]/g , "");

        if (nums.length > 8) {
            nums = nums.substr(0, 8);
        }

        var pattern = /^(\d{4})-?(\d{2})-?(\d{2})$/;

        var result = "";

        if(!nums) return false;

        var match = pattern.exec(nums);

        if(match) {
            result = match[1]+"-"+match[2]+"-"+match[3];
        } else {
            result = nums;
        }
        $(this).val(result);
    });
},
    handleSlimScroll = function() {
        "use strict";
        $('[data-scrollbar=true]').each( function() {
            generateSlimScroll($(this));
        });
    },
    generateSlimScroll = function(element) {
        if ($(element).attr('data-init')) {
            return;
        }
        var dataHeight = $(element).attr('data-height');
        dataHeight = (!dataHeight) ? $(element).height() : dataHeight;

        var scrollBarOption = {
            height: dataHeight,
            alwaysVisible: true
        };
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            $(element).css('height', dataHeight);
            $(element).css('overflow-x','scroll');
        } else {
            $(element).slimScroll(scrollBarOption);
        }
        $(element).attr('data-init', true);
    };

/**
 * 팝업 - 알럽 대체 창
 * @param title             제목
 * @param msg               메시지
 * @param css            헤더 스타일
 * @param callbackFunc   창이 닫힐 때 수행할 함수
 */
popMyServerAccount = function(link){

    $('#modalPublic-md').find("#modal-md").removeClass();
    $('#modalPublic-md').find("#modal-md").addClass("modal-dialog modal-md fadeInSize");

    $('#modalPublic-md').find("#modal-md").addClass("colored-header modal-header");

    $("#modalPublic-md").find(".modal-content").load(link);

    $('#modalPublic-md').modal();
}

/**
 * 새로온 메시지 체크 - toolbar
 */
getMyNewMessage = function(){
    $.post("/ajax/toolbar/getNewMyMessage.do"
        , { }
        , function (data) {

            data = $.parseJSON(data);

            if (data.myMsgList.length > 0) {


                var bodyMsg = $('#ulMyMessageContainer');

                var textCF = "";
                var css = "";
                var str       = "";

                $.each(data.myMsgList, function(key, value){

                    if (key == 0) {
                        str       = "<li class='dropdown-header'>Notifications ("+ value.MESSAGE_COUNT +") " +
                            "<button type='button' id='clearAllMyMessage' class='btn btn-primary btn-xs pull-right' style='font-size: 8px'>전체 읽음</button>" +
                            "</li>";
                        $("#myMessageCount").html(value.MESSAGE_COUNT);
                    }

                    if (value.C_IDX) {
                        textCF = "컴플라이언스";
                    }else{
                        textCF = "보안서비스";
                    }

                    css = "nbg-"+ getStateBgColor(value.STATE);

                    var msg = value.SEND_MSG;

                    msg = msg.replaceAll("<br>" , "");
                    msg = msg.replaceAll("<br" , "");
                    msg = msg.replaceAll("<b" , "");
                    msg = msg.replaceAll("<" , "");

                    str += "<li class='media'>" +
                        "  <a href='#0' data-toggle='modal' data-target='#modalPublic' link='/_popup/Notification/popNotification.jsp?IDX="+ value.IDX +"'>" +
                        "    <div class='media-left'><div class='media-object "+ css +"'>"+ getStateText(value.STATE) +"</div></div>" +
                        "    <div class='media-body'>" +
                        "      <h6 class='media-heading'>"+ textCF +"</h6>" +
                        "      <p>"+ msg +"</p>" +
                        "      <div class='text-muted f-s-11'>"+ value.REG_DATE +" "+ value.REG_TIME +"</div>" +
                        "    </div>" +
                        "  </a>" +
                        "</li>";
                });

                bodyMsg.html(str);

                $("#clearAllMyMessage").bind('click', function() {
                    $.post("/ajax/toolbar/popup/clearAllMyMessage.do"
                        , { }
                        , function (res) {
                            data = $.parseJSON(res);

                            if (data.err == "SUCCESS") {
                                popModalAlert("Confirm" , messageProcess , getMyNewMessage);
                            }else{
                                popModalAlert("ERROR" , data.err);
                            }
                        });
                });
            }else{
                $("#myMessageCount").hide();
                $("#ulMyMessageContainer").hide();
            }
        });
}


/**
 * 저장시 로딩 메시지
 * @param type
 */
showLoading = function(type){
    var str;
    switch (type){
        case 1 : str = "저장 중 입니다.";     break;
        case 2 : str = "업로드 중 입니다.";    break;
        case 3 : str = "데이터를 가져오는 중입니다."; break;
        case 4 : str = "업데이트 중입니다."; break;
        case 5 : str = "데이터를 가져오는 중입니다."; break;
    }

    $("#load-msg").html(str);
    $("#divLoading").show();
}

/**
 * 저장완료시 로딩 메시지 닫기
 */
hideLoading = function(){
    $("#load-msg").html("");
    $("#divLoading").hide();
}

/**
 * 날짜 필드 세팅
 * @param id
 */
setDateDefault = function(id, eventFunc){

    $('#'+id).datepicker({
        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
    }).on('changeDate', function (e) {
        var send = true;
        if (typeof (e) == 'object') {
            if (e.timeStamp - lastDatepickerEventTS < 300) {
                send = false;
            } else {
                send = true;
                lastDatepickerEventTS = e.timeStamp;
            }
        }

        if (send) {
            if (typeof eventFunc == 'function') {
                eventFunc(true);
            }
        }
    });
}

/**
 * 날짜 필드 세팅
 * @param id
 */
setDateReadOnly = function(id){

    $('#'+id).datepicker({});
}

/**
 * 날짜 필드 : 오늘날짜 리턴
 * @param id
 */
setDateToday = function(id){

    $('#'+id).datepicker({
        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    }).datepicker("setDate" , today());
}

/**
 * 날짜 필드 : 올해 첫날짜 리턴
 * @param id
 */
setYearFirstday = function(id){

    $('#'+id).datepicker({
        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    }).datepicker("setDate" , toYearFirstday());
}

/**
 * 날짜 필드 : 3개월전 날짜 표시
 * @param id
 */
setThreeMonthAgo = function(id){
    var thisDate = new Date();
    var thisYear = thisDate.getFullYear();    //해당 년
    var thisMonth = thisDate.getMonth();      //해당 월
    var thisDay   = thisDate.getDate();           //해당 일

    thisDate.setMonth(thisMonth - 3);
    console.log("thisDate = ", thisDate);


    $('#'+id).datepicker({
        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    }).datepicker("setDate" , thisDate);
}




/**
 * 날짜 필드 :
 * @param id
 */
setDate3DaysFromToday = function(id){
    var today_temp = String(parseInt(today().replaceAll("-", "")) + 3);

    var year = today_temp.substr(0, 4);
    var month = today_temp.substr(4, 2);
    var day = today_temp.substr(6, 2);
    var date = year + '-' + month + '-' + day;

    $('#'+id).datepicker({
        format:"yyyy-mm-dd",
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true
    }).datepicker("setDate" , date);
}

/**
 * 로딩 이미지
 * @param div
 */
getAjaxLoading = function(div) {
    if (!div) {
        div = "divResult";
    }
    $('#' + div).html("<div class='text-center p-h-md'><img src='/_images/ajax-loader2.gif' alt='데이터 로딩 이미지'><br/><br/>데이터를 로딩중입니다.</div>");
}


// 입력된 폼 초기화
onReset = function(from){

    $("form").each(function() {
        if(this.id == from) this.reset();
    });
}

//ajax후 input 배경처리 bgchange
genInputbg = function () {
    $(".ui-radio").each(function () {
        $(this).buttonset();
        $(this).css("display", "block")
    });
}

// LIST 체크박스 전체 선택.해제 기능
gOnListCheckBox = function(){
    if ($(this).attr("src").ipos("Icon_check_off.gif")>0){
        $(this).attr("src", "/_images/Icon_check_on.gif");
        $('.cbEl').attr( 'checked', 'checked' );
    }else{
        $(this).attr("src", "/_images/Icon_check_off.gif");
        $('.cbEl').attr( 'checked', '' );
    }
}


// LIST 체크박스 전체 선택.해제 기능
gOnListCheckBox2 = function(obj, classNm){
    if (typeof classNm !="string" || classNm == ""){
        classNm = "cbEl"
    }

    if ($(obj).attr("src").ipos("Icon_check_off.gif")>0){
        $(obj).attr("src", "/_images/Icon_check_on.gif");
        $('.' + classNm).attr( 'checked', 'checked' );
    }else{
        $(obj).attr("src", "/_images/Icon_check_off.gif");
        $('.' + classNm).attr( 'checked', '' );
    }
}

//팝업창 처리 부분
popup = function (param){
    var url       = param.url;
    var name      = param.name;
    var width     = param.width;
    var height    = param.height;
    var scroll    = param.scroll ? param.scroll : 1;
    var resizable = param.resizable;
    var left      = param.left;
    var top       = param.top;

    if (!height) {
        height = screen.availHeight * 0.9;
    }

    if (!left) left = ((screen.availWidth/2)-(Number(width)/2));
    if (!top)  top  = ((screen.availHeight/2)-(Number(height)/2));

    var PopUpNew = window.open(url
        , name
        , "left="+left+", top="+top+", width="+width+", height="+height+", scrollbars="+scroll+", toolbar=no, location=no, directories=no, status=no, menubar=no, resizable="+resizable+"");
    if (PopUpNew == null) popModalAlert("확인" , "팝업이 차단되어 있습니다.\n\n팝업을 허용하여 주시기 바랍니다");

    PopUpNew.focus();
}

//팝업창 처리 부분
popupForm = function (param){
    var url       = param.url;
    var name      = param.name;
    var width     = param.width;
    var height    = param.height;
    var scroll    = param.scroll;
    var resizable = param.resizable;
    var frmID     = param.frmID;

    if (!height) {
        height = screen.availHeight * 0.9;
    }

    var left=((screen.availWidth/2)-(Number(width)/2));
    var top=((screen.availHeight/2)-(Number(height)/2));

    var PopUpNew = window.open("" , name , "left="+left+", top="+top+", width="+width+", height="+height+", scrollbars=1, toolbar=no, location=no, directories=no, status=no, menubar=no, resizable=no");

    if (PopUpNew ) {
        var frm = document.getElementById(frmID);

        frm.target = name;
        frm.method = "post";
        frm.action = url;
        frm.submit();

        PopUpNew.focus();
        return PopUpNew;
    }else{
        alert("팝업이 차단되어 있습니다.\n\n팝업을 허용하여 주시기 바랍니다");
        return false;
    }
}

/**
 * 팝업 - 알럽 대체 창
 * @param title             제목
 * @param msg               메시지
 * @param css            헤더 스타일
 * @param callbackFunc   창이 닫힐 때 수행할 함수
 */
popModalAlert = function(title , msg , callbackFunc , css){
    dialog.defaultAlert(title, msg , callbackFunc);

    $('#divModalAlert>div').removeClass();
    $('#divModalAlert>div').addClass("modal-dialog");
    $("#divModalAlert").find("#divAlertArea").addClass("colored-header");

    $('#divModalAlert').modal();
    $(".btn-modal-close").focus();
}

/**
 * 팝업 - 알럽 대체 창
 * @param title             제목
 * @param msg               메시지
 * @param css            헤더 스타일
 * @param callbackFunc   창이 닫힐 때 수행할 함수
 */
popModalConfirm = function(title , msg , callbackFunc , css){
    dialog.confirmAlert(title, msg , callbackFunc, rejectFunc);

    $('#divModalConfirmAlert>div').removeClass();
    $('#divModalConfirmAlert>div').addClass("modal-dialog fadeInSize");
    $("#divModalConfirmAlert").find("#divConfirmAlertArea").addClass("colored-header");

    $('#divModalConfirmAlert').modal();
    $(".btn-modal-close").focus();
}

//---------------------------------------------------------------------------------------------------
// 레이어팝업창 자동 닫기
//---------------------------------------------------------------------------------------------------
autoPopClose = function () {
    setTimeout(function(){popClose();}, 5000);
}

/**
 * 레이어팝업 닫기
 */
popClose = function () {
    $("#divModalAlert").modal("hide");
    $("#divModalConfirmAlert").modal("hide");
    $("#modalPublic").modal("hide");
    $("#modalPublic-lg").modal("hide");
    $("#modalPublic-md").modal("hide");
    $("#modalPublic-sm").modal("hide");

    $("#divModalAlert").find(".modal-content").html("");
    $("#divModalConfirmAlert").find(".modal-content").html("");
    $("#modalPublic").find(".modal-content").html("");
    $("#modalPublic-lg").find(".modal-content").html("");
    $("#modalPublic-md").find(".modal-content").html("");
    $("#modalPublic-sm").find(".modal-content").html("");
}


/**
 * 메시지 출력
 * css : danger, success, info, warning, primary 중 1개
 * @param param   내용
 */
printErrorMessage = function (param) {
    var str       = param.str;                                                      // 출력될 문자열
    var css       = checkNull(param.css)       ? "danger"     : param.css;          // 배경색
    var divID     = checkNull(param.divID)     ? "divMessage" : param.divID;        // 문자열이 출력될 객체의 ID
    var closeTime = checkNull(param.closeTime) ? 15           : param.closeTime;    // 자동으로 닫힐 시간(초)
    var isPOP     = checkNull(param.isPOP)     ? false        : param.closeTime;    // 자동으로 닫힐 시간(초)

    if (checkNull(str)) {
        return false;
    }

    closeTime = closeTime * 1000;
    css       = "alert-" + css;

    if (css == "alert-danger") {
        str = ""+ str;
    }

    if (isPOP) {
        $("#"+ divID).addClass("alert text-left "+ css);
        str = "<span class='close' onClick='alertClose(this)'>&times;</span>" + str;
    }else{
        $("#"+ divID).attr("style" , "width: inherit");
        str = "<div id='divErrorMessageSub' style='"+ style +"' class='alert text-left "+ css +"'><span class='close' onClick='alertClose(this)'>&times;</span>" + str +"</div>";
    }

    $("#"+divID).html(str);
    $("#"+divID).slideDown();

    var timer = null;

    if (timer) {
        clearTimeout(timer);
        timer = null;
    }

    timer = setTimeout(function(){$("#"+divID).slideUp();}, closeTime);
}

/**
 * div형 메시지 창 닫기
 */
errMsgClose = function(divID){
    if (checkNull(divID)) {
        divID = "divMessage";
    }

    $("#"+ divID).slideUp();
}

/**
 * div형 메시지 닫기
 */
alertClose = function(obj){
    $(obj).parent().slideUp();
}

// row 삭제
deleteRow = function(obj , checkInputName){
    $(obj).parent().parent().remove();

    // 저장버튼 숨기기
    if (!checkNull(checkInputName)) {
        if ($("input[name="+ checkInputName +"]").length <= 0) {
            $(".saveButton").hide();
        }
    }
}
// row 삭제
deleteRowTask = function(obj){
    $(obj).parent().remove();
}
// row 삭제
deleteRowIP = function(obj){
    $(obj).parent().parent().parent().remove();
}

// row 삭제
deleteRowAssign = function(obj){
    $(obj).parent().parent().parent().remove();
}


/**
 * 오늘 날짜
 * @returns {string}
 */
function today(){
    var date = new Date();

    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return year + "-" + month + "-" + day;
}

/**
 * 올해 첫날짜
 * @returns {string}
 */
function toYearFirstday(){
    var date = new Date();

    var year  = date.getFullYear();
    var month = "01" // 0부터 시작하므로 1더함 더함
    var day   = "01"

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return year + "-" + month + "-" + day;
}

/**
 * 오늘과 만료일 비교
 * @param dateE
 * @returns {string}
 */
function checkExpireDate(dateE) {

    var date = new Date();

    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 0부터 시작하므로 1더함 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }


    var today = year + "" + month + "" + day;
    var result = "";

    if (dateE == today) {
        result = "<span class='text-danger'>"+ changeStrToDate(dateE) + "</span>";
    }else{
        result = changeStrToDate(dateE);
    }

    return result;
}

/**
 * 기준일(basicDate)부터 이전(term < 0) 또는 이후(term > 0) 날짜가 속한 달의 마지막 날짜 구하기
 * @param term
 * @param basicDate
 */
lastDate = function(term , basicDate){
    var arr = basicDate.split("-");

    if (arr[1] == "12") {
        arr[1] = "0"
    }

    var newdate = new Date(arr[0] , arr[1] , arr[2]);

    newdate.setDate(newdate.getDate() + (term - 1));

    nd = new Date(newdate);

    var year  = nd.getFullYear();
    var month = nd.getMonth();
    var day   = nd.getDate();

    if (month == 0) {
        month = 12;
    }

    var lastDay = (new Date(year , month , 0)).getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + lastDay).length   == 1) { lastDay   = "0" + lastDay;   }

    return year + "-" + month + "-" + lastDay;
}

/**
 * 기준일부터 기간이 이후의 날짝
 * @param term
 * @param basicDate
 */
dateTerm = function(term , basicDate){
    var arr = basicDate.split("-");

    if (arr[1] == "12") {
        arr[1] = "0"
    }

    var newdate = new Date(arr[0] , arr[1] , arr[2]);

    newdate.setDate(newdate.getDate() + (term - 1));

    nd = new Date(newdate);

    var year  = nd.getFullYear();
    var month = nd.getMonth();
    var day   = nd.getDate();

    if (month == 0) {
        month = 12;
    }
    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    var resultDate = year + "-" + month + "-" + day;

    if (!checkValidDate(resultDate)) {
        resultDate = dateTerm(0, resultDate);
    }

    return resultDate;
}

/**
 * 날짜 유효성 체크
 * 입력값 : YYYY-MM-DD
 * @param value
 * @returns {boolean}
 */
function checkValidDate(value) {
    var result = true;
    try {
        var date = value.split("-");
        var y = parseInt(date[0], 10),
            m = parseInt(date[1], 10),
            d = parseInt(date[2], 10);

        var dateRegex = /^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
        result = dateRegex.test(d+'-'+m+'-'+y);
    } catch (err) {
        result = false;
    }


    return result;
}

/**
 * 두 날짜 사이의 일 수
 * @param term
 * @param basicDate
 */
dateDayCount = function(dS , dE){
    var arrS = dS.split("-");
    var arrE = dE.split("-");

    var dateS = new Date(arrS[0] , arrS[1] - 1 , arrS[2]);
    var dateE = new Date(arrE[0] , arrE[1] - 1 , arrE[2]);
    var newDateS = new Date(dateS);
    var newDateE = new Date(dateE);

    return (newDateE - newDateS) / 1000 / 60 / 60 / 24;
}

/**
 * 문자열을 날짜형식으로
 */
changeStrToDate = function(str , isTime , dsrStr) {

    if (checkNull(str)) {
        return checkNull(dsrStr) ? "" : "-";
    }else {
        str = str.replaceAll("-" , "");

        var y = str.substr(0, 4);
        var m = str.substr(4, 2);
        var d = str.substr(6, 2);

        var strDate = y + "-" + m + "-" + d;
        if (isTime) {
            var h = str.substr(8, 2);
            var i = str.substr(10, 2);
            var s = str.substr(12, 2);

            if (checkNull(s)) {
                return strDate + " " + h + ":" + i;
            }else{
                return strDate + " " + h + ":" + i + ":" + s;
            }
        } else {
            return strDate;
        }
    }

}

/**
 * ip 체크
 * @param strIP
 * @returns {boolean}
 */
checkIP = function(strIP) {
    var expUrl = /^(1|2)?\d?\d([.](1|2)?\d?\d){3}$/;

    return expUrl.test(strIP);
}

/**
 * 테이블 슬라이드
 * @param id
 */
toggleRow = function(id){
    var $row = $("#"+ id);

    if ($row.attr("isShow") == 1) {
        $row.slideUp();
        $row.attr("isShow" , 0);
    }else{
        $('[isShow=1]').each(function() {
            $(this).slideUp();
            $(this).attr("isShow" , 0);
        });

        $row.slideDown();
        $row.attr("isShow" , 1);
    }
}

/**
 * 공통 form 전송
 * @param opt_formId
 * @constructor
 */
function ComSubmit(opt_formId) {
    this.formId = checkNull(opt_formId) == true ? "commonForm" : opt_formId;
    this.url    = "";
    this.method = "post";

    if(this.formId == "commonForm"){
        $("#commonForm")[0].reset();
        $("#commonForm").html("");
    }

    this.setUrl = function setUrl(url){
        this.url = url;
    };

    this.setMethod = function setMethod(method){
        this.method = method;
    };


    this.addParam = function addParam(key, value){
        $("#"+this.formId).append($("<input type='hidden' name='"+ key +"' id='"+ key +"' value='"+ value +"' >"));
    };

    this.submit = function submit(){
        var frm = $("#"+this.formId)[0];

        $("#"+this.formId).append("<input type='hidden' name='isComsubmit' id='isComsubmit' value='1' >");

        frm.acceptCharset="utf-8";

        if (document.all) {
            document.charset = "utf-8";
        }
        frm.action = this.url;
        frm.method = this.method;
        frm.submit();
    };
}

/**
 * 정렬 : 현재 정렬 기준 색상
 */
printListSortCss = function(str1 , str2) {
    if (str1 == str2) {
        return "blue hand";
    }else{
        return "hand";
    }
}

/**
 * 정렬 : sort가 asc 이면 desc, desc이면 asc
 */
getSortCode = function(str , by , sort){
    var result = "";
    if (str != by) {
        result = "DESC";
    }else{
        if (sort == "DESC") {
            result = "ASC";
        }else{
            result = "DESC";
        }
    }

    return result;
}

/**
 * 정렬 : asc, desc에 따른 아이콘
 */
printListSortIcon = function(str1 , str2 , sort) {
    var result = "";
    if (str1 == str2) {
        if (sort == "ASC") {
            result = " <i class='fa fa-sort-alpha-asc'></i>";
        }else{
            result = " <i class='fa fa-sort-alpha-desc'></i>";
        }
    }

    return result;
}

/**
 * 페이징
 * @param params
 */
getPageNavi = function(params) {
    var divID       = params.divID; //페이징이 그려질 div id
    var totalCount  = params.totalCount; //전체 수
    var currentPage = params.currentPage; //현재 페이지
    var callBack    = params.callBack;
    var pageCnt     = params.pageCnt;     // 페이지 수
    var listCount   = params.listCount; //페이지당 레코드 수
    var totalPage   = Math.ceil(totalCount / listCount); // 전체 인덱스 수

    $("#" + divID).empty();

    var startPage = (parseInt((currentPage - 1) / parseInt(pageCnt)) * parseInt(pageCnt)) + 1;
    var endPage   = startPage + pageCnt - 1;
    var prevPage  = (parseInt((currentPage - 1) / 10) * 10) - 9 > 0 ? (parseInt((currentPage - 1) / 10) * 10) - 9 : 1;
    var nextPage  = (parseInt((currentPage - 1) / 10) + 1 ) * 10 + 1 < totalPage ? (parseInt((currentPage - 1) / 10) + 1) * 10 + 1 : totalPage;

    if (endPage >= totalPage) {
        endPage = totalPage;
    }

    var str = "";

    str = "<nav class=\"text-center\">";
    str = str + "<ul class=\"pagination m-t-none m-b-none\">";

    // 처음 페이지로 이동
    if (currentPage > 1) {
        str = str + "<li class='hidden-xs'><a href='#1' aria-label='First' onClick=\"" + callBack + "(1);\"><span aria-hidden='true'>First</span></a></li>";
    }else{
        str = str + "<li class='disabled hidden-xs'><a href='#1'>First</a></li> ";
    }

    // 이전페이지로 이동
    if (currentPage == 1) {
        str = str + "<li class='disabled'><a href='#1'><span aria-hidden='true'>Previous</span></a></li> ";
    }else{
        str = str + "<li><a href='#" + (currentPage - 1) + "' aria-label='Previous' onClick=\""+ callBack +"("+ (currentPage - 1) +");\"><span aria-hidden='true'>Previous</span></a></li> ";
    }
    /*
    prevPage = parseInt(currentPage) - 1;
    if (prevPage >= 1) {
        str = str + "<li class='visible-xs-inline'><a href='#0' onClick=\""+ callBack +"("+ prevPage +");\">&laquo;</a></li> ";
    }else{
        str = str + "<li class='disabled visible-xs-inline'><a href='#0'>&laquo;</a></li> ";
    }
    */

    // 페이지 블럭
    for (var i = startPage; i<=endPage; i++){
        if (i != currentPage) {
            str = str + "<li class='hidden-xs'><a href='#" + i + "' onClick=\""+ callBack +"("+ i +");\">"+ i +"</a></li> ";
        }else{
            str = str + "<li class='active hidden-xs'><a href='#" + i + "'>"+ i +"<span class='sr-only'>(current)</span></a></li> ";
        }
    }

    // 다음페이지
    if (totalPage > endPage) {
        str = str + "<li><a href='#" + (endPage + 1) + "' aria-label='Next' onClick=\""+ callBack +"("+ (endPage + 1) +");\" class='hand'><span aria-hidden='true'>Next</span></a></li> ";
    }else{
        str = str + "<li class='disabled'><a href='#" + (endPage + 1) + "'><span aria-hidden='true'>Next</span></a></li> ";
    }

    if (currentPage < totalPage) { // 마지막 페이지로 이동
        str = str + "<li class='hidden-xs'><a href='#" + totalPage + "' aria-label='Last' onClick=\""+ callBack +"("+ totalPage +");\"><span aria-hidden='true'>Last</span></a></li>";
    }else{
        str = str + "<li class='disabled hidden-xs'><a href='#0'><span aria-hidden='true'>Last</span></a></li>";
    }
    str = str + "</ul></nav>";

    $("#"+ divID).html(str);
}

/**
 * 오늘 날짜, 시간
 * format : YYYY-MM-DD HH:mm:ss
 * @returns
 */
function getCurrentDateTime(){
    var today = new Date();
    var year  = today.getFullYear();
    var mon   = checkLens(today.getMonth() + 1);
    var day   = checkLens(today.getDate());

    var h = checkLens(today.getHours());
    var m = checkLens(today.getMinutes());
    var s = checkLens(today.getSeconds());

    $("#currentDateTime").html(year + "-" + mon + "-" + day + " " + h + ":" + m + ":" + s);
}
/**
 * 오늘 날짜
 * format : YYYY-MM-DD
 * @returns
 */
function getPresentDate(){
    var today = new Date();
    var year  = today.getFullYear();
    var mon   = checkLens(today.getMonth() + 1);
    var day   = checkLens(today.getDate());

    return year + "-" + mon + "-" + day;
}
/**
 * 현재시간 표시
 */
function currentTime(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    h = checkLens(h);
    m = checkLens(m);
    s = checkLens(s);

    $("#currentTime").html(h + ":" + m + ":" + s);
}
/**
 * 현재시간 시만가져오기
 * 사용페이지 데시보드 기상청데이터 가져올때..
 * 기상청데이터 주소가 null 이면
 * @returns {string}
 */
function currentTimeReturn(){
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    h = checkLens(h);
    m = checkLens(m);
    s = checkLens(s);

//    return h + ":" + m + ":" + s;
    return h ;
}
/**
 * 숫자를 두자리 문자로 바꿔서 반환
 * @param int
 * @returns {String}
 */
function checkLens(int){
    var rint = int;

    if (int < 10) {
        rint = "0" + int;
    }

    return rint.toString();
}

/**
 * 숫자를 두자리 문자로 바꿔서 반환
 * @param str
 * @param maxLen
 * @returns {String}
 */
function makeLens(str, maxLen){
    var strLen = str.length;
    var result = "";
    if (strLen < maxLen) {
        for (var i=0; i<(maxLen - strLen); i++){
            result = result + "0";
        }
    }
    return str + result;
}

/**
 * 라벨 출력
 * str이 Y이면 yStr 출력, 아니면 nStr출력
 * @param str
 * @param yStr
 * @param nStr
 * @returns {String}
 */
printLabelYN = function(str , yStr , nStr) {
    var result;

    if (str == "Y") {
        result = "<label class='nlabel nlabel-success'>"+ yStr + "</label>";
    }else{
        result = "<label class='nlabel nlabel-default'>"+ nStr + "</label>";
    }
    return result;
}

/**
 * 문자열(str1)의 값이 없으면 입력된 문자(str2)반환 아니면 해당 문자열(str1) 반환
 */
checkStringNull = function(str1 , str2){
    if (checkNull(str1)) {
        return str2;
    }else{
        return str1;
    }
}

/**
 * 문자열(str1)의 값이 없으면 입력된 문자(str2)반환 아니면 해당 문자열(str1) 반환
 */
checkStringNull2 = function(str1 , str2){
    if (checkNull(str1)) {
        return str2;
    }else{
        return str1;
    }
}



/**
 * str1이 Y, 1 이면 str2 리턴, 아니면 str3 리턴
 */
StrToStr = function(str1 , str2 , str3){
    if (str1 == "Y" || str1 == 1 || str1 == "1" || str1 == "O") {
        return str2;
    }else{
        return str3;
    }
}

/**
 * 널 체크
 * @param str
 * @returns {boolean}
 */
checkNull = function (str) {
    str = str + "";
    if (str == null || str == "undefined" || str == "null" || str == "") {
        return true;
    }else{
        return false;
    }
}

/**
 * 개행문자 처리
 * @returns {string}
 */
String.prototype.nl2br = function(){
    return this.replace(/(\r\n|\n\r|\r\n|\n)/g, "<br>");
}

/**
 * 문자열이 있으면 개행문자 처리
 * @param str
 * @returns {*|string}
 */
getTextBR = function(str){
    if (checkNull(str)) {
        return "-";
    }else{
        return str.nl2br();
    }
}
/**
 * 엑셀 다운로드
 * @param cate
 * @param excelName
 */
goExcelDownload = function(cate , excelName){
    var comSubmit = new ComSubmit();

    comSubmit.setUrl("/common/downloadExcelFile.do");

    comSubmit.addParam("category", cate);
    comSubmit.addParam("excelName", excelName);
    comSubmit.submit();
}

////////////////////////////2021-09-08///////////////////////////////////////////////////
/**
 * 서버 엑셀 다운로드
 * @param cate
 * @param excelName
 */
getExcelServerDownload = function(ExcelServerCode , title , notUseDate){
    $.ajax({
        url : "/ajax/ExcelDownload"
        ,data : sendData
        ,success : function(data){
            if('ERROR'.equals(data.excelName)){
                alert("예기치 못한 오류가 발생하였습니다.");
            }else if('NODATA'.equals(data.excelName)){
                alert("목록 조회건수가 없습니다.");
            }else{
                //성공적으로 서버에 엑셀파일 만들었으면 다운로드하기
                goExcelDownload(data.excelName);
            }

        }
        ,error : function(){
            //popModalAlert("오류" , "예기치 못한 오류가 발생하였습니다." )
            alert("예기치 못한 오류가 발생하였습니다.");
        }
    });
}

/**
 * 등록된 첨부파일 다운로드
 * 파일 다운로드 : 파일명.
 * @param SEQ 첨부파일 테이블(BOARD_FILE)의 IDX
 * @param strm 첨부파일 테이블(BOARD_FILE)의 IDX
 */
goDownloadFile = function(SEQ, strm){
    var comSubmit = new ComSubmit();

    comSubmit.setUrl("/common/goDownloadFile.do");

    comSubmit.addParam("SEQ", SEQ);
    comSubmit.addParam("strm", strm);
    comSubmit.submit();
}

/**
 * 등록된 첨부파일 존재여부 체크 후 다운로드 진행
 * @param idx 첨부파일 테이블(BOARD_FILE)의 IDX
 */
checkAttachment = function(idx, strm) {
    if (!idx || !strm) {
        popModalAlert("오류" , "잘못된 경로로 오셨거나 잘못된 값이 있습니다.");
    }else{
        $.ajax({ type : "POST"
            , url  : "/ajax/common/checkAttachment.do"
            , data : {SEQ : idx, strm : strm}
            , success  : function (returnText) {

                returnText = $.parseJSON(returnText);

                if ("SUCCESS".equals(returnText.errCode)) {

                    goDownloadFile(idx, strm);
                }else{
                    popModalAlert("오류" , "파일이 존재하지 않거나 잘못된 정보가 있습니다.");
                }
            }
            , error : function (data, status, err) {
            }
        });
    } //if (!isSubmit) {
}


/**
 * 파일명, 경로로 다운로드
 * @param fileName 첨부파일 테이블(BOARD_FILE)의 IDX, strm이 Board가 아니면 IDX는 파일명이다.
 * @param fileDir 다운로드할 파일구분
 */
goDownloadNameDir = function(fileName, fileDir){
    var comSubmit = new ComSubmit();

    comSubmit.setUrl("/common/goDownloadNameDir.do");

    comSubmit.addParam("fileName" , fileName);
    comSubmit.addParam("fileDir", fileDir);

    comSubmit.submit();
}

/**
 *textarea 글자수 체크
 */
function CheckStrLen(maxLength , objName , remainObj) {
    var textObj     = $("#"+objName);
    var ls_str      = textObj.val();    // 이벤트가 일어난 컨트롤의 value 값
    var li_str_len  = ls_str.length;        // 전체길이
    // 변수초기화
    var li_max      = maxLength;        // 제한할 글자수 크기
    var i           = 0;                    // for문에 사용
    var li_byte     = 0;                    // 한글일경우는 2 그밗에는 1을 더함
    var li_len      = 0;                    // substring하기 위해서 사용
    var ls_one_char = "";               // 한글자씩 검사한다
    var ls_str2     = "";               // 글자수를 초과하면 제한할수 글자전까지만 보여준다.
    var remainObj = $("#remain"+remainObj);

    for(i=0; i< li_str_len; i++) {
        // 한글자추출
        ls_one_char = ls_str.charAt(i);

        // 한글이면 2를 더한다.
        if (escape(ls_one_char).length > 4) {
            //li_byte = li_byte + 2;
            li_byte++;
        }else{ // 그외의 경우는 1을 더한다.
            li_byte++;
        }

        // 전체 크기가 li_max를 넘지않으면
        if(li_byte <= li_max) {
            li_len = i + 1;
        }
    }

    // 전체길이를 초과하면
    if(li_byte > li_max) {
        console.log("alert")
        printErrorMessage(li_max + " 글자를 초과 입력할수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. " , "alert-danger");

        ls_str2 = ls_str.substr(0, li_len);
        textObj.val(ls_str2);
        remainObj.html(cal_length(textObj.val()) + "/" + maxLength);
    }
    textObj.focus();
    remainObj.html(cal_length(ls_str) + "/" + maxLength);
}

/**
 * 한글을 2바이트 씩 계산하여 입력받은 문자열이 DB에 저장될 때 총 몇바이트를 차지하는지 계산한다.
 * 엔터(\r\n)는 2바이트를 차지한다.
 * @param val : 입력받은 문자열
 */
function cal_length(val) {
    // 입력받은 문자열을 escape() 를 이용하여 변환한다.
    // 변환한 문자열 중 유니코드(한글 등)는 공통적으로 %uxxxx로 변환된다.
    var temp_estr = escape(val);
    var s_index   = 0;
    var e_index   = 0;
    var temp_str  = "";
    var cnt       = 0;

    // 문자열 중에서 유니코드를 찾아 제거하면서 갯수를 센다.
    while ((e_index = temp_estr.indexOf("%u", s_index)) >= 0) {  // 제거할 문자열이 존재한다면
        temp_str += temp_estr.substring(s_index, e_index);
        s_index = e_index + 6;
        cnt ++;
    }

    temp_str += temp_estr.substring(s_index);

    temp_str = unescape(temp_str);  // 원래 문자열로 바꾼다.

    // 유니코드는 2바이트 씩 계산하고 나머지는 1바이트씩 계산한다.
    //return ((cnt * 3) + temp_str.length) + "";
    return ((cnt) + temp_str.length) + "";
}

checkBrowser = function(){
    /*
    var b = "";
    var ua = window.navigator.userAgent;

    if(ua.indexOf('MSIE') > 0 || ua.indexOf('Trident') > 0){
        b = "IE";
    }else if(ua.indexOf('Opera') > 0 || ua.indexOf('OPR') > 0) {
        b = "Opera";
    }else if(ua.indexOf('Firefix') > 0){
        b = "Firefox";
    }else if(ua.indexOf('Safari') > 0) {
        if(ua.indexOf('Chrome') > 0)
            b = "Chrome";
        else
            b = "Safari";
    }
    */
    'use strict';
    var agent = navigator.userAgent.toLowerCase(),
        name = navigator.appName,
        browser;

    // MS 계열 브라우저를 구분하기 위함.
    if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
        browser = 'ie';
        if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
            agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
            browser += parseInt(agent[1]);
        } else { // IE 11+
            if(agent.indexOf('trident') > -1) { // IE 11
                browser += 11;
            } else if(agent.indexOf('edge/') > -1) { // Edge
                browser = 'edge';
            }
        }
    } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
        if(agent.indexOf('opr') > -1) { // Opera
            browser = 'opera';
        } else if(agent.indexOf('chrome') > -1) { // Chrome
            browser = 'chrome';
        } else { // Safari
            browser = 'safari';
        }
    } else if(agent.indexOf('firefox') > -1) { // Firefox
        browser = 'firefox';
    }


    return browser;
}


/**
 * 저장버튼 : 대기 중
 */
setDefaultSaveBtn = function(str, icon){
    if (checkNull(str)) {
        str = "저장";
    }

    if (checkNull(icon)) {
        icon = "<i class='fa fa-check fa-wa'></i> ";
    }else{
        icon = "<i class='fa "+ icon +" fa-wa'></i> ";
    }
    $(".saveButton").html(icon + str);
    $(".saveButton").attr("disabled" , false);
}

/**
 * 저장버튼 : 데이터 처리 중일 때 아이콘 표시 및 클릭 금지
 */
setProcessingSaveBtn = function(str){
    if (checkNull(str)) {
        str = "저장 중";
    }

    $(".saveButton").html("<i class='fa fa-circle-o-notch fa-spin'></i> "+ str);
    $(".saveButton").attr("disabled" , true);
}

/**
 * 결재요청버튼 : 대기 중
 */
setDefaultApprovalBtn = function(str, icon){
    if (checkNull(str)) {
        str = "결재요청";
    }

    if (checkNull(icon)) {
        icon = "<i class='fa fa-check fa-wa'></i> ";
    }else{
        icon = "<i class='fa "+ icon +" fa-wa'></i> ";
    }
    $(".approvalButton").html(icon + str);
    $(".approvalButton").attr("disabled" , false);
}

/**
 * 결재요청버튼 : 데이터 처리 중일 때 아이콘 표시 및 클릭 금지
 */
setProcessingApprovalBtn = function(str){
    if (checkNull(str)) {
        str = "저장 중";
    }

    $(".approvalButton").html("<i class='fa fa-circle-o-notch fa-spin'></i> "+ str);
    $(".approvalButton").attr("disabled" , true);
}

/**
 * 결재요청버튼 : 대기 중
 */
setDefaultProcessBtn = function(str, icon){
    if (checkNull(str)) {
        str = "신청서처리";
    }

    if (checkNull(icon)) {
        icon = "<i class='fa fa-check fa-wa'></i> ";
    }else{
        icon = "<i class='fa "+ icon +" fa-wa'></i> ";
    }
    $(".processButton").html(icon + str);
    $(".processButton").attr("disabled" , false);
}

/**
 * 결재요청버튼 : 데이터 처리 중일 때 아이콘 표시 및 클릭 금지
 */
setProcessingProcessBtn = function(str){
    if (checkNull(str)) {
        str = "저장 중";
    }

    $(".processButton").html("<i class='fa fa-circle-o-notch fa-spin'></i> "+ str);
    $(".processButton").attr("disabled" , true);
}

/**
 * 시작일, 종료일 비교. 종료일이 시작일 이전이면 false 리턴
 * @param dateS
 * @param dateE
 * @returns {boolean}
 */
checkDateSE = function(dateS , dateE){
    var result = true;
    if (checkNull(dateS) || checkNull(dateE)) {
        result = true;
    }else{
        dateS = checkNull(dateS) ? "" : dateS.replaceAll("-" , "");
        dateE = checkNull(dateE) ? "" : dateE.replaceAll("-" , "");

        if (dateS > dateE) {
            result = false;
        }
    }

    return result;
}

/**
 * 두 문자열이 같으면 참
 */
String.prototype.equals = function(str) {
    return this == str;
}


/**
 * 입력되는 문자열 XSS 체크
 */
String.prototype.checkXSS = function() {
    var str = this;

    str = str.replaceAll("<" , "&lt;");
    str = str.replaceAll(">" , "&gt;");
    str = str.replaceAll("#" , "&#35;");
    str = str.replaceAll("\"" , "&quot;");
    str = str.replaceAll("/" , "&#x2F;");
    str = str.replaceAll("(" , "&#40");
    str = str.replaceAll(")" , "&#41");
    str = str.replaceAll("'" , "&#39");
    // str = str.replaceAll("<" , "");
    // str = str.replaceAll(">" , "");
    // str = str.replaceAll("#" , "");
    // str = str.replaceAll("\"" , "");
    // str = str.replaceAll("/" , "");
    // str = str.replaceAll("(" , "");
    // str = str.replaceAll(")" , "");
    // str = str.replaceAll("'" , "");

    return str;
}

/**
 * 팝업창 공통
 * @param url  경로
 * @param modalSize 팝업창크기
 * @param callbackFunc 팝업창이 닫힐 때 실행할 함수
 * @param isImageView 이미지보기로 사용할 때(헤더, 푸터 숨김)
 */
popCommon = function(url , modalSize , callbackFunc , isImageView) {
    if (checkNull(modalSize)) {
        modalSize = "";
    }else{
        modalSize = "-" + modalSize;
    }

    if (checkNull(isImageView)) {
        isImageView = false;
    }

    //popClose();

    $(".modal-content").html("");

    // 이미지를 띄울 때1
    if (isImageView) {
        url = "<img src='"+ url +"' style='display: block;max-width: 100%;height: auto; margin:0 auto' id='popCommonImage'>";
        $("#modalPublic"+ modalSize).find(".modal-content").html(url);

        // 로딩된 이미지의 가로 크기만큼 팝업의 가로 크기 정하기
        $("#popCommonImage").load(function(){
            var naturalWidth = this.naturalWidth;
            $("#modalPublic"+ modalSize).find(".modal-dialog").attr("style" , "width:"+ naturalWidth + "px");

        });
    }else{
        $("#modalPublic"+ modalSize).find(".modal-content").load(url);
    }

    $("#modalPublic"+ modalSize).modal();

    $("#modalPublic"+ modalSize).find("#modal-"+ modalSize).removeClass();
    $("#modalPublic"+ modalSize).find("#modal-"+ modalSize).addClass("modal-dialog modal"+ modalSize +" fadeinSize");
//    $("#modalPublic"+ modalSize).find("#modal-"+ modalSize).addClass("colored-header primary");

    $("#modalPublic"+ modalSize).off('hidden.bs.modal').on("hidden.bs.modal", function(e){
        if (typeof callbackFunc == "function") {
            callbackFunc(true);
        }
    });
}

/**
 * 파일명에서 확장자명 추출
 * @param filename  파일명
 * @returns {string} 확장자명
 */
getExtensionOfFilename = function(filename){
    var _fileLen = filename.length;

    /**
     * lastIndexOf('.') -> 뒤에서부터 '.'의 위치를 찾기 위한 함수
     * 검색 문의 위치를 반환한다.
     * 파일 이름에 '.'이 포함되는 경우가 있기 때문에 lastIndexOf()를 사용한다.
     */
    var _lastDot = filename.lastIndexOf('.');

    // 확장자만 추출한 수 소문자로 변경
    var _fileExt = filename.substring(_lastDot , _fileLen).toLowerCase();

    return _fileExt;
}

clickTableCheckbox = function(tbl){
    tbl = $("#" + tbl);
    // 테이블 헤더에 있는 checkbox 클릭
    $(":checkbox:first" , tbl).click(function(){
        // 클릭한 체크박스가 체크상태 여부 판단
        if ($(this).is(":checked")) {
            $(":checkbox" , tbl).prop("checked" , true);
        }else{
            $(":checkbox" , tbl).prop("checked" , false);
        }
        // $(":checkbox" , tbl).prop("checked" , !$(this).is(":checked"));

        // checkedCnt = $(":checkbox:not(:first)" , tbl).filter(":checked").length;

        // 모든 체크박스에 change 이벤트 발생시키기
        $(":checkbox" , tbl).trigger("change");
    });

    // 헤더에 있는 체크박스 외 다른 체크박스 클릭시
    $(":checkbox:not(:first)", tbl).click(function(){
        var allCnt = $(":checkbox:not(:first)", tbl).length;
        var checkedCnt = $(":checkbox:not(:first)" , tbl).filter(":checked").length;

        // 전체 체크박스 갯수와 현재 체크된 체크박스 갯수 비교 후 헤더있는 체크박스를 체크할지 판단
        if (allCnt == checkedCnt) {
            $(":checkbox:first" , tbl).prop("checked" , true);
        }else{
            $(":checkbox:first" , tbl).prop("checked" , false);
        }
    });

}

/**
 * script 태그 사용 체크
 * @param value
 * @returns
 */
function hasXSS(value){
    var regex = new RegExp(/(<|%3C)script[\s\S]*?(>|%3E)[\s\S]*?(<|%3C)(\/|%2F)script[\s\S]*?(>|%3E)/gi);
    if(regex.test(value)){
        return true;
    }else{
        return false;
    }
}

/**
 * ajax 파일 업로드
 * <script src="/assets/_js/submit.js"></script> 추가 해야 함
 * @param param
 */
var formAjaxSubmit = function(param){
    var formName     = param.formName;      // form ID
    var message      = param.message;
    var callbackFunc = param.callbackFunc;  // 완료 후 실행할 함수
    var timeOut      = checkNull(param.timeOut) ? 10 : timeOut;
    var async        = param.async;

    timeOut = timeOut * 1000;

    $("#" + formName).ajaxForm({
        timeout :timeOut ,
        beforeSend: function(x, s) {
            if(message != null)
                processDialog.show(message);
        },
        beforeSubmit:  function(formData, jqForm, options) {
            var conditions = $("#" + formName).serialize();
            if(hasXSS(conditions)){
                popModalAlert("확인", "script 태그는 저장할 수 없습니다.");
                return false;
            }
        },
        uploadProgress: function(event, position, total, percentComplete) {
        },
        success: function(result) {
            if (typeof callbackFunc == 'function') {
                callbackFunc(result);
            }
        },
        error: function(xhr){
            if(xhr.status == 0){
                if((typeof async != 'undefined' && !async))
                    popModalAlert("확인", "서버로부터 응답이 없습니다.");
            }else if(xhr.status == 500){
                popModalAlert("확인", xhr.responseText);
            }else{
                popModalAlert("확인", "요청한 작업을 처리하지 못하였습니다.<br/>관리자에게 문의하세요.");
            }
        },
        complete: function(xhr) {
//            if (typeof callbackFunc == 'function') {
//                callbackFunc(xhr);
//            }
        }
    });
};


/**
 * ajax 파일 다운로드
 */
ajaxFileDownload = function(idx , pageCode){
    $.ajax({
        url      : "/Public/goDownloadFile.php"
        , type     : "POST"
        , data     : {IDX : idx , pageCode : pageCode}
        , success  : function(data) {

            var result = $.parseJSON(data);

            if ("SUCCESS".equals(result.errCode)) {
                var url      = result.url;
                var fileName = result.fileName;

                var $a = $('<a />', {
                    'href': url,
                    'download': fileName,
                    'text': "click"
                }).hide().appendTo("body")[0].click();

            }else{
                printErrorMessage(result.errMessage , "alert-danger" , "divMessagePop");
            }

            // URL.revokeObjectURL(url);
        }

        , error: function(xhr){
            if(xhr.status == 0){
                if((typeof async != 'undefined' && !async))
                    printErrorMessage("서버로부터 응답이 없습니다." , "alert-danger" , "divMessagePop");
            }else if(xhr.status == 500){
                printErrorMessage(xhr.responseText , "alert-danger" , "divMessagePop");
            }else{
                printErrorMessage("요청한 작업을 처리하지 못하였습니다.<br/>관리자에게 문의하세요." , "alert-danger" , "divMessagePop");
            }
        }
        , complete: function(xhr) {
        }
    });
}

/**
 *  Secure Hash Algorithm (SHA256)
 *  http://www.webtoolkit.info/
 *  Original code by Angel Marin, Paul Johnston.
 **/
function SHA256(s){
    var chrsz   = 8;
    var hexcase = 0;

    function safe_add (x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }

    function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
    function R (X, n) { return ( X >>> n ); }
    function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
    function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
    function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
    function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
    function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
    function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }

    function core_sha256 (m, l) {

        var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
            0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
            0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
            0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
            0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
            0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
            0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
            0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
            0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
            0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
            0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);

        var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F,
            0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);

        var W = new Array(64);
        var a, b, c, d, e, f, g, h, i, j;
        var T1, T2;

        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;

        for ( var i = 0; i<m.length; i+=16 ) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for ( var j = 0; j<64; j++) {
                if (j < 16) W[j] = m[j + i];
                else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);

                T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                T2 = safe_add(Sigma0256(a), Maj(a, b, c));

                h = g;
                g = f;
                f = e;
                e = safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = safe_add(T1, T2);
            }

            HASH[0] = safe_add(a, HASH[0]);
            HASH[1] = safe_add(b, HASH[1]);
            HASH[2] = safe_add(c, HASH[2]);
            HASH[3] = safe_add(d, HASH[3]);
            HASH[4] = safe_add(e, HASH[4]);
            HASH[5] = safe_add(f, HASH[5]);
            HASH[6] = safe_add(g, HASH[6]);
            HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
    }

    function str2binb (str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for(var i = 0; i < str.length * chrsz; i += chrsz) {
            bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
        }
        return bin;
    }

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    function binb2hex (binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for(var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
        }
        return str;
    }

    s = Utf8Encode(s);
    return binb2hex(core_sha256(str2binb(s), s.length * chrsz));

}

/**
 *  설명       도움말 조회
 *  날짜        2021.08.23 전형상
 *  매개변수      CodeKey , id , direct
 *
 *  2021.10.25 이세희 수정
 */
getHelpData = function( CodeKey , id , direct) {

    var selector    = ".tip-over";  // 적용할 셀렉터 기본값
    var placement   = "left";       // 적용할 방향   기본값
    // id를 기입할경우 셀렉터 변경
    if(!checkNull(id)){
        selector = "#"+id;
    }
    // 방향 을 기입할경우 해당방향 변경
    if(!checkNull(direct)){
        placement = direct ;
    }
    var url = "/ajax/getHelpData.do";
    $.post(url,{
            Code : 'H000',
            CodeKey : CodeKey
        }
        , function (data) {

            data = $.parseJSON(data);

            if(data.result != null){
                $(""+selector+"").popover({
                    // title : title                 //제목
                    html : true
                    , placement : placement          //방향 left , right
                    , trigger : "hover"
                    , container :"body"
                    , content : data.result.CD_VAL   //내용
                    // , template: '<div class="sp_popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                });
            }
        });
}

/**
 * 오늘날짜 리턴
 */
function getToday(){
    var date  = new Date();
    var year  = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day   = ("0" + date.getDate()).slice(-2);

    return year + month + day ;
}

/**
 * byte 단위 문자열
 */
byteUnitStr = function(szFile, mode) {
    if (!mode) mode = "numeric";
    if (typeof(szFile) != "number") {
        try {
            var _szFile = szFile;
            szFile = -1;
            szFile = parseInt(_szFile+"");
        } catch(e) {}
        if (szFile == -1) return "";
    }

    var idx = 0;
    var unit = ["B", "KB", "MB", "GB", "TB", "PB"];

    while (szFile > 1024) {
        szFile = szFile / 1024;
        idx++;
    }

    if (mode == "numeric") {
        return Math.round(szFile) + unit[idx];
    } else if (mode == "float") {
        return szFile.toFixed(2) + unit[idx];
    }
}

/**
 * UUID 생성
 */
getUuidV4 = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * New 아이콘
 * 현재 시간과 등록일시를 비교하여 아이콘 표시여부 결정
 */
getNewIcon = function(regDT){
    var result = "";
    var today = new Date();
    var nowDate = today.getFullYear() + "" + checkLens(today.getMonth() + 1) + "" + checkLens(today.getDate());
    var nowTime = checkLens(today.getHours()) + "" + checkLens(today.getMinutes()) + "" + checkLens(today.getSeconds());

    regDT = regDT.replaceAll("." , "");
    regDT = regDT.replaceAll("-" , "");

    if ((nowDate) <= regDT) {
        result = "<i class='icon ico-new'><em>새글</em></i>";
    }

    return result;
}

/**
 * 이미지를 base64 문자열로 인코딩 후 이미지 객체의 src 변경
 * @param element
 * @returns
 */
function encodeImgtoBase64(element , imgID) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        $("#"+ imgID).attr("src" , reader.result);
    }
    reader.readAsDataURL(file);
}


/**
 * 파일 다운로드...
 * getFileDownload
 */
getFileDownload = function(url, fileName){
    var $a = $('<a />', {
        'href': url,
        'download': fileName,
        'text': "click"
    }).hide().appendTo("body")[0].click();
}

/**
 * 즐겨찾기 (모든 브라우저 호환)
 * 크롬/사파리는 자동 추가 안되고 알럿으로 단축키 안내함
 */
function favorite(){
    var bookmarkURL    = window.location.href;
    var bookmarkTitle  = document.title;
    var triggerDefault = false;

    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox version &lt; 23
        window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
    } else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') < -1)) || (window.opera && window.print)) {
        // Firefox version &gt;= 23 and Opera Hotlist
        var $this = $(this);
        $this.attr('href', bookmarkURL);
        $this.attr('title', bookmarkTitle);
        $this.attr('rel', 'sidebar');
        $this.off();
        triggerDefault = true;
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE Favorite
        window.external.AddFavorite(bookmarkURL, bookmarkTitle);
    } else {
        // WebKit - Safari/Chrome
        popModalAlert("확인" , (navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 를 이용해 이 페이지를 즐겨찾기에 추가할 수 있습니다.');
    }
    return triggerDefault;
}