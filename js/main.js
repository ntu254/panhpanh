const CONFIG = {
    titleWeb: "Panh Panh",
    introTitle: 'Panh',
    introDesc: `Trái đất vốn lạ thường
    Mà sao em cứ đi nhầm đường
    Lạc vào tim anh lẻ loi
    Đằng sau chữ yêu đây là thương`,
    btnIntro: '^^HiHi^^',
    title: 'Phải chăng em đã mê ngay từ cái nhìn đầu tiên 🥰',
    desc: 'Phải chăng em đã say ngay từ lúc thấy nụ cười ấy ',
    btnYes: 'Thích lắm <33',
    btnNo: 'Không nha :3',
    question: 'Trên thế giới hơn 7 tỉ người mà sao em lại gặp được anh <3',
    btnReply: 'Gửi cho u <3',
    reply: 'Anh Tú siêu cấp vũ trụ đẹp zai đáng yêu tốt bụng <33333333',
    mess: 'Anh biết mà 🥰. Em cũng dị đóa nha 😘😘',
    messDesc: 'Cảm ơn ông Trân vì anh đã gặp đc em',
    btnAccept: 'Okiiiii lun <3',
    messLink: 'https://www.facebook.com/messages/e2ee/t/28685511487763644/#' //link mess của các bạn. VD: https://www.facebook.com/messages/t/100014188333536
};

$(document).ready(function() {
    // Preloader
    setTimeout(function() {
        firstQuestion();
        $('.spinner').fadeOut();
        $('#preloader').delay(350).fadeOut('slow');
        $('body').delay(350).css({ 'overflow': 'visible' });
    }, 600);
});

function init() {
    document.getElementById('titleWeb').innerHTML = CONFIG.titleWeb;
    $('#title').text(CONFIG.title);
    $('#desc').text(CONFIG.desc);
    $('#yes').text(CONFIG.btnYes);
    $('#no').text(CONFIG.btnNo);

    var xYes = (0.9 * $(window).width() - $('#yes').width() - $('#no').width()) / 2;
    var xNo = xYes + $('#yes').width() + 0.1 * $(window).width();
    var y = 0.75 * $(window).height();
    $('#yes').css("left", xYes);
    $('#yes').css("top", y);
    $('#no').css("left", xNo);
    $('#no').css("top", y);
}

function firstQuestion() {
    $('.content').hide();
    Swal.fire({
        title: CONFIG.introTitle,
        text: CONFIG.introDesc,
        imageUrl: 'img/cute-heart.gif',
        imageWidth: 200,
        imageHeight: 200,
        background: '#fff url("img/cute-background.jpg")',
        confirmButtonText: CONFIG.btnIntro
    }).then(function() {
        $('.content').show(200);
        var audio = new Audio('sound/cute-sound.mp3');
        audio.play();
    });
}

// Switch button position
function switchButton() {
    var audio = new Audio('sound/cute-switch.mp3');
    audio.play();
    var leftNo = $('#no').css("left");
    var topNO = $('#no').css("top");
    var leftY = $('#yes').css("left");
    var topY = $('#yes').css("top");
    $('#no').css("left", leftY);
    $('#no').css("top", topY);
    $('#yes').css("left", leftNo);
    $('#yes').css("top", topNO);
}

// Move button randomly
function moveButton() {
    var audio = new Audio('sound/cute-move.mp3');
    audio.play();
    var x = Math.random() * ($(window).width() - $('#no').width()) * 0.9;
    var y = Math.random() * ($(window).height() - $('#no').height()) * 0.9;
    var left = x + 'px';
    var top = y + 'px';
    $('#no').css("left", left);
    $('#no').css("top", top);
}

init();

var n = 0;
$('#no').mousemove(function() {
    if (Math.random() < 0.5 || n == 1) switchButton();
    else moveButton();
    n++;
});
$('#no').click(() => {
    if (screen.width >= 900) switchButton();
});

// Show popup when clicking "Yes"
$('#yes').click(function() {
    var audio = new Audio('sound/cute-tick.mp3');
    audio.play();
    Swal.fire({
        title: CONFIG.question,
        html: "<input type='text' class='form-control' id='txtReason' onmousemove=textGenerate() placeholder='Tại sao bạn thích mình?'>",
        width: 900,
        padding: '3em',
        background: '#fff url("img/cute-background.jpg")',
        backdrop: `
            rgba(255, 182, 193, 0.4)
            url("img/cute-gif.gif")
            left top
            no-repeat
        `,
        confirmButtonText: CONFIG.btnReply
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                width: 900,
                confirmButtonText: CONFIG.btnAccept,
                background: '#fff url("img/cute-background.jpg")',
                title: CONFIG.mess,
                text: CONFIG.messDesc,
                confirmButtonColor: '#ff6f61',
                onClose: () => {
                    window.location = CONFIG.messLink;
                }
            });
        }
    });
});
