// Copyright: Vividin Oy. All rights reserved.
var closeMapTable;
var MapVis = {
    infoVisible: false,
    //   themes: {},
    //   themes: { "Liikuntapaikkarakentaminen": true, "Maahanmuuttajien kotouttaminen liikunnan avulla": true, "Nuorten työpajatoiminta": true },
  //  themes: window.PAGE.MAPVIEW.TEEMA,
    //  unit: 'money',
    unit: window.PAGE.MAPVIEW.UNIT,
    suhde: window.PAGE.MAPVIEW.SUHDE,
    asukasluku: {},
    sorter : "amount",
    //  base: 'kunta',
    base: window.PAGE.MAPVIEW.MAP,
    selected: window.PAGE.MAPVIEW.SELECTED,
    //  allowedYears: null,
  //  allowedYears: null,
    existingYears: null,
    settings: {
        title: {},

        chart: {
       //     backgroundColor: "#EBE8E8"
            backgroundColor: "white"
      //      marginLeft: 150
        },

        exporting: {
            filename:"myonnetty-avustus",
            menuItemDefinitions: {
                downloadPNG: {
                    onclick: function () {
                        this.options.subtitle.text = subtitle.join("<br>")
                        this.exportChart(null, {});
                    },
                    text: _('Lataa PNG-kuva')
                },
                downloadJPEG: {
                    onclick: function () {
                        this.options.subtitle.text = subtitle.join("<br>")
                        this.exportChart({
                            type: 'image/jpeg'
                        });
                    },
                    text: _('Lataa JPEG-kuva')
                },
                downloadPDF: {
                    onclick: function () {
                        this.options.subtitle.text = subtitle.join("<br>")
                        this.exportChart({
                            type: 'application/pdf'
                        });
                    },
                    text: _('Lataa PDF-dokumentti')
                },
                downloadSVG: {
                    onclick: function () {
                        this.options.subtitle.text = subtitle.join("<br>")
                        this.exportChart({
                            type: 'image/svg+xml'
                        });
                    },
                    text: _('Lataa SVG-kuva')
                }

            },
            sourceWidth: 550,
            sourceHeight: 700,
            //    scale: 2,
            chartOptions: {
                chart: {
                    backgroundColor: "#FFFFFF"
                }
            },
            buttons: {
                contextButton: {
                    text: _('Lataa'),
                    menuItems: CSVbuttons.slice(0, 6)
                }
            }
        },

        navigation: {
            buttonOptions: {
                theme: {
             //       fill: '#ECE9E9'
                    fill: 'white'
                }
            }
        },
        credits: {
            text: _('Lähde') + ': '+_('Erasmus+ -hanketietokanta'),
            href: null,
            enabled: true,
            style: {
                color:"##161616",
                fontSize:"10px"
            }
        },

        mapNavigation: {
            enabled: true,
            enableButtons: true,
            buttonOptions: {
                verticalAlign: 'bottom',
                align: 'right'
            },
            buttons: {
                zoomIn: {
                    x: 0
                },
                zoomOut: {
                    x: 0
                }
            }
        }
    }
};
//var clickProject = null

for ( var i in asukasluvut) {
    MapVis.asukasluku[asukasluvut[i].id] = asukasluvut[i]
}


