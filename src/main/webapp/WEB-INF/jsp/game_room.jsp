<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="_csrf" th:content="${_csrf.token}"/>
    <meta name="_csrf_header" th:content="${_csrf.headerName}"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" href="/assets/css/style.css">
    <script src="/assets/js/jquery-3.6.0.min.js"></script>
    <title>PLAY TTT!</title>
</head>
<body>
<!-- 공통::팝업 -->
<div class="popup-contents guide-contents fixed popup-down">
    <div class="popup-inner guide-inner bounce-out">
        <input type="button" value="×" id="close-btn" class="close-btn transition-fade">
        <div class="guide-slide">
            <button class="guide-nav guide-prev">
                <img src="/assets/images/icon-prev.svg" alt="이전">
            </button>
            <div class="guide-slide-inner">
                <div class="guide-inner1">
                    <div class="guide-inner-img flex-box item-center just-center">
                        <img src="/assets/images/frame/guide-1.png" alt="가이드1" class="center">
                    </div>
                    <p>플레이! 틱택토는 실시간 통신으로 진행 됩니다.</p>
                </div>
                <div class="guide-inner2">
                    <div class="guide-inner-img flex-box item-center just-center">
                        <img src="/assets/images/frame/guide-2.png" alt="가이드2" class="center">
                    </div>
                    <p>로그인에 성공하면 게임에 참여 하거나 직접 방을 만들 수 있습니다.</p>
                </div>
                <div class="guide-inner3">
                    <div class="guide-inner-img flex-box item-center just-center">
                        <img src="/assets/images/frame/guide-3.png" alt="가이드3" class="center">
                    </div>
                    <p>O가 선공, X는 후공입니다. 번갈아가며 칸을 채워주세요.</p>
                </div>
                <div class="guide-inner4">
                    <div class="guide-inner-img flex-box item-center just-center">
                        <img src="/assets/images/frame/guide-4.png" alt="가이드4" class="center">
                    </div>
                    <p>먼저 가로, 세로, 대각선 3칸을 채우는 플레이어가 우승합니다.</p>
                </div>
                <div class="guide-inner5">
                    <div class="guide-inner-img flex-box item-center just-center">
                        <img src="/assets/images/frame/guide-5.png" alt="가이드5" class="center">
                    </div>
                    <p>승률을 올려 랭킹에 도전해보세요!</p>
                </div>
            </div>
            <button class="guide-nav guide-next">
                <img src="/assets/images/icon-next.svg" alt="다음">
            </button>
        </div>
    </div>
