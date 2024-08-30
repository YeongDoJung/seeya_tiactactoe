function pwChange() {
    let pw1 = $('#addPW').val();
    let pw2 = $('#addPWcheck').val();
    if (pw1 !== pw2) {
        swal("비밀번호가 일치하지 않습니다.", {
            icon: "warning",
            button: "확인"
        });
    }
    else if (pw1 === '' || pw1 === '') {
        swal("입력하지 않은 항목이 있습니다.", {
            icon: "warning",
            button: "확인"
        });
    }
    else if (pw1 === pw2 && pw1 !== '') {
        $.ajax({
            url : "/ajax/changePwAtMain",
            method : "post",
            dataType : "text",
            data : {
                newPw: pw1,
            },
            success : function(data) {
                if (data === 1) {
                    swal("비밀번호 변경이 완료 되었습니다.\n변경 된 비밀번호로 로그인해주세요.",
                        {
                            icon: "success",
                            button: "로그인 페이지로",
                            closeOnClickOutside: false,

                        }).then(function () {
                        // 로그인 페이지 이동.
                        location.href = "/login";
                    });
                }
            }
        })
    }
}

// UI-ALERT-SCORERESET
function scoreReset() {
    swal("정말로 전적을 리셋 시키시겠습니까?",{
            icon: "warning",
            buttons: {
                cancel: "취소",
                catch: {
                    text: "확인",
                    value: "catch",
                }
            },
            closeOnClickOutside: false,
        }).then((value) => {
        switch (value) {
            case "catch":
                $.ajax({
                    url : "/ajax/resetScore",
                    method: "post",
                    dataType: "json",
                    success(){
                        swal("전적이 리셋 되었습니다.", {
                            icon: "success",
                            button: "확인",
                        }).then(() => {
                            location.reload();
                        });
                    },
                    error(e){

                    }
                });
        }
    });
}

// UI-ALERT-LOGOUT
function logOut() {
    swal("로그아웃 되었습니다.\n첫 페이지로 이동합니다.",
        {
            icon: "success",
            button: "확인",
            closeOnClickOutside: false,

        }).then(function () {
            window.location = "/logout";
    });
}

function nicknameChange() {
    let newName = $('#addNickname').val()
    $.ajax({
        url : "/ajax/changeNickname",
        method: "post",
        dataType : "text",
        data : {
            newName : newName,
        },
        success : function(data) {
            if (data === "done") {
                swal("닉네임 변경이 완료되었습니다.",
                    {
                        icon: "success",
                        button: "확인",
                    }).then(() => {
                    location.reload();
                });
            }
            else if (data === "using") {
                swal("이미 사용중인 닉네임입니다.", {
                    icon : "error",
                    button : "확인",
                });
            }
            else if (data === "same") {
                swal("기존과 동일한 닉네임입니다.", {
                    icon : "error",
                    button : "확인",
                });
            }
            else if (data === "fail") {
                swal("닉네임 변경에 실패하였습니다. 다시 시도해주세요.", {
                    icon : "error",
                    button : "확인",
                });
            }
        },
        error(e){}
    })
}

// UI-ALERT-UNREGISTER
function userUnregister() {
    swal({
        text: '정말로 탈퇴 하시나요?\n탈퇴를 원하시면 하단 입력창에\n“탈퇴합니다”를 입력해 주세요.',
        content: "input",
        closeOnClickOutside: false,
        allowOutsideClick: false,
        buttons: {
            cancel: "취소",
            catch: {
                text: "확인",
            }
        },
    }).then(function(value) {
        switch (value) {
            case "catch":
                if ( $('.swal-content__input').val() === "탈퇴합니다" ) {
                    $.ajax({
                        url : "/ajax/unregister",
                        method: "post",
                        dataType : "text",
                        success : function(data) {
                            if (data === "success") {
                                swal("회원 탈퇴가 처리 되었습니다.\n첫 페이지로 이동합니다.",
                                    {
                                        icon: "success",
                                        button: "확인",
                                        closeOnClickOutside: false,
                                    }).then(function () {
                                    // 로그인 페이지 이동.
                                    window.location = "/";
                                });
                            }
                        },
                        error(e) {
                        }
                    });
                }
                else {
                    swal("입력된 내용이 일치하지 않습니다. 다시 시도해 주세요.", {
                        icon: "error",
                        button: "확인",
                        closeOnClickOutside: false,
                    });
                }
        }
    });
}

// UI-ALERT-CONNECT-ERROR
function connectError() {
    swal("게임 방 제목을 입력해주세요.",
        {
            icon: "error",
            button: "확인",
        });
}

// UI-ALERT-CONNECT-ERROR
function findRoomPwError() {
    swal("접속이 불가능 한 방입니다.",
        {
            icon: "error",
            button: "확인",

        });
}

function roomInfo(param) {
    let resultData;

    $.ajax({
        url : "/ajax/gameList",
        method : "get",
        dataType: "json",
        data : param,
        async : false,
        success : function(data) {
            resultData = data;
        },
        error(e) {
            console.log(e)
        }
    });
    return resultData
}

function makeRoomList(nowPage) {
    let param = {"nowPage": nowPage};
    let someData = roomInfo(param);
    for (i = 0; i < 3; i++) {
        let data = someData.gameList[i];
        let status = data.STATUS.toString();
        eachRoomInfo(i+1, status, data.TITLE, data.PLAYER1, data.SEQ, data.BOARD);
    }
}