function findExistingYears() {
    'use strict';

    var existingYears = [];
    $.each(MapVis.data, function (index, value) {
        var year = value['ColSel_Vuosi'].substr(0, 4);
        if ($.inArray(year, existingYears) < 0) {
            // Year 2010 did not exist and I don't want to talk about it
            if (!(year === "2010x" && window.PAGE.VIS === "projects")) {
                existingYears.push(year);
            }
        }
    });

 //   existingYears = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017","2018"]
 //   existingYears = ["2018"]
    return existingYears;
}
var datas
var HankeVisMap = function (data, callback) {
    'use strict';
/*
    $.ajax({
            url: "data/kuntarajat2017.geojson",
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        })
        .done(function (data) {
            MapVis.kuntarajat = data[0];
            MapVis.maakuntarajat = data[1];
        //    MapVis.maakuntarajat = Highcharts.geojson(data[1], 'mapline');
            MapVis.avirajat = data[2];
       //     MapVis.kehitKirjastotrajat = data[3];
        })
        .fail(function () {
            console.log("Ajax failed to fetch data");
            alert(
                "Sivusto ei kyennyt lataamaan tarvittavia tilastoja. Tämä johtuu todennäköisesti " +
                "käyttämänne verkon palomuuriasetuksista. Ottakaa yhteyttä verkkonne järjestelmänvalvojaan."
            );
        });

    $.ajax({
            url: "data/maakuntalines2016.geojson",
            async: false,
            dataType: 'json'
        })
        .done(function (data) {
            MapVis.maakuntaLines = data[0];
            MapVis.aviLines = data[1];
            MapVis.kehitKirjastotLines = data[2];
        })
        .fail(function () {
            console.log("Ajax failed to fetch data");
        });*/



    datas = data;

/*
    $.ajax({
        url: "data/hankekimpat.json",
        async: false,
        dataType: 'json'
    })
        .done(function (data) {
            MapVis.kimppaData = data
        })
        .fail(function () {
            console.log("Ajax failed to fetch data");
        });



    console.log(MapVis.data)
    for (var w = 0; w < MapVis.data.length; w++) {
        if(MapVis.kimppaData[MapVis.data[w].id])
        MapVis.data[w]["Osatoteuttajat"] = MapVis.kimppaData[MapVis.data[w].id].osatoteuttajat
    }
*/

  //  makeThemeButtons();
/*
    $('input[type="radio"][name="map-unit"][value="' + window.PAGE.MAPVIEW.UNIT + '"]').prop('checked', true);
    $('input[name="map-unit"]').on('change', function (e) {
        var that = $(this);
        MapVis.unit = that.attr('value');
        doRouting({
            MAPVIEW: {
                UNIT: MapVis.unit
            }
        });

        MapVis.start();
    });
*/
    $('input[type="radio"][name="map-suhde"][value="' + window.PAGE.MAPVIEW.SUHDE + '"]').prop('checked', true);
    $('input[name="map-suhde"]').on('change', function (e) {
        var that = $(this);
        MapVis.suhde = that.attr('value');
        doRouting({
            MAPVIEW: {
                SUHDE: MapVis.suhde
            }
        });

        MapVis.start();
    });

    $('input[type="radio"][name="map-base"][value="' + window.PAGE.MAPVIEW.MAP + '"]').prop('checked', true);
    $('input[name="map-base"]').on('change', function (e) {
        var that = $(this);
        $("#map-info").hide();
        $(".arrow_box_abs").show();
        MapVis.base = that.attr('value');
        doRouting({
            MAPVIEW: {
                MAP: MapVis.base,
                SELECTED: "empty"
            }
        });

        MapVis.start();
    });

    mapBaseSelect.on("change", function () {
        var that = mapBaseSelect.find("option:selected").val();
     //   var that = $(this);
        $("#map-info").hide();
        $(".arrow_box_abs").show();
     //   MapVis.base = that.attr('value');
        MapVis.base = that;
        doRouting({
            MAPVIEW: {
                MAP: MapVis.base,
                SELECTED: "empty"
            }
        });

        MapVis.start();
    });

    $('#mapBaseSelect').find('option[value="' + window.PAGE.MAPVIEW.MAP + '"]').attr('selected', true);

    function allowedToDisallowedYears(allowedYears, existingYears,existing) {
        existingYears = existingYears || existing;
        var disallowedYears = [];
        for (var i = 0; i < existingYears.length; i++) {
            var year = existingYears[i];
            if ($.inArray(year, allowedYears) === -1) {
                //console.log('a2d: year found, disallow', year, i);
                disallowedYears.push(i);
            } else {
                //console.log('a2d: year not found, allow', year, i);
            }
        }
        return disallowedYears;
    }

    function disallowedToAllowedYears(disallowedYears, existingYears,existing) {
        existingYears = existingYears || existing;
        var allowedYears = [];
        for (var i = 0; i < existingYears.length; i++) {
            var year = existingYears[i];
            if ($.inArray(i, disallowedYears) === -1) {
                //console.log('d2a: year found, allow', year, i);
                allowedYears.push(year);
            } else {
                //console.log('d2a: year not found, disallow', year, i);
            }
        }
        return allowedYears;
    }

    MapVis.existingYears = findExistingYears();
  //  console.log(MapVis.existingYears)
    MapVis.existingYears.sort();
 //   MapVis.existingKimpat = ["Yhden toteuttajan hanke", "Yhteistyöhanke"]

    // MapVis.allowedYears = disallowedToAllowedYears([], MapVis.existingYears);
  //  MapVis.allowedYears = disallowedToAllowedYears(window.PAGE.FILTER.VUOSI, MapVis.existingYears,MapVis.existingYears);
  //  MapVis.allowedKimppa = disallowedToAllowedYears(window.PAGE.FILTER.KIMPPA, MapVis.existingKimpat,MapVis.existingKimpat);

    var filterDiv =$('#example-optgroupxxx')
    filterDiv
        .multiselect({
            position: {
                my: 'left top',
                at: 'left bottom'
            }
        })
        .bind("multiselectclick multiselectcheckall multiselectuncheckall multiselectoptgrouptoggle multiselectfilterfilter", function () {
            MapVis.allowedYears = $.map(filterDiv.multiselect("getChecked"), function (ui) {
                if(ui.value.indexOf("Vuosi") > -1)
                return ui.value.split('//')[1];
            });

            avustusmuotoList = $.map(filterDiv.multiselect("getChecked"), function (ui) {
                if(ui.value.indexOf("Avustusmuoto") > -1)
                    return ui.value.split('//')[1];
            });

            var disallowedYears = allowedToDisallowedYears(MapVis.allowedYears, MapVis.existingYears, MapVis.existingYears);

            doRouting({
                FILTER: {
                    VUOSI: disallowedYears
     //               KIMPPA:disallowedKimpat
                }
            });
            MapVis.start();

        });

    MapVis.start();

    if (callback) {
        callback();
    }

};

function getSelectedThemes() {
    'use strict';

    var output = [];


    $.each(uniqueAvustusmuoto, function (index, theme) {
        var textElem = uniqueAvustusmuoto[index].match(/_(.*)/)
            output.push(_(textElem[1]));

    });
    console.log(output)
    MapVis.themes = output

    return output
}
var findkunta = function (kunta) {
    if (kunta == "Tarvasjoki") {
        return "Lieto"
    } else if (kunta == "Jalasjärvi") {
        return"Kurikka"
    } else if (kunta == "Luvia") {
        return"Eurajoki"
    } else if (kunta == "Juankoski") {
        return"Kuopio"
    } else {
        return kunta
    }
    // Lisää vielä Luvia -> Eurajoki

}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}


