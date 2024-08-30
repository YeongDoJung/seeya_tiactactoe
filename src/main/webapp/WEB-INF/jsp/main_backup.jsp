<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
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

<!-- 게임 방 만들기 팝업 -->
<div class="popup-contents creatRoom-contents common-popup popup-down">
    <div class="popup-inner center">
        <input type="button" value="×" class="close-btn transition-fade">
        <p>새로운 방의 이름을 정해주세요.</p>
        <div class="form-box">
            <div class="input-box">
                <div class="input-wrap">
                    <input type="text" placeholder="문자종류 상관없이 최대 20자리." id="roomName" maxlength="20" class="center">
                </div>
            </div>
        </div>
        <input type="button" value="CREATE!" id="newRoomSubmit" class="btn btn-primary"
               onclick="location.href='game_room'">
    </div>
</div>

<!-- 닉네임 변경 팝업 -->
<div class="popup-contents rename-contents common-popup">
    <div class="popup-inner center">
        <input type="button" value="×" class="close-btn transition-fade">
        <p>변경 할 닉네임을 적어주세요.</p>
        <div class="form-box">
            <div class="input-box">
                <div class="input-wrap">
                    <input type="text" placeholder="문자종류 상관없이 최대 10자리." id="addNickname" maxlength="10" class="center">
                </div>
            </div>
        </div>
        <input type="button" value="완료" id="reNameSubmit" class="btn btn-primary" onclick="nameChangeSuccess()">
    </div>
</div>


<!-- 설정 팝업 -->
<div class="popup-contents setting-contents common-popup popup-down">
    <div class="popup-inner center setting-btn-list">
        <input type="button" value="×" class="close-btn transition-fade">
        <input type="button" value="비밀번호 변경하기" id="callPwChange" class="btn btn-light">
        <input type="button" value="전적 리셋하기" id="resetScore-btn" class="btn btn-light" onclick="scoreReset()">
        <input type="button" value="로그아웃" id="logout-btn" class="btn btn-light" onclick="logOut()">
        <input type="button" value="회원탈퇴" id="remveUser-btn" class="btn btn-thin" onclick="unregister()">
    </div>
</div>


<!-- 비밀번호 변경 팝업 -->
<div class="popup-contents pw-change-contents common-popup">
    <div class="popup-inner center">
        <input type="button" value="×" class="close-btn transition-fade">
        <div class="form-box">
            <div class="input-box">
                <div class="input-label">
                    <label for="addPW">비밀번호</label>
                </div>
                <div class="input-wrap flex-box item-center just-between">
                    <input type="password" placeholder="문자종류 상관없이 최대 10자리." id="addPW" maxlength="10">
                    <img src="/assets/images/icon-pw.svg" alt="비밀번호" class="icon">
                </div>
                <div class="input-label">
                    <label for="addPWcheck">비밀번호 확인</label>
                </div>
                <div class="input-wrap flex-box item-center just-between">
                    <input type="password" placeholder="비밀번호 확인" id="addPWcheck" maxlength="10">
                    <img src="/assets/images/icon-pw.svg" alt="비밀번호 확인" class="icon">
                </div>
            </div>
        </div>
        <input type="button" value="완료" id="PwChangeSubmit" class="btn btn-primary" onclick="pwChangeSuccess()">
    </div>
</div>

