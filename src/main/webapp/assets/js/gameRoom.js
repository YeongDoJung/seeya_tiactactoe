function initGameInfo(param) {
    let result;
    $.ajax({
        url: "/ajax/getGameInfo",
        method: "get",
        dataType: "json",
        async: false,
        data: { seq : param },
        success: function(data) {
            result = data;
        },
        error(e) {
            console.log(e);
        }
    });
    displayPlayerInfo(result.userNickname, result.PLAYER1, result.PLAYER2);
}

function pollGameInfo(seq) {
    $.ajax({
        url: "/ajax/getGameInfo",
        method: "get",
        dataType: "json",
        data: { seq : seq },
        success: function(data) {
            if (data.PLAYER2 != null && !$('#roomExit').hasClass('disabled')) {
                $('#roomExit').addClass('disabled');
                displayPlayerInfo(data.userNickname, data.PLAYER1, data.PLAYER2);
            }
            // 보드 및 턴 정보 업데이트
            updateBoard(data.BOARD);
            updateTurn(data.whosTurn);
            whosTurn = data.whosTurn;
            player2 = data.PLAYER2;
            if (data.userNickname === data.PLAYER1) {
                me = "O";
                you = "X";
            }
            else {
                me = "X";
                you = "O"
            }
            // 게임 종료 처리
            if (data.winner != null) {
                clearInterval(poll);
                $('#roomExit').removeClass('disabled');
                if ( me === data.winner ) {
                    endGame("me", data.winner, seq, me);
                }
                else if ('draw' === data.winner) {
                    endGame("draw", data.winner, seq, me);
                }
                else {
                    endGame("you", data.winner, seq, me);
                }
            }
        },
        error : function(err){
        }
    });
}

function updateBoardInfo(board, seq, selected) {
    $.ajax({
        url : "/ajax/updateGameInfo",
        method : "post",
        dataType : "text",
        data : { seq : seq,
            board : board,
            selected: selected
        },
        success : function(data) {
            updateBoard(data);
        },
        error(e){
        }
    });
}

function updateBoard(board) {
    $('.game-box').each(function(index) {
        var firstOrder = $(this).find('.first-order');
        var secondOrder = $(this).find('.second-order');
        let boardArray = (board||"").split(',');
        if (boardArray[index] === 'O') {
            firstOrder.addClass('animate__bounceIn');
            secondOrder.removeClass('animate__bounceIn');
        } else if (boardArray[index] === 'X') {
            secondOrder.addClass('animate__bounceIn');
            firstOrder.removeClass('animate__bounceIn');
        } else {
            // 빈 칸 처리
            firstOrder.removeClass('animate__bounceIn');
            secondOrder.removeClass('animate__bounceIn');
        }
    });
}

function updateTurn(currentTurn) {
    $('.player-box').removeClass('turn-active');

    if (currentTurn === 'O') {
        $('.player-first').addClass('turn-active');
        $('.player-first .turn').text('YOUR TURN');
        $('.player-second .turn').text('');
    } else if (currentTurn === 'X') {
        $('.player-second').addClass('turn-active');
        $('.player-second .turn').text('YOUR TURN');
        $('.player-first .turn').text('');
    }
}

function getBoardState() {
    let boardState = [];
    $('.game-box').each(function() {
        if ($(this).find('.first-order').hasClass('animate__bounceIn')) {
            boardState.push('O');
        } else if ($(this).find('.second-order').hasClass('animate__bounceIn')) {
            boardState.push('X');
        } else {
            boardState.push('');
        }
    });
    return boardState.join(',');
}

function displayPlayerInfo(me, player1, player2) {
    let player1Icon = loadIcon(player1);
    let player2Icon = loadIcon(player2);
    $('.player-first .user-icon-img').html('<img src=' + player1Icon + ' alt="프로필 사진">');
    $('.player-second .user-icon-img').html('<img src=' + player2Icon + ' alt="프로필 사진">');

    $('.player-first .user-name').text(player1);
    $('.player-box .me-marker').remove();
    if (player2 != null) {
        $('.player-second').removeClass('waiting-box');
        $('.player-second .user-waiting').text('');
        $('.player-second .user-waiting').removeClass('user-waiting');
        $('.player-second .user-name').text(player2);
    }
    if (me === player1) {
        if ($('.player-first .me-marker').length === 0) {
            $('.player-first .user-icon-img').after('<div class="me-marker">ME</div>');
        }
    }
    if (me === player2) {
        if ($('.player-second .me-marker').length === 0) {
            $('.player-second').addClass('this-user');
            $('.player-second .user-icon-img').after('<div class="me-marker">ME</div>');
        }
    }
}

// UI-ALERT-ROOMOUT
function roomOut(seq) {
    swal("정말 게임 방을 나가시겠습니까?",
        {
            icon: "warning",
            buttons: {
                cancel: "취소",
                catch: {
                    text: "확인",
                }
            }
        }).then((value) => {
        switch (value) {
            case "catch": {
                justEnd(seq);
                window.location = "/main/1";
                break;
            }
            default :
                break;
        }
    });
}

function justEnd(seq) {
    $.ajax({
        url : "/ajax/justEnd",
        method: "POST",
        data : {
            seq : seq
        },
        success : function(data) {
        },
        error(e) {
        }
    });
}

function endGame(who, winner, seq, me) {
    let result;
    $.ajax({
        url : "/ajax/updateUserScore",
        method : "post",
        dataType : "json",
        async : false,
        data : {
            winner : winner,
            seq : seq,
            me : me
        },
        success : function(data) {
            result = data;
        }
    });
    if ( who === "me" ) {
        $('.winner-contents .result-user-score').html(result.userWin.toString() + "승 " + result.userLose.toString() + "패 " + result.userDraw.toString() + "무");
        var challangeWinPopup = $('.winner-contents');
        var challangeWinInner = challangeWinPopup.find('.popup-inner');
        challangeWinInner.removeClass('bounce-out');
        challangeWinInner.addClass('bounce');
        challangeWinPopup.fadeIn(300);
    }
    else if ( who === "you") {
        $('.loser-contents .result-user-score').text(result.userWin.toString() + "승 " + result.userLose.toString() + "패 " + result.userDraw.toString() + "무");
        var challangeLosePopup = $('.loser-contents');
        var challangeLoseInner = challangeLosePopup.find('.popup-inner');
        challangeLoseInner.removeClass('bounce-out');
        challangeLoseInner.addClass('bounce');
        challangeLosePopup.fadeIn(300);
    }
    else if ( who === "draw") {
        $('.draw-contents .result-user-score').text(result.userWin.toString() + "승 " + result.userLose.toString() + "패 " + result.userDraw.toString() + "무");
        var challangeDrawPopup = $('.draw-contents');
        var challangeDrawInner = challangeDrawPopup.find('.popup-inner');
        challangeDrawInner.removeClass('bounce-out');
        challangeDrawInner.addClass('bounce');
        challangeDrawPopup.fadeIn(300);
    }
}