function getThemeSeries() {
    'use strict';
    MapVis.kunnat = {};
    MapVis.maakunnat = {};
 //   MapVis.partners = [];
    var doubleMunis = {}
    var area;

 //  subtitle = []
    console.log(datas)
//    if(MapVis.data)
    MapVis.data = filterData(datas);

    /*
    for (var i = 0; i < MapVis.data.length; i++) {
        if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue
       var hanke1 = MapVis.data[i],
            partners1 = hanke1['Osatoteuttajat']
        if(partners1)
            for (var w = 0; w < partners1.length; w++) {
                if (!contains(MapVis.partners,partners1[w]))
                    MapVis.partners.push(partners1[w])
            }
    }
      */
var vaaKunnat = []

    for (var i = 0; i < MapVis.data.length; i++) {

if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
    continue

        var hanke = MapVis.data[i],
       //     kunta = hanke['Kunta'],
            kunta = findkunta(hanke['Kunta']),
            maakunta = hanke['ColSel_Maakunta'],
    //        kehitKirjasto = getKehitKirj(hanke['ColSel_Maakunta']),
            avi = hanke['ColSel_Aluehallintovirasto'],
            teema = hanke['ColSel_Teema'],
            avustusmuoto = _(hanke['Avustusmuoto'].match(/_(.*)/)[1]),
            vuosi = hanke['ColSel_Vuosi'],//.substr(0, 4),
       //     partners = hanke['Osatoteuttajat'],
        //    kimppa = hanke['Kimppa'],
        //   vuosi = hanke['ColSel_Vuosi'].substr(0, 5),
            amount = (MapVis.unit === 'unit' ? parseInt(hanke['lkm']) : parseInt(hanke['amount']));

        /*
        if ($.inArray(vuosi, MapVis.allowedYears) < 0) {
            continue;
        }
/*
        if ($.inArray(kimppa, MapVis.allowedKimppa) < 0) {
            continue;
        }
*/


        if(kunta == "Vanda") {
            kunta = "Vantaa"
        }


        if(window.PAGE.MAPVIEW.UNIT=="suhde") {
            if(MapVis.asukasluku[kunta]) {
                    amount = amount / MapVis.asukasluku[kunta].Asukasluku
            } else {
                amount = 0
                vaaKunnat.push(kunta)
            }

        }



        if (MapVis.base === "kunta") {
            area = kunta;
        } else if (MapVis.base === "maakunta") {
            area = maakunta;
        } else if (MapVis.base === "avi") {
            area = avi;
        } else {
            area = kehitKirjasto
        }

        if (area in MapVis.kunnat) {
            if (avustusmuoto in MapVis.kunnat[area]) {
                MapVis.kunnat[area][avustusmuoto] += amount;
            } else {
                MapVis.kunnat[area][avustusmuoto] = amount;
            }
        } else {
            MapVis.kunnat[area] = {};
            MapVis.kunnat[area][avustusmuoto] = amount;
      //      MapVis.kunnat[area]["partner"] = {}

        }
/*
        if(partners)
        for (var x = 0; x < partners.length; x++) {

            if (!MapVis.kunnat[partners[x]]) {
                MapVis.kunnat[partners[x]] = {}
                MapVis.kunnat[partners[x]]["partner"] = {}
                MapVis.kunnat[partners[x]]["partner"][teema] = amount
            } else {
                if (!MapVis.kunnat[partners[x]]["partner"][teema]) {
                    MapVis.kunnat[partners[x]]["partner"][teema] = amount
                } else {
                    MapVis.kunnat[partners[x]]["partner"][teema] += amount
                }

            }
        }
/*
        $.each(MapVis.partners, function (index, partner) {
            if (!MapVis.kunnat[partner]) {
                MapVis.kunnat[partner] = {}
                MapVis.kunnat[partner]["partner"] = {}
            } else {

                if (!MapVis.kunnat[partner]["partner"][teema]) {
                    MapVis.kunnat[partner]["partner"] = {}
                    MapVis.kunnat[partner]["partner"][teema] = amount
                } else {
                    MapVis.kunnat[partner]["partner"][teema] += amount
                }


            }
            //   series["Yhteistyökumppanina"].push({

        })
*/
        if (maakunta in MapVis.maakunnat) {
            if (avustusmuoto in MapVis.maakunnat[maakunta]) {
                MapVis.maakunnat[maakunta][avustusmuoto] += amount;
            } else {
                MapVis.maakunnat[maakunta][avustusmuoto] = amount;
            }
        } else {
            MapVis.maakunnat[maakunta] = {};
            MapVis.maakunnat[maakunta][avustusmuoto] = amount;
        }

    }

    var series = {};
    series["Yhteensä"] = []
    $.each(MapVis.kunnat, function (index, kunta) {

        var maxIndex = null,
      //      maxPartnerIndex,
            totalValue = 0,
            maxValue = 0;
        //    maxPartnerValue = 0;
     //   var partnerthemes={};
        var themes = getSelectedThemes()

        $.each(themes, function (index, theme) {
        //    partnerthemes[theme] = 0
            if (kunta[theme] > maxValue) {
                maxIndex = theme;
                maxValue = kunta[theme];
            }
            if(kunta[theme])
            totalValue += kunta[theme]
            /*
            if (kunta["partner"][theme] > maxPartnerValue) {
                maxPartnerIndex = theme;
                maxPartnerValue = kunta["partner"][theme];
            }
            /*
            if(kunta["partner"][theme] && Object.keys(kunta).length == 1) {
                partnerthemes[theme] += kunta["partner"][theme]
            }*/
       //     series[theme] = [];
        });

        var maxStreak = 0;

        $.each(themes, function (index, theme) {
            if (kunta[theme] === maxValue) {
                maxStreak++;
            }
        });


        if (maxStreak > 1) {
            maxIndex = "Useita teemoja";
        }

        if (maxValue > 0) {
            if (!(maxIndex in series)) {
                series[maxIndex] = [];
            }

            series[maxIndex].push({
                id: index,
                value: maxValue
            });
        }

        series["Yhteensä"].push({
            id: index,
            value: totalValue
        });
     //   series["Yhteistyökumppanina"] = [];
/*
        if (maxPartnerValue > 0 && Object.keys(kunta).length == 1) {
            if (!(maxPartnerIndex in series)) {
                series[maxPartnerIndex] = [];
            }

            series[maxPartnerIndex].push({
                id: index,
                value: maxPartnerValue,
                color:getPattern(maxPartnerIndex)
            });
        }
/*
        $.each(getSelectedThemes(), function (indexx, theme) {



            if (!series[theme])
                series[theme] = [];
            else {
                if(kunta["partner"][theme] && Object.keys(kunta).length == 1 && !doubleMunis[index]) {
        //            doubleMunis[index] = 1
                    console.log(kunta["partner"][theme])
                    console.log(partnerthemes)
                series[theme].push({
                    id: index,
                    value: kunta["partner"][theme],
                    color:getPattern(theme)
                });
                }
            }

        });
*/
    });

    function breakLines(title) {
        if (title.length > 30) {
            var middle = Math.floor(title.length / 2);
            var before = title.lastIndexOf(' ', middle);
            var after = title.indexOf(' ', middle + 1);
            if (before < 0 || (after > -1 && middle - before >= after - middle)) {
                middle = after;
            } else {
                middle = before;
            }

            return title.substr(0, middle) + "<br/>" + title.substr(middle + 1);
        } else {
            return title;
        }
    }

    var output = [];
    for (var themeKey in series) {
        if (!series.hasOwnProperty(themeKey)) {
            continue;
        }

        if(themeKey == "Yhteensä")
        output.push({
            name: breakLines(_(themeKey)),
            color: getThemeColor(themeKey),
            data: series[themeKey],
            allowPointSelect: true,
            cursor: 'pointer',
            states: {
                select: {
                    borderColor: '#000000',
                    borderWidth: 5
                }
            }
        });
    }

    output.sort(function (a, b) {
        return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);
    });
    /*
    console.log(subtitle)
    MapVis.settings.subtitle = {
        text: function () {
            return subtitle.join("<br>");
        }()
    };
*/
console.log(output)
    return output;
}
var maakuntaListi = ["Etelä-Karjala", "Etelä-Pohjanmaa", "Etelä-Savo", "Kainuu", "Kanta-Häme", "Keski-Pohjanmaa", "Keski-Suomi", "Kymenlaakso", "Lappi", "Päijät-Häme", "Pirkanmaa", "Pohjanmaa", "Pohjois-Karjala", "Pohjois-Pohjanmaa", "Pohjois-Savo", "Satakunta", "Uusimaa", "Varsinais-Suomi"];

