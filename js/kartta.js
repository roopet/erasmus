// Copyright: Vividin Oy. All rights reserved.
var MapVis = {
    infoVisible: false,
    //   themes: {},
    //   themes: { "Lukemisen edistäminen": true, "Mediakasvatus": true, "Palvelujen kehittäminen": true },
    themes: window.PAGE.MAPVIEW.TEEMA,
    //  unit: 'money',
    unit: window.PAGE.MAPVIEW.UNIT,
    //  base: 'kunta',
    base: window.PAGE.MAPVIEW.MAP,
    selected: window.PAGE.MAPVIEW.SELECTED,
    //  allowedYears: null,
    allowedYears: null,
    existingYears: null,
    settings: {
        title: {},

        chart: {
            backgroundColor: "#EBE8E8"
      //      marginLeft: 150
        },

        exporting: {
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
                    fill: '#ECE9E9'
                }
            }
        },
        credits: {
            text: _('Rahoittaja') + ': OKM ja AVIt, ' + _('Lähde') + ': hankkeet.kirjastot.fi',
            href: null,
            enabled: false
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

var miniMap = {
    settings: {
        title: "Toteuttajakunnat",
        chart: {
            backgroundColor: "#EBE8E8"
        },
        exporting: {
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
                    fill: '#ECE9E9'
                }
            }
        },
        colorAxis: {
            dataClasses: [{
                from: 1,
                to: 2,
                color: '#0571B0',
                name: _("Päätoteuttaja")
            }/*, {
                from: 0,
                to: 1,
                color: '#a6bddb',
                name: _("Yhteistyökunnat")
            }*/]
        },
        credits: {
            text: _('Rahoittaja') + ': OKM ja AVIt, ' + _('Lähde') + ': hankkeet.kirjastot.fi',
            href: null,
            enabled: false
        },
        tooltip: {
            formatter: function (arg) {
                var output = "<b>" + _(this.point.id) + "</b><br/>";
                return output
            }
        },
        /*
        plotOptions:  {
            map: {
                joinBy: ['id', 'id'],
                mapData: MapVis.kuntarajat
                //mapData: mbase,
            //    allAreas: false
            }
        },*/
        series: [],
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        }
    }
};

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

    existingYears = ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017","2018"]
    return existingYears;
}

