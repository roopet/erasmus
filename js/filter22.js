/**
 * Created by Roope on 7.10.2019.
 */
var Array1;
var subtitle = [];
function filtering () {


    var filtered_unchecked = {
        TEEMA: [],
        AVUSTUSMUOTO: [],
        TOTEUTTAJA: [],
        SEKTORI: [],
        KUNTA: [],
        MAAKUNTA: [],
        VUOSI: []

    //    KIMPPA: []
    };

    //*
    var prev = null,
        i = 0;
    //  $.each($("#example-optgroup").multiselect("getAllItems"), function (key, value) {
    $.each($("#example-optgroup").multiselect("getChecked"), function (key, value) {
        console.log(value)
        if (value.value.indexOf("Kunta") > -1) {
            if (prev !== "Kunta") {
                prev = "Kunta";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.KUNTA.push(filt[1]);
            }
        } else if (value.value.indexOf("Maakunta") > -1) {
            if (prev !== "Maakunta") {
                prev = "Maakunta";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.MAAKUNTA.push(filt[1]);
            }
        } else if (value.value.indexOf("Teema") > -1) {
            if (prev !== "Teema") {
                prev = "Teema";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.TEEMA.push(filt[1]);
            }
        } else if (value.value.indexOf("Sektori") > -1) {
            if (prev !== "Sektori") {
                prev = "Sektori";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.SEKTORI.push(filt[1]);
            }
        } else if (value.value.indexOf("Avustusmuoto") > -1) {
            if (prev !== "Avustusmuoto") {
                prev = "Avustusmuoto";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.AVUSTUSMUOTO.push(filt[1]);
            }
        } else if (value.value.indexOf("Toteuttaja") > -1) {
            if (prev !== "Toteuttaja") {
                prev = "Toteuttaja";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.TOTEUTTAJA.push(filt[1]);
            }
        } else if (value.value.indexOf("Vuosi") > -1) {
            if (prev !== "Vuosi") {
                prev = "Vuosi";
                i = 0;
            }
            if (value.checked) {
                var filt = value.value.split("//");
                filtered_unchecked.VUOSI.push(filt[1]);
            }
        }
        i++;
    });
/*
    console.log(33333,filtered_unchecked)
    console.log(uniqueVuosi)
    if(filtered_unchecked.VUOSI.length == 0)
        filtered_unchecked.VUOSI = uniqueVuosi
*/
    doRouting({
        FILTER: filtered_unchecked
    });
}

function filterData (datax) {
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



    filtering()


    updateFilter(filtered_values1);

    data = datax.filter(function (el) {
        for (var a = 0, al = Array1.length; a < al; ++a) {
            if (Array1[a].indexOf("Teema") > -1) {
                //	var newparam = Array1[a].split("//");
                newparam3 = Array1[a].split("//");
                var testar = el.ColSel_Teema.split("_")
                //   if (el.ColSel_Teema === newparam3[1]) {
                var ftest = false
                for (var t in window.PAGE.FILTER.TEEMA) {
                    if (testar.indexOf(window.PAGE.FILTER.TEEMA[t]) > -1) {
                        ftest = true
                    }
                }

                return ftest
                /*
                 for (var t in testar) {
                 if (testar[t].indexOf(newparam3[1]) > -1) {
                 return true;
                 } else {
                 return false;
                 }
                 }
                 */
            }
        }
        return true
    })

    data = data.filter(function (el) {

        if (el.ColSel_Hanketyyppi === "Huono") {
            return false;
        }
        /*
        var testar = el.ColSel_Teema.split("_")
        if(window.PAGE.FILTER.TEEMA.length > 0)
        for (var t in testar) {
            if (window.PAGE.FILTER.TEEMA.indexOf(testar[t]) > -1) {
                return true;
            } else {
                return false
            }
        }
*/

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
            if (Array1[a].indexOf("Avustusmuoto") > -1) {
                //	var newparam = Array1[a].split("//");
                newparam6 = Array1[a].split("//");
                if (el.Avustusmuoto === newparam6[1]) {
                    return false;
                }
            }
            if (Array1[a].indexOf("Sektori") > -1) {
                //	var newparam = Array1[a].split("//");
                newparam7 = Array1[a].split("//");
                if (el.Sektori === newparam7[1]) {
                    return false;
                }
            }

        }
return true

    });

    return data
}

