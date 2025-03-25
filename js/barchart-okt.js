// Copyright: Vividin Oy. All rights reserved. Also contributed by Rivermouth Oy.
var barTableData;

Array.prototype.unique = function () {
    console.log(this)
    if(typeof this === 'string') {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    }
};

if(window.PAGE.lang !== "en")
Highcharts.setOptions({
    lang: {
        decimalPoint: ',',
        thousandsSep: ' ',
        viewAsDataTable: _("Tarkastele taulukossa"),
        viewData:_("Tarkastele taulukossa"),
        viewFullscreen: _("Tarkastele koko näytön koossa"),
        openInCloud:_("Avaa Highcharts Cloud -ohjelmassa"),
        downLoadCSV: _("Lataa CSV-tiedosto"),
        downloadJPEG:_("Lataa JPEG-kuva"),
        downloadPDF: _("Lataa PDF-dokumentti"),
        downloadPNG: _("Lataa PNG-kuva"),
        downloadSVG: _("Lataa SVG-vektorikuva"),
        downloadXLS: _("Lataa XLS-tiedosto"),
        printChart:_("Tulosta kaavio"),
        accessibility: {
            table: {
                tableSummary: "Kuvaa taulukkomuodossa"
            },
            chartContainerLabel: _("interaktiivinen kuvaaja"),
            svgContainerLabel: _("interaktiivinen kuvaaja"),
            defaultChartTitle: _("kuvaaja"),
            credits:"",
            exporting: {
                chartMenuLabel:_("Kaavion valikko"),
                exportRegionLabel:_("Kaavion valikko"),
                menuButtonLabel:_("Avaa kaavion valikko")
            },
            screenReaderSection:
            {
                beforeRegionLabel: "Kuvaajan ruudunlukija tieto",
                    endOfChartMarker: "Interaktiivisen kuvaajan loppu"
            },
            legend: {
                legendItem: "Näytä {itemName}",
                legendLabel: "Kuvaajan selite: {legendTitle}"
            },
            series: {
                summary: {
                    bar: " ",
                    barCombination:" ",
                    map:" ",
                    pie:" "
                }
            }
        }

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

        if (HankeVisBar.Options.colorWith === "ColSel_Maakuntax" || HankeVisBar.Options.colorWith === "Avustusmuotox") {
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
                    "#FFD700",
                    "#d00d5e",
                    "#18c199", //
                    "#1263e2", //
                    "#1e7b1d",
                    "#05767b",
                    "#aaa1f9",
                    "#d31911",
                    "#a5aea1",
                    "black",
                    "#ed990a"]
            });
        } else {
            Highcharts.setOptions({
         //       colors: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#8d4653', '#91e8e1', '#2f7ed8', '#8bbc21', '#910000', '#1aadce', '#492970', '#f28f43', '#77a1e5', '#c42525', '#a6c96a', "#bc80bd"]
          //      colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928'] // 12 väriä (colorbrewer)
           //  colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928','#72A0C1','#CD9575','#E52B50'] // 15 väriä
               // colors: ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928','#72A0C1','#CD9575','#E52B50',"#18c199","black", "grey"] // 18 väriä
                colors: setColors // 18 väriä
                //	colors:	["#1f78b4", "#a6cee3", "#b2df8a", "#33a02c", "#e31a1c", "#fb9a99", "#bf812d", "#ff7f00", "#cab2d6", "#6a3d9a", "#8dd3c7", "#ffffb3", "#DCDCDC", "#fb8072", "#bebada",  "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"]
            });
        }

        var xAxisCategory = HankeVisBar.Options.category;
        var seriesCategory = HankeVisBar.Options.colorWith;
        	var unit = HankeVisBar.Options.sizeSelect;
    //    var unit = "amount";

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

        var Array1, total = 0, totalKpl = 0;

        var dataMatrix = (function (datax) {

          //  	console.log(datax)
            subtitle = []
            var data = filterData(datax)
            barTableData = data

            var map = {};

            if(window.PAGE.COLOR == "ColSel_Teema" || window.PAGE.VIEW == "ColSel_Teema") {
                data = data.filter(function (el) {
                    if (el.ColSel_Teema.length === 0) {
                        return false;
                    } else {
                        return true
                    }
                })
            }
/*
            if(window.PAGE.VIEW == "Kohderyhma") {
                data = data.filter(function (el) {
                    if (el.Kohderyhma.length === 0) {
                        return false;
                    } else {
                        return true
                    }
                })
            }
*/
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
                 //       console.log(xKey)
                        x = map[xKey] = {
                            kind: "category",
                            name: xKey,
                            color: {
                                _total: 0,
                                _totalKpl: 0
                            }
                        };
                    }
                    }

                    var value = parseInt(d[unit]);
                    var kplValue = parseInt(d["lkm"]);
                    //	console.log(value)
                    if (isNaN(value)) {
                        value = 0;
                    }
                    if (!e) {
                    var color = x.color;

                    if (color[yKey] === undefined) {
                    //    color[yKey] = 0;
                        color[yKey] = {
                            y:0,
                            yKpl:0
                        };
                    }
                    }
                    if (!e) {
                        //     alert("jep")
                        color[yKey].y += value;
                        color[yKey].yKpl += kplValue;
                        color._total += value;
                        color._totalKpl += kplValue;
                    } else {
                        //    alert("notejep")
                    }
                    total += value;
                    totalKpl += 1;
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
                                _total: 0,
                                _totalKpl: 0
                            }
                        };
                    }

                    var value = parseInt(d[unit]);
                    var kplValue = parseInt(d["lkm"]);
                    //	console.log(value)
                    if (isNaN(value)) {
                        value = 0;
                    }

                    var color = x.color;
                    /*
                    if (color[yKey] === undefined) {
                        color[yKey] = 0;
                    }*/
                    if (color[yKey] === undefined) {
                        //    color[yKey] = 0;
                        color[yKey] = {
                            y:0,
                            yKpl:0
                        };
                    }

                //    color[yKey] += value;

                    color[yKey].y += value;
                    color[yKey].yKpl += kplValue;
                    color._total += value;
                    color._totalKpl += kplValue;

                //    color._total += value;
                //    color._totalKpl += 1;

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
                    if (xKey.indexOf("_") > -1) {
                        var xArray = xKey.split("_");
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

            if (xAxisCategory === "ColSel_Teema") {
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
            //    console.log(matrix[i])
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
                            data: [],
                            dataKpl: [],
                            kpl: 0
                            //kpl: category.color._totalKpl
                            //		color: coloring(yk),
                        };
                    }
             //       console.log(xVector[yk])
                    if(xVector[yk]) {
               //         console.log(xVector[yk])
                        seriesMap[yk].data.push(xVector[yk].y)
                        seriesMap[yk].dataKpl.push(xVector[yk].yKpl)
                        seriesMap[yk].kpl +=xVector[yk].yKpl
                    } else {
                        seriesMap[yk].data.push(null);
                        seriesMap[yk].dataKpl.push(null);
                    }

                    // Push color's value in category to data array
                   // if(xVector[yk])
                   // console.log(xVector[yk])
             //       seriesMap[yk].data.push(xVector[yk] || null);
                 //   console.log(seriesMap[yk])
               //     seriesMap[yk].kpl =xVector._totalKpl
                }

                if (categories.indexOf(xk) < 0) {
                    categories.push(xk);
                }
         //       console.log(category.name)
           //     console.log(category.color)
             //   console.log(seriesMap)
           //     seriesMap[category.color].kpl =category.color._totalKpl
          //      if(seriesMap.name == category.name)
          //          seriesMap.kpl = category.color._totalKpl
            }
            console.log(seriesMap)


            return mapValues(seriesMap);
        })(dataMatrix);

        // Sort legend in alphabetical order
        function sum(array) {
            var total = 0;
            for (var i = 0; i < array.length; i++) total += array[i];
            return total;
        }


        series.sort(function (a, b) {
   //         console.log(a)
            return sum(b.data) - sum(a.data);
        });




        if (categories[0] === undefined) {
            categories[0] = _("Yhteensä");
        }

        var subtitling = function (e) {
            return _("yhteensä {0} €", Highcharts.numberFormat(total, 0))+ ", " + Highcharts.numberFormat(totalKpl, 0) + _(" hanketta");
        };