var HankeVisMap = function (data, callback) {
    'use strict';

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
            MapVis.kehitKirjastotrajat = data[3];
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
        });
    MapVis.data = data;
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

    makeThemeButtons();

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
    MapVis.existingKimpat = ["Yhden toteuttajan hanke", "Yhteistyöhanke"]

    // MapVis.allowedYears = disallowedToAllowedYears([], MapVis.existingYears);
    MapVis.allowedYears = disallowedToAllowedYears(window.PAGE.FILTER.VUOSI, MapVis.existingYears,MapVis.existingYears);
    MapVis.allowedKimppa = disallowedToAllowedYears(window.PAGE.FILTER.KIMPPA, MapVis.existingKimpat,MapVis.existingKimpat);

    var filterDiv =$('#example-optgroup')
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
         //   MapVis.allowedKimppa = $.map(filterDiv.multiselect("getUnChecked"), function (ui) {
            MapVis.allowedKimppa = $.map(filterDiv.multiselect("getChecked"), function (ui) {
                if(ui.value.indexOf("Kimppa") > -1)
                    return ui.value.split('//')[1];
            });

            var disallowedYears = allowedToDisallowedYears(MapVis.allowedYears, MapVis.existingYears, MapVis.existingYears);
            var disallowedKimpat = allowedToDisallowedYears(MapVis.allowedKimppa, MapVis.existingKimpat, MapVis.existingKimpat);


            doRouting({
                FILTER: {
                    VUOSI: disallowedYears,
                    KIMPPA:disallowedKimpat
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

    var allThemes = [
        'Digitointi',
        'Henkilöstön osaaminen',
        'Kokoelmat',
        'Laitehankinnat',
        'Lukemisen edistäminen',
        'Mediakasvatus',
        'Oppimisympäristö ja yhteisöllisyys',
        'Palvelujen kehittäminen',
        'Strateginen kehittäminen',
        'Tilasuunnittelu',
        'Verkkopalvelut'
    ];

    $.each(allThemes, function (index, theme) {


        if (MapVis.themes[theme]) {
            //  if (window.PAGE.MAPVIEW.TEEMA[theme]) {
            output.push(theme);
        }
    });

    doRouting({
        MAPVIEW: {
            TEEMA: MapVis.themes
        }
    });


    return output;
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
    MapVis.partners = [];
    var doubleMunis = {}
    var area;


    for (var i = 0; i < MapVis.data.length; i++) {
        if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue
        var hanke1 = MapVis.data[i],partners1 = hanke1['Osatoteuttajat']
        if(partners1)
            for (var w = 0; w < partners1.length; w++) {
                if (!contains(MapVis.partners,partners1[w]))
                    MapVis.partners.push(partners1[w])
            }
    }

    for (var i = 0; i < MapVis.data.length; i++) {

if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
    continue

        var hanke = MapVis.data[i],
       //     kunta = hanke['Kunta'],
            kunta = findkunta(hanke['Kunta']),
            maakunta = hanke['ColSel_Maakunta'],
            kehitKirjasto = getKehitKirj(hanke['ColSel_Maakunta']),
            avi = hanke['ColSel_Aluehallintovirasto'],
            teema = hanke['ColSel_Teema'],
            vuosi = hanke['ColSel_Vuosi'].substr(0, 4),
            partners = hanke['Osatoteuttajat'],
            kimppa = hanke['Kimppa'],
        //   vuosi = hanke['ColSel_Vuosi'].substr(0, 5),
            amount = (MapVis.unit === 'unit' ? parseInt(hanke['lkm']) : parseInt(hanke['amount']));

        if ($.inArray(vuosi, MapVis.allowedYears) < 0) {
            continue;
        }

        if ($.inArray(kimppa, MapVis.allowedKimppa) < 0) {
            continue;
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
            if (teema in MapVis.kunnat[area]) {
                MapVis.kunnat[area][teema] += amount;
            } else {
                MapVis.kunnat[area][teema] = amount;
            }
        } else {
            MapVis.kunnat[area] = {};
            MapVis.kunnat[area][teema] = amount;
            MapVis.kunnat[area]["partner"] = {}

        }

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
            if (teema in MapVis.maakunnat[maakunta]) {
                MapVis.maakunnat[maakunta][teema] += amount;
            } else {
                MapVis.maakunnat[maakunta][teema] = amount;
            }
        } else {
            MapVis.maakunnat[maakunta] = {};
            MapVis.maakunnat[maakunta][teema] = amount;
        }

    }

    var series = {};

    $.each(MapVis.kunnat, function (index, kunta) {

        var maxIndex = null,maxPartnerIndex,
            maxValue = 0,
            maxPartnerValue = 0;
     //   var partnerthemes={};
        var themes = getSelectedThemes()


        $.each(getSelectedThemes(), function (index, theme) {
        //    partnerthemes[theme] = 0
            if (kunta[theme] > maxValue) {
                maxIndex = theme;
                maxValue = kunta[theme];
            }
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

        $.each(getSelectedThemes(), function (index, theme) {
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
     //   series["Yhteistyökumppanina"] = [];

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

    return output;
}

function getOrganizers(main,others) {
var data = []
    data[0] ={}
    data[0].data = [{id:main,value:2}]
    data[0].mapData = MapVis.kuntarajat
    data[0].joinBy = ['id','id']

if(others) {

    for (var w = 0; w < others.length; w++) {
        data[0].data.push({id:others[w],value:1})
    }
}

    return data

}

var getPattern = function(theme) {
    var str = theme.replace(/\s/g, '');
    return "url(#"+str+")"
}

var svgPatterns = [
    {
        //Palvelujen kehittäminen
        'id': 'Palvelujenkehittäminen',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#1f78b4',
            strokeWidth: 3
        }
    },
    {
        //Lukemisen edistäminen
        'id': 'Lukemisenedistäminen',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#33a02c',
            strokeWidth: 3
        }//,color:'#1f78b4'
    },
    {
        'id': 'Verkkopalvelut',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#e31a1c',
            strokeWidth: 3
        }
    },{
        'id': 'Digitointi',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#fdbf6f',
            strokeWidth: 3
        }
    },{
        'id': 'Tilasuunnittelu',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: 'fb9a99',
            strokeWidth: 3
        }
    },{
        'id': 'Strateginenkehittäminen',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#6a3d9a',
            strokeWidth: 3
        }
    },{
        'id': 'Oppimisympäristöjayhteisöllisyys',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#a6cee3',
            strokeWidth: 3
        }
    },{
        'id': 'Mediakasvatus',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#cab2d6',
            strokeWidth: 3
        }
    },{
        'id': 'Laitehankinnat',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#b2df8a',
            strokeWidth: 3
        }
    },{
        'id': 'Kokoelmat',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#ffff99',
            strokeWidth: 3
        }
    },{
        'id': 'Henkilöstönosaaminen',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#ff7f00',
            strokeWidth: 3
        }
    },
    {
        'id': 'Multiple-b',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#e31a1c',
            strokeWidth: 5
        },
        color:'green'
    },
    {
        'id': 'Multiple',
        'path': {
            d: 'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            stroke: '#1f78b4',
            strokeWidth: 2
        },
        color: 'url(#Multiple-b)'
    }
];