</div>
<!-- 공통::가이드버튼 -->
    <div class="guide-wrap">
        <button type="button" class="guide-btn" id="guideBtn">?</button>
    </div>

    <!-- 승리 팝업 -->
    <div class="popup-contents result-contnts winner-contents common-popup fixed popup-down">
        <div class="popup-inner flex-just-center center">
            <div class="result-title">이겼습니다!</div>
            <div class="result-sub">멋진 승부였어요.</div>
            <div class="result-score">
                <span class="result-score-title">당신의 현재 전적</span>
                <span class="result-user-score">${userWin}승 ${userLose}패 ${userDraw}무</span>
            </div>
            <input type="button" value="퇴장하기" class="btn btn-light" onclick="location.href='/main/1'">
        </div>
    </div>

    <!-- 패배 팝업 -->
    <div class="popup-contents result-contnts loser-contents common-popup fixed popup-down">
        <div class="popup-inner flex-just-center center">
            <div class="result-title">패배했습니다.</div>
            <div class="result-sub">멋진 승부였어요.</div>
            <div class="result-score">
                <span class="result-score-title">당신의 현재 전적</span>
                <span class="result-user-score">${userWin}승 ${userLose}패 ${userDraw}무</span>
            </div>
            <input type="button" value="퇴장하기" class="btn btn-light" onclick="location.href='/main/1'">
        </div>
    </div>

    <!-- 무승부 팝업 -->
    <div class="popup-contents result-contnts draw-contents common-popup fixed popup-down">
        <div class="popup-inner flex-just-center center">
            <div class="result-title">비겼습니다.</div>
            <div class="result-sub">멋진 승부였어요.</div>
            <div class="result-score">
                <span class="result-score-title">당신의 현재 전적</span>
                <span class="result-user-score">${userWin}승 ${userLose}패 ${userDraw}무</span>
            </div>
            <input type="button" value="퇴장하기" class="btn btn-light" onclick="location.href='/main/1'">
        </div>
    </div>

    <section id="game" class="section">
        <div class="header" >
            <h1>
                <a href="/main/1">
                    <img src="/assets/images/main-logo.png" alt="메인로고">
                </a>
            </h1>
        </div>
        <div class="inner">
            <div class="title-graphic">
                <img src="/assets/images/obj-left.png" alt="장식" class="obj-left">
                <img src="/assets/images/obj-right.png" alt="장식" class="obj-right">
            </div>
            <div class="player-box-wrap">
                <!-- 
                    turn-active : 현재 차례인플레이어 확인.
                    this-user : 사용자가 현재 작동시키고 있는 플레이어 확인 .
                    waiting-box : 후공 플레이어 미접속 상태.
                 -->
                <div class="player-box player-first flex-box column item-center turn-active this-user">
                    <div class="marker">O</div>
                    <div class="user-icon">
                        <div class="user-icon-img">
                            <img src="/assets/images/profile_icon.png" alt="프로필 사진">
                        </div>
                        <div class="me-marker">ME</div>
                    </div>
                    <div class="user-name">${player1}</div>
                    <div class="turn">YOUR TURN</div>
                </div>
    
                <div class="player-box player-second waiting-box flex-box column item-center">
                    <div class="marker">X</div>
                    <div class="user-icon">
                        <div class="user-icon-img">
                            <img src="/assets/images/profile_icon.png" alt="프로필 사진">
                        </div>
                        <div class="me-marker">ME</div>
                    </div>
                    <div class="user-name">${player2}</div>
                    <div class="user-waiting">WAITING PLAYER...</div>
                    <div class="turn">YOUR TURN</div>
                </div>
            </div>

            <div class="game-stage">
                <div class="game-row">
                    <div class="game-box box-light" id="0">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-dark" id="1">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-light" id="2">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                </div>
                <div class="game-row">
                    <div class="game-box box-dark" id="3">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-light" id="4">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-dark" id="5">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                </div>
                <div class="game-row">
                    <div class="game-box box-light" id="6">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-dark" id="7">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                    <div class="game-box box-light" id="8">
                        <img src="/assets/images/obj-circle-hevy.svg" alt="O" class="first-order">
                        <img src="/assets/images/obj-cross-hevy.svg" alt="X" class="second-order">
                    </div>
                </div>
            </div>
        </div>
            
        <div class="game-btn">
            <input type="button" value="나가기" class="btn btn-thin" id="roomExit">
            <!-- 비 활성화시 disabled 클래스 추가 -->
        </div>

        <input type="hidden" id="seqInput" value="${seq}">
    </section>
    
    <!-- 공통::js -->
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="/assets/js/common.js"></script>
    <script src="/assets/js/gameRoom.js"></script>
    <script>
        let whosTurn;
        let me;
        let you;
        let player2;
        let status;
        let seq = $('#seqInput').val();
        initGameInfo(seq);
        $('#roomExit').on('click', function() {
            if ( !$('#roomExit').hasClass('disabled') ) {
                roomOut(seq);
            }
        });
        let poll = setInterval(function() {pollGameInfo(seq);}, 1000);

        $(function () {
            var gameArea = $('.game-box');

            gameArea.click(function () {
                var first = $(this).find('.first-order');
                var second = $(this).find('.second-order');
                var selected = $(this).attr('id');
                let board = getBoardState();

                if (first.hasClass('animate__bounceIn') || second.hasClass('animate__bounceIn')) {
                    return;
                }

                if (whosTurn == me) {
                    updateTurn(you)
                    whosTurn = you
                    updateBoardInfo(board, seq, selected);
                }
            });
        });
    </script>
</body>
</html>