function getOrganizers(main,others,totalue) {

    if (!others)
        others = totalue

    console.log(others)

var data = []
    data[0] ={}
    data[0].data = [{id:main,value:2}]
 //   MapVis.kuntarajat.features = MapVis.maakuntarajat.features.concat(MapVis.kuntarajat.features)

        data[0].mapData = MapVis.kuntarajat


    data[0].joinBy = ['id','id']
console.log(MapVis.kuntarajat)
console.log(MapVis.maakuntarajat)
if(others) {

    for (var w = 0; w < others.length; w++) {
        if(maakunnat[others[w]]) {
            for (var t in thlRegions[maakunnat[others[w]]].kunnat) {
                data[0].data.push({id:thlRegions[maakunnat[others[w]]].kunnat[t],value:1})
            }

        } else {
            data[0].data.push({id:others[w],value:1})
        }

    }
}

    return data

}

var getPattern = function(theme) {
    var str = theme.replace(/\s/g, '');
    return "url(#"+str+")"
}



function getThemeColor(theme) {
    'use strict';
    switch (theme) {
        case "Etsivä nuorisotyö":
            return '#fdbf6f';
        //    return  'url(#highcharts-default-pattern-0)';
        case "Kirjastojen kehittämishankkeet":
            return '#ff7f00';
        case "Lasten ja nuorten paikallinen harrastustoiminta":
            return '#ffff99';
        case "Liikunnallinen elämäntapa":
            return '#b2df8a';
        case "Liikuntapaikkarakentaminen":
            return '#33a02c';
        case "Maahanmuuttajien kotouttaminen liikunnan avulla":
            return '#cab2d6';
        case "Nuorten tieto- ja neuvontatyö sekä digitaalinen nuorisotyö":
            return '#a6cee3';
        case "Nuorten työpajatoiminta":
            return '#1f78b4';
        case "Liikkuva koulu":
            return '#6a3d9a';/*
        case "Tilasuunnittelu":
            return '#fb9a99';
        case "Verkkopalvelut":
            return '#e31a1c';*/
        case "Useita teemoja":
       //     return "url(#highcharts-default-pattern-7)";
            return "url(#Multiple)";
       //     return "url(#custom-pattern)";
        case "Yhteistyökumppanina":
            return "url(#highcharts-default-pattern-2)";
        //    return "url(#line)";
    }

    return "#ff66ff";
}

function getThemeColorScale(theme) {
    'use strict';
    switch (theme) {
        case "Etsivä nuorisotyö":
            return [[0, '#eeeeee'], [0.1, '#fdbf6f'], [1, '#222222']];
        case "Kirjastojen kehittämishankkeet":
            return [[0, '#eeeeee'], [0.3, '#ff7f00'], [1, '#222222']];
        case "Lasten ja nuorten paikallinen harrastustoiminta":
            return [[0, '#eeeeee'], [0.01, '#ffff99'], [0.8, '#222222']];
        case "Liikunnallinen elämäntapa":
            return [[0, '#eeeeee'], [0.1, '#b2df8a'], [1, '#222222']];
        case "Liikuntapaikkarakentaminen":
            return [[0, '#eeeeee'], [0.1, '#33a02c'], [1, '#222222']];
        case "Maahanmuuttajien kotouttaminen liikunnan avulla":
            return [[0, '#eeeeee'], [0.1, '#cab2d6'], [1, '#222222']];
        case "Nuorten tieto- ja neuvontatyö sekä digitaalinen nuorisotyö":
            return [[0, '#eeeeee'], [0.01, '#a6cee3'], [0.8, '#222222']];
        case "Nuorten työpajatoiminta":
            return [[0, '#eeeeee'], [0.1, '#1f78b4'], [1, '#222222']];
        case "Liikkuva koulu":
            return [[0, '#eeeeee'], [0.1, '#6a3d9a'], [1, '#222222']];
        case "Yhteensä":
            return [[0, '#eeeeee'], [0.1, '#6a3d9a'], [1, '#222222']];
            /*
        case "Tilasuunnittelu":
            return [[0, '#eeeeee'], [0.1, '#fb9a99'], [1, '#222222']];
        case "Verkkopalvelut":
            return [[0, '#eeeeee'], [0.1, '#e31a1c'], [1, '#222222']];*/
    }

    return "#ff66ff";
}

function makeThemeButtons() {
    'use strict';

    var allThemes = [
        'Etsivä nuorisotyö',
        'Kirjastojen kehittämishankkeet',
        'Lasten ja nuorten paikallinen harrastustoiminta',
        'Liikunnallinen elämäntapa',
        'Liikuntapaikkarakentaminen',
        'Maahanmuuttajien kotouttaminen liikunnan avulla',
        'Nuorten tieto- ja neuvontatyö sekä digitaalinen nuorisotyö',
        'Nuorten työpajatoiminta',
        'Liikkuva koulu'/*,
        'Tilasuunnittelu',
        'Verkkopalvelut'*/
    ];
/*
    $.each(allThemes, function (index, theme) {

        //    MapVis.themes[theme] = false;
        $('#mapthemes').find('table')
            .append(
                "<tr>" +
                "<td>" +
                "<input type='checkbox' id='map-" + theme + "' name='" + theme + "' style='margin: 0 5px 0 5px !important;'/>" +
                "</td>" +
                "<td>" +
                "<div style='width: 15px; height: 15px; background: " + getThemeColor(theme) + ";'>&nbsp;</div>" +
                "</td>" +
                "<td>" +
                    //     "<label for='map-" + theme + "' style='color: #b3b3b3'>" +
                "<label for='map-" + theme + "' style='color: #ffffff'>" +
                _(theme) +
                "</label>" +
                "</td>" +
                "</tr>"
            );
    });
*/

    /*
    var $mapthemes = $('#mapthemes');

    $.each(allThemes, function (index, theme) {

        if (MapVis.themes[theme]) {
            //     $('"#map-'+theme+'"').prop("checked", true);
            //   $('input[type="radio"][name="map-unit"][value="' + window.PAGE.MAPVIEW.UNIT + '"]').prop('checked', true);
            $('input[type="checkbox"][name="' + theme + '"][id="map-' + theme + '"]').prop("checked", true).trigger("change");
            //   $('input[type="checkbox"][name="'+theme+'"][id="map-'+theme+'"]').trigger("click");
            //    $("#map-"+ [ theme ]).prop("checked", true);
            //   MapVis.start();
        }

    //    $.each(allThemes, function (index, theme) {
            //    if (MapVis.themes[theme]) MapVis.themes[theme] = true;
            //    MapVis.themes[theme] = false;

    //    });
        // valitse kaikki teemat
        //    $('input[type="checkbox"][name="' + theme + '"][id="map-'+theme+'"]').prop("checked", true).trigger("change");
        //   $("#map-Digitointi").prop("checked", true).triggerHandler('click');
         //    $mapthemes.triggerHandler('click');

    });
*/
/*
    $mapthemes.find('a').on('click', function (e) {
        e.preventDefault();

        var $input = $mapthemes.find('input');


        if ($(this).data('type') === "none") {

            $.each(allThemes, function (index, theme) {
                //    if (MapVis.themes[theme]) MapVis.themes[theme] = true;
                MapVis.themes[theme] = false;
            });

            $input.each(function () {
                var that = $(this);

                that.prop('checked', false);
                that.parent().parent().find('label').css({
                    color: '#b3b3b3'
                });
            });
        } else if ($(this).data('type') === "all") {
            //    console.log("heee")
            $.each(allThemes, function (index, theme) {
                //    if (MapVis.themes[theme]) MapVis.themes[theme] = true;
                //    MapVis.themes[theme] = false;
                MapVis.themes[theme] = true;
            });

            $input.each(function () {
                var that = $(this);

                that.prop('checked', true);
                that.parent().parent().find('label').css({
                    color: '#ffffff'
                });
            });
        }

        MapVis.start();
    });
*/
    /*
    $mapthemes.find('input').on('change', function (e) {
        var that = $(this),
            theme = that.attr('name');
        MapVis.themes[theme] = that.is(":checked");

        that.parent().parent().find('label').css({
            color: that.is(":checked") ? '#fff' : '#b3b3b3'
        });

        MapVis.start();
    });
*/
}

