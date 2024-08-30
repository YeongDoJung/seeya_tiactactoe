<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/jquery-3.6.0.min.js"></script>
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

    <!-- 회원가입 완료 팝업 -->
    <div class="popup-contents signin-contents common-popup fixed">
        <div class="popup-inner flex-just-center center">
            <p>회원가입이 완료 되었습니다.<br>
                로그인페이지로 돌아갑니다.</p>
            <input type="button" value="로그인 페이지로" id="signin-sucess-btn" class="btn btn-primary" onclick="location.href='login'">
        </div>
    </div>

    <section id="signin" class="form-bg">
        <div class="header" >
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
                    <div class="input-label most">
                        <label for="addId">아이디</label>
                    </div>
                    <div class="input-wrap">
                        <input type="text" placeholder="문자종류 상관없이 최대 10자리.   " id="addId" maxlength="10">
                    </div>
                    <div class="error-message" id="id-error">
                        <p></p>
                    </div>
                </div>
                <div class="input-box">
                    <div class="input-label most">
                        <label for="addPW">비밀번호</label>
                    </div>
                    <div class="input-wrap flex-box item-center just-between">
                        <input type="password" placeholder="문자종류 상관없이 최대 10자리." id="addPw" maxlength="10">
                        <img src="/assets/images/icon-pw.svg" alt="비밀번호" class="icon">
                    </div>
                    <div class="input-label most">
                        <label for="addPwCheck">비밀번호 확인</label>
                    </div>
                    <div class="input-wrap flex-box item-center just-between">
                        <input type="password" placeholder="비밀번호 확인" id="addPwCheck" maxlength="10">
                        <img src="/assets/images/icon-pw.svg" alt="비밀번호 확인" class="icon">
                    </div>
                    <div class="error-message" id="pw-check-error">
                        <p></p>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <div class="input-box">
                    <div class="input-label most">
                        <label for="addNickname">닉네임</label>
                    </div>
                    <div class="input-wrap">
                        <input type="text" placeholder="문자종류 상관없이 최대 10자리." id="addNickname" maxlength="10">
                    </div>
                    <div class="error-message" id="nick-error">
                        <p></p>
                    </div>
                </div>
                <div class="input-box">
                    <div class="input-label most">
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
                    <div class="error-message" id="email-error">
                        <p></p>
                    </div>
                </div>
            </div>
            <div class="form-box">
                <input type="submit" value="가입하기" id="signinBtn" class="btn btn-light" onclick=submitButton()>
            </div>
        </div>
    </section>
    
    <!-- 공통::js -->
    <script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="/assets/js/common.js"></script>
    
    <script>
        function submitButton() {
            let userId = $("#addId").val();
            let userPw = $("#addPw").val();
            let userPwCheck = $("#addPwCheck").val();
            let userNickname = $("#addNickname").val();
            let userEmailFirst = $("#addEmailFirst").val();
            let userEmailLast = $("select[name='email-last'] option:selected").text();

            if (userId == '') {
                $(".error-message#id-error").html('<p>"아이디 항목이 비어있습니다."</p>');
            }
            else {
                $(".error-message#id-error").html('<p></p>')
            }
            if (userPw !== userPwCheck) {
                $(".error-message#pw-check-error").html('<p>"비밀번호가 같지 않습니다."</p>');
            }
            else if (userPw == '' || userPwCheck == '') {
                $(".error-message#pw-check-error").html('<p>"비밀번호 항목이 비어있습니다."</p>');
            }
            else {
                $(".error-message#pw-check-error").html('<p></p>');
            }
            if (userNickname == '') {
                $(".error-message#nick-error").html('<p>"닉네임 항목이 비어있습니다."</p>');
            }
            else {
                $(".error-message#nick-error").html('<p></p>');
            }
            if (userEmailFirst == '') {
                $(".error-message#email-error").html('<p>"이메일 항목이 비어있습니다."</p>');
            }
            else {
                $(".error-message#email-error").html('<p></p>');
            }
            if (userEmailLast == '이메일 선택') {
                $(".error-message#email-error").html('<p>"이메일 주소를 선택해주세요"</p>');
            }
            else {
                $(".error-message#email-error").html('<p></p>')
            }

            $.ajax({
                url : '/ajax/signUpForm',
                method : 'post',
                dataType : 'json',
                data : {
                    'userId': userId,
                    'userPw': userPw,
                    'userNickname': userNickname,
                    'userEmail': userEmailFirst + '@' + userEmailLast,
                },
                success : function(data){
                    if (data.signUp === 1) {
                        var signinPopup = $('.signin-contents');
                        var signinPopupInner = signinPopup.find('.popup-inner');
                        signinPopupInner.removeClass('bounce-out');
                        signinPopupInner.addClass('bounce');
                        signinPopup.fadeIn(300);
                    }
                    if (data.isIdExist === 1) {
                        $(".error-message#id-error").html('<p>"존재하는 아이디가 있습니다."</p>');
                    }
                    if (data.isNicknameExist === 1) {
                        $(".error-message#nick-error").html('<p>"존재하는 닉네임이 있습니다."</p>');
                    }
                },
                error : function (e){

                }
            });

        }

    </script>
</body>
</html>