function CustomTooltip(tooltipIdx, barId, width) {
  //  alert("aa",width)
    var tooltipId = tooltipIdx;
//	var barId = barId;
    $("body").append("<div class='tooltip' id='" + tooltipId + "'></div>");
    /*	$("body").append("<div class='tooltip' id='"+tooltipId+"'>" +
     "<div class='bar' id='"+barId+"'>" +
     "</div>");
     $("#"+tooltipId).append("<div class='bar' id='"+barId+"'></div>"); */

    if (width) {
        $("#" + tooltipId).css("width", width);
  //      $("#" + barId).css("width", width);
    }

//	$("#"+barId).css("width", 200).css("color", "#000");

    hideTooltip();


    function showTooltip(content, event) {
        $("#" + tooltipId).html(content);
        $("#" + tooltipId).show();
        //	$("#"+barId).html(content);
//		$("#"+barId).show();

        updatePosition(event);
    }

    function hideTooltip() {
        $("#" + tooltipId).hide();
    }

    function doBar(testiar) {
        //	console.log(tyop);
        var barvalue;

        for (var i = 0, j = testiar.length; i < j; i++) {
            var tyop = testiar[i];
            var barId = "bar" + i;
            var barContainer = $("#" + barId);
            var valuex = $('.tooltip .valuex');

            if (tyop <= 100) {
                barvalue = (tyop) + ' %';
            } else {
                barvalue = 100 + ' %';
            }

            if (tyop !== 0) {
                barContainer.velocity({width: barvalue}, {duration: "normal"});
                if (tyop < 10) {
                    valuex.css({'color': "black"});
                    barContainer.css({'background-color': "#a50f15"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 25) {
                    valuex.css({'color': "black"});
                    barContainer.css({'background-color': "#de2d26"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 50) {
                    barContainer.css({'background-color': "#fb6a4a"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 67) {
                    barContainer.css({'background-color': "#6baed6"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 84) {
                    barContainer.css({'background-color': "#3182bd"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 101) {
                    barContainer.css({'background-color': "#08519c"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else if (tyop < 150) {
                    barContainer.css({'background-color': "#a1d99b"});
                    //	barContainer.velocity({width: 17}, { duration: "normal" });
                } else {
                    barContainer.css({'background-color': "#31a354"});
                }
            }

        }

        //	var barContainer = $('.bar');
        //	var valuex = $('.tooltip .valuex');
        //	var barCx = $('.tooltip .valuex');
        /*	if (tyop !== 0) {
         barContainer.velocity({width: barvalue}, { duration: "normal" });
         if (tyop < 10) {
         valuex.css({'color':"black"});
         barContainer.css({'background-color':"#a50f15"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 25) {
         valuex.css({'color':"black"});
         barContainer.css({'background-color':"#de2d26"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 50) {
         barContainer.css({'background-color':"#fb6a4a"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 67) {
         barContainer.css({'background-color':"#6baed6"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 84) {
         barContainer.css({'background-color':"#3182bd"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 101) {
         barContainer.css({'background-color':"#08519c"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else if (tyop < 150) {
         barContainer.css({'background-color':"#a1d99b"});
         //	barContainer.velocity({width: 17}, { duration: "normal" });
         } else {
         barContainer.css({'background-color':"#31a354"});
         }
         } */

    }

    function updatePosition(event) {
        var ttid = "#" + tooltipId;
        console.log(tooltipId)
        var xOffset = 20;
        var yOffset = -10;

        var ttw = $(ttid).width();
        var tth = $(ttid).height();
        var wscrY = $(window).scrollTop();
        var wscrX = $(window).scrollLeft();
        var curX = (document.all) ? event.clientX + wscrX : event.pageX;
        var curY = (document.all) ? event.clientY + wscrY : event.pageY;
        var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > $(window).width()) ? curX - ttw - xOffset * 2 : curX + xOffset;
        if (ttleft < wscrX + xOffset) {
            ttleft = wscrX + xOffset;
        }
        var tttop = ((curY - wscrY + yOffset * 2 + tth) > $(window).height()) ? curY - tth - yOffset * 2 : curY + yOffset;
        if (tttop < wscrY + yOffset) {
            tttop = curY + yOffset;
        }
        $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
        //	doBar(barWidth);
    }

    return {
        showTooltip: showTooltip,
        hideTooltip: hideTooltip,
        doBar: doBar,
        updatePosition: updatePosition
    }
}

function descriptionBuild(type,var1,var2) {
    if(var1 !== var2) {
        if (var1 && !var2) {
            return _(type)+_(", joka kertoo avustusten jakautumisesta muuttujan ") + _(termit[window.PAGE.VIEW]) + _(" mukaan.")
        } else if (!var1 && var2) {
            return _(type)+_(", joka kertoo avustusten jakautumisesta muuttujan ") + _(termit[window.PAGE.COLOR]) + _(" mukaan.")
        } else {
            return _(type)+_(", joka kertoo avustusten jakautumisesta muuttujien ") + _(termit[window.PAGE.VIEW]) +_(" ja ")+ _(termit[window.PAGE.COLOR])+ _(" mukaan.")
        }

    } else if (var1 == var2) {
        return _(type)+_(", joka kertoo avustusten jakautumisesta muuttujan ") + _(termit[window.PAGE.VIEW]) + _(" mukaan.")
    }

}
