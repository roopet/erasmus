// Copyright Vivid Information Ltd (Roope Tahvanainen)
var HankeVisData;



if (window.PAGE.TYPE === "circlesX" || window.PAGE.TYPE === "tags") {

    globalFuncs.doFilter = function (chart) {

    var multivalinta = $('#example-optgroup');

    var wwidth = $(window).width();

    var title;
    if (wwidth > 1365) {
        title = _("Rajaa hankkeiden määrää");
    } else {
        title = _("Rajaa");
    }

    multivalinta
        .multiselect({
            minWidth: "50px",
            header: "",
            checkAllText: _("Valitse kaikki"),
            uncheckAllText: _("Poista kaikki"),
            selectedText: title,
            position: {
                my: 'left top',
                at: 'left bottom'
            }
        })
        .bind("multiselectclick multiselectcheckall multiselectuncheckall multiselectoptgrouptoggle multiselectfilterfilter", function (event, ui) {
            //      var textFunc = $('#select-size').val();
            var textFunc = "amount";
            var func = funkkis;

        //    console.log("multivalinta triggered: %s %s", textFunc, func);

            var filtered_unchecked = {
                TEEMA: [],
                TOTEUTTAJA: [],
                KUNTA: [],
                MAAKUNTA: [],
                AVI: [],
                VUOSI: [],
                ERITYIS: []
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
                } else if (value.value.indexOf("Erityisavustus") > -1) {
                    if (prev !== "Erityisavustus") {
                        prev = "Erityisavustus";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.ERITYIS.push(i);
                    }
                } else if (value.value.indexOf("Avi") > -1) {
                    if (prev !== "Avi") {
                        prev = "Avi";
                        i = 0;
                    }
                    if (!value.checked) {
                        filtered_unchecked.AVI.push(i);
                    }
                }
                i++;
            });
            //*/

            doRouting({
                FILTER: filtered_unchecked
            });

            var filtered_values1 = $.map($(this).multiselect("getChecked"), function (ui) {
                return ui.value;
            });
            if (filtered_values1.length <= 0) {
                filtered_values1.push("empty");
            }
         //   chart.updateFilter(filtered_values1, func, textFunc);
            globalFuncs.updateFilter(filtered_values1, func, textFunc);
            if (!func && window.PAGE.TYPE === "circles") {
                return window.get_chart().display_group_all(textFunc);
            }
        });

        function insertAfter(referenceNode, newNode) {
            console.log(referenceNode)
            console.log(newNode)

            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        var eli = $(".ui-multiselect-menu")
        var nap = $("#example-optgroup_ms")
//console.log($filterInput)
//console.log(eli)
        insertAfter(nap[0],eli[0])
     //   insertAfter(eli[0],$filterInput)

};
    globalFuncs.doFilter()

    globalFuncs.updateFilter = function(filtered_values1, func, textFunc) {


   var Arrayx = [], chart;
        if (window.PAGE.TYPE === "circles") {
            chart = d3.select("#vis")
        } else if (window.PAGE.TYPE === "tags") {
            chart = d3.select("#tags-container")
        }

        var Array1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, aviList, vuosiList, rahoittajaList,erityisList);
        //   var Array1 = ["Rahasto/Aluekehitysrahasto", "Rahasto/Sosiaalirahasto", "Rahasto/Maaseuturahasto", "Viranomainen/ELY-keskus", "Viranomainen/Maakuntaliitto", "Viranomainen/Tekes"] + toteuttajaList
        var Array2 = filtered_values1;
        for (var i = 0; i < Array2.length; i++) {
            var arrlen = Array1.length;
            for (var j = 0; j < arrlen; j++) {
                if (Array2[i] === Array1[j]) {
                    Array1 = Array1.slice(0, j).concat(Array1.slice(j + 1, arrlen));
                }
            }
        }

        var subtitle = [];
        function handleOutputting(name, values, total) {
            if (name == "empty") {
                return;
            }


            var origListLength = 0, output = "";

            switch (name) {
                case "Kunta":
                    origListLength = kuntaList.length;
                    break;
                case "Maakunta":
                    origListLength = maakuntaList.length;
                    break;
                case "Avustusmuoto":
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
                case "Erityisavustus":
                    origListLength = erityisList.length;
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

        var foundSomething = false;
        var nodes = chart.selectAll("circle")
        nodes.each(function (d) {
       // this.circles.each(function (d) {
            var element, match;
            element = d3.select(this);
            match = (function () {
                for (var a = 0, al = Array1.length; a < al; ++a) {
                    var newparam;
                    /*     if (Array1[a].indexOf("Rahasto") > -1) {
                     newparam = Array1[a].split("//");
                     if (d.rahasto == newparam[1]) return false;
                     }
                     if (Array1[a].indexOf("Viranomainen") > -1) {
                     newparam = Array1[a].split("//");
                     if (d.viranomainen == newparam[1]) return false;
                     }*/
                    if (Array1[a].indexOf("Toteuttaja") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.toteuttaja === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Teema") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.teema === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Kunta") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.kunta === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Maakunta") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.maakunta === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Avi") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.avi === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Vuosi") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.hvuosi === newparam[1]) return false;
                    }
                    if (Array1[a].indexOf("Rahoittaja") > -1) {
                        newparam = Array1[a].split("//");
                        if (d.tyyppi === newparam[1]) return false;
                    }

                }
                return true;
            })();
            if (match) {

                if (textFunc === "osalyritykset") {
                    d.radius = d.osalyrit_radius;
                } else if (textFunc === "organisaatiot") {
                    d.radius = d.osalorg_radius;
                } else if (textFunc === "aloittaneet") {
                    d.radius = d.aloit_radius;
                } else if (textFunc === "työpaikat") {
                    d.radius = d.tyop_radius;
                } else if (textFunc === "uudetyritykset") {
                    d.radius = d.yrit_radius;
                } else if (textFunc === "Toteutunut EU- ja valtion tuki") {
                    d.radius = d.orig_radius;
                } else {
                    var textRadius = textFunc + "_radius",
                        textValue = textFunc + "_value";

                    d.radius = isNaN(d[textRadius]) ? 0 : d.orig_radius;
                }

                d[textValue] = parseFloat(d[textFunc]);

                d.value = parseFloat(d.amount);
                d.lkm_value = parseFloat(d.lkm);
                d.radius = d.orig_radius;

                element.transition().duration(2000).attr("r", d.radius);
                foundSomething = true;
                return d.searched = true;
            } else {
                var textValue2 = textFunc + "_value";

                d.value = 0;
                d.lkm_value = 0;
                d.radius = 0;

                d[textValue2] = 0;
                element.transition().duration(2000).attr("r", 0);
                d.searched = false;
            }
      //      BubbleChart.prototype.charge(d);
            HankeVisTags.charge(d);
        });

        if (!foundSomething) {
            $('#subtitle').html(_("Ei rajausta vastaavia hankkeita"));
        } else {
            $('#subtitle').html(subtitle.join('<br>'));
        }

        if (window.PAGE.TYPE === "circles") {
            return window.get_chart().arrange_circles(func, textFunc);
        }
 //       return window.get_chart().arrange_circles(func, textFunc);
    };