Highcharts.setOptions({
    "defs" : {
        "patterns" : svgPatterns
    }
});

function getThemeColor(theme) {
    'use strict';
    switch (theme) {
        case "Digitointi":
            return '#fdbf6f';
        case "Henkilöstön osaaminen":
            return '#ff7f00';
        case "Kokoelmat":
            return '#ffff99';
        case "Laitehankinnat":
            return '#b2df8a';
        case "Lukemisen edistäminen":
            return '#33a02c';
        case "Mediakasvatus":
            return '#cab2d6';
        case "Oppimisympäristö ja yhteisöllisyys":
            return '#a6cee3';
        case "Palvelujen kehittäminen":
            return '#1f78b4';
        case "Strateginen kehittäminen":
            return '#6a3d9a';
        case "Tilasuunnittelu":
            return '#fb9a99';
        case "Verkkopalvelut":
            return '#e31a1c';
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
        case "Digitointi":
            return [[0, '#eeeeee'], [0.1, '#fdbf6f'], [1, '#222222']];
        case "Henkilöstön osaaminen":
            return [[0, '#eeeeee'], [0.3, '#ff7f00'], [1, '#222222']];
        case "Kokoelmat":
            return [[0, '#eeeeee'], [0.01, '#ffff99'], [0.8, '#222222']];
        case "Laitehankinnat":
            return [[0, '#eeeeee'], [0.1, '#b2df8a'], [1, '#222222']];
        case "Lukemisen edistäminen":
            return [[0, '#eeeeee'], [0.1, '#33a02c'], [1, '#222222']];
        case "Mediakasvatus":
            return [[0, '#eeeeee'], [0.1, '#cab2d6'], [1, '#222222']];
        case "Oppimisympäristö ja yhteisöllisyys":
            return [[0, '#eeeeee'], [0.01, '#a6cee3'], [0.8, '#222222']];
        case "Palvelujen kehittäminen":
            return [[0, '#eeeeee'], [0.1, '#1f78b4'], [1, '#222222']];
        case "Strateginen kehittäminen":
            return [[0, '#eeeeee'], [0.1, '#6a3d9a'], [1, '#222222']];
        case "Tilasuunnittelu":
            return [[0, '#eeeeee'], [0.1, '#fb9a99'], [1, '#222222']];
        case "Verkkopalvelut":
            return [[0, '#eeeeee'], [0.1, '#e31a1c'], [1, '#222222']];
    }

    return "#ff66ff";
}

function makeThemeButtons() {
    'use strict';

    var allThemes = [
        'Digitointi',
        'Henkilöstön osaaminen',
        'Kokoelmat',
        'Laitehankinnat',
        'Lukemisen edistäminen',
        'Mediakasvatus',
        'Oppimisympäristö ja yhteisöllisyys',
        'Palvelujen kehittäminen',
        'Strateginen kehittäminen',
        'Tilasuunnittelu',
        'Verkkopalvelut'
    ];

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

    $mapthemes.find('input').on('change', function (e) {
        var that = $(this),
            theme = that.attr('name');
        MapVis.themes[theme] = that.is(":checked");

        that.parent().parent().find('label').css({
            color: that.is(":checked") ? '#fff' : '#b3b3b3'
        });

        MapVis.start();
    });

}

