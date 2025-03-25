/**
 * Created by Roope on 20.10.2020.
 */
var accessColors = false;
var setColors =['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928','#72A0C1','#CD9575','#E52B50',"#18c199","black", "grey","#242240","#D2AA1B","#748700","#1E3C00","#922D25"]

function changeColors () {
    if (accessColors == false) {
        accessColors = true
    } else {
        accessColors = false
    }

    for (var c in colorings10) {
        console.log(colorings10[c].pattern.color)
        colorings10[c].pattern.color = setColors[c]
    }


    if(window.PAGE.TYPE === "bars") {
        HankeVisBar.update();
    } else if (window.PAGE.TYPE === "circles") {
        color_by(window.PAGE.COLOR);
    } else if(window.PAGE.TYPE === "map") {
        MapVis.start()
    } else if(window.PAGE.TYPE === "table") {
        TableVis.start()
    }
}
var cols9 = ["#ec69d1",
    "#008f44",
    "#fa585b",
    "#00d1df",
    "#f48e32",
    "#003b91",
    "#ffcb70",
    "#0093d8",
    "#bba8ff"]
/*
 var cols18 = ["#01ce98",
 "#870081",
 "#44910f",
 "#013799",
 "#93b223",
 "#aa006c",
 "#018b34",
 "#ff6fa0",
 "#9ae5a5",
 "#7a0020",
 "#0097d6",
 "#ce5020",
 "#a6a4ff",
 "#f7d065",
 "#ff6069",
 "#695800",
 "#ffc687",
 "#7f3426"]
 */
var colorings = {
    "Nuorten työpajatoiminta" :{
        pattern: {
            path: 'M 0 0 L 10 10 M 9 - 1 L 11 1 M - 1 9 L 1 11',
            //       path: '',
            width: 6,
            height: 6,
            color:"#e41a1c"
        }
    },
    "Etsivä nuorisotyö" :{
        pattern: {
            path: 'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
            width: 9,
            height: 9,
            color:"#377eb8"
        }
    },
    "Liikkuva koulu" :{
        pattern: {
            path: 'M 3 0 L 3 10 M 8 0 L 8 10',
            width: 6,
            height: 6,
            color:"#984ea3"
        }
    },
    "Liikuntapaikkarakentaminen" :{
        pattern: {
            path: 'M 0 3 L 10 3 M 0 8 L 10 8',
            width: 6,
            height: 6,
            color:"#ff7f00"
        }
    },
    "Lasten ja nuorten paikallinen harrastustoiminta" :{
        pattern: {
            path: 'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
            //       path: '',
            width: 6,
            height: 6,
            color:"#ffff33"
        }
    },
    "Kirjastojen kehittämishankkeet" :{
        pattern: {
            path: 'M 3 3 L 8 3 L 8 8 L 3 8 Z',
            width: 6,
            height: 6,
            color:"#a65628"
        }
    },
    "Liikunnallinen elämäntapa" :{
        pattern: {
            path: 'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
            width: 6,
            height: 6,
            color:"#f781bf"
        }
    },
    "Nuorten tieto- ja neuvontatyö sekä digitaalinen nuorisotyö" :{
        pattern: {
            path: 'M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7',
            width: 6,
            height: 6,
            color:"#999999"
        }
    },
    "Maahanmuuttajien kotouttaminen liikunnan avulla" :{
        pattern: {
            path: 'M 2 5 L 5 2 L 8 5 L 5 8 Z',
            width: 6,
            height: 6,
            color:"#fdbf6f"
        }
    },
    "joku uusi avustusmuoto" :{
        pattern: {
            path: 'M 0 0 L 5 10 L 10 0',
            width: 6,
            height: 6,
            color:"#6a3d9a"
        }
    }

}
var colorings10 = {
    0 :{
        pattern: {
            color:"#a6cee3"
        }
    },
    1 :{
        pattern: {
            color:"#1f78b4"
        }
    },
    2 :{
        pattern: {
            color:"#b2df8a"
        }
    },
    3 :{
        pattern: {
            color:"#33a02c"
        }
    },
    4 :{
        pattern: {
            path: 'M 0 0 L 10 10 M 9 - 1 L 11 1 M - 1 9 L 1 11',
            //       path: '',
            width: 6,
            height: 6,
            color:"#e41a1c"
        }
    },
    5 :{
        pattern: {
            path: 'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
            width: 9,
            height: 9,
            color:"#377eb8"
        }
    },
    6 :{
        pattern: {
            path: 'M 3 0 L 3 10 M 8 0 L 8 10',
            width: 6,
            height: 6,
            color:"#984ea3"
        }
    },
    7 :{
        pattern: {
            path: 'M 0 3 L 10 3 M 0 8 L 10 8',
            width: 6,
            height: 6,
            color:"#ff7f00"
        }
    },
    8 :{
        pattern: {
            path: 'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
            //       path: '',
            width: 6,
            height: 6,
            color:"#ffff33"
        }
    },
    9 :{
        pattern: {
            path: 'M 3 3 L 8 3 L 8 8 L 3 8 Z',
            width: 6,
            height: 6,
            color:"#a65628"
        }
    },
    10 :{
        pattern: {
            path: 'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
            width: 6,
            height: 6,
            color:"#f781bf"
        }
    },
    11 :{
        pattern: {
            path: 'M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7',
            width: 6,
            height: 6,
            color:"#999999"
        }
    },
    12 :{
        pattern: {
            path: 'M 2 5 L 5 2 L 8 5 L 5 8 Z',
            width: 6,
            height: 6,
            color:"#fdbf6f"
        }
    },
    13 :{
        pattern: {
            path: 'M 0 0 L 5 10 L 10 0',
            width: 6,
            height: 6,
            color:"#6a3d9a"
        }
    },
    14 :{
        pattern: {
            path: 'M 0 0 L 10 10 M 9 - 1 L 11 1 M - 1 9 L 1 11',
            //       path: '',
            width: 3,
            height: 6,
            color:"#e41a1c"
        }
    },
    15 :{
        pattern: {
            path: 'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
            width: 4,
            height: 9,
            color:"#377eb8"
        }
    },
    16 :{
        pattern: {
            path: 'M 3 0 L 3 10 M 8 0 L 8 10',
            width: 3,
            height: 6,
            color:"#984ea3"
        }
    },
    17 :{
        pattern: {
            path: 'M 0 3 L 10 3 M 0 8 L 10 8',
            width: 3,
            height: 6,
            color:"#ff7f00"
        }
    },
    18 :{
        pattern: {
            path: 'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
            //       path: '',
            width: 3,
            height: 6,
            color:"#ffff33"
        }
    },

}
var parseColorTable = function (circles) {
    seenColors = []

    for (var k in circles) {
        if(seenColors.indexOf(circles[k][window.PAGE.COLOR]) == -1)
            seenColors.push(circles[k][window.PAGE.COLOR])
    }
    console.log(seenColors)
    var colorTable = $("#first")
    $("#first tr").each(function(d) {
        var $tr = $(this);
        var row = [];
        $tr.find("td").each(function(){
            row.push($(this).text());
        });

        if(seenColors.indexOf(row[1].trim()) == -1)
            $(this).hide()
        else
            $(this).show()
    });
    console.log(colorTable)
}
