
var popup = $('.popup-contents');
var popdown = $('.popup-down');
var guidePopup = $('.guide-contents');
var guideInner = $('.guide-inner');
var popupInner = $('.popup-inner');
var guideBtn = $('#guideBtn');
var closeBtn = $('.close-btn');
var guideSlide = $('.guide-slide-inner');

$(document).ready(function () {

    guideSlide.slick({
        slide: 'div',
        dots: true,
        arrows: false,
        slidesToShow: 1,
        setPosition: 0, //깨짐 방지
        infinite: false,
    });

    $('.guide-prev').click(function () {
        guideSlide.slick('slickPrev');
    });

    $('.guide-next').click(function (e) {
        e.preventDefault();
        guideSlide.slick('slickNext');
    });

    guideBtn.click(function () {
        guideInner.removeClass('bounce-out');
        guideInner.addClass('bounce');
        guidePopup.fadeIn(300);
        guideSlide.resize();
        guideSlide.slick('refresh'); // 팝업 열때 슬라이드 깨짐 방지
    });

    closeBtn.click(function () {
        popupInner.removeClass('bounce');
        popupInner.addClass('bounce-out');
        popup.delay(300).fadeOut(300);
    });
    // popup-down 클래스가 있는 경우, 공백 클릭 시 팝업 닫힘
    $(document).on('mouseup', function(e) {
        if (popdown.has(e.target).length === 0 && ($(".swal-overlay--show-modal").length === 0)) {
            popdown.find(popupInner).removeClass('bounce');
            popdown.find(popupInner).addClass('bounce-out');
            popdown.delay(300).fadeOut(500);
        }
    })
});

// UI-ALERT-CODEERROR
function codeError() {
    swal("인증코드가 일치하지 않습니다.",
        {
            icon: "error",
            button: "확인",
        });
}

// UI-ALERT-FINDIDERROR
function findIdError() {
    swal("해당 이메일을 사용하는 이용자를 찾을 수 없습니다.",
        {
            icon: "error",
            button: "확인",
        });
}

// UI-ALERT-PWCHANGEERROR
function pwError() {
    swal("비밀번호가 유효하지 않습니다.",
        {
            icon: "error",
            button: "확인",
        });
}

// UI-ALERT-FINDIDCODE
function findIdCode(randomCodes) {
    swal("인증코드는 " + randomCodes + " 입니다.",
        {
            icon: "warning",
            iconColor: '#F241A3',
            button: "확인",
            closeOnClickOutside: false,
        }).then(function () {
            // 코드 입력 페이지 이동.
            window.location = "code_id";
        });
}

// UI-ALERT-FINDPWCODE
function findPwCode(randomCodes) {
    swal("인증코드는 " + randomCodes + " 입니다.",
        {
            icon: "warning",
            iconColor: '#F241A3',
            button: "확인",
            closeOnClickOutside: false,
        }).then(function () {
            // 코드 입력 페이지 이동.
            window.location = "code_pw";
        });
}

// UI-ALERT-NAMECHANGEERROR
function nameChangeError() {
    swal("유효하지 않은 닉네임 입니다.",
        {
            icon: "warning",
            iconColor: '#F241A3',
            button: "확인",
        });
}

// UI-ALERT-NAMECHANGESUCCESS
function nameChangeSuccess() {
    swal("닉네임이 변경 되었습니다.",
        {
            icon: "success",
            button: "확인",
        }).then(function(){
            location.reload();
        });
}

// UI-ALERT-PWCHANGESUCCESS
function pwChangeSuccess() {
    swal("비밀번호 변경이 완료 되었습니다.\n변경 된 비밀번호로 로그인해주세요.",
        {
            icon: "success",
            button: "로그인 페이지로",
            closeOnClickOutside: false,

        }).then(function () {
            // 로그인 페이지 이동.
            window.location = "/login";
        });
}

// UI-ALERT-FINDPWERROR
function findPwError() {
    swal("아이디, 이메일 값이 유효하지 않습니다.",
        {
            icon: "error",
            button: "확인",

        });
}

function loadIcon(id) {
    var imgsrc;
    $.ajax({
        url: "/ajax/loadIcon",
        method: "get",
        dataType: "text",
        async : false,
        data: {
            userId : id,
        },
        success: function (data) {
            imgsrc = data;
        },
        error(e) {
            console.log(e);
        }
    });
    return imgsrc;
}