function makeInfo(id, data) {

    'use strict';

 //   $("#arrow_box_abs").css({'visibility': "hidden"});
 //   $(".arrow_box_abs").css({'opacity': 0});
    $('.arrow_box_abs').hide();
/*
    if(mapsi.get(index) == undefined) {
        $('#map-info-wrapper').hide()
        $('#emptyMap').show()
    } else {
        $('#emptyMap').hide()
        $('#map-info-wrapper').show()
        mapsi.get(index).select(true, false)
    }*/
    if(data)
        MapVis.data = data

    $('#map-info-wrapper').show()

    var data = {
        townName: _(id),
        projects: [],
        yearProjects: [],
        skipCount: 0,
    //    partnerprojects: [],
        kunta: false
    };
    var area;
console.log(MapVis.data)
    for (var i = 0; i < MapVis.data.length; i++) {
        if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue


        var project = MapVis.data[i],
         //   kunta = project['Kunta'],
            kunta = findkunta(project['Kunta']),
            maakunta = project['ColSel_Maakunta'],
     //       kehitKirjasto = getKehitKirj(project['ColSel_Maakunta']),
            avi = project['ColSel_Aluehallintovirasto'],
      //      partners = project['Osatoteuttajat'],
            kimppa = project['Kimppa'],
            vuosi = project['ColSel_Vuosi'];//.substr(0, 4);
        //    vuosi = project['ColSel_Vuosi'].substr(0, 5);


        if (MapVis.base === "kunta") {
            area = kunta;
        } else if (MapVis.base === "maakunta") {
            area = maakunta;
        } else if (MapVis.base === "avi") {
            area = avi;
        } else {
            area = kehitKirjasto
        }

        if (area === id) {
            /*
            if (!MapVis.themes[project.ColSel_Teema]) {
                //console.log("theme not allowed", project.ColSel_Teema);
                data.skipCount++;
                continue;
            }

            if ($.inArray(vuosi, MapVis.allowedYears) === -1) {
                //console.log("year not allowed", vuosi, MapVis.allowedYears);
                data.skipCount++;
                continue;
            }
            /*
            if ($.inArray(kimppa, MapVis.allowedKimppa) === -1) {
                //console.log("year not allowed", vuosi, MapVis.allowedYears);
                data.skipCount++;
                continue;
            }
*/
            var isitKunta = false;
            if (MapVis.base === "kunta") {
                isitKunta = true
            }
            var link = project.link;

            switch (window.PAGE.LANG) {
                case "fi":
                    link = "http://" + link + "?language=fi";
                    break;
                case "se":
                    link = "http://" + link + "?language=sv";
                    break;
                case "en":
                    link = "http://" + link;
                    break;
            }

            data.projects.push({
                "id": project.id,
                "hanke_name": project.hanke_name,
                "Toteuttaja": project.Toteuttaja,
                "ColSel_Teema": _(project.ColSel_Teema),
                "Avustusmuoto": _(project.Avustusmuoto.match(/_(.*)/)[1]),
                "vuosi": vuosi,
                "link": link
            });
            /*
            if("x" == "y")
            data.partnerprojects.push({
                "id": project.id,
                "hanke_name": project.hanke_name,
                "ColSel_Teema": _(project.ColSel_Teema),
                "vuosi": vuosi,
                "link": link
            });*/
        }
        /*
        if(partners)
            for (var x = 0; x < partners.length; x++) {
                if(id == partners[x])
                    data.partnerprojects.push({
                        "id": project.id,
                        "hanke_name": project.hanke_name,
                        "ColSel_Teema": _(project.ColSel_Teema),
                        "vuosi": vuosi,
                        "link": link
                    });
            }
*/
    }

    var tmpData = {};
    for (var i = 0; i < data.projects.length; i++) {
        var project = data.projects[i];

        if (project.vuosi in tmpData) {
            tmpData[project.vuosi].push(project);
        } else {
            tmpData[project.vuosi] = [project];
        }
    }
    var tmpData2 = {};
    /*
    if (data.partnerprojects)
    for (var i = 0; i < data.partnerprojects.length; i++) {
        var project2 = data.partnerprojects[i];

        if (project2.vuosi in tmpData2) {
            tmpData2[project2.vuosi].push(project2);
        } else {
            tmpData2[project2.vuosi] = [project2];
        }
    }
*/
    MapVis.allowedYears = ["2014","2015","2016","2017","2018","2019","2020","2021","2022"]
    $.each(MapVis.allowedYears, function (index, year) {
        data.yearProjects.push({
            year: year,
            projects: tmpData[year] || [],
            partnerprojects: tmpData2[year] || [],
            kunta:isitKunta
           // mainPartner: _("Päätoteuttajana")
        //    partner: _("Kumppanina")
        });
    });

    data.yearProjects.reverse();

    data.skipText = _('{0} ' + (data.skipCount > 1 ? _('piilotettua projektia') : 'piilotettu projekti'), data.skipCount);


    var source = $('#map-info-template').html(),
        template = Handlebars.compile(source),
        container;

    if (window.PAGE.TYPE === 'map') {
        container = $('#map-info')
    } else {
        container = $('#map-info2')
    }

    var html = template(data);
    container.html(html);

    var modalLink = container.find('.mapModal');

    var modalSource = $('#map-info-modal-template').html(),
        modalTemplate = Handlebars.compile(modalSource),
        modalContainer = $('#map-info-details');


    var rahoitus, haettu;



    modalLink.each(function () {
        var that = $(this),
            projectIds = that.data('project-id');

        that.click(function (e) {
            e.preventDefault();

/*
            clickProject = function (projectId) {

            if (window.PAGE.VIS == "projects") {
                rahoitus = _("Myönnetty avustus")
            } else {
                rahoitus = _("Haettu avustus")
                haettu = _("Oma rahoitus")
            }
            var modalData = {
                townName: _(id),
                project: null,
                translations: {
                    "toteuttaja": _("Toteuttaja"),
                    "kunta": _("Kunta"),
                    "teema": _("Avustusmuoto"),
                    "kohderyhma": _("Kohderyhmät"),
                    "kieli": _("Kieli"),
                    "vaikutusalue": _("Vaikutusalue"),
                    "aluehallintovirasto": _("Aluehallintovirasto"),
                    "avustus": rahoitus,
                    "haettu": haettu,
                    "link": _("Tutustu hankkeeseen tarkemmin")
                }
            };

            for (var i = 0; i < MapVis.data.length; i++) {
                var project = MapVis.data[i],
                    currentId = project['id'];

                if (project.Kunta == "Tarvasjoki") {
                    project.Kunta = "Lieto"
                } else if (project.Kunta == "Jalasjärvi") {
                    project.Kunta = "Kurikka"
                } else if (project.Kunta == "Hämeenkoski") {
                    project.Kunta = "Hollola"
                } else if (project.Kunta == "Luvia") {
                    project.Kunta = "Eurajoki"
                } else if (project.Kunta == "Juankoski") {
                    project.Kunta = "Kuopio"
                }

                // Lisää vielä Luvia -> Eurajoki

                if (projectId == currentId) {

                    if (project.ColSel_Hanketyyppi === "ELY" || project.ColSel_Hanketyyppi === "Hyvä") {
                        project.ColSel_Hanketyyppi = "ELY / AVI";
                    }
                    console.log(project)
                    console.log(project.Kuvailu)
                    modalData.project = {
                        hanke_name: project.hanke_name,
                        ColSel_Vuosi: project.ColSel_Vuosi.substr(0, 4),
                        //   ColSel_Vuosi: project.ColSel_Vuosi.substr(0, 5),
                        amount: Highcharts.numberFormat(project.amount, 0),
                        oma: Highcharts.numberFormat(project.oma, 0),
                        ColSel_Teema: _(project.ColSel_Teema),
                        Kunta: _(project.Kunta),
                        KuntaID: project.Kunta,
                        ColSel_Maakunta: _(project.ColSel_Maakunta),
                        Toteuttaja: _(project.Toteuttaja),
                        ColSel_Vaikutusalue: _(project.ColSel_Vaikutusalue),
                        ColSel_Aluehallintovirasto: _(project.ColSel_Aluehallintovirasto),
                        ColSel_Hanketyyppi: _(project.ColSel_Hanketyyppi),
                        Kuvailu: project.KuvausTeksti,
                        link: ("" + project.link),
                        Osatoteuttajat: project.Osatoteuttajat
                    };


                    switch (window.PAGE.LANG) {
                        case "fi":
                            modalData.project.link = "http://" + modalData.project.link + "?language=fi";
                            break;
                        case "se":
                            modalData.project.link = "http://" + modalData.project.link + "?language=sv";
                            break;
                        case "en":
                            modalData.project.link = "http://" + modalData.project.link;
                            break;
                    }

                    var kohderyhmat = project.Kohderyhma.split(',');
                    kohderyhmat = $.map(kohderyhmat, function (val) {
                        return _(val);
                    });

                    modalData.project.Kohderyhma = kohderyhmat.join(', ');

                    switch (project.ColSel_Kieli) {
                        case "fi":
                            modalData.project.ColSel_Kieli = _("Suomi");
                            break;
                        case "sv":
                            modalData.project.ColSel_Kieli = _("Ruotsi");
                            break;
                        case "en":
                            modalData.project.ColSel_Kieli = _("Englanti");
                            break;
                    }
                    console.log(modalData.project.Kuvailu)
                    modalData.description = _("Vuoden {0} {1} -hanke", modalData.project.ColSel_Vuosi, modalData.project.ColSel_Hanketyyppi);
                    modalData.kuvailu = modalData.project.Kuvailu;

                    break;
                }
            }

            modalContainer.html(modalTemplate(modalData));

            $('#map-info-modal').foundation('reveal', 'open');

            //    console.log('MODAL %d %o', projectId, modalData);

            if (window.PAGE.VIS !== "new-projects") {
                //         document.getElementById("mapModal").deleteRow(8);
            }


            //   miniMap.settings.chart.width =  $('#minimap-wrapper').width()
            miniMap.settings.chart.width = $('#map-info-modal').width() * 0.4
            miniMap.settings.series = getOrganizers(modalData.project.KuntaID, modalData.project.Osatoteuttajat);

            if (modalData.project.Osatoteuttajat) {
                miniMap.settings.colorAxis.dataClasses = [
                    {
                        from: 0,
                        to: 1,
                        color: '#a6bddb',
                        name: _("Toteutusalue")
                    }];
            } else {
                miniMap.settings.colorAxis.dataClasses = [{
                    from: 1,
                    to: 2,
                    color: '#0571B0',
                    name: _("Toteutusalue")
                }];
            }


            miniMap.settings.series.push({
                type: 'mapline',
                name: 'maakuntarajat',
                //    data: Highcharts.geojson(MapVis.maakuntarajat, 'mapline'),
                //     data: MapVis.maakuntarajat,
                data: Highcharts.geojson(MapVis.maakuntaLines, 'mapline'),
                //    mapData: MapVis.maakuntarajat,
                //    mapData: Highcharts.geojson(MapVis.maakuntarajat, 'mapline'),
                color: "black",
                //     data: regionBorders,
                enableMouseTracking: false,
                lineWidth: 2,
                includeInCSVExport: false
            });

            $('#toteuttajaKartta').highcharts('Map', miniMap.settings).highcharts();

            //  $('#toteuttajaKartta').highcharts('Map', miniMap.settings).highcharts();

            var mapsi = $('#toteuttajaKartta').highcharts()
            mapsi.get(modalData.project.KuntaID).zoomTo(); //zoom to the country using "id" from data serie
            mapsi.mapZoom(7);
            }
*/

            clickProject(projectIds,MapVis.data)
        });

    });

}