$("#search").keyup(function () {
    var searchTerm,chart;
    searchTerm = $(this).val();
    if (window.PAGE.TYPE === "circles") {
        chart = d3.select("#vis")
    } else if (window.PAGE.TYPE === "tags") {
        chart = d3.select("#tags-container")
    }

 //   return chart.updateSearch(searchTerm);
    return globalFuncs.projectSearch(searchTerm, chart);
});

    var chosenSelector = $(".chosen-select");
    chosenSelector.chosen({
        disable_search: false,
        no_results_text: _("Etsimääsi kohderyhmää ei löydy")
    });

    chosenSelector.change(function (evt, params) {
        var vals = $(this).val() || [];
        var valsString = "";
        var searchtesti = vals;
        var chart;
        if (window.PAGE.TYPE === "circles") {
            chart = d3.select("#vis")
        } else if (window.PAGE.TYPE === "tags") {
            chart = d3.select("#tags-container")
        }
        if (vals.length > 0) {
            valsString = vals.join(", ");
        }
        return globalFuncs.searchKohderyhma(searchtesti, chart);
    });

    globalFuncs.searchKohderyhma = function (searchtestiArr, chart) {

        var nodes = chart.selectAll("circle")
        return nodes.each(function (d) {
            var element, match;
            element = d3.select(this);
            match = (function () {
                for (var i = 0, l = searchtestiArr.length; i < l; ++i) {
                    var searchRegEx = new RegExp(searchtestiArr[i].toLowerCase());
                    if (d.kohderyhma.toLowerCase().search(searchRegEx) >= 0) {
                        return true;
                    }
                }
                return false;
            })();

            if (match) {
                element.style("stroke-opacity", 1).style("fill-opacity", 1);
                return d.searched = true;
            } else {
                d.searched = false;
                element.style("stroke-opacity", 0.1).style("fill-opacity", 0.1);
            }

            if (searchtestiArr.length <= 0) {
                element.style("stroke-opacity", 1).style("fill-opacity", 1);
                return d.searched = true;
            }
        });
    };


