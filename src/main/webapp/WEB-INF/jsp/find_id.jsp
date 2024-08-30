<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
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


    <section id="findID" class="form-bg">
        <div class="header">
            <h1>
                <a href="/">
                    <img src="/assets/images/main-logo.png" alt="메인로고">
                </a>
            </h1>
        </div>
        <div class="inner form-wrap">
            <div class="title-graphic">
                <img src="/assets/images/obj-left.png" alt="장식" class="obj-left">
                <img src="/assets/images/obj-right.png" alt="장식" class="obj-right">
            </div>
            <div class="form-box">
                <div class="input-box">
                    <div class="input-label">
                        <label for="addEmailFirst">이메일</label>
                    </div>
                    <div class="input-wrap">
                        <input type="text" placeholder="이메일" id="addEmailFirst">
                    </div>
                    <div class="email-box flex-box gap-15 item-center">
                        <span class="email-obj">@</span>
                        <select name="email-last" class="email-last input-wrap">
                            <option value="">이메일 선택</option>
                            <option value="@naver.com">naver.com</option>
                            <option value="@gmail.com">gmail.com</option>
                            <option value="@hanmail.net">hanmail.net</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <input type="submit" value="인증코드 전송" id="sandCode" class="btn btn-light" onclick="sendCodeID()">
            </div>
        </div>
    </section>
    
    <!-- 공통::js -->
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="assets/js/common.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script>
        function sendCodeID() {
            let user_email_first = $("#addEmailFirst").val();
            let user_email_last = $("select[name='email-last'] option:selected").text();
            let user_email = user_email_first + '@' + user_email_last;
            $.ajax({
                url : '/ajax/findId',
                method : 'get',
                dataType : 'json',
                data : {
                    'userEmail' : user_email,
                },
                success(data){
                    if (data.isUserExist == true) {
                        findIdCode(data.randomCodes);
                    }
                    else {
                        findIdError();
                    }
                },
                error(){
                    findIdError();
                },
            })
        }
    </script>
</body>
</html>