function returnButtonAtStatus(status, i, id) {
    if (status === 'w') {
        return '<button type="button" class="joingame-btn" ' +
            'onclick="gameJoin(' + id.toString() + ')" ' +
            'id="room' + i.toString() + '-btn">JOIN GAME</button>';
    }
    else {
        return '<button type="button" class="joingame-btn disabled-btn" id="room' + i + '-btn">JOIN GAME</button>';
    }
}

function eachRoomInfo(i, status, roomName, playerNickname, id, board) {
    console.log(status);
    let _i = i.toString();
    $('#room' + _i + ' .room-name').text(roomName);
    $('#room' + _i + ' .room-manager').text(playerNickname);
    if (status === "w") {
        $('#room' + _i).find('.room-states').html('<span class="room-states state-wait">대기중</span>');
    }
    else if (status === "p") {
        $('#room' + _i).find('.room-states').html('<span class="room-states state-active">진행중</span>');
    }
    else if (status === "e") {
        $('#room' + _i).find('.room-states').html('<span class="room-states state-end">게임종료</span>');
    }

    btn = returnButtonAtStatus(status, _i, id);
    $('#room' + i.toString() +'-btn').replaceWith(btn);
    $.each($('#room-stage' + _i).children(), function(index) {
        let boardArray = (board||"").split(',');
        var o = $(this).find('img[alt="O"]')
        var x = $(this).find('img[alt="X"]')
        if (boardArray[index] === "O") {
            o.removeClass("hide");
        }
        else if (boardArray[index] === "X") {
            x.removeClass("hide")
        }
    });
}

function Pagenation(nowPage) {
    let param = {"nowPage": nowPage};
    let data = roomInfo(param);
    let totalRoomList = data.gameListTotal;

    let itemsPerPage = 3;

    let _totalRoomList = Math.ceil(totalRoomList / itemsPerPage);

    let pageRangeStart = Math.floor((nowPage - 1) / 5) * 5 + 1;
    let pageRangeEnd = Math.min(pageRangeStart + 4, _totalRoomList);

    let prevPage = Math.max(1, nowPage - 1);
    let nextPage = Math.min(_totalRoomList, nowPage + 1);

    let result1 = "<div class=\"pagination\">" +
        "<ul class=\"flex-box gap-15 just-center item-center\">";

    if (nowPage > 1) {
        result1 += "<li class=\"prev\"><a href=\"/main/" + prevPage.toString() + "\"><img src=\"/assets/images/icon-paging-prev.svg\" alt=\"이전 페이지\"></a></li>";
    } else {
        result1 += "<li class=\"prev disabled\"><span><img src=\"/assets/images/icon-paging-prev.svg\" alt=\"이전 페이지\"></span></li>";
    }

    let result2 = "";
    for (let i = pageRangeStart; i <= pageRangeEnd; i++) {
        if (i === nowPage) {
            result2 += "<li class=\"active\"><a href=\"/main/" + i.toString() + "\">" + i.toString() + "</a></li>";
        } else {
            result2 += "<li><a href=\"/main/" + i.toString() + "\">" + i.toString() + "</a></li>";
        }
    }

    let result3 = "";
    if (nowPage < _totalRoomList) {
        result3 += "<li class=\"next\"><a href=\"/main/" + nextPage.toString() + "\"><img src=\"/assets/images/icon-paging-next.svg\" alt=\"다음 페이지\"></a></li>";
    } else {
        result3 += "<li class=\"next disabled\"><span><img src=\"/assets/images/icon-paging-next.svg\" alt=\"다음 페이지\"></span></li>";
    }

    result3 += "</ul></div>";
    let result = result1 + result2 + result3;
    $('.pagination').html(result);
}

function gameCreate(roomName) {
    if (roomName.length <= 1) {
        connectError();
    }
    else {
        $.ajax({
            url : "/ajax/gameCreate",
            method: "POST",
            dataType : "json",
            data : {
                title : roomName
            },
            success : function(data) {
                location.href='/game_room';
            }
        });
    }

}

function gameJoin(roomName) {
    $.ajax({
        url : "/ajax/gameJoin",
        method: "POST",
        dataType : "json",
        data : {
            seq : roomName
        },
        success : function(data) {
            if (data === 0) {
                findRoomPwError();
            }
            else {
                location.href='/game_room';
            }
        },
        error(e) {
            findRoomPwError();
        }
    });
}

// 기능 구현 필요
function makeRankerList() {
    $.ajax({
        url : "/ajax/rankerInfo",
        method: "get",
        dataType : "json",
        success : function(data) {
            for (i=0; i<data.length; i++) {
                rank = data[i];
                let win = rank.WIN.toString();
                let lose = rank.LOSE.toString();
                let draw = rank.DRAW.toString();
                $('#' + (i).toString() + '.ranker-info .ranker-name').text(rank.USER_ID);
                $('#' + (i).toString() + '.ranker-info .ranker-score').text(win + "승 " + lose + "패 " + draw + "무");
                if (i === 0) {
                    imgsrc = loadIcon(rank.USER_ID);
                    $('.user-icon-img#rank1').html('<img class="user-icon-img" src="' + imgsrc + '" />');
                }
            }
        },
        error(e) {
            console.log(e);
        }
    });
}

function changeIcon() {
    let formData = new FormData();
    const currentIcon = $('#editIcon')[0].files[0];
    formData.append("icon", currentIcon);
    $('.user-icon-img#user').html('<img class="user-icon-img" src=' + URL.createObjectURL(currentIcon) + ' />');
    $.ajax({
        url : "/ajax/updateIcon",
        method : "post",
        processData : false,
        contentType : false,
        data : formData,
        success(data) {
            console.log(data);
        },
        error(e) {
            console.log(e);
        }
    });
}