var runNum = 0
var runNums = 0

  //      accessColors=true

        console.log(series)

        for (var key in series) {

            series[key].index = parseFloat(key)
     //       series[key].description = "Tämä on toimiva testiselitys"
            if(accessColors==true) {
        //        console.log(series[key].name)
          //      console.log(colorings10[key])
                series[key].color = colorings10[key];
/*
           //     series[key].color = colorings[series[key].name];
                if(series.length < 11) {
                    console.log("he")
                    series[key].color = colorings10[key];
                } else {
                    if(isEven(key)) {
                        console.log("he1")
                        console.log(runNum)
                        series[key].color = colorings10[runNum];
                        runNum +=1
                    } else {
                        console.log("he2")
                     //   series[key].color = cols9[runNums]
                        series[key].color = colorings10[runNum];
                        runNums +=1
                    }
                }
*/
            }

            else
            // Teemat
            if (series[key].name === _("Digitointi")) {
                series[key].color = '#fdbf6f';
            } else if (series[key].name === _("Liikuntapaikkarakentaminen")) {
                series[key].color = '#33a02c';
           //     series[key].color = "url(#"+series[key].name+")";

            } else if (series[key].name === _("Nuorten työpajatoiminta")) {
                series[key].color = '#1f78b4';
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
            } else if (series[key].name === _("Lappix")) {
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
        /*    } else if (series[key].name === "2010") {
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
                series[key].color = '#a50026';*/
            } else if (series[key].name === "Yhden toteuttajan hanke") {
                series[key].color = '#a6cee3';
            } else if (series[key].name === "Yhteistyöhanke") {
                series[key].color = '#1f78b4';
            }

        }