globalFuncs.projectSearch = function (searchTerm, chart) {
    var searchRegEx;
    searchRegEx = new RegExp(searchTerm.toLowerCase());
    var nodes = chart.selectAll("circle")
    return nodes.each(function (d) {

        var element, match;
        element = d3.select(this);
    //    element = chart.selectAll("circle")
        match = d.name.toLowerCase().search(searchRegEx);

        if (searchTerm.length > 0 && match >= 0) {
            element.style("stroke-width", 6.0);  //  #000000
            return d.searched = true;
        } else {
            d.searched = false;
            element.style("stroke-width", 2.0);
        }
    });
};
    /*
    $(function () {
    var chosenSelector = $(".chosen-select");
    chosenSelector.chosen({
        disable_search: false,
        no_results_text: _("Etsimääsi kohderyhmää ei löydy")
    });

    chosenSelector.change(function (evt, params) {
        var vals = $(this).val() || [];
        var valsString = "";
        var searchtesti = vals;
        if (vals.length > 0) {
            valsString = vals.join(", ");
        }
        return chart.updateSearchx(searchtesti);
    });
    });
*/
    globalFuncs.show_details = function (data, i, element,tagstoCompare) {
        var url = data.link;
  //      console.log(data)

        switch (window.PAGE.LANG) {
            case "fi":
                url = "http://" + url + "?language=fi";
                break;
            case "se":
                url = "http://" + url + "?language=sv";
                break;
            case "en":
                url = "http://" + url;
                break;
        }

        var content;
//			if ('ontouchstart' in document.documentElement) {
        d3.select(element).attr("stroke", "red");
        content = "<span class=\"name\">" + data.name + "</span><br/><br/>";

        var transKohderyhmat = data.kohderyhma.split(',');
        for (var j = 0; j < transKohderyhmat.length; j++) {
            transKohderyhmat[j] = _(transKohderyhmat[j]);
        }

        transKohderyhmat = transKohderyhmat.join(", ");

        var transTags = data.tag.split(',');
        for (var b = 0; b < transTags.length; b++) {
            if (layout=="radial" && tagstoCompare.indexOf(transTags[b]) > -1)
            transTags[b] = "<b><u>"+_(transTags[b])+"</u></b>";
            else
                transTags[b] = _(transTags[b]);
        }

        transTags = transTags.join(", ");

        content += "<span class=\"name\">" + _("Toteuttajan nimi") + ":" + "</span><span class=\"value\"> " + _(data.toteuttaja) + "</span><br/>";
        content += "<span class=\"name\">" + _("Teema") + ":" + "</span><span class=\"value\"> " + _(data.teema) + "</span><br/>";
        content += "<span class=\"name\">" + _("Maakunta") + ":" + "</span><span class=\"value\"> " + _(data.maakunta) + "</span><br/>";
        content += "<span class=\"name\">" + _("Kunta") + ":" + "</span><span class=\"value\"> " + _(data.kunta) + "</span><br/>";
        if (window.PAGE.VIS !== "good-practices") {
            content += "<span class=\"name\">" + _("Vaikutusalue") + ":" + "</span><span class=\"value\"> " + _(data.vaikutusalue) + "</span><br/>";
        }
        content += "<span class=\"name\">" + _("Kohderyhmät") + ":" + "</span><span class=\"value\"> " + transKohderyhmat + "</span><br/>";

        if (window.PAGE.VIS !== "good-practices") {
            content += "<span class=\"name\">" + _("Rahoittaja") + ":" + "</span><span class=\"value\"> " + _(data.tyyppi) + "</span><br/>";
        }

        content += "<span class=\"name\">" + _("Vuosi") + ":" + "</span><span class=\"value\"> " + data.hvuosi + "</span><br/>";
        if (window.PAGE.VIS !== "good-practices") {
            if (window.PAGE.VIS !== "projects") {
                content += "<span class=\"name\">" + _("Haettu avustus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.amount))) + "</span><br/>";
            } else {
                content += "<span class=\"name\">" + _("Myönnetty avustus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.amount))) + "</span><br/>";
            }
        }

        if (window.PAGE.VIS === 'new-projects') {
            content += "<span class=\"name\">" + _("Oma rahoitus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.omarah))) + "</span><br/>";
        }

        content += "<br><span class=\"name\">" + _("Asiasanat") + ":" + "</span><span class=\"value\"> " + transTags + "</span><br/>";

        if ('ontouchstart' in document.documentElement) {
            content += "<br><a href='" + url + "' target='_blank'>" + _("Tutustu hankkeeseen tarkemmin") + "</a>";
        }

        if ('ontouchstart' in document.documentElement) {
            content += "<span id='close' onclick='tooltip.hideTooltip(); return false;'>x</span>";
        }
        tooltip.showTooltip(content, d3.event);
//        return d3.select(element).move_to_front();
    };

    globalFuncs.hide_details = function (data, i, element) {
        d3.select(element).attr("stroke", '#303030');
        return tooltip.hideTooltip();
    };

}

var clickProject = function (projectId/*,data*/) {
    console.log(projectId)
    var data  = HankeVisData
var rahoitus,haettu;


    var modalData = {
    //    townName: _(id),
        townName: projectId,
        project: null,
        translations: {
            "toteuttaja": _("Organisaatio"),
            "vuosi": _("Myöntövuosi"),
            "kunta": _("Kunta"),
            "teema": _("Teema"),
            "avustusmuoto": _("Toimintotyyppi"),
            "kieli": _("Kieli"),
            "date": _("Hankkeen sopimuskausi"),
            "projNumber": _("Hankkeen numero"),
            "toteutusalue": _("Toteutusalue"),
            "vaikutusalue": _("Vaikutusalue"),
            "avustus": _("Myönnetty tuki"),
            "link": _("Hankkeen Erasmus+ -sivuille"),
            kohderyhmat: _("Luokittelu"),
            kirjastoasiasanat: _("Asiasanat"),
            sulje: _("Sulje"),
            kuvaus: _("Hankkeen tiivistetty kuvaus:")

        }
    };

    for (var i = 0; i < data.length; i++) {
        var project = data[i], currentId;
        if(window.PAGE.TYPE == "circles") {
            currentId = project['id'].replace(/[ ]/g,"");
            currentId = project['id']//.replace(/[ ]/g,"");
        } else {
            currentId = project['id']
        }

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

        var rege = /_/g
     //   project.KohdeRyhma = project.KohdeRyhma.replace(rege,"")
     //   project.KohdeRyhma = project.ColSel_Teema.replace(rege,", ")
        // Lisää vielä Luvia -> Eurajoki
        console.log(project)
        var transKohderyhmat = project.ColSel_Teema.split('_');
        for (var j = 0; j < transKohderyhmat.length; j++) {
            transKohderyhmat[j] = _(transKohderyhmat[j]);
        }
        project.KohdeRyhma = transKohderyhmat.join(", ");
      //  project.KohdeRyhma

        if (projectId == currentId) {
console.log(project)
            if (project.ColSel_Hanketyyppi === "ELY" || project.ColSel_Hanketyyppi === "Hyvä") {
                project.ColSel_Hanketyyppi = "ELY / AVI";
            }

            if(project.link.indexOf("_") > -1) {
                console.log(project.link.match(/^(.*?)\_/))
                project.link = project.link.match(/^(.*?)\_/)[1]
            }
/*
            console.log(project.Avustusmuoto)
            console.log(project.Avustusmuoto)
            console.log(project.Avustusmuoto.match(/_(.*)/)[1])
            console.log(_(project.Avustusmuoto.match(/_(.*)/)[1]))
*/
            modalData.project = {
                hanke_name: project.hanke_name,
             //   ColSel_Vuosi: project.ColSel_Vuosi.substr(0, 4),
                ColSel_Vuosi: project.ColSel_Vuosi,
                //   ColSel_Vuosi: project.ColSel_Vuosi.substr(0, 5),
                amount: Highcharts.numberFormat(project.amount, 0),
                oma: Highcharts.numberFormat(project.oma, 0),
                ColSel_Teema: _(project.KohdeRyhma),
                Avustusmuoto: _(project.Avustusmuoto.match(/_(.*)/)[1]),
                Kunta: _(project.Kunta),
                KuntaID: project.Kunta,
                ColSel_Maakunta: _(project.ColSel_Maakunta),
                Toteuttaja: _(project.Toteuttaja),
                toteutusalue: _(project.ToteutusAlueX),
             //   toteutusalueX: _(project.ToteutusAlueX),
                ColSel_Vaikutusalue: _(project.ColSel_Vaikutusalue),
                ColSel_Aluehallintovirasto: _(project.ColSel_Aluehallintovirasto),
                ColSel_Hanketyyppi: _(project.ColSel_Hanketyyppi),
                Erityisavustus: _(project.Erityisavustus),
                kuvailu: project.KuvausTeksti || project.TiivistettyKuvausHankkeestaTeksti,
          //      link: "https://ec.europa.eu/programmes/erasmus-plus/projects/eplus-project-details/#project/" +project.link,
                link: "https://erasmus-plus.ec.europa.eu/projects/search/details/" +project.link,
                date: project.date,
                ProjectCode:project.ProjectCode,
                kirjastoasiasanat: project.AsiaSana,
                kirjastokohderyhma: project.KohdeRyhma,
                liikkohderyhma: project.KohdeRyhma,
                liikpaiktyyppi: project.liikpaiktyyppi,
                pajanuoret: project["K_47_valmentautuja_Nuoria_yht"],
                pajalaiset: project["K_47_valmentautuja_yhteensä_yht"],
                pajahtv: project["K_43_Henk_htv_yhteensä_yht"],
                kerhoOsall: project["KerhotoimintaanOsallistuvatYhteensaLkm"],
                leiriOsall: project["PaivaleiritoimintaanOsallistuvatYhteensaLkm"],
                kerhot: project["KerhojenMaaraYhteensaLkm"],
                leirit: project["PaivaleirienMaaraLkm"]
            };

            if(project.ColSel_Teema !== "Liikunnallinen elämäntapa")
                modalData.project.liikkohderyhma = false

            if(project.ColSel_Teema !== "Liikuntapaikkarakentaminen")
                modalData.project.liikpaiktyyppi = false

/*
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
            }*/
/*
            var kohderyhmat = project.Kohderyhma.split(',');
            kohderyhmat = $.map(kohderyhmat, function (val) {
                return _(val);
            });

            modalData.project.Kohderyhma = kohderyhmat.join(', ');
*/
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
        //    if(modalData.project.ColSel_Hanketyyppi == "Kirjasto")
            console.log(modalData.project.ColSel_Vuosi)
            if(modalData.project.kuvailu && modalData.project.ColSel_Vuosi == 2020 || modalData.project.ColSel_Hanketyyppi == "Kirjasto")
            modalData.kuvailu = modalData.project.kuvailu;
console.log(modalData.project)
            break;
        }
    }
    var modalSource = $('#map-info-modal-template').html(),
        modalTemplate = Handlebars.compile(modalSource),
        modalContainer = $('#map-info-details');
    modalContainer.html(modalTemplate(modalData));

    $('#map-info-modal').foundation('reveal', 'open');
    $('#map-info-modal').attr("aria-hidden","false");

    //    console.log('MODAL %d %o', projectId, modalData);

    if (window.PAGE.VIS !== "new-projects") {
        //         document.getElementById("mapModal").deleteRow(8);
    }

    var miniMap = {
        settings: {
            title: "Toteuttajakunnat",
            chart: {
                //    backgroundColor: "#EBE8E8"
                backgroundColor: "white"
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


    //   miniMap.settings.chart.width =  $('#minimap-wrapper').width()
    if (wwidth < threashold) {
        miniMap.settings.chart.width = $('#map-info-modal').width()
    } else {
        miniMap.settings.chart.width = $('#map-info-modal').width() * 0.4
    }
console.log(modalData)
    miniMap.settings.chart.height = $('#map-info-modal').height() * 0.9
    console.log(miniMap.settings.chart.width)
    miniMap.settings.series = getOrganizers(modalData.project.KuntaID, modalData.project.Osatoteuttajat,modalData.project.toteutusalue);
    console.log(miniMap.settings.series)

    if (modalData.project.Osatoteuttajat) {
        miniMap.settings.colorAxis.dataClasses = [
            /*        {
                    from: 1,
                    to: 2,
                    color: '#0571B0',
                    name: _("Päätoteuttaja")
                }, */{
                from: 0,
                to: 1,
                color: '#a6bddb',
                name: modalData.project.Kunta
            }];
    } else {
        miniMap.settings.colorAxis.dataClasses = [{
            from: 1,
            to: 2,
            color: '#0571B0',
            name: modalData.project.Kunta
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

    $('#map-info-modal').focus()
}
$("#buttoni").click(function(){
    $("#table").table2excel({
        // exclude CSS class
        exclude: ".noExl",
        name: "Worksheet Name",
        filename: "SomeFile", //do not include extension
        fileext: ".xls" // file extension
    });
});

function ExportToExcel(type, fn, dl) {
    var elt = document.getElementById('table');
    var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1", skipHeader:true });
    console.log(elt)
    console.log(wb)
    console.log(wb["Sheets"])
    console.log(wb["Sheets"]["sheet1"])
    console.log(wb["Sheets"]["sheet1"]["B3"])
    console.log(wb["Sheets"]["sheet1"]["B4"])
/*
    $.each(wb["Sheets"]["sheet1"], function (index, project) {
        if (project.v == "Organisaatio")
            $(this).remove()
    })
*/



    wb["Sheets"]["sheet1"]["A3"].l = { Target: "https://sheetjs.com", Tooltip: "Find us @ SheetJS.com!" };


    return dl ?
        XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
        XLSX.writeFile(wb, fn || ('MySheetName.' + (type || 'xlsx')));
}


var tableToExcel2 = (function(table,name) {
    var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office"xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c)
    {
        return s.replace(/{(\w+)}/g, function(m, p) { return c[p];
        })
    }

    return function(table, name) {

        if (!table.nodeType) table = document.getElementById(table)

        var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}

        window.location.href = uri + base64(format(template, ctx))
    }

})()


var tablesToExcel = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
        , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
            + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
            + '<Styles>'
            + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
            + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
            + '</Styles>'
            + '{worksheets}</Workbook>'
        , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
        , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(tables, wsnames, wbname, appname) {
        var ctx = "";
        var workbookXML = "";
        var worksheetsXML = "";
        var rowsXML = "";

        for (var i = 0; i < tables.length; i++) {
            if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
            for (var j = 0; j < tables[i].rows.length; j++) {

                rowsXML += '<Row>'
                for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                    var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                    var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                    var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                    dataValue = (dataValue)?dataValue:tables[i].rows[j].cells[k].innerHTML;
console.log(dataValue)
console.log(dataType)
                    if (dataValue.indexOf("href") > -1) {
             //           console.log(tables[i].rows[j].cells[k])
           //             console.log(tables[i].rows[j].cells[k].getAttribute("data-formula"))
                        dataValue = dataValue.match(/>(.*?)<\/a>/)[1];
               //         dataValue = '=HYPERLINK("http://www.bing.com")';
                 /*       dataValue  = {
                            textToDisplay: "cellText",
                            screenTip: "Search Bing for '" + "cellText" + "'",
                            address: "https://www.bing.com?q=" + "cellText"
                        }*/
                    }
                    var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                    dataFormula = (dataFormula)?dataFormula:(appname=='Calc' && dataType=='DateTime')?dataValue:null;
                    ctx = {  attributeStyleID: (dataStyle=='Currency' || dataStyle=='Date')?' ss:StyleID="'+dataStyle+'"':''
                        , nameType: (dataType=='Number' || dataType=='DateTime' || dataType=='Boolean' || dataType=='Error')?dataType:'String'
                        , data: (dataFormula)?'':dataValue
                        , attributeFormula: (dataFormula)?' ss:Formula="'+dataFormula+'"':''
                    };
                    rowsXML += format(tmplCellXML, ctx);
                }
                rowsXML += '</Row>'
            }

            ctx = {rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i};
            worksheetsXML += format(tmplWorksheetXML, ctx);
            rowsXML = "";
        }

        ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
        workbookXML = format(tmplWorkbookXML, ctx);



        var link = document.createElement("A");
        link.href = uri + base64(workbookXML);
        link.download = wbname || 'Workbook.xls';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})();
