/**
 * Created by Roope on 15.10.2019.
 */
jQuery(document).ready(function($) {
// Syötä haun avautumisen päivämäärä tähän alle
    var countDownDatetoStart = new Date("Sep 6, 2019 00:00:00").getTime();
// Syötä haun sulkeutumisen päivämäärä tähän alle
    var countDownDatetoEnd = new Date("Dec 13, 2019 16:15:00").getTime();

    $( ".sidebar-inner" ).prepend( "<div id='hakudiv' style='font-weight:bold'><p  id='haku'></p><p id='toEnd'></p></div>" );

// Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDatetoStart - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));/*
         var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
         var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
         var seconds = Math.floor((distance % (1000 * 60)) / 1000);*/

        // Display the result in the element with id="demo"
        document.getElementById("haku").innerHTML = "Haun käynnistymiseen "+days + " päivää"/* + hours + "h "
         + minutes + "m " + seconds + "s "*/;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            var y = setInterval(function() {
                var now2 = new Date().getTime();
                var distance2 = countDownDatetoEnd - now2;
                var days2 = Math.floor(distance2 / (1000 * 60 * 60 * 24));
                var hours2 = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes2 = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
                var seconds2 = Math.floor((distance2 % (1000 * 60)) / 1000);
                document.getElementById("haku").innerHTML = "Haku on käynnissä";
                $( "#haku" ).css("color", "green");
                document.getElementById("toEnd").innerHTML = "Haun päättymiseen "+days2 + " päivää<br>"+ hours2 + "h "
                + minutes2 + "m " + seconds2 + "s ";
                if (distance2 < 0) {
                    clearInterval(y);
                    document.getElementById("haku").innerHTML = "Haku on päättynyt";
                    $( "#haku" ).css("color", "red");
                    document.getElementById("toEnd").innerHTML = " ";

                }
            }, 10);
        }
    }, 10);

});