//console.log(series)
        series.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
        /*
        for (var keyf in series) {
            series[keyf].legendIndex = parseFloat(keyf)
        }*/
        //   ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026']


        function _translateArray(categories) {
            for (var i = 0; i < categories.length; i++) {
                if (window.PAGE.VIEW == "Avustusmuoto") {
                  //  console.log(categories[i])
                    var textElem = categories[i].match(/_(.*)/)

                    if(textElem)
                    categories[i] = _(textElem[1]);
                } else {
                    categories[i] = _(categories[i]);
                }

            }
            return categories;
        }

        if (window.PAGE.COLOR == "Avustusmuoto") {
            $.each(series, function( index, value ) {
        //        console.log(value.name)
                var textElem = value.name.match(/_(.*)/)
                var legendIndex = value.name.match(/\d+/)
                series[index].name = _(textElem[1])
                series[index].legendIndex = parseFloat(legendIndex[0])

            });
        }


        function zoomInfo(charti, text) {
            if (charti !== "null") {
                chart.zoomInfo = charti.renderer.label(text, (barwidth * 0.6), (wheight * 0.4))
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
            if (window.PAGE.STACK == "true" || window.PAGE.STACK == true) {
                return "normal";
            } else {
                return null;
            }
        }

        function titling() {
        /*    if ($('#visSelectSelect').val() == "projects") {
                return _("Myönnetty rahoitus")
            } else {
                return _("Haettu avustus")
            }
            */
            return _("Myönnetty avustus")
        }

        var zoomType, fontSize;
        if (series.length > 0 && series[0].data.length > 40) {
            zoomType = "x";
        } else {
            zoomType = null;
        }

        var enableCredits = {
            credits: {enabled: true},
            subtitle: {
                text: function () {
                    return subtitle.join("<br>");
                }()
            }
        };

        var barkuvaus = descriptionBuild('Pylväskuvio',termit[window.PAGE.VIEW],termit[window.PAGE.COLOR])
        if(accessFont == true) {
            fontSize = "16px"
        } else {
            fontSize = "11px"
        }


        var lataaNappi;

        if(wwidth < threashold) {
           lataaNappi = ''
        } else {
            lataaNappi = _('Lataa')
        }
        var h = $(window).height() * 0.79;
        var scroller = false;
        var barPixels = 20;
        if (h < 300)
            h = $(document).height()*0.84
   //     var h = $('#bar-container').height();
   //     console.log(series)
        var barW = 1
        for (var k in series) {

            if(series[k].data)
                barW += series[k].data.length
        }


    //    barW = 1
        var len = series.length;

     //   console.log(len,barPixels,categories.length)
        if(window.PAGE.STACK === "false") {

        } else {
            len = 1
        }

        var pointWidths = len*barPixels*categories.length;
        /*
//alert(Math.round(h/pointWidths))
        var minHeight = Math.max(Math.round(h/pointWidths),15)
        //   maxShown = Math.min(Math.round(h/pointWidths),series[0].data.length-1)
        var maxShown = Math.min(minHeight,series[0].data.length-1)
        console.log(minHeight)
        var maxShown = Math.min(minHeight,categories.length-1)
//alert(h+" / "+pointWidths+"-"+series[0].data.length)
console.log(categories)
console.log(barW+" * "+categories.length+ " = "+pointWidths)
        console.log("Math.max("+Math.round(h/pointWidths)+", "+h/25)
        console.log("Math.min("+minHeight+", "+series[0].data.length)
        console.log(maxShown)
        console.log(categories.length-1)
*/

 //       console.log("pointWIdths ",pointWidths)
   //     console.log("categories.length ",categories.length)
        var j = 0;
        var asd = categories.length-1;
        for (var g;j < categories.length; j++) {
        //    console.log(h,"<",pointWidths)
            if(h < pointWidths) {
             //   len = (categories.length-j)*barW//(barW/categories.length);
              //   pointWidths = len*barPixels;
                pointWidths = len*barPixels*(categories.length-j)
                asd = categories.length-j
                scroller = true
            } else {
                break
            }

        }
/*
        console.log("barWidth ",barW)
        console.log(len)
        console.log(categories)
        console.log(j)
        console.log("maxShown ",asd)
        */
        var maxShown = asd

    //    alert(maxShown+ "-"+pointWidths)
   //     if(maxShown >= pointWidths-1)
     //   scroller = false
console.log(series)
        var chart = $('#bar-container').highcharts({
            chart: {
                accessibility: {
                    //        description: _("Pylväskuvio, joka kertoo avustusten jakautumisesta muuttujan ") + termit[window.PAGE.COLOR] + _(" mukaan.")
                    description: barkuvaus,
                    highContrastTheme: true
           /*         seriesDescriptionFormatter: function () {
                        return "Tämä on testi taas"
                    },
                    pointDescriptionFormatter: function () {
                        return "Tämä on testi taas toinen"
                    },
                    screenReaderDescriptionFormatter: function () {
                        return "Tämä on testi taas kolmas"
                    }
*/
                },
                type: 'bar',
       //         "zoomType": zoomType,
               // backgroundColor: "#ECE9E9",
                backgroundColor: "white",
                events: {
         //           selection: selectPointsByDrag,
                    beforePrint: function () {
                        console.log(this)
                        Highcharts.setOptions(enableCredits);
                    }
                },
                style: {
                    color: "black"
                }
            },
            accessibility: {
        //        description: _("Pylväskuvio, joka kertoo avustusten jakautumisesta muuttujan ") + termit[window.PAGE.COLOR] + _(" mukaan.")
                description: barkuvaus,
                pointDescriptionFormatter:function (p) {
                    if(p.category == p.series.name) {
                        return _(p.category) + ": " +p.options.y  +" euroa"
                    } else {
                        return _(p.category) + ", " +p.series.name  + ": " + p.options.y+" euroa"
                    }

                }
            },/*
            caption: {
                text: "Shows how apples have been more popular than oranges for the past 10 years. Oranges are gaining in popularity over the past 3 years, but are still far from as popular as apples."
            },*/
        //    "aria-label": "222222222",
            title: {
                //	text: 'Rahoituksen jakautuminen klustereittain'
                //	text: HankeVisBar.Options.sizeText
                //    text: _("Haettu rahoitus")
                text: titling()
            },
            subtitle: {
                text: function () {
               //     return subtitle.join("<br>");
                }()
            },
            xAxis: {
                categories: _translateArray(categories),
                max:maxShown,
                min:0,
                scrollbar: {
                    enabled: scroller
                },
                labels: {
                    style: {
                        fontSize: fontSize,
                        fontWeight: "normal",
                        color:'black'
                    },
                    step: 1
                }
            },
            yAxis: {
                min: 0,
                title: {
                    //	text: titling(unit)
                    text: subtitling("e"),
                    style: {
                        fontSize:fontSize,
                        color:'black'
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    var suffix = " €";
                    console.log(this.series.userOptions)
                    console.log(this)
                    return "<b>" + this.key + ",</b><br>" + this.series.name + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix+ ", "+this.series.userOptions.dataKpl[this.point.x] + _(" kpl")
                },
                outside: true,
                useHTML: true,
                backgroundColor: "rgba(246, 246, 246, 1)",
                style: {
                    opacity: 1,
                    background: "rgba(246, 246, 246, 1)"
                }
            },
            exporting: {
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
                sourceWidth: 900,
                sourceHeight: 700,
                filename: "erasmus+-avustukset",
                //    scale: 2,
                chartOptions: {
                    chart: {
                        backgroundColor: "#FFFFFF"
                    }
                },
                buttons: {
                    contextButton: {
                        text: lataaNappi
                 //       menuItems: ['downloadPNG', 'downloadJPEG','downloadSVG', 'separator', 'label']
                    }
                }
            },

            credits: {
                text: _('Lähde') + ': '+_('Erasmus+ -hanketietokanta'),
                href: null,
                enabled: true,
                style: {
                    color:"#1c1c1c ",
                    fontSize:"10px"
                }
            },
            legend: {
                //   backgroundColor: '#ECE9E9',
            //    accessibility:true,
                maxHeight: 250,
                backgroundColor: 'transparent',
                reversed: false,
                squareSymbol: true,
                symbolRadius:0,
                itemStyle: {
            //        color: '#000000',
                    fontSize: fontSize
                }
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
                    stacking: stacking(),
                    point: {
                        events: {
                            click: function () {
                             //   console.log(this)
                                console.log(this.category)
                              //  console.log(this.series.textStr)
                                console.log(this.series.name)
                           //     console.log(this.series)
                                $("#map-info").show();
                           //     MapVis.selected = this.id;
/*
                                doRouting({
                                    MAPVIEW: {
                                        SELECTED: MapVis.selected
                                    }
                                });*/
                                makeChartsInfo(this.category,this.series.name);
                            }
                        }
                    }
                },
                bar: {
                    //   pointWidth : 5
                    borderColor: "black",
                    borderWidth: 1
                }

            },
            series: series

        }).highcharts();

        var barwidth = $("#bar-container").width();
        var wheight = $("#bar-container").height();

        $("#bar-container svg").attr("aria-label",barkuvaus);
        $("#bar-container svg desc").html(" ")
        //  var chartx = $("#bar-container").highcharts();
        /*
        if (chart) {

            //   if (xAxisCategory === "Kunta") {
            if (series.length > 0 && series[0].data.length > 40) {

                zoomInfo(chart, '<b>' + _("Voit tarkentaa näkymää") + '</b>' +
                '<br>' + _("maalaamalla palkkeja pystysuoraan"));


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
        */

        if (xAxisCategory === "ColSel_Teema") {
//               console.log(chart.annotations.allItems[0].options)
            //              chart.annotations.allItems[0].options.title = "fff"
            //   zoomInfo("null", '');

            chart.setTitle(null, {
                //    text: ""
           //     text: _("(Yksittäinen hanke voi sisältää useampia kohderyhmiä. Kohderyhmiin kohdistettuja summia ei täten voi laskea yhteen.)")
                text: _("Listauksessa ovat mukana vain ne toiminnot, joissa teema määritellään. Teemaa ei määritellä korkeakoulutuksen liikkuvuudessa eikä ammatillisen koulutuksen akkreditoidussa liikkuvuudessa. Huomaathan, että sama hanke voi sisältää useita teemoja. Tällöin samat avustussummat voivat esiintyä useamman teeman kohdalla.")
            });
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
//console.log(series)
        for (var i = 0, l = series.length; i < l; ++i) {
            series[i].y = series[i].data.sum();
        }

        var piekuvaus = descriptionBuild('Piirakkakuvio',termit[window.PAGE.COLOR])

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
       //         description: _("Piirakkakuvio, joka kertoo avustusten jakautumisesta muuttujan ") + termit[window.PAGE.COLOR] + _(" mukaan.")
                description: piekuvaus,
                pointDescriptionFormatter:function (p) {
                    return _(p.options.name) + " " +p.options.y + " euroa"
                }
            },/*
            caption: {
                text: "Näyttää miten näitä on niin paljon enemmän kuin noita"
            },*/
            title: {
                //		text: HankeVisBar.Options.sizeText
                //    text: _('Haettu rahoitus')
                text: titling()
            },
            subtitle: {
                text: function () {
/*
                    var tmp = subtitle;
                    tmp.push(subtitling("e"));

                    return tmp.join("<br>");
                    */
                }(),
                style: {
                    fontSize:fontSize,
                    color:'black'
                }
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
                filename:"myonnetty-avustus",
                chartOptions:{
                    legend:{
                        enabled:true
                    }
                },
                menuItemDefinitions: {
                    downloadPNG: {
                        onclick: function () {
                            this.options.subtitle.text = subtitle.join("<br>")
                            this.exportChart(null, {legend:{enabled:true
                                }});
                        },
                        text: _('Lataa PNG-kuva')
                    },
                    downloadJPEG: {
                        onclick: function () {
                            this.options.subtitle.text = subtitle.join("<br>")
                            this.exportChart({
                                type: 'image/jpeg'
                            }, {legend:{enabled:true
                                }});
                        },
                        text: _('Lataa JPEG-kuva')
                    },
                    downloadPDF: {
                        onclick: function () {
                            this.options.subtitle.text = subtitle.join("<br>")
                            this.exportChart({
                                type: 'application/pdf'
                            }, {legend:{enabled:true
                                }});
                        },
                        text: _('Lataa PDF-dokumentti')
                    },
                    downloadSVG: {
                        onclick: function () {
                            this.options.subtitle.text = subtitle.join("<br>")
                            this.exportChart({
                                type: 'image/svg+xml'
                            }, {legend:{enabled:true
                                }});
                        },
                        text: _('Lataa SVG-kuva')
                    }

                },
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
                        text: lataaNappi
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
                text: _('Lähde') + ': '+_('Erasmus+ -hanketietokanta'),
                href: null,
                enabled: true,
                style: {
                    color:"#1c1c1c ",
                    fontSize:"10px"
                }
            },
            legend: {
                enabled:false,
                maxHeight: 250,
                backgroundColor: 'transparent',
                reversed: false,
                symbolRadius:0,
                itemStyle: {
                    fontSize:fontSize,
                    color:'black'
                }
                //     symbolRadius: 1,
                //     borderColor: "black"
            },
            tooltip: {
                formatter: function () {
                    console.log(this)
                    var suffix = " €";
                    //   return "<b>" + this.key + ",</b><br>" + this.series.name + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix
               //     return "<b>" + this.key + ":</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix;
                    return "<b>" + this.key + ":</b>"/* + this.series.name*/ + "</b><br>" + Highcharts.numberFormat(this.y, 0) + suffix+ ", "+this.point.kpl + _(" kpl")
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
                        enabled: true
                    },
                    showInLegend: true
                },
                series: {
                    point: {
                        events: {
                            click: function () {
                                   console.log(this)
                                console.log(this.category)
                                //  console.log(this.series.textStr)
                                console.log(this.series.name)
                                //     console.log(this.series)
                                $("#map-info").show();

                                makeChartsInfo(this.name,this.name);
                            }
                        }
                    }
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

    //    $("#circle-container").attr("aria-label",piekuvaus);
        $("#circle-container svg").attr("aria-label",piekuvaus);
        $("#circle-container svg desc").html(" ")

        console.log(HankeVisData)
        makeChartsInfo("start")

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

function makeChartsInfo(category, color,s) {

    'use strict';


    $('#map-info-wrapper').show()

    var title = "";

    if(category == "start") {

    } else {
        if (category !== color && category !== "Yhteensä")
            title = _(category) + ", "+_(color)
        else
            title =_(category)
    }

    var data = {
    //    townName: _(category) + ", "+_(color),
        townName: title,
        projects: [],
        yearProjects: [],
        skipCount: 0,
        //    partnerprojects: [],
        kunta: false
    };
    var area, vuodet = [];
    console.log(1)
    console.log(HankeVisData)
    console.log(MapVis.data)
    console.log(barTableData)

    MapVis.data = barTableData
    console.log(MapVis.data)
    for (var i = 0; i < MapVis.data.length; i++) {
        if (MapVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue


        var project = MapVis.data[i],
            view = project[window.PAGE.VIEW],
            colorC = project[window.PAGE.COLOR],
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
        }

/*
console.log(view)
console.log(colorC)
console.log(color)
console.log(category)
console.log(1111111111111111111)
*/

        var getSecondPart = function(str) {
            return _(str.split('_')[1]);
        }


     //   if (area === id) {
        if ((category === _(view) && color === _(colorC) || category=="start") || (window.PAGE.VIEW == "ColSel_Teema"  && view && view !== "" && view.indexOf(category) > -1) && color === _(colorC) ||  (window.PAGE.VIEW == "Avustusmuoto"  && _(category) == getSecondPart(view) && color === _(colorC)) ||  (window.PAGE.COLOR == "Avustusmuoto"  && _(color) == getSecondPart(colorC) && category === _(view)) || window.PAGE.COLOR == "Avustusmuoto"  && window.PAGE.COLOR == "Avustusmuoto" && _(color) == getSecondPart(colorC)) {
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
            vuodet.push(parseInt(vuosi))
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


    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

 //   MapVis.allowedYears = ["2014","2015","2016","2017","2018","2019","2020","2021","2022"]
    console.log(vuodet)
    MapVis.allowedYears = vuodet.filter(onlyUnique)
    MapVis.allowedYears.sort(function (a, b) {
            return b.value - a.value;
        });

    console.log(MapVis.allowedYears)
    $.each(MapVis.allowedYears, function (index, year) {
        data.yearProjects.push({
            year: year,
            projects: tmpData[year] || [],
            kunta:isitKunta
            // mainPartner: _("Päätoteuttajana")
            //    partner: _("Kumppanina")
        });
    });

 //   data.yearProjects.reverse();

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

            clickProject(projectIds,MapVis.data)
        });

    });

}




