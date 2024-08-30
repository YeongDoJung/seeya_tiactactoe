<%@ page pageEncoding="UTF-8"%>
<script src="/_js/upload.js" charset="utf-8"></script>
<script type="text/javascript">
    var file_size = <c:out value="${boardConfig.ATTACH_SIZE}" />;
    var file_max  = <c:out value="${boardConfig.ATTACH_CNT}" />;
    var pattern   = /^(<c:out value="${extension}"/>)$/i;
    var extText   = '<c:out value="${extText}" />';

    $(document).ready(function () {

        $("#fileSize").html(file_size);
        $("#extension").html(extText);
        $("#maxFileSize").html(file_size);
        $("#maxFileCount").html(file_max);

        //파일 업로드
        new AjaxUpload('#btnUpload'
            , { action   : '/ajax/tempFileUpload.do',
                name     : 'file',
                data     : { limit: file_size, strm : 'Board' },
                onSubmit : function (file, ext) {
                            if (!(ext && pattern.test(ext))) {
                                popModalAlert("ERROR" , messageCommon("F010^$$^"+ ext)); // + '는 형식은 첨부할 수 없는 파일형식입니다.')
                                return false;
                            }
                            if ($('#attach').val() == parseInt(file_max)) {
                                popModalAlert("ERROR" , messageCommon("F060^$$^"+ file_max)); //'파일 최대허용갯수('+file_max+'개)를 초과하였습니다');
                                return false;
                            }
                            for (i = 0; i <= file.toString().length; i++) {
                                str = file.charCodeAt(i);
                                if (str == 92 || str == 63 || str == 60 || str == 62) {
                                    popModalAlert("ERROR" , messageCommon("F080"));//'파일명에 특수문자를 사용할 수 없습니다');
                                    return false;
                                }
                            }

                            $('#fileMsg').hide();
                            $('#fileList').hide();
                            $('#progress').show();
              }
            , onComplete: function (file, response) {
                //'<pre style="word-wrap: break-word; white-space: pre-wrap;"> </pre>'
                //alert(response);  // firefox : <pre>{"errCode":"SUCCESS"}</pre>
                
                if (checkBrowser() == "chrome") {
                    response = response.replace('<pre style="word-wrap: break-word; white-space: pre-wrap;">', '');
                    response = response.replace('</pre>', '');
                }else{
                    response = response.replace('<pre>', '');
                    response = response.replace('</pre>', '');
                }
                //alert(response); // firefox : <pre>{"errCode":"SUCCESS"}
                response = $.parseJSON(response);
                
                if (response.errCode == "SUCCESS") {
                    getFileList();
                }else{
                    if (response.errCode == "OVER_LIMIT") {
                        popModalAlert("ERROR" , messageCommon("F020^$$^"+ file_size)); //'제한용량 '+file_size+'MB를 초과하였습니다');
                    }else if (response.errCode == "OVER_MIME") {
                        popModalAlert("ERROR" , messageCommon("F070")); //'파일 확장자와 속성이 일치하지 않습니다.');
                    }else{
                        popModalAlert("ERROR" , messageError); //'예기치 못한 오류가 발생하였습니다. 관리자에게 문의부탁드립니다.');
                    }
                    setFileCss();
                }
                return false;
            }
        });
        
        //getFileList();

        //$('#fileMsg').hide();
        //$('#fileList').show();
    });

    NewUpload = function(){
        $.post("/ajax/tempDeleteFolder.do"
              , { strm : 'Board' }
              , function(data) {
                  data = $.parseJSON(data);
                  
                  if (data.errCode != "SUCCESS") {
                      popModalAlert("ERROR" , messageCommon("F030")); //'첨부파일 등록을 위한 초기화를 실패하였습니다.');
                  }
              }        
        );
    }

    EditUpload = function(){
        getFileList();
    }

    getFileList = function(){
        $.post("/ajax/getFileList.do"
            , { strm : 'Board' }
            , function(data){

                data = $.parseJSON(data);

                var str = "";
                var fileCnt = 0;
                var folderSize = 0;

                $.each(data.fileList, function(key, value){
                    str += "<div class='row'>"+
                               "<div class='col-xs-8 text-left' >"+ value.FileName +"</div>"+
                               "<div class='col-xs-4 text-right' >"+ value.FileSize.toString().byteConvertor() +"<span class='fa fa-times hand pull-right' onClick=\"delFile('"+ value.FileName +"');\"></div>"+
                           "</div>";
                    fileCnt++;
                    folderSize += parseInt(value.FileSize);
                });

                $("#fileList").html(str);
                $("#nowsize").html(folderSize.toString().byteConvertor());
                $('#attach').val(fileCnt);

                setFileCss();
        });
    }

    setFileCss = function(){
        $('#progress').hide();

        if ($('#attach').val() == 0) {
            $('#fileList').hide();
            $('#fileMsg').show();
            $("#btnUpload").show();
        }else{
            $('#fileMsg').hide();
            $('#fileList').show();

            if ($('#attach').val() < parseInt(file_max)) {
                $("#btnUpload").show();
            }else{
                $("#btnUpload").hide();
            }
        }
    }

    //파일 삭제
    delFile = function (str) {
        $('#fileList').hide();
        $('#progress').show();

        $.post("/ajax/tempDeleteFile.do"
             , { Fname : str, strm : 'Board' }
             , function (data) {
                    data = $.parseJSON(data);
                    
                    if (data.errCode == "SUCCESS"){
                        getFileList();
                    }else{
                        popModalAlert("ERROR" , messageCommon("F050")); //'파일 삭제를 실패하였습니다.');
                        setFileCss();
                    }
        });
    }
</script>
<div id="divView"></div>
<div class="row attach-container m-b-15">
    <div class="col-lg-6 attach-btn-box">
        <div class="text-right"><span id="nowsize">0 KB</span> / <strong><span id="fileSize"></span> MB</strong></div>
        <!-- 파일 등록 전 빈 박스 -->

        <div id="fileMsg" class="attach-blank-box">
            Max <span class="bold" id="maxFileCount"></span> Files / Max <span class="bold" id="maxFileSize"></span> MB
        </div>

        <div id="progress" class="attach-progress-box">
            <div class="progress">
                <div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 100%">Uploading...</div>
            </div>
        </div>

        <div id="fileList" class="attach-list"></div>

        <span class="btn btn-white btn-xs attach-btn" id="btnUpload">파일선택</span>
    </div>

    <div class="col-lg-6 attach-messgae">
        
        <div class="m-t-15 m-b-15">첨부파일은 이름순으로 등록됩니다</div>
        <dl>
            <dt>등록가능한 파일 확장자</dt>
            <dd id="extension"></dd>
        </dl>
    </div>
</div>
<input type="hidden" id="attach" name="attach" value="0" />