var updateFilter = function (filtered_values1) {
/*    console.log(filtered_values1)
    var Arrayx = [];
    Array1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, vuosiList, aviList, rahoittajaList);
    var Array2 = filtered_values1;
    for (var i = 0; i < Array2.length; i++) {
        var arrlen = Array1.length;
        for (var j = 0; j < arrlen; j++) {
            if (Array2[i] == Array1[j]) {
                Array1 = Array1.slice(0, j).concat(Array1.slice(j + 1, arrlen));
            }
        }
    }
*/
    if(filtered_values1.find(a =>a.includes("Vuosi")))
    console.log("el")
else
    for (var v in vuosiList) {
        if(typeof vuosiList[v] == "string")
            filtered_values1.push(vuosiList[v])
    }

    if(filtered_values1.find(a =>a.includes("Sektori")))
    console.log("el")
else
    for (var v in sektoriList) {
        if(typeof sektoriList[v] == "string")
            filtered_values1.push(sektoriList[v])
    }


    //   var el = filtered_values1.find(a =>a.includes("Vuosi"));



    var Arrayx = [];
    var Arrayz = [];
    Array1 = []

    var XArray1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, vuosiList,avustusmuotoList,sektoriList);
    var Array2 = filtered_values1;
    for (var i = 0; i < Array2.length; i++) {
        var filterer = Array2[i].split("//")[0]

        for (var j = 0; j < XArray1.length; j++) {
            if(XArray1[j].indexOf(filterer) > -1 && Array2[i] !== XArray1[j] && Array2.indexOf(XArray1[j]) == -1 && Arrayz.indexOf(XArray1[j]) == -1) {
                Arrayz.push(XArray1[j])
            }
        }
    }
    Array1 = Arrayz

/*
    if(Array1.find(a =>a.includes("Vuosi")))
    console.log("el")
else
    for (var v in vuosiList) {
        if(typeof vuosiList[v] == "string")
            Array1.push(vuosiList[v])
    }
*/
    subtitle = ["<b>"+_("Suodattimet:")+"</b>"];
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
            case "Sektori":
                origListLength = sektoriList.length+1;
                break;
            case "Vuosi":
                origListLength = vuosiList.length+1;
                break;
            case "Avustusmuoto":
                origListLength = avustusmuotoList.length;
                break;

        }



        if(name == "Teema") {
    //        name = "Avustusmuoto"
        } else if (name == "Rahoittaja") {
            name = "Toimiala"
        }


        if (origListLength !== total) {

            var rowLength = 0;
            var outputValues = [];

            for (var key in values) {

                if (!values.hasOwnProperty(key) || values[key] === undefined) {
                    continue;
                }

                var value = values[key];

                if(value.indexOf("_")> -1) {
                    value = value.split("_")[1]
                }

                rowLength += value.length;

                if (rowLength > 100) {
                    break;
                }

                outputValues.push(_(value));
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

console.log(output)
            subtitle.push(output);

        }
        var newText = subtitle.join("<br>")
        $("#suodatin").html(newText)
        $("#suodatin").css({color:"black"})

    }
/*
if(window.PAGE.TYPE == "map") {
    MapVis.settings.subtitle = {
        text: function () {
            return subtitle.join("<br>");
        }()
    };
}
*/
 //   if (Array1.length > 0/* || window.PAGE.COLOR == "ColSel_Teema" || window.PAGE.VIEW == "ColSel_Teema"*/) {

        var prev = null,
            currFiltered = [],
            currTotal = 0;
        /*
        if (window.PAGE.COLOR == "ColSel_Teema" || window.PAGE.VIEW == "ColSel_Teema") {
            prev = "Avustusmuoto"
            currFiltered[0] = "vain se tietty"
            currTotal = 1;
        }
*/


        for (var key in filtered_values1) {
            if (!filtered_values1.hasOwnProperty(key)) {
                continue;
            }

            var value = filtered_values1[key];

            if (typeof value !== "string") {

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
/*
    } else {
        $("#suodatin").html("-")
        $("#suodatin").css({color:"white"})
    }
*/
};
