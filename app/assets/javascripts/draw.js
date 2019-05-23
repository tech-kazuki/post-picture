$(document).on('turbolinks:load', function() {

    $('.menuicon').on('mouseover', function(){
        $(this).css('opacity', '0.8');
    }).on('mouseout', function(){
        $(this).css('opacity', '1.0');
    });

  var canvas = document.getElementById('draw-area');
  if (canvas) {

    var defosize = 7;
    var defocolor = "#555555";
    var defoalpha = 1.0;
    var mouseX = "";
    var mouseY = "";

    var ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 700, 500);

    canvas.addEventListener('mousemove', onMove, false);
    canvas.addEventListener('mousedown', onClick, false);
    canvas.addEventListener('mouseup', drawEnd, false);
    canvas.addEventListener('mouseout', drawEnd, false);

    function onMove(e) {
        if (e.buttons === 1 || e.witch === 1) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);
            draw(X, Y);
        };
    };

    function onClick(e) {
        if (e.button === 0) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);
            draw(X, Y);
        }
    };

    function draw(X, Y) {
        ctx.beginPath();
        ctx.globalAlpha = defoalpha;
        if (mouseX === "") {
            ctx.moveTo(X, Y);
        } else {
            ctx.moveTo(mouseX, mouseY);
        }

        ctx.lineTo(X, Y);

        ctx.lineCap = "round";
        ctx.lineWidth = defosize * 2;
        ctx.strokeStyle = defocolor;
        ctx.stroke();
        mouseX = X;
        mouseY = Y;
    };

    //左クリック終了、またはマウスが領域から外れた際、継続値を初期値に戻す
    function drawEnd() {
        mouseX = "";
        mouseY = "";
        let imageUrl = canvas.toDataURL();
        let input = document.getElementById('picture_image');
        input.value = imageUrl;
    };
    
    //スマホ対応　タッチイベント実装！
    canvas.addEventListener('touchmove', onTouchMove, false);
    canvas.addEventListener('touchstart', onTouchClick, false);
    canvas.addEventListener('touchend', drawEnd, false);
    
    //タッチして動かしている時
    function onTouchMove(e) {
        if (e.buttons === 1 || e.witch === 1) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);
            draw(X, Y);
        };
    };
    
    //ワンタップ
    function onTouchClick(e) {
        if (e.button === 0) {
            var rect = e.target.getBoundingClientRect();
            var X = ~~(e.clientX - rect.left);
            var Y = ~~(e.clientY - rect.top);
            draw(X, Y);
        }
    };

    //メニューのアイコン関係
    var menuIcon = document.getElementsByClassName("menuicon");
    for (i = 0; i < menuIcon.length; i++) {
        menuIcon[i].addEventListener("click", canvasMenu, false);
    }

    //メニューボタン管理
    function canvasMenu() {
        var thisId = this.id;
        if (thisId.indexOf("size") + 1) {
            defosize = this.id.slice(4);
        }
        if (thisId.indexOf("color") + 1) {
            defocolor = "#" + this.id.slice(5);
        }
        if (thisId.indexOf("alpha") + 1) {
            defoalpha = (this.id.slice(5)) / 10;
        }
        if (thisId.indexOf("fill") + 1) {
            ctx.fillStyle = defocolor;
            ctx.fillRect(0, 0, 700, 500);
        }
        if (thisId.indexOf("clear") + 1) {
            if (confirm("すべて消去しますか？")) {
                ctx.beginPath();
                ctx.fillStyle = "#fff";
                ctx.globalAlpha = 1.0;
                ctx.fillRect(0, 0, 700, 500);
            }
        }
    }
  }
});