function makeInfo(id) {
    'use strict';

 //   $("#arrow_box_abs").css({'visibility': "hidden"});
 //   $(".arrow_box_abs").css({'opacity': 0});
    $('.arrow_box_abs').hide();

    var data = {
        townName: _(id),
        projects: [],
        yearProjects: [],
        skipCount: 0,
        partnerprojects: [],
        kunta: false
    };
    var area;

    for (var i = 0; i < MapVis.data.length; i++) {
        if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue


        var project = MapVis.data[i],
         //   kunta = project['Kunta'],
            kunta = findkunta(project['Kunta']),
            maakunta = project['ColSel_Maakunta'],
            kehitKirjasto = getKehitKirj(project['ColSel_Maakunta']),
            avi = project['ColSel_Aluehallintovirasto'],
            partners = project['Osatoteuttajat'],
            kimppa = project['Kimppa'],
            vuosi = project['ColSel_Vuosi'].substr(0, 4);
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
            if ($.inArray(kimppa, MapVis.allowedKimppa) === -1) {
                //console.log("year not allowed", vuosi, MapVis.allowedYears);
                data.skipCount++;
                continue;
            }

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
                "ColSel_Teema": _(project.ColSel_Teema),
                "vuosi": vuosi,
                "link": link
            });
            if("x" == "y")
            data.partnerprojects.push({
                "id": project.id,
                "hanke_name": project.hanke_name,
                "ColSel_Teema": _(project.ColSel_Teema),
                "vuosi": vuosi,
                "link": link
            });
        }
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
    if (data.partnerprojects)
    for (var i = 0; i < data.partnerprojects.length; i++) {
        var project2 = data.partnerprojects[i];

        if (project2.vuosi in tmpData2) {
            tmpData2[project2.vuosi].push(project2);
        } else {
            tmpData2[project2.vuosi] = [project2];
        }
    }

    $.each(MapVis.allowedYears, function (index, year) {
        data.yearProjects.push({
            year: year,
            projects: tmpData[year] || [],
            partnerprojects: tmpData2[year] || [],
            kunta:isitKunta,
            mainPartner: _("Päätoteuttajana"),
            partner: _("Kumppanina")
        });
    });

    data.yearProjects.reverse();

    data.skipText = _('{0} ' + (data.skipCount > 1 ? _('piilotettua projektia') : 'piilotettu projekti'), data.skipCount);


    var source = $('#map-info-template').html(),
        template = Handlebars.compile(source),
        container = $('#map-info'),
        html = template(data);
    container.html(html);

    var modalLink = container.find('.mapModal');

    var modalSource = $('#map-info-modal-template').html(),
        modalTemplate = Handlebars.compile(modalSource),
        modalContainer = $('#map-info-details');


    var rahoitus, haettu;



    modalLink.each(function () {
        var that = $(this),
            projectId = that.data('project-id');

        that.click(function (e) {
            e.preventDefault();


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
                    "teema": _("Teema"),
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

                    modalData.description = _("Vuoden {0} {1} -hanke", modalData.project.ColSel_Vuosi, modalData.project.ColSel_Hanketyyppi);

                    break;
                }
            }

            modalContainer.html(modalTemplate(modalData));

            $('#map-info-modal').foundation('reveal', 'open');

        //    console.log('MODAL %d %o', projectId, modalData);

            if (window.PAGE.VIS !== "new-projects") {
                document.getElementById("mapModal").deleteRow(8);
            }


         //   miniMap.settings.chart.width =  $('#minimap-wrapper').width()
            miniMap.settings.chart.width =  $('#map-info-modal').width() *0.4
            miniMap.settings.series =  getOrganizers(modalData.project.KuntaID, modalData.project.Osatoteuttajat);

            if (modalData.project.Osatoteuttajat) {
                miniMap.settings.colorAxis.dataClasses = [{
                    from: 1,
                    to: 2,
                    color: '#0571B0',
                    name: _("Päätoteuttaja")
                }, {
                    from: 0,
                    to: 1,
                    color: '#a6bddb',
                    name: _("Yhteistyökunnat")
                }];
            } else {
                miniMap.settings.colorAxis.dataClasses = [{
                    from: 1,
                    to: 2,
                    color: '#0571B0',
                    name: _("Hankkeen toteuttaja")
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

        });
    });

}

MapVis.start = function () {
    'use strict';

    MapVis.settings.tooltip = {
        formatter: function (arg) {
            var output = "<h1><b>" + _(this.point.id) + "</b></h1></br> " +
                "</br>"+"<br><b>Omat projektit:</b><br/>";
            var output2 = "<br/><b>Kumppanina projekteissa:</b><br/>";

            var sortedArray = [];
            var sortedArray2 = [];

            for (var themeIndex in MapVis.kunnat[this.point.id]) {
                if (!MapVis.kunnat[this.point.id].hasOwnProperty(themeIndex)) continue;

                var themeValue = MapVis.kunnat[this.point.id][themeIndex];

                if (!MapVis.themes[themeIndex]) {
                    continue;
                }

                sortedArray.push({
                    name: themeIndex,
                    value: themeValue
                });

            }

            if(MapVis.kunnat[this.point.id]["partner"])
            for (var themeIndex2 in MapVis.kunnat[this.point.id]["partner"]) {
                var partnerProjValue = MapVis.kunnat[this.point.id]["partner"][themeIndex2];
                if(partnerProjValue)
                    sortedArray2.push({
                        name: themeIndex2,
                        value: partnerProjValue
                    });
            }

            sortedArray.sort(function (a, b) {
                return a.value < b.value ? 1 : (a.value > b.value ? -1 : 0);
            });

            for (var i = 0; i < sortedArray.length; i++) {
                var theme = sortedArray[i];

                if(theme.name !== "partner")
                output += _(theme.name) + ": " +
                    Highcharts.numberFormat(theme.value, 0) + " " +
                    (MapVis.unit === 'unit' ? (theme.value === 1 ? _('projekti') : _('projektia')) : ' €') + "<br/>";
            }

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
                else
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
        verticalAlign: 'top',
        y: $(window).height()*0.14,
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
            if (MapVis.allowedKimppa.length == 1)
                output2 = _(MapVis.allowedKimppa.slice())+ "<br>"


            if (vuodet.length === 1) {
                output = (_("Vuosi") + " " + vuodet[0]);
                //   } else if (vuodet.length > 1 && vuodet.length < MapVis.existingYears.length - 1) {
            } else if (vuodet.length > 1 && vuodet.length < MapVis.existingYears.length) {
                //  } else if (vuodet.length > 1) {
                var last = vuodet.pop();
                output = (_("Vuosi") + ": " + vuodet.join(", "));
                output += _(" ja ") + last;
            }


            if (MapVis.allowedKimppa.length == 1 ) {
                if(output)
                    return output2 + output
                else
                    return output2
            } else {
                return output
            }



        })(MapVis.allowedYears.slice())
    };
*/
    if (getSelectedThemes().length === 0) {
        MapVis.settings.title.text = _('Ei teemoja valittuna');
    } else if (getSelectedThemes().length === 1) {

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

        MapVis.settings.exporting.chartOptions.legend.title = {
            text: null
        };

        MapVis.settings.legend.enabled = true;
        MapVis.settings.legend.valueSuffix = (MapVis.unit === 'unit' ? _('kpl') : '€');

        MapVis.settings.colorAxis = {
            //min: 1000,
            //max: 50000,
            stops: getThemeColorScale(getSelectedThemes()[0]),
            minColor: getThemeColorScale(getSelectedThemes()[0])[0][1],
            maxColor: getThemeColorScale(getSelectedThemes()[0])[2][1]
        };

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
                    title += ' ' + _('projekteja teemoissa');
                } else {
                    title += ' ' + _('rahoitusta saaneet teemat');
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
            text: _('Teema')
        };
        MapVis.settings.colorAxis = null;
    }

    MapVis.settings.series = getThemeSeries();

    MapVis.settings.series.push({
        type: 'mapline',
        name: 'maakuntarajat',
        data: Highcharts.geojson(mlines, 'mapline'),
        color: 'black',
        enableMouseTracking: false,
        showInLegend: false,
        lineWidth: 2
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
        list: {
            onSelectItemEvent: function(val) {
                var index = $("#kuntaSearch").getSelectedItemData().id;
                var mapsi = $('#map').highcharts()
                mapsi.get(index).select(true, false)
            },
            onShowListEvent: function(a,b,c) {
                console.log(a)
                console.log(b)
                console.log(c)

            },
            match: {
                enabled: true
            },
            sort: {
                enabled: true
            },
            maxNumberOfElements: 2,

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

    $("#kuntaSearch").easyAutocomplete(options);

  //  if (MapVis.selected || MapVis.selected !== null) {
    if (MapVis.selected && window.PAGE.MAPVIEW.SELECTED !== "empty") {
        makeInfo(MapVis.selected);
    } else if (window.PAGE.MAPVIEW.SELECTED == "empty") {
        $('.arrow_box_abs').show();
    }

};