MapVis.start = function () {
    'use strict';

    MapVis.settings.tooltip = {
        formatter: function (arg) {

            var output = "<h1><b>" + _(this.point.id) + "</b></h1></br> "+"</br><br/>"
   //             "</br>"+"<br><b>Omat projektit:</b><br/>";
   //         var output2 = "<br/><b>Kumppanina projekteissa:</b><br/>";

            var sortedArray = [];
            var sortedArray2 = [];

            for (var themeIndex in MapVis.kunnat[this.point.id]) {
                if (!MapVis.kunnat[this.point.id].hasOwnProperty(themeIndex)) continue;

                var themeValue = MapVis.kunnat[this.point.id][themeIndex];

                if (!MapVis.themes[themeIndex]) {
                    console.log("continue")
          //          continue;
                }

                sortedArray.push({
                    name: themeIndex,
                    value: themeValue
                });

            }

            /*
            if(MapVis.kunnat[this.point.id]["partner"])
            for (var themeIndex2 in MapVis.kunnat[this.point.id]["partner"]) {
                var partnerProjValue = MapVis.kunnat[this.point.id]["partner"][themeIndex2];
                if(partnerProjValue)
                    sortedArray2.push({
                        name: themeIndex2,
                        value: partnerProjValue
                    });
            }
            */

            sortedArray.sort(function (a, b) {
                return a.value < b.value ? 1 : (a.value > b.value ? -1 : 0);
            });

var totalValue = 0
            for (var i = 0; i < sortedArray.length; i++) {
                var theme = sortedArray[i];
                var numVal
                if(theme.value > 0)
totalValue +=theme.value

                if(window.PAGE.MAPVIEW.SUHDE=="asluku") {
                    numVal = 1
                } else {
                    numVal = 0
                }

                if(theme.name !== "partner")
                output += _(theme.name) + ": " +
                    Highcharts.numberFormat(theme.value, numVal) + " " +
                    (MapVis.unit === 'unit' ? (theme.value === 1 ? _('avustus') : _('avustusta')) : ' €') + "<br/>";
            }

            output += "<br><b>"+_("Yhteensä")+": "+"</b>"+Highcharts.numberFormat(totalValue, numVal)+ " "+(MapVis.unit === 'unit' ? (sortedArray.length === 1 ? _('avustus') : _('avustusta')) : ' €')
/*
            if(partnerProjValue)
            for (var v = 0; v < sortedArray2.length; v++) {
                var theme2 = sortedArray2[v];
                output2 += _(theme2.name) + ": " +
                Highcharts.numberFormat(theme2.value, 0) + " " +
                (MapVis.unit === 'unit' ? (theme2.value === 1 ? _('projekti') : _('projektia')) : ' €') + "<br/>";
            }
          //  if(partnerProjValue &&)
            if(partnerProjValue)
            return output+output2;
                else*/
                return output;
        }
    };

    MapVis.settings.exporting.chartOptions.legend = {
        enabled: true
    };

    var mbase;
    var mlines;

    if (MapVis.base === "kunta") {
        mbase = MapVis.kuntarajat;
        mlines = MapVis.maakuntaLines;
    } else if (MapVis.base === "maakunta") {
        mbase = MapVis.maakuntarajat;
        mlines = MapVis.maakuntaLines;
    } else if(MapVis.base === "avi") {
        mbase = MapVis.avirajat;
        mlines = MapVis.aviLines;
    } else {
        mbase = MapVis.kehitKirjastotrajat;
        mlines = MapVis.kehitKirjastotLines;
    }



    MapVis.settings.legend = {
        enabled: true,
        align: 'left',
        valueDecimals: 0,
        verticalAlign: 'middle',
    //    y: $(window).height()*0.14,
    //    y: 130,
        floating: true,
        layout: 'vertical'
    };

    MapVis.settings.plotOptions = {
        map: {
            joinBy: ['id', 'id'],
            //    mapData: MapVis.kuntarajat,
            mapData: mbase,
            allAreas: false
        },
        series: {
            point: {
                events: {
                    select: function () {
                        $("#map-info").show();
                        MapVis.selected = this.id;

                        doRouting({
                            MAPVIEW: {
                                SELECTED: MapVis.selected
                            }
                        });
                        makeInfo(MapVis.selected);
                    }
                }
            }
        }
    };

/*
    MapVis.settings.subtitle = {
        text: (function (vuodet) {
            var output,output2;

            if (vuodet.length === 1) {
                output = (_("Vuosi") + " " + vuodet[0]);
                //   } else if (vuodet.length > 1 && vuodet.length < MapVis.existingYears.length - 1) {
            } else if (vuodet.length > 1 && vuodet.length < MapVis.existingYears.length) {
                //  } else if (vuodet.length > 1) {
                var last = vuodet.pop();
                output = (_("Vuosi") + ": " + vuodet.join(", "));
                output += _(" ja ") + last;
            }

                return output

        })(MapVis.allowedYears.slice())
    };
*/
/*
    MapVis.settings.subtitle = {
        text: function () {
            return subtitle.join("<br>");
        }()
    };
*/


/*
    if (getSelectedThemes().length === 0) {
        MapVis.settings.title.text = _('Ei teemoja valittuna');
    } else if (getSelectedThemes().length === 9) {

        console.log(getSelectedThemes())
        MapVis.settings.title.text = _(getSelectedThemes()[0]) + ' / ';

        switch (window.PAGE.VIS) {
            case "projects":
                if (MapVis.unit === 'unit') {
                    MapVis.settings.title.text += _('projektien määrä');
                } else {
                    MapVis.settings.title.text += _('projektien rahoitus');
                }
                break;
            case "not-funded":
            case "new-projects":
                if (MapVis.unit === 'unit') {
                    MapVis.settings.title.text += _('projektien määrä');
                } else {
                    MapVis.settings.title.text += _('projektien haettu rahoitus');
                }
                break;
        }


        MapVis.settings.legend.enabled = true;
        MapVis.settings.legend.valueSuffix = (MapVis.unit === 'unit' ? _(' kpl') : ' €');



        if (MapVis.unit === 'unit') {
            MapVis.settings.colorAxis.min = 1;
        } else {
            MapVis.settings.colorAxis.min = 1000;
        }
    } else {

        var title = _("Eniten");

        switch (window.PAGE.VIS) {
            case "projects":
                if (MapVis.unit === 'unit') {
                    title += ' ' + _('projekteja avustusmuodoissa');
                } else {
                    title += ' ' + _('rahoitusta saaneet avustusmuodot');
                }
                break;
            case "not-funded":
            case "new-projects":
                if (MapVis.unit === 'unit') {
                    title += ' ' + _('projekteja teemoissa');
                } else {
                    title += ' ' + _('haettua rahoitusta teemoihin');
                }
                break;
        }

        switch (MapVis.base) {
            case "kunta":
                title += ' ' + _("kunnittain");
                break;
            case "maakunta":
                title += ' ' + _("maakunnittain");
                break;
            case "avi":
                title += ' ' + _("AVI-alueittain");
                break;
            case "kehitKirjastot":
                title += ' ' +"- "+ _("Alueellinen kehittämistehtävä");
                break;
        }

        MapVis.settings.title.text = _(title);

        MapVis.settings.exporting.chartOptions.legend.title = {
            text: _('Avustusmuoto')
        };
   //     MapVis.settings.colorAxis = null;
    }
    */
    var titleText =_("Selite");
if(window.PAGE.MAPVIEW.UNIT == "money") {
    titleText =_("Euroa");
} else if(window.PAGE.MAPVIEW.UNIT == "unit") {
    titleText =_("Kpl");
} else {
    titleText =_("Euroa / asukas");
}

    MapVis.settings.legend.title = {
        text: titleText
    };

    MapVis.settings.title.text = _("Avustusten jakautuminen alueittain")
    MapVis.settings.series = getThemeSeries();

var itemsArray = MapVis.settings.series[0].data

if (MapVis.sorter == "amount") {
    itemsArray.sort(function (a, b) {
        return b.value - a.value;
    });
} else {
    itemsArray.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    });
}


    var table = $('#mapTableTable');
    var row, cell1,cell2;
    for(var i=0; i<itemsArray.length; i++){
        row = $( '<tr />' );
        table.append( row );
    //    for(var j=0; j<itemsArray[i].length; j++){
            cell1 = $('<td>'+itemsArray[i].id+'</td>')
            cell2 = $('<td>'+itemsArray[i].value+'</td>')
            row.append( cell1 );
            row.append( cell2 );
    //    }
    }

    var yearDataClasses = (function() {
        var arr = []; // arr = [{from: xxx, to: xxx}, ...]
    //    var varPopValue = variable + " / "+"Asukasluku";

        var dataArray = MapVis.settings.series[0].data
    //    var dataArray2 = Kirjastotilasto.getDataArrayOfVariable(varPopValue, Kirjastotilasto.year, true);
        var dataSize = dataArray.length;
        var asluku= MapVis.suhde
        var steps = [0.1, 0.25, 0.5, 0.75, 0.9, 1.0];
        var currentStep = 0;
        var stepCount = steps.length;

        dataArray.sort(function(a, b) {
            return a.value - b.value;
        });

        for (var i = 0; i < dataSize; ++i) {
            if (steps[currentStep]  > (i + 1) / dataSize) continue;
            if (!steps[currentStep]) break;

            var obj = {};
            if(window.PAGE.MAPVIEW.SUHDE=="asluku") {
                if (currentStep < stepCount - 1) {
                    obj.to = dataArray[i].value;
                }
                if (currentStep > 0) {
                    obj.from = arr[currentStep - 1].to;
                }
            } else {
                if (currentStep < stepCount - 1) {
                 //   obj.to = dataArray[i].value;
                    obj.to = Math.round(dataArray[i].value);
             //       obj.to = Highcharts.numberFormat(dataArray[i].value, 0)
                }
                if (currentStep > 0) {
                    obj.from = arr[currentStep - 1].to;
                }
            }
            if (obj.to !== obj.from && obj.to !==""&& obj.from !=="") {
                arr.push(obj);
                currentStep++;
            }


        }

        return arr;
    })();

    MapVis.settings.colorAxis = {
    //    min: 1000,
    //    max: 50000,
        dataClasses: yearDataClasses
 //       stops: [0,10000,50000]

    };

    MapVis.settings.series.push({
        type: 'mapline',
        name: 'maakuntarajat',
        data: Highcharts.geojson(mlines, 'mapline'),
        color: 'black',
        enableMouseTracking: false,
        showInLegend: false,
        lineWidth: 2
    });



    var mapsi = $("#map").highcharts()
    Highcharts.addEvent(Highcharts.Chart, 'render', function () {


        if (this.renderer && this.renderer.box) {


       //     $("#map").setAttribute('aria-hidden', true);
            this.renderer.box.setAttribute('aria-hidden', true);
        }
    });

    $('#map').highcharts('Map', MapVis.settings).highcharts();
