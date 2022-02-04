$(function () {
    $(".marcha-atras").fadeOut()
    showCinturon(false)
    function showCarHud(bool) {
        if (bool) {
            $(".carhud").fadeIn(300);
        } else {
            $(".carhud").fadeOut(300);
        }
    }
    function showCinturon(bool) {
        if (bool) {
            $(".cinturon-on").show(500);
        } else {
            $(".cinturon-on").hide(500);
            $(".cinturon-off").fadeIn(300);
        }
    }
    function initCarhud(data) {
        const daño = data.damage / 10;
        $(".kilometer").text(Math.round(data.speed) + "");
        $(".progressFuel").css("height", (data.fuel) * 0.18 + "");
        $(".progressMotor").css("height", (daño) * 0.250 + "");
        $(".progressBarVel").css("width", (data.speed) * 0.45 + "");
        showCarHud(true)
        if (data.Bici != true) {
            if (data.engine == 0) {
                $(".marcha-atras").fadeIn()
                $(".marcha-1").fadeOut();
                $(".marcha-2").fadeOut();
                $(".marcha-3").fadeOut();
                $(".marcha-4").fadeOut();
                $(".marcha-5").fadeOut();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 1 ){
                $(".marcha-1").fadeIn();
                $(".marcha-atras").fadeOut()
                $(".marcha-2").fadeOut();
                $(".marcha-3").fadeOut();
                $(".marcha-4").fadeOut();
                $(".marcha-5").fadeOut();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 2) {
                $(".marcha-2").fadeIn();
                $(".marcha-3").fadeOut();
                $(".marcha-4").fadeOut();
                $(".marcha-5").fadeOut();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 3) {
                $(".marcha-3").fadeIn();
                $(".marcha-4").fadeOut();
                $(".marcha-5").fadeOut();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 4) {
                $(".marcha-4").fadeIn();
                $(".marcha-5").fadeOut();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 5) {
                $(".marcha-5").fadeIn();
                $(".marcha-6").fadeOut();
            } else if (data.engine == 6) {
                $(".marcha-6").fadeIn();
            }
        }
        // Vida del motor 
        if (data.on) {
            $(".kilometer").css(
                {
                    color: "#ccc",
                }
            )
            $(".progressFuel").show(500)
            $(".progressMotor").show(500)
            if (data.Bici != true) {
                $(".marchas").show(500)
            }
        } else {
            $(".kilometer").css(
                {
                    color: "#404040",
                    textShadow: "0 0 .25vw rgb(102, 102, 102)"

                }
            )

            $(".progressFuel").hide(500)
            $(".progressMotor").hide(500)
            $(".marchas").hide(500)
        }
        // Eliminar gasolina en bici 
        if (data.Bici) {
            $(".marcha-atras").hide()
            $(".gasolina").hide(300)
            $(".motor").hide(300)
            $(".marchas").hide(500)
            $(".cinturon").hide(500)
        } else if (data.Bici != true) {
            $(".gasolina").show(300)
            $(".cinturon").show(500)
            $(".motor").show(300)
        }
        //
        if (data.speed >= 180) {
            $(".progressVel").css(
                {
                    backgroundColor: "red",
                    boxShadow: "0 0 .25vw rgb(255, 0, 0)",
                }
            )
            $(".progressBarVel").css(
                {
                    backgroundColor: "rgb(255, 0, 0)",
                }
            )
        } else if (data.speed <= 179) {
            $(".progressVel").css(
                {
                    backgroundColor: "white",
                    boxShadow: "0 0 .25vw rgb(255, 255, 255)",
                }
            )
            $(".progressBarVel").css(
                {
                    backgroundColor: "rgb(255, 255, 255)",
                }
            )
        }
        if (data.fuel <= 40) {
            $(".progressFuel").css(
                {
                    backgroundColor: "red",
                }
            )
        } else {
            $(".progressFuel").css(
                {
                    backgroundColor: "rgb(255, 255, 255)",
                }
            )
        }
        if (daño <= 40) {
            $(".progressMotor").css(
                {
                    backgroundColor: "red",
                }
            )
        } else {
            $(".progressMotor").css(
                {
                    backgroundColor: "rgb(255, 255, 255)",
                }
            )
        }
    }
    window.addEventListener('message',  function(event, data){
        let v =  event.data;
        if (v.action == 'speedometer') {
            initCarhud(v);
        } else if (v.action == 'hideSpeedo') {
            showCarHud(false);
        }
    })
});