<section id="main" class="section">
    <div class="header">
        <h1>
            <a href="/">
                <img src="/assets/images/main-logo.png" alt="메인로고">
            </a>
        </h1>
    </div>
    <div class="inner">
        <div class="title-graphic">
            <img src="/assets/images/obj-left.png" alt="장식" class="obj-left">
            <img src="/assets/images/obj-right.png" alt="장식" class="obj-right">
        </div>
        <div class="user-area area-box">
            <div class="user-wrap flex-box gap-40 item-center">
                <div class="user-icon">
                    <div class="user-icon-img">
                        <img src="/assets/images/profile_icon.png" alt="프로필 사진">
                    </div>
                    <label for="editIcon" class="edit-file-btn edit-icon">
                        <img src="/assets/images/icon-input.svg" alt="편집">
                        <input type="file" accept="image/*" id="editIcon" name="editIcon">
                    </label>
                </div>
                <div class="user-infor">
                    <div class="user-name-box">
                        <span class="user-name">USER-NAME</span>
                        <button type="button" class="edit-btn" id="editName">
                            <img src="/assets/images/icon-input.svg" alt="편집">
                        </button>
                    </div>
                    <div class="user-score">0승 0패 0무</div>
                </div>
            </div>
            <button type="button" class="setting-btn" id="settingCall">
                <img src="/assets/images/icon-setting.svg" alt="설정">
            </button>
        </div>
        <div class="flex-box row just-between">
            <div class="game-list-wrap area-box">
                <div class="game-list-controls flex-box just-between">
                    <div class="flex-box gap-15 item-center">
                        <h2>GAME LIST</h2>
                        <button type="button" id="reloadBtn">
                            <img src="/assets/images/icon-refresh.svg" alt="방 정보 불러오기">
                        </button>
                    </div>
                    <input type="button" value="CREATE ROOM" id="creatRoomBtn"
                           class="frame-light-btn creatRoom-btn">
                </div>
                <ul class="game-list">
                    <li>
                        <div class="flex-box just-between">
                            <div class="room-infor flex-box column just-between">
                                <div>
                                    <div class="room-name-wrap" id="room1">
                                        <div class="room-name">ROOM-NAME</div>
                                        <span class="room-states state-wait">대기중</span>
                                    </div>
                                    <div class="room-manager" id="room1-manager-name">MANAGER-NAME</div>
                                </div>
                                <button type="button" class="joingame-btn"
                                        onclick="location.href='game_room'" id="room1-btn">JOIN GAME</button>
                            </div>
                            <div class="room-stage">
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex-box just-between">
                            <div class="room-infor flex-box column just-between">
                                <div>
                                    <div class="room-name-wrap" id="room2">
                                        <div class="room-name">ROOM-NAME</div>
                                        <span class="room-states state-active">진행중</span>
                                    </div>
                                    <div class="room-manager" id="room2-manager-name">MANAGER-NAME</div>
                                </div>
                                <button type="button" class="joingame-btn disabled-btn" id="room2-btn">JOIN GAME</button>
                            </div>
                            <div class="room-stage">
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="flex-box just-between">
                            <div class="room-infor flex-box column just-between">
                                <div>
                                    <div class="room-name-wrap" id="room3">
                                        <div class="room-name">ROOM-NAME</div>
                                        <span class="room-states state-end">게임종료</span>
                                    </div>
                                    <div class="room-manager" id="room3-manager-name">MANAGER-NAME</div>
                                </div>
                                <button type="button" class="joingame-btn disabled-btn" id="room3-btn">JOIN GAME</button>
                            </div>
                            <div class="room-stage">
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-light">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                                <div class="room-stage-box box-dark">
                                    <img src="/assets/images/obj-circle-hevy.svg" class="hide" alt="O">
                                    <img src="/assets/images/obj-cross-hevy.svg" class="hide" alt="X">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <div class="pagination">
                    <ul class="flex-box gap-15 just-center item-center">
                        <li class="prev"><a href="#"><img src="/assets/images/icon-paging-prev.svg" alt="이전 페이지"></a></li>
                        <li class="active"><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li class="next"><a href="#"><img src="/assets/images/icon-paging-next.svg" alt="다음 페이지"></a></li>
                    </ul>
                </div>
            </div>
            <div class="ranking-wrap area-box area-box">
                <h2>RANKING</h2>
                <ol class="ranking-list">
                    <li class="first-rank">
                        <div class="user-icon">
                            <div class="user-icon-img">
                                <img src="/assets/images/profile_icon.png" alt="프로필 사진">
                            </div>
                            <div class="first-num rank-num">1</div>
                        </div>
                        <div class="ranker-info">
                            <div class="ranker-name">USER-NAME</div>
                            <div class="ranker-score">0승 0패 0무</div>
                        </div>
                    </li>
                    <li class="flex-box gap-20 item-center">
                        <div class="second-num rank-num">2</div>
                        <div class="ranker-info">
                            <div class="ranker-name">USER-NAME</div>
                            <div class="ranker-score">0승 0패 0무</div>
                        </div>
                    </li>
                    <li class="flex-box gap-20 item-center">
                        <div class="third-num rank-num">3</div>
                        <div class="ranker-info">
                            <div class="ranker-name">USER-NAME</div>
                            <div class="ranker-score">0승 0패 0무</div>
                        </div>
                    </li>
                    <li class="flex-box gap-20 item-center">
                        <div class="forth-num rank-num">4</div>
                        <div class="ranker-info">
                            <div class="ranker-name">USER-NAME</div>
                            <div class="ranker-score">0승 0패 0무</div>
                        </div>
                    </li>
                    <li class="flex-box gap-20 item-center">
                        <div class="fifth-num rank-num">5</div>
                        <div class="ranker-info">
                            <div class="ranker-name">USER-NAME</div>
                            <div class="ranker-score">0승 0패 0무</div>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</section>

<!-- 공통::js -->
<script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
<script src="/assets/js/common.js"></script>
<!-- main js -->
<script>
    $(function () {
        $(".user-name").html('<span class="user-name">' + ${userId} +'</span>');
        $(".user-score#user-score").html('<div class="user-score" id="user-score"> ${userWin}승 ${userLose}패 ${userDraw}무</div>');
        makeRoomList(${nowPage})

        var reload = $('#reloadBtn');

        reload.click(function () {
            location.reload();
        });

        var creatRoomBtn = $('#creatRoomBtn');
        var creatRoomPopup = $('.creatRoom-contents');
        var creatRoomInner = creatRoomPopup.find('.popup-inner');

        creatRoomBtn.click(function () {
                creatRoomInner.removeClass('bounce-out');
                creatRoomInner.addClass('bounce');
                creatRoomPopup.fadeIn(300);
            }
        );

        var renameBtn = $('#editName');
        var renamePopup = $('.rename-contents');
        var renameInner = renamePopup.find('.popup-inner');

        renameBtn.click(function () {
                renameInner.removeClass('bounce-out');
                renameInner.addClass('bounce');
                renamePopup.fadeIn(300);
            }
        );


        var settingBtn = $('#settingCall');
        var settingPopup = $('.setting-contents');
        var settingInner = settingPopup.find('.popup-inner');

        settingBtn.click(function () {
                settingInner.removeClass('bounce-out');
                settingInner.addClass('bounce');
                settingPopup.fadeIn(300);
            }
        );

        var PWchangeBtn = $('#callPWchange');
        var PWchangePopup = $('.pw-change-contents');
        var PWchangeInner = PWchangePopup.find('.popup-inner');

        PWchangeBtn.click(function () {
                settingInner.removeClass('bounce');
                settingInner.addClass('bounce-out');
                settingPopup.delay(300).fadeOut(300);

                PWchangeInner.removeClass('bounce-out');
                PWchangeInner.addClass('bounce');
                PWchangePopup.fadeIn(300);
            }
        );

    });
</script>
</body>

</html>