var kuntaList = [];

    for (var i = 0; i < MapVis.kuntarajat.features.length; i++) {
        var val = MapVis.kuntarajat.features[i].properties.id;
        if (kuntaList.indexOf(val) < 1)
            kuntaList.push({id:val, text: _(val)})
    }

    var options = {
        data: kuntaList,
        getValue: "text",
        placeholder: _("Hae kuntaa"),
        width:200,
        list: {
            onSelectItemEvent: function(val) {
                var index = $("#kuntaSearch").getSelectedItemData().id;
                var mapsi = $('#map').highcharts()

                if(mapsi.get(index) == undefined) {
                    $('#map-info-wrapper').hide()
                    $('#emptyMap').show()
                } else {
                    $('#emptyMap').hide()
                    $('#map-info-wrapper').show()
                    mapsi.get(index).select(true, false)
                }

            },
            onShowListEvent: function(a,b,c) {

            },
            match: {
                enabled: true
            },
            sort: {
                enabled: true
            },
            maxNumberOfElements: 5,

            showAnimation: {
                type: "slide",
                time: 300
            },
            hideAnimation: {
                type: "slide",
                time: 300
            }
        },
        theme: "round"
    };

    closeMapTable = function () {
        $('#map-info-wrapper').hide()
        $(".arrow_box_abs").show();
    }


    if(wwidth < threashold) {
        $("#kuntaEtsin").hide()
        $("#map").css({"width":wwidth})
    } else {
        $("#kuntaSearch").easyAutocomplete(options);
        $("#kuntaEtsin").css({'width': 150})
        $("#kuntaSearch").css({'width': 150})
    }

  //  if (MapVis.selected || MapVis.selected !== null) {
    if (MapVis.selected && window.PAGE.MAPVIEW.SELECTED !== "empty") {

        makeInfo(MapVis.selected);
    } else if (window.PAGE.MAPVIEW.SELECTED == "empty" || window.PAGE.MAPVIEW.SELECTED == null) {
        $('.arrow_box_abs').show();
    }
var mapKuvaus = "Kartta, joka kuvaa avustusten jakautumista maantieteellisesti Suomessa"
//    $("#map svg").attr("aria-label",mapKuvaus);
//    $("#map svg desc").html(" ")


};


