// Copyright: Vividin Oy. All rights reserved. Also contributed by Rivermouth Oy.

Array.prototype.unique = function () {
    var a = this.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

Highcharts.setOptions({
    lang: {
        decimalPoint: ',',
        thousandsSep: ' '
    }
});

var HankeVisBar = function (HankeVisData, HankeVisOnReadyCallBack) {
    function mapValues(map) {
        var out = [];
        for (var k in map) {
            out.push(map[k]);
        }
        return out;
    }

    function mapKeys(map) {
        var out = [];
        for (var k in map) {
            out.push(k);
        }
        return out;
    }

    function init() {

        $('.arrow_box_abs').hide();
        if (HankeVisBar.Options.colorWith === "ColSel_Maakunta") {
            Highcharts.setOptions({
                //   colors:['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8d4653', '#91e8e1', '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a']
                colors: [
                    "#9817ff",
                    "#24b7f1",
                    "#fa82ce",
                    "#736c31",
                    "#a75312",
                    "#f2917f",
                    "#7b637c",
                    "#a8b311",
                    //"#18c61a", //Lappi
                    "#FFD700",
                    "#d00d5e",
                    "#18c199", //Pkar
                    "#1263e2", //
                    "#1e7b1d",
                    "#05767b",
                    "#aaa1f9",
                    "#d31911",
                    "#a5aea1",
                    "#ed990a"]
            });
        } else {
            Highcharts.setOptions({
                colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8d4653', '#91e8e1', '#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', "#bc80bd"]
                //	colors:	["#1f78b4", "#a6cee3", "#b2df8a", "#33a02c", "#e31a1c", "#fb9a99", "#bf812d", "#ff7f00", "#cab2d6", "#6a3d9a", "#8dd3c7", "#ffffb3", "#DCDCDC", "#fb8072", "#bebada",  "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"]
            });
        }


        var xAxisCategory = HankeVisBar.Options.category;
        var seriesCategory = HankeVisBar.Options.colorWith;
        //	var unit = HankeVisBar.Options.sizeSelect;
        var unit = "amount";

        var colorKeys = {};
        var categories = [];

        /**
         * dataMatrix is like this:
         * [{
		 *   color: { key: 5, key2: 7, ..., _total: 12 },
		 *   kind: "category",
		 *   name: "categoryName"
		 *  },
         *  {...},
         *  {...},
         * ]
         */

        //	console.log(data)

        var Array1, total = 0;
        var subtitle = [];

        var updateFilter = function (filtered_values1) {
            var Arrayx = [];
            Array1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, vuosiList, aviList, rahoittajaList, kimppaList);
            var Array2 = filtered_values1;
            for (var i = 0; i < Array2.length; i++) {
                var arrlen = Array1.length;
                for (var j = 0; j < arrlen; j++) {
                    if (Array2[i] == Array1[j]) {
                        Array1 = Array1.slice(0, j).concat(Array1.slice(j + 1, arrlen));
                    }
                }
            }

            subtitle = [];
            function handleOutputting(name, values, total) {
                var origListLength = 0, output = "";

                switch (name) {
                    case "Kunta":
                        origListLength = kuntaList.length;
                        break;
                    case "Maakunta":
                        origListLength = maakuntaList.length;
                        break;
                    case "Teema":
                        origListLength = teemaList.length;
                        break;
                    case "Toteuttaja":
                        origListLength = toteuttajaList.length;
                        break;
                    case "Vuosi":
                        origListLength = vuosiList.length;
                        break;
                    case "Avi":
                        origListLength = aviList.length;
                        break;
                    case "Rahoittaja":
                        origListLength = rahoittajaList.length;
                        break;
                //    case "Hankeyhteistyö":
                    case "Kimppa":
                        origListLength = kimppaList.length;
                        break;
                }


                if (origListLength !== total) {

                    var rowLength = 0;
                    var outputValues = [];

                    for (var key in values) {

                        if (!values.hasOwnProperty(key) || values[key] === undefined) {
                            continue;
                        }

                        var value = values[key];

                        rowLength += value.length;

                        if (rowLength > 75) {
                            break;
                        }

                        outputValues.push(value);
                    }

                    if (total - outputValues.length > 0) {
                        output = (_(name) + ": " + outputValues.join(", "));
                        output += (_(" ja {0} muuta", (total - outputValues.length)));
                    } else if (outputValues.length === 1) {
                        output = (_(name) + ": " + outputValues.join(", "));
                    } else {
                        var last = outputValues.pop();
                        output = (_(name) + ": " + outputValues.join(", "));
                        output += _(" ja ") + last;
                    }

                    subtitle.push(output);
                }
            }

            if (Array1.length > 0) {

                var prev = null,
                    currFiltered = [],
                    currTotal = 0;

                for (var key in filtered_values1) {
                    if (!filtered_values1.hasOwnProperty(key)) {
                        continue;
                    }

                    var value = filtered_values1[key];

                    if (typeof value !== "string") {
                        console.log(key, value);
                    }

                    var pieces = value.split("//");

                    if (prev === null) {
                        prev = pieces[0];
                    }

                    if (pieces[0] !== prev) {
                        handleOutputting(prev, currFiltered, currTotal);
                        prev = pieces[0];
                        currTotal = 0;
                        currFiltered = [];
                    }

                    currTotal++;
                    currFiltered.push(_(pieces[1]));

                }

                handleOutputting(prev, currFiltered, currTotal);

            }

        };


        var dataMatrix = (function (datax) {

            //	console.log(datax)
            var data,
                newparam1 = [],
                newparam2 = [],
                newparam3 = [],
                newparam4 = [],
                newparam5 = [],
                newparam6 = [],
                newparam7 = [],
                newparam8 = [];

            var filtered_values1 = $.map($("#example-optgroup").multiselect("getChecked"), function (ui) {
                return ui.value;
            });

            var filtered_unchecked = {
                TEEMA: [],
                TOTEUTTAJA: [],
                KUNTA: [],
                MAAKUNTA: [],
                AVI: [],
                RAHOITTAJA: [],
                VUOSI: [],
                KIMPPA: []
            };

            //*
            var prev = null,
                i = 0;
            $.each($("#example-optgroup").multiselect("getAllItems"), function (key, value) {
                if (value.value.indexOf("Kunta") > -1) {
                    if (prev !== "Kunta") {
                        prev = "Kunta";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.KUNTA.push(i);
                    }
                } else if (value.value.indexOf("Maakunta") > -1) {
                    if (prev !== "Maakunta") {
                        prev = "Maakunta";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.MAAKUNTA.push(i);
                    }
                } else if (value.value.indexOf("Teema") > -1) {
                    if (prev !== "Teema") {
                        prev = "Teema";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.TEEMA.push(i);
                    }
                } else if (value.value.indexOf("Toteuttaja") > -1) {
                    if (prev !== "Toteuttaja") {
                        prev = "Toteuttaja";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.TOTEUTTAJA.push(i);
                    }
                } else if (value.value.indexOf("Vuosi") > -1) {
                    if (prev !== "Vuosi") {
                        prev = "Vuosi";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.VUOSI.push(i);
                    }
                } else if (value.value.indexOf("Avi") > -1) {
                    if (prev !== "Avi") {
                        prev = "Avi";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.AVI.push(i);
                    }
                } else if (value.value.indexOf("Rahoittaja") > -1) {
                    if (prev !== "Rahoittaja") {
                        prev = "Rahoittaja";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.RAHOITTAJA.push(i);
                    }
                } else if (value.value.indexOf("Kimppa") > -1) {
                    if (prev !== "Kimppa") {
                        prev = "Kimppa";
                        i = 0;
                    }

                    if (!value.checked) {
                        filtered_unchecked.KIMPPA.push(i);
                    }
                }
                i++;
            });
            //*/

            doRouting({
                FILTER: filtered_unchecked
            });

            updateFilter(filtered_values1);

            data = datax.filter(function (el) {
       //         console.log(el)
                if (el.ColSel_Hanketyyppi === "Huono") {
                    return false;
                }
                for (var a = 0, al = Array1.length; a < al; ++a) {
                    if (Array1[a].indexOf("Kunta") > -1) {
                        newparam1 = Array1[a].split("//");
                        if (el.Kunta === newparam1[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Maakunta") > -1) {
                        //	var newparam = Array1[a].split("//");
                        newparam2 = Array1[a].split("//");
                        if (el.ColSel_Maakunta === newparam2[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Teema") > -1) {
                        //	var newparam = Array1[a].split("//");
                        newparam3 = Array1[a].split("//");
                        if (el.ColSel_Teema === newparam3[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Toteuttaja") > -1) {
                        //var newparam = Array1[a].split("//");
                        newparam4 = Array1[a].split("//");
                        if (el.Toteuttaja === newparam4[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Vuosi") > -1) {
                        //var newparam = Array1[a].split("//");
                        newparam5 = Array1[a].split("//");
                        if (parseInt(el.ColSel_Vuosi).toString() === newparam5[1]) {

                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Avi") > -1) {
                        //var newparam = Array1[a].split("//");
                        newparam6 = Array1[a].split("//");
                        if (el.ColSel_Aluehallintovirasto === newparam6[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Kimppa") > -1) {
                        //var newparam = Array1[a].split("//");
                        newparam8 = Array1[a].split("//");
                        if (el.Kimppa === newparam8[1]) {
                            return false;
                        }
                    }
                    if (Array1[a].indexOf("Rahoittaja") > -1) {
                        var xxKey = el.ColSel_Hanketyyppi
                        //var newparam = Array1[a].split("//");
                        newparam7 = Array1[a].split("//");
                        if (xxKey == "ELY" || xxKey == "Hyvä") xxKey = "ELY / AVI";
                        if (xxKey == "OKM") xxKey = "Opetus- ja kulttuuriministeriö";
                    //    if (xxKey == "Opetus- ja kulttuuriministeriö" ) xxKey = "OKM";
                        if (xxKey === newparam7[1]) {
                            return false;
                        }
                    }
                }

                return true;
            });

            var map = {};

            function mapData(e) {
                for (var i = 0, l = data.length; i < l; ++i) {
                    var d = data[i];
                    var xKey, yKey;
                    if (xAxisCategory === "ColSel_Vuosi") {
                        xKey = parseInt(d[xAxisCategory]).toString();
                    } else {
                        xKey = d[xAxisCategory];
                    }
                    if (seriesCategory === "ColSel_Vuosi") {
                        yKey = parseInt(d[seriesCategory]).toString();
                    } else {
                        yKey = d[seriesCategory];
                    }
                    if (yKey == "ELY" || yKey == "Hyvä") yKey = _("ELY / AVI");
                    if (yKey == "HUONO" ) yKey = _("Toteutumaton hanke");
                    if (xKey == "ELY" || xKey == "Hyvä") xKey = _("ELY / AVI");
                    if (xKey == "HUONO") xKey = _("Toteutumaton hanke");
                    //    xKey = xKey.trim();
                    //    yKey = yKey.trim();
                    /*	if (xKey.indexOf(",") >-1){
                     var xArray = xKey.split(",")
                     }*/

                    colorKeys[yKey] = 0;

                    var

                        x = map[xKey];
                    if (!e) {
                    if (x === undefined) {
                        x = map[xKey] = {
                            kind: "category",
                            name: xKey,
                            color: {
                                _total: 0
                            }
                        };
                    }
                    }

                    var value = parseInt(d[unit]);
                    //	console.log(value)
                    if (isNaN(value)) {
                        value = 0;
                    }
                    if (!e) {
                    var color = x.color;

                    if (color[yKey] === undefined) {
                        color[yKey] = 0;
                    }
                    }
                    if (!e) {
                        //     alert("jep")
                        color[yKey] += value;
                        color._total += value;
                    } else {
                        //    alert("notejep")
                    }
                    total += value;
                }
            }

            function mapSpecialData() {
                var color,
                    value,
                    x,
                    __ret;
                var mapParse = function (xKey) {
                    colorKeys[yKey] = 0;

                    var x = map[xKey];

                    if (x === undefined) {
                        x = map[xKey] = {
                            kind: "category",
                            name: xKey,
                            color: {
                                _total: 0
                            }
                        };
                    }

                    var value = parseInt(d[unit]);
                    //	console.log(value)
                    if (isNaN(value)) {
                        value = 0;
                    }

                    var color = x.color;

                    if (color[yKey] === undefined) {
                        color[yKey] = 0;
                    }
                    color[yKey] += value;

                    color._total += value;
                    //     total += value;
                    return {x: x, value: value, color: color};
                };

                for (var i = 0, l = data.length; i < l; ++i) {
                    var d = data[i];
                    var xKey, yKey;
                    if (xAxisCategory === "ColSel_Vuosi") {
                        xKey = parseInt(d[xAxisCategory]).toString();
                    } else {
                        xKey = d[xAxisCategory];
                    }
                    if (seriesCategory === "ColSel_Vuosi") {
                        yKey = parseInt(d[seriesCategory]).toString();
                    } else {
                        yKey = d[seriesCategory];
                    }

                    //  var xKey = d[xAxisCategory];
                    //  var yKey = d[seriesCategory];
                    if (xKey.indexOf(",") > -1) {
                        var xArray = xKey.split(",");
                        for (var j = 0; j < xArray.length; j++) {
                            xKey = xArray[j];
                            if (xKey == "Nuoret (13-19  v.)") xKey = "Nuoret (13-19 v.)";

                            __ret = mapParse(xKey);
                            x = __ret.x;
                            value = __ret.value;
                            color = __ret.color;
                        }
                        continue;
                    }

                    __ret = mapParse(xKey);
                    x = __ret.x;
                    value = __ret.value;
                    color = __ret.color;
                }
            }

            if (xAxisCategory === "Kohderyhma") {
                mapData("e");
                mapSpecialData();
            } else {
                mapData();
            }

            var arr = [];
            arr = mapValues(map).sort(function (a, b) {
                return b.color._total - a.color._total;
            });
            return arr;
        })(HankeVisData);

        /*	var coloring = function(name) {
         console.log(name)
         if (name == "Elintarvike") {
         return 'black'
         } else {
         return	"white"
         }
         } */

        var series = (function (matrix) {
            var seriesMap = {};
            // Loop thru categories
            //	console.log(matrix)
            for (var i = 0, l = matrix.length; i < l; ++i) {
                var category = matrix[i];
                var xk = category.name;
                // This vector holds colors of single category
                var xVector = category.color;
                // Loop thru colors in category
                // After every loop we have added to every
                // series' data array current category's this color data
                for (var yk in colorKeys) {
                    //    if (yk == "Hyvä" || yk == "ELY") yk = "ELY / AVI";
                    if (yk.charAt(0) === "_") {
                        continue;
                    }
                    if (!seriesMap[yk]) {
                        seriesMap[yk] = {
                            name: _(yk),
                            data: []
                            //		color: coloring(yk),
                        };
                    }
                    // Push color's value in category to data array
                    seriesMap[yk].data.push(xVector[yk] || null);
                }
                if (categories.indexOf(xk) < 0) {
                    categories.push(xk);
                }
            }
            return mapValues(seriesMap);
        })(dataMatrix);

        // Sort legend in alphabetical order
        series.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        if (categories[0] === undefined) {
            categories[0] = "Yhteensä";
        }

        var subtitling = function (e) {
            return _("(yhteensä {0} €)", Highcharts.numberFormat(total, 0));
        };

        for (var key in series) {
            // Teemat
            if (series[key].name === _("Digitointi")) {
                series[key].color = '#fdbf6f';
            } else if (series[key].name === _("Henkilöstön osaaminen")) {
                series[key].color = '#ff7f00';
            } else if (series[key].name === _("Kokoelmat")) {
                series[key].color = '#ffff99';
            } else if (series[key].name === _("Laitehankinnat")) {
                series[key].color = '#b2df8a';
            } else if (series[key].name === _("Lukemisen edistäminen")) {
                series[key].color = '#33a02c';
            } else if (series[key].name === _("Mediakasvatus")) {
                series[key].color = '#cab2d6';
            } else if (series[key].name === _("Oppimisympäristö ja yhteisöllisyys")) {
                series[key].color = '#a6cee3';
            } else if (series[key].name === _("Palvelujen kehittäminen")) {
                series[key].color = '#1f78b4';
            } else if (series[key].name === _("Strateginen kehittäminen")) {
                series[key].color = '#6a3d9a';
            } else if (series[key].name === _("Tilasuunnittelu")) {
                series[key].color = '#fb9a99';
            } else if (series[key].name === _("Verkkopalvelut")) {
                series[key].color = '#e31a1c';
                // Avit
            } else if (series[key].name === _("Etelä-Suomi")) {
                series[key].color = '#a6cee3';
            } else if (series[key].name === _("Itä-Suomi")) {
                series[key].color = '#1f78b4';
            } else if (series[key].name === _("Lappi")) {
                series[key].color = '#b2df8a';
            } else if (series[key].name === _("Lounais-Suomi")) {
                series[key].color = '#33a02c';
            } else if (series[key].name === _("Länsi-ja Sisä-Suomi")) {
                series[key].color = '#fb9a99';
            } else if (series[key].name === _("Pohjois-Suomi")) {
                series[key].color = '#e31a1c';
                // Vaikutusalueet
            } else if (series[key].name === _("kunnan- tai kaupunginosat")) {
                series[key].color = '#d73027';
            } else if (series[key].name === _("kunnat")) {
                series[key].color = '#fc8d59';
            } else if (series[key].name === _("seutukunnat")) {
                series[key].color = '#fee090';
            } else if (series[key].name === _("maakunta")) {
                series[key].color = '#ffffbf';
            } else if (series[key].name === _("ylimaakunnallinen")) {
                series[key].color = '#e0f3f8';
            } else if (series[key].name === _("valtakunnallinen")) {
                series[key].color = '#91bfdb';
            } else if (series[key].name === _("kansainvälinen")) {
                series[key].color = '#4575b4';
            } else if (series[key].name === "fi") {
                series[key].name = _("suomenkielinen");
                series[key].color = '#22adff';
            } else if (series[key].name === _("sv")) {
                series[key].name = _("ruotsinkielinen");
                //     series[key].name = "ruotsinkielinen";
                series[key].color = '#ccff00';
            } else if (series[key].name === _("ELY / AVI")) {
                series[key].color = "#1f78b4";
            } else if (series[key].name === _("OKM")) {
                series[key].name = _("Opetus- ja kulttuuriministeriö");
                series[key].color = "#a6cee3";
            } else if (series[key].name === "2010") {
                series[key].color = '#4575b4';
            } else if (series[key].name === "2011") {
                series[key].color = '#74add1';
            } else if (series[key].name === "2012") {
                series[key].color = '#abd9e9';
            } else if (series[key].name === "2013") {
                series[key].color = '#e0f3f8';
            } else if (series[key].name === "2014") {
                series[key].color = '#fee090';
            } else if (series[key].name === "2015") {
                series[key].color = '#fdae61';
            } else if (series[key].name === "2016") {
                series[key].color = '#f46d43';
            } else if (series[key].name === "2017") {
                series[key].color = '#d73027';
            } else if (series[key].name === "2018") {
                series[key].color = '#a50026';
            } else if (series[key].name === "Yhden toteuttajan hanke") {
                series[key].color = '#a6cee3';
            } else if (series[key].name === "Yhteistyöhanke") {
                series[key].color = '#1f78b4';
            }

        }

        //   ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']

        function _translateArray(categories) {
            for (var i = 0; i < categories.length; i++) {
                categories[i] = _(categories[i]);
            }
            return categories;
        }

        function zoomInfo(charti, text) {
            if (charti !== "null") {
                chart.zoomInfo = charti.renderer.label(text, (wwidth * 0.6), (wheight * 0.4))
                    .attr({
                        //        fill: Highcharts.getOptions().colors[0],
                        fill: "#1F78B3",
                        padding: 10,
                        r: 5,
                        zIndex: 8
                    })
                    .css({
                        color: '#FFFFFF'
                    })
                    .add();
            }

        }

        function selectPointsByDrag(e) {
            if (xAxisCategory === "Kunta") {
                chart.zoomInfo.hide();
            }
        }

        function stacking(e) {
            if (HankeVisBar.Options.stacked == true) {
                return "normal";
            } else {
                return null;
            }
        }

        function titling() {
            if ($('#visSelectSelect').val() == "projects") {
                return _("Myönnetty rahoitus")
            } else {
                return _("Haettu avustus")
            }
        }

        var zoomType;
        if (series.length > 0 && series[0].data.length > 40) {
            zoomType = "x";
        } else {
            zoomType = null;
        }

        var enableCredits = {credits: {enabled: true}};

        var chart = $('#bar-container').highcharts({
            chart: {
                type: 'bar',
                "zoomType": zoomType,
               // backgroundColor: "#ECE9E9",
                backgroundColor: "white",
                events: {
                    selection: selectPointsByDrag,
                    beforePrint: function () {
                        Highcharts.setOptions(enableCredits);
                    }
                }
            },
            accessibility: {
            description: "Shows how apples have been more popular than oranges for the past 10 years. Oranges are gaining in popularity over the past 3 years, but are still far from as popular as apples."
        },
            title: {
                //	text: 'Rahoituksen jakautuminen klustereittain'
                //	text: HankeVisBar.Options.sizeText
                //    text: _("Haettu rahoitus")
                text: titling()
            },
            subtitle: {
                text: function () {
                    return subtitle.join("<br>");
                }()
            },
            xAxis: {
                categories: _translateArray(categories),
                labels: {
                    style: {
                        fontSize: '10px',
                        fontWeight: "bold"
                    },
                    step: 1
                }
            },
            yAxis: {
                min: 0,
                title: {
                    //	text: titling(unit)
                    text: subtitling("e")
                }
            },
            tooltip: {
                formatter: function () {
                 //   var suffix = " €";
                    var suffix = " &#8364;";
                    return "<b>" + this.key + ",</b><br>" + this.series.name + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix
                }
            },
            exporting: {
                sourceWidth: 900,
                sourceHeight: 700,
                //    scale: 2,
                chartOptions: {
                    chart: {
                        backgroundColor: "#FFFFFF"
                    }
                },
                buttons: {
                    contextButton: {
                        text: _('Lataa')
                    }
                }
            },
            credits: {
                text: _('Rahoittaja') + ': OKM ja AVIt, ' + _('Lähde') + ': hankkeet.kirjastot.fi',
                href: null,
                enabled: false
            },
            legend: {
                //   backgroundColor: '#ECE9E9',
                backgroundColor: 'transparent',
                reversed: false
            },
            /*	exporting: {
             buttons: {
             contextButton:
             }
             },*/
            navigation: {
                buttonOptions: {
                    theme: {
                 //       fill: '#ECE9E9'
                        fill: 'white'
                    }
                }
            },
            plotOptions: {
                series: {
                    stacking: stacking()
                },
                bar: {
                    //   pointWidth : 5
                    borderColor: "black",
                    borderWidth: 1
                }
            },
            series: series
        }).highcharts();

        var wwidth = $("#bar-container").width();
        var wheight = $("#bar-container").height();


        //  var chartx = $("#bar-container").highcharts();
        if (chart) {

            //   if (xAxisCategory === "Kunta") {
            if (series.length > 0 && series[0].data.length > 40) {

                zoomInfo(chart, '<b>' + _("Voit tarkentaa näkymää") + '</b>' +
                '<br>' + _("maalaamalla palkkeja pystysuoraan"));
                /*
                 chart.setTitle(null,{
                 //   text: "(voit zoomata näkymää maalaamaalla haluamasi palkit pystysuoraan"
                 text: subtitling(unit)+"(voit tarkentaa näkymää maalaamalla palkkeja pystysuoraan)"
                 });*/

            } else if (xAxisCategory === "Kohderyhma") {
//               console.log(chart.annotations.allItems[0].options)
                //              chart.annotations.allItems[0].options.title = "fff"
                zoomInfo("null", '');

                 chart.setTitle(null,{
                 //    text: ""
                     text: _("(Yksittäinen hanke voi sisältää useampia kohderyhmiä. Kohderyhmiin kohdistettuja summia ei täten voi laskea yhteen.)")
                 });
            } else {
                zoomInfo("null", '');
            }
        }
        Array.prototype.sum = function (selector) {
            if (typeof selector !== 'function') {
                selector = function (item) {
                    if (item === null) {
                        item = 0;
                    }
                    return item;
                };
            }
            var sum = 0;
            for (var i = 0; i < this.length; i++) {
                sum += parseFloat(selector(this[i]));
            }
            return sum;
        };

        for (var i = 0, l = series.length; i < l; ++i) {
            series[i].y = series[i].data.sum();
        }

        var chartC = $('#circle-container').highcharts({
            chart: {
                type: 'pie',
           //     backgroundColor: "#ECE9E9",
                backgroundColor: "white",
                events: {
                    beforePrint: function () {
                        Highcharts.setOptions(enableCredits);
                    }
                }
            },
            accessibility: {
                description: "Shows how apples have been more popular than oranges for the past 10 years. Oranges are gaining in popularity over the past 3 years, but are still far from as popular as apples."
    },
            title: {
                //		text: HankeVisBar.Options.sizeText
                //    text: _('Haettu rahoitus')
                text: titling()
            },
            subtitle: {
                text: function () {

                    var tmp = subtitle;
                    tmp.push(subtitling("e"));

                    return tmp.join("<br>");
                }()
            },
            /*	xAxis: {
             categories: categories
             },
             yAxis: {
             min: 0,
             title: {
             text: unit
             }
             }, */

            exporting: {
                sourceWidth: 900,
                sourceHeight: 700,
                //    scale: 2,
                chartOptions: {
                    chart: {
                        backgroundColor: "#FFFFFF"
                    }
                },
                buttons: {
                    contextButton: {
                        text: _('Lataa')
                    }
                }
            },
            navigation: {
                buttonOptions: {
                    theme: {
                    //    fill: '#ECE9E9'
                        fill: 'white'
                    }
                }
            },
            credits: {
                text: _('Rahoittaja') + ': OKM ja AVIt, ' + _('Lähde') + ': hankkeet.kirjastot.fi',
                href: null,
                enabled: false
            },
            legend: {
                backgroundColor: 'transparent',
                reversed: false
                //     symbolRadius: 1,
                //     borderColor: "black"
            },
            tooltip: {
                formatter: function () {
                    var suffix = " €";
                    //   return "<b>" + this.key + ",</b><br>" + this.series.name + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix
                    return "<b>" + this.key + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix;
                }
            },
            /*	plotOptions: {
             series: {
             stacking: 'normal'
             }
             }, */
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    //   pointWidth : 5
                    borderColor: "black",
                    borderRadius: 1,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            //	series: series
            series: [{
                type: 'pie',
                name: HankeVisBar.Options.sizeText,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    distance: 10,
                    connectorColor: '#000000',
                    format: '{point.percentage:.1f} %'
                },
                data: series
            }]
        }).highcharts();

        if (HankeVisOnReadyCallBack) {
            HankeVisOnReadyCallBack();
        }
    }

    init();
    HankeVisBar.update = init;
    $("#bar-container").highcharts().reflow();
};

HankeVisBar.update = function () {
};




