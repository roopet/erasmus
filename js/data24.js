/**
 * Created by Roope on 20.10.2020.
 */
var thlRegions = {}, kuvaukset,maakunnat = {}, selectDatabase;

$(function () {


    var mvwidth = wwidth * 0.14;
    $('.ui-multiselect .ui-widget .ui-state-default .ui-corner-all').css('width', mvwidth);

    var title;
    if (wwidth > 1365) {
        title = _("Rajaa hankkeiden määrää");
    } else {
        title = _("Rajaa");
    }

    //    $("#copyLink").hide()
var origmultiHeight;


    console.log("start filterinput", wwidth)
    $filterInput
        .multiselect({
            header: ['uncheckAll'],
            placeholder: "Syötä hakusana",
            groupsCollapsable: true,
            groupsSelectable: false,
            listbox: true,
            resizableMenu:true,
            menuHeight:"auto",
            //       selectedText: title,
            checkAllText: _("Valitse kaikki"),
            uncheckAllText: _("Poista kaikki"),
            collapsetoggle: function(tt){
           /*     console.log(this)
                console.log(tt)

                console.log($('li.ui-multiselect-optgroup').height())
                console.log($('li.ui-multiselect-optgroup'))*/
                var uis = $('li.ui-multiselect-optgroup')
                var newHeight = 0
                //      li.ui-multiselect-optgroup:nth-child(4) > ul:nth-child(3)
                for (var t in uis) {
                    if(typeof uis[t].clientHeight == 'number')
                    newHeight +=uis[t].clientHeight
                }
                var minHeight = Object.keys(window.PAGE.FILTER).length * 28

                var newHeights = Math.max(newHeight,origmultiHeight)
                $filterInput.height(newHeights )
                $('#multivalinta').height(newHeights )
                $('.ui-multiselect-checkboxes').first().height(newHeights )
                $('.ui-multiselect-menu').first().height(newHeights )
            }

            /*     open: function () {
             var multiselectHelpContainer = $('#multiselect-help-container');

             multiselectHelpContainer.append(
             '<div class="joyride-tip-guide" style="display: block; visibility: visible;">' +
             '<div class="joyride-content-wrapper">' +
             //      "<span id='close-white' onclick='this.tooltip.hideTooltip(); return false;'>x</span>" +
             "<span id='close-filter-help'>x</span>" +
             //      "<span class='ui-icon ui-icon-circle-close' onclick='this.tooltip.hideTooltip(); return false;'></span>" +
             '<p style="">' +
             _('Muuttujat on jaoteltu väliotsikoihin ja väliotsikon nimeä klikkaamalla voi poistaa kaikki sen alaiset valinnat tai uudestaan klikkaamalla palauttaa takaisin. Yksittäisiä muuttujia voit poistaa tai lisätä ottamalla ruksin pois tai lisäämällä sen takaisin.') +
             '</p>' +
             '</div>' +
             '</div>'
             );

             var filterRow = $('.ui-multiselect-menu').first(),
             offset = filterRow.offset(),
             width = filterRow.width();

             $('.joyride-tip-guide', multiselectHelpContainer)
             .css({
             top: (offset.top) + 'px',
             left: (offset.left + width + 50) + 'px'
             });
             },*/
            /*
             close: function () {
             var multiselectHelpContainer = $('#multiselect-help-container');
             multiselectHelpContainer.empty();
             }*/
        })
        .multiselectfilter();

    filtered_values1 = $filterInput.val();
    origmultiHeight = $('#multivalinta').height()*0.9

/*
    var inputi = document.getElementsByClassName("ui-multiselect-optgroup");

// Execute a function when the user releases a key on the keyboard
    inputi.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        alert(event)
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            console.log(this)
            // Trigger the button element with a click
            this.click();
        }
    });
*/
    var kimppadata;

    function countInArray(array, what) {
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            if (array[i] === what) {
                count++;
            }
        }
        return count;
    }


    selectDatabase = function (kausi) {
    //    var url = 'data/erasmus25112020.csv';
    //    var url = 'data/erasmus230321.csv';
   //     var url = 'data/erasmus020621.csv';
        var url, map,maakuntamap,teemat = {};

        if (kausi == "2014-2020") {
            url = 'data/erasmus261021.csv';
            map = 'data/kuntarajat2017.geojson';
            maakuntamap = "data/maakuntalines2016.geojson";
        } else {
       //     url = 'data/erasmus221222.csv';
       //     url = 'data/erasmus170724_kopio.csv';
            url = 'data/erasmus170724.csv';
            map = 'data/kuntarajat2021.geojson';
            maakuntamap = "data/maakuntarajat2021.geojson";

            $.get('data/teemat.csv',
                function (csv) {
                    csv = csv.replace(new RegExp("\t", 'g'), "");
                    //v3
                    var datat = d3.csv.parse(csv);
                    $.each(datat, function (index, project) {
                        if (window.PAGE.LANG == "en") {

                            teemat[project["Topic Code"]] = project["Teema in English"]
                        } else if  (window.PAGE.LANG == "se"){
                            teemat[project["Topic Code"]] = project["Teema in Swedish"]
                        } else {
                            teemat[project["Topic Code"]] = project["Teema"]
                        }


                });
                });
        }


        $.ajax({
            url: map,
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        })
            .done(function (data) {
                MapVis.kuntarajat = data[0];
                MapVis.maakuntarajat = data[1];
                //    MapVis.maakuntarajat = Highcharts.geojson(data[1], 'mapline');
            //    MapVis.avirajat = data[2];
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
            url: maakuntamap,
            async: false,
            dataType: 'json'
        })
            .done(function (data) {
                MapVis.maakuntaLines = data[0];
                MapVis.aviLines = data[1];
            })
            .fail(function () {
                console.log("Ajax failed to fetch data");
            });

        $.get(url,
            function (csv) {
                csv = csv.replace(new RegExp("\t", 'g'), "");
                //v3
                var data = d3.csv.parse(csv);

                /*
                 data.filter(function(el) {
                 //    console.log(el)
                 return el["Myönnetty Avustus"] !== "0"
                 })
                 */
/*
                var filtteri = {
                    //         amount: '0',
                    AviKoodi: ''
                };


                data= data.filter(function(item) {

                    for (var key in filtteri) {
                        if (item[key] === undefined || item[key] == filtteri[key])
                            return false;
                    }
                    return true;
                });
*/

                var counter = 0;
                /*
                data= data.filter(function(project) {

                    if(project["ActionType"] == "KA120-ADU" || project["ActionType"] == "KA120-SCH" || project["ActionType"] == "KA120-VET") {

                        return false
                    }

                    return true;
                });
*/

                $.each(data, function (index, project) {

                    project.id = project["ProjectCode"]
                    project.ColSel_Vuosi = project["CallYear"]
                //    project.ColSel_Teema = project["Theme"]
                    if (kausi == "2014-2020") {
                        project.ColSel_Teema = project["TopicDescriptions"] || project["Topic Name"] || ""

                    } else {
                    //    console.log(teemat)
                    //    console.log(project["Topic Code"])
                        if (project["Topic Code"] == "#PUUTTUU" || project["Topic Code"] == "#PUUTTUU!" || project["Topic Code"] == "#NIMI?") {
                            project.ColSel_Teema = ""
                        } else if (project["Topic Code"] == "#N/A") {
                            project.ColSel_Teema = ""
                        } else if (project["Topic Code"] == "") {
                            project.ColSel_Teema = ""
                        } else if (project["Topic Code"].includes("_")) {
                            var parru = project["Topic Code"].split("_");
                            var stringi = [];
                            for (var ff in parru) {
                                if(typeof parru[ff]=== "string")
                                    stringi.push(teemat[parru[ff]])

                            }
                            project.ColSel_Teema = stringi.join('_')
                        } else {
                            project.ColSel_Teema = teemat[project["Topic Code"]]
                        }

                    }



                    project.OrganisationType = project["OrganisationType"]

                    if(project["ActionType"] == "KA226-HE") {
                        project["ActionTypeDescription"] = "Partnerships for Digital Education Readiness for higher education"
                    } else if (project["ActionType"] == "KA227-ADU") {
                        project["ActionTypeDescription"] ="Partnerships for Creativity for adult education"
                    } else if (project["ActionType"] == "KA226-VET") {
                        project["ActionTypeDescription"] ="Partnerships for Digital Education Readiness  for vocational education and training"
                    } else if (project["ActionType"] == "KA227-SCH") {
                        project["ActionTypeDescription"] ="Partnerships for Creativity for school education"
                    } else if (project["ActionType"] == "KA226-SCH") {
                        project["ActionTypeDescription"] ="Partnerships for Digital Education Readiness for school education"
                    }else if (project["ActionType"] == "KA227-YOU") {
                        project["ActionTypeDescription"] = "Partnerships for Creativity for youth"
                    }


             //       project["ActionTypeDescription"]= project["ActionTypeDescription"].replace(/\(.*/,"")
             //       project["ActionTypeDescription"].trim()

                    project["ActionTypeDescription"]= cleanText(project["ActionTypeDescription"])
console.log(123)
                    project.Avustusmuoto = project["ActionType"]+"_"+project["ActionTypeDescription"] + " ("+ project["ActionType"]+ ")"
                    project.ColSel_Kieli = "suomenkielinen"
                    project.Toteuttaja = cleanText(project["NameInLatinCharacterSet"])
                    project.date = project["ProjectStartDate"]+ " - "+project["ProjectEndDate"]
               //     project.projNumber = project["ProjectCode"]
                    //     project.ColSel_Kieli = project.Kieli
                    project.hanke_name = project["ProjectTitle"]
              //      project.ColSel_Aluehallintovirasto = project["HankeTaiToimintaNimi"]
                    project.ColSel_Maakunta = project["CountryRegionDescription"]
                    project.Kohderyhma = project["TopicDescriptions"] || ""

                    if(project.ColSel_Maakunta == "Aland Islands" || project.ColSel_Maakunta == "Åland") {
                        project.ColSel_Maakunta = "Ahvenanmaa"
                    }
                    if(project.ColSel_Maakunta == "Helsinki-Uusimaa") {
                        project.ColSel_Maakunta = "Uusimaa"
                    }

                    if(project.hanke_name == "") {
                        project.hanke_name = _("(linkki hankkeen sivulle)")
                    }

/*
                    if(project.ColSel_Teema == "") {
                        project.ColSel_Teema = "Teemaa ei ole määritelty"
                    }
*/
              //      if(sweFin[project.Kunta])
              //          project.Kunta = sweFin[project.Kunta].fin
                    //   else
                    function capitalizeFirstLetter(string){
                        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
                    }

                           project.Kunta = capitalizeFirstLetter(project["City"])

                   project.ToteutusAlue = project.Toteutusalue || project.YhteistyotahotTeksti
                   project.link = project.ProjectCode

                    project.amount = project["Initial awarded grant(IAG)"].replace(/\s/g, '')
                    project.amount = parseFloat(project.amount)
           //         console.log(project.amount)
                    project.lkm = 1
                    counter +=1
               //     console.log(project.hanke_name,":  ",project.ColSel_Vuosi)

                    if(project["ActionType"] == "KA101"  || project["ActionType"] == "KA201" || project["ActionType"] == "KA219" || project["ActionType"] == "KA229"|| project["ActionType"] == "KA226-SCH"|| project["ActionType"] == "KA227-SCH" || project["ActionType"] == "KA120-SCH" || project["ActionType"] == "KA121-SCH" || project["ActionType"] == "KA122-SCH" || project["ActionType"] == "KA210-SCH" || project["ActionType"] == "KA220-SCH") {
                        project.Sektori = "Yleissivistävä koulutus"
                    } else if (project["ActionType"] == "KA102" || project["ActionType"] == "KA116" || project["ActionType"] == "KA202"|| project["ActionType"] == "KA226-VET") {
                        project.Sektori = "Ammatillinen koulutus"
                    } else if (project["ActionType"] == "KA103" || project["ActionType"] == "KA203" || project["ActionType"] == "KA107"|| project["ActionType"] == "KA226-HE" || project["ActionType"] == "KA131-HED" || project["ActionType"] == "KA220-HED" || project["ActionType"] == "KA171-HED") {
                        project.Sektori = "Korkeakoulutus"
                    } else if (project["ActionType"] == "KA104" || project["ActionType"] == "KA204"|| project["ActionType"] == "KA227-ADU" || project["ActionType"] == "KA122-ADU" || project["ActionType"] == "KA210-ADU" || project["ActionType"] == "KA220-ADU" || project["ActionType"] == "KA120-ADU" || project["ActionType"] == "KA121-ADU") {
                        project.Sektori = "Aikuiskoulutus"
                    } else if (project["ActionType"] == "KA125" || project["ActionType"] == "KA120-VET" || project["ActionType"] == "KA121-VET" || project["ActionType"] == "KA122-VET" || project["ActionType"] == "KA210-VET" || project["ActionType"] == "KA220-VET") {
                        project.Sektori = "Ammatillinen koulutus"
                    } else if (project["ActionType"] == "KA200") {
                        project.Sektori = "Sektorien välinen"
                    } else if (project["ActionType"] == "KA227" || project["ActionType"] == "KA226") {
                        project.Sektori = "Muu"
                    } else if (project["ActionType"] == "KA347" || project["ActionType"] == "KA205" || project["ActionType"] == "KA125"|| project["ActionType"] == "KA135" || project["ActionType"] == "KA105"|| project["ActionType"] == "KA227-YOU" || project["ActionType"] == "KA125/KA135" || project["ActionType"] == "KA151-YOU" || project["ActionType"] == "KA152-YOU" || project["ActionType"] == "KA153-YOU" || project["ActionType"] == "KA154-YOU" || project["ActionType"] == "KA155-YOU" || project["ActionType"] == "KA210-YOU" || project["ActionType"] == "KA220-YOU") {
                        project.Sektori = "Nuoriso"
                    } else if (project["ActionType"] == "KA122-ADU") {
                        project.Sektori = "Aikuiskoulutuksen lyhytkestoinen liikkuvuus"
                    } else if (project["ActionType"] == "KA220-ADU") {
                        project.Sektori = "Aikuiskoulutuksen lyhytkestoinen liikkuvuus"
                    } else if (project["ActionType"] == "KA182-SPO") {
                        project.Sektori = "Liikunta- ja urheiluala"

                    } else {
                        project.Sektori = project["ActionType"]
                    }


                    project.Kimppa = "Yhden toteuttajan hanke"
                    var numberPattern = /\d+/g;
                //    var infArea = project.Toteutusalue || project.HankkeenSijaintikuntaTeksti || project.YhteistyotahotTeksti
                    //        console.log(infArea)
                 //   var numbers = infArea.match(numberPattern);
                    var areaCats = []
                    var tester = []
                    var tester2 = []
                    //        console.log(numbers)
                    /*
                     if(project.ColSel_Hanketyyppi = "Kirjasto") {

                     } else {
                     */

/*
                    if (numbers !== null && numbers.length > 0 ) {
                        //   project.ColSel_Vaikutusalue = []
                        for (var x in numbers) {

                            if(thlRegions[numbers[x]]) {
                                areaCats.push(thlRegions[numbers[x]].cat)
                                tester.push(thlRegions[numbers[x]].name)
                                tester2.push(numbers[x])
                            }

                            //      project.ColSel_Vaikutusalue.push(thlRegions[numbers[x]].name)
                        }
                        //  console.log(areaCats)
                        if (countInArray(areaCats, "MAAKUNTA") == 1) {
                            project.kunnat = []

                            project.Osatoteuttajat = tester
                            project.ColSel_Vaikutusalue = "maakunnallinen"

                        } else if (countInArray(areaCats, "MAAKUNTA") > 1) {
                            project.Osatoteuttajat = tester
                            project.ColSel_Vaikutusalue = "ylimaakunnallinen tai valtakunnallinen"
                        } else if(countInArray(areaCats, "KUNTA") > 1) {
                            project.Osatoteuttajat = tester
                            project.ColSel_Vaikutusalue = "ylikunnallinen"
                        } else if(countInArray(areaCats, "KUNTA") == 1) {
                            project.Osatoteuttajat = tester
                            project.ColSel_Vaikutusalue = "kunnallinen"
                        }
                    } else {

                        if (infArea == "") {
                            //        project.ColSel_Vaikutusalue = "kunnan- tai kaupunginosat"
                            project.ColSel_Vaikutusalue = "kunnallinen"
                        } else if (infArea == "Valtakunnallinen" || infArea == "Koko maa") {
                            project.ColSel_Vaikutusalue = "ylimaakunnallinen tai valtakunnallinen"
                        } else if (infArea.indexOf(".") > 0) {
                            project.ColSel_Vaikutusalue = "ylikunnallinen"
                        } else {
                            project.ColSel_Vaikutusalue = "kunnallinen"
                        }
                    }
                    */
                    /*
                    if(project.ColSel_Hanketyyppi == "Kirjasto") {

                        var kr = project.KohdeRyhma.split(". ")
                        var aru= []

                        if(kr)
                            for (var t in kr) {
                                var m;
                                var krt = {
                                    "KirjastoAsiakkaat":_("Kirjaston asiakkaat"),
                                    "KirjastonHenkilokunta":_("Kirjaston henkilökunta"),
                                    "Nuoret":_("Nuoret (13-19 v.)"),
                                    "KirjastonEiKayttajat":_("Kirjaston ei-käyttäjät"),
                                    "LapsetAlle13":_("Lapset (alle 13 v.)"),
                                    "Ikaantyneet":_("Ikääntyneet"),
                                    "Sidosryhmat":_("Sidosryhmät"),
                                    "TiettyAmmattiryhm":_("Tietty ammattiryhmä (esim. opettajat)"),
                                    "Lapsiperheet":_("Lapsiperheet"),
                                    "NuoretAikuiset":_("Nuoret aikuiset (19.-29 v.)"),
                                    "Maahanmuuttajat":_("Maahanmuuttajat"),
                                    "Erityisryhmat":_("Erityisryhmät"),
                                    "TyoikainenVaesto":_("Työikäinen väestö"),
                                    "Miehet":_("Miehet"),
                                    "Tyottomat":_("Työttömät"),
                                    "Naiset":_("Naiset")
                                }
                                if(kr[t].length > 1)
                                    m=kr[t].match(/^(.*?)\,/)

                                if(m) {
                                    var kk = krt[m[1].replace(/\s/g, '')]
                                    if(aru.indexOf(kk) == -1)
                                        aru.push(kk)
                                }
                                //     aru.push(m[1].replace(/\s/g, ''))

                            }



                        project.KohdeRyhma = aru.join(", ")

                    }
                    */

                    //    }


//console.log(thlRegions)
                })

                listing(data, d3.csv.parseRows(csv));
   //             console.log(counter)
                //     getInfluenceAreas(data)
//console.log(data)
                HankeVisData = data
                $('#kausi').find('option[value="' + window.PAGE.TERM + '"]').attr('selected', true);
                //v4
                //    var data = d3.csvParse(csv);
                //    listing(data, d3.csvParseRows(csv));
console.log("test type in data ", wwidth)
                if (window.PAGE.TYPE === "circles") {
                    if(wwidth < threashold) {
                        $("#color-sidebar").css({"width":"100%"})
                        $("#color-sidebar").css({"right":0})
                        $("#color-sidebar").css({"top":"auto"})
                        $("#color-sidebar").css({"bottom":"0"})
                        $("#color-sidebar").css({"margin-bottom":"0"})

                        //    $("#color-sidebar").css({"position":null})

                        window.onscroll = function() {myFunction()};

                        var header = document.getElementById("color-sidebar");
                        var sticky = header.offsetTop;

                        function myFunction() {
                            if (window.pageYOffset > sticky) {
                                header.classList.add("sticky");
                            } else {
                                header.classList.remove("sticky");
                            }
                        }

                    } else {
                        $('#color-sidebar').css({
                            'position': 'fixed',
                            'right': '10px'
                        });
                    }

                    HankeVis(data, HankeVisReady);

                    $('#map').hide();
                    $('#chart-type').hide();
                    $("#bc-container").hide();
                    $("#stacker").hide();
                    $("#tableSorter").hide();
                    $("#downloadButton").hide();
                    $('#mapthemes').hide();
                    $('#map-unit').hide();
                    $('#map-suhde').hide();
                    $('#tags-container').hide();
                    $("#vis").show();
                    $('#map-base').hide();
                    $('#tag-layout').hide();
                    $('#drag').hide();
                    $("#main-content").css({
                        'marginRight': '220px',
                        'margin-left': '16.667%'
                    });
                    $('body').addClass('vis-circles');
                    $('#options-sidebar').css({
                        'position': 'fixed',
                        'width': '21%'
                    });

                    $('#mapHelper').hide();
                    $('#logobox').css({
                        'left': '5px'
                    });

                } else if (window.PAGE.TYPE === "bars") {
                    console.log($(window).width())
                    console.log($(window).width() * 0.21)
                    console.log($filterInput)
                    $('#options-sidebar').css({
                        //        'position': 'absolute',
                     //   'width': '21%'
                        'width':$(window).width() * 0.21
                        //        'top': '200px'
                    });
                    HankeVisBar(data, HankeVisBarReady);
             //       setTimeout(function(){
                    $('#map').hide();
                    $("#vis").hide();
                    $('#multiple').hide();
                    $('#form-menut').hide();
                    //      $('#color-sidebar').hide();
                    $('#mapthemes').hide();
                    $('#map-unit').hide();
                    $('#map-suhde').hide();
                    $('#map-base').hide();
                    $('#tag-layout').hide();
                    $('#mapHelper').hide();
                    $("#tableSorter").hide();
                    $("#downloadButton").hide();
                    $("#accessibility-colors").show();
                    $("#stacker").show();
                    $('body').addClass('vis-bars');

                    var winHeight = $(window).height() * 0.88;
                    if (winHeight < 300)
                        winHeight = $(document).height()*0.88
                    $("#bc-container").css({'height': winHeight}).show();
                    // $("#vis-container").css({'height': winHeight*0.9});
                    //   $("#bar-container").highcharts().reflow();
                    if(wwidth < threashold) {
                        $("#circle-container").css({'height': winHeight*0.6}).highcharts().reflow();
                    } else {
                        $("#circle-container").css({'height': winHeight*0.3}).highcharts().reflow();
                    }

                    $("#bar-container").css({'height': winHeight}).highcharts().reflow();
                    //    $("#circle-container").css({'height': winHeight})

                    var body = $('#main-content')
                    body.css({'height': winHeight}).show();
                    $('.flexbox').css({'height': winHeight}).show();
                    //       $('#options-sidebar').css({'height': winHeight}).show();
                    $('#kirjastovis_container').css({'height': winHeight}).show();
                    $('#tags-container').hide();

                    $('#main-content').css({
                        'margin-left': '21%'
                    });
                    $('#color-sidebar').hide().css({
                        'position': 'absolute',
                        'right': '10px'
                    });
                    $('#logobox').css({
                        'left': '5px'
                    });
                    $('.ui-multiselect-menu').css({
                        'width': '100%'
                    });
             //       }, 3000);
                } else if (window.PAGE.TYPE === "map") {
               /*     var height = $(window).height() - $('.top-bar').height() - 25;
                    //       var conheight = $(window).height() * 0.79;
                    var map = $('#map')
                    map.css({'height': height});
*/

                        doRouting({
                            FILTER: {
                                KUNTA: []
                            }
                        });


                    var winHeight = $(window).height()*0.93 - $('#ylapalkki').height();
                    if (winHeight < 300)
                        winHeight = $(document).height()*0.84
                    var map = $('#map')
                    var mapC = $('#map-container')
                    var body = $('#main-content')
                    map.css({'height': winHeight}).show();
                    mapC.css({'height': winHeight}).show();
                    body.css({'height': winHeight}).show();

                    $('.flexbox').css({'height': winHeight}).show();
                    $('.eac-round').css({'width': 200}).show();
             //       $('#options-sidebar').css({'height': winHeight}).show();
                    $('#kirjastovis_container').css({'height': winHeight}).show();

                    HankeVisMap(data, function () {
                    });
                    $('#chart-type').hide();
                    $('#luokittelut').hide();
                    $('body').addClass('vis-map');
                    $('#map-info').show();
                  //  $('#map-container').show();
                    $('#tags-container').hide();
                    $("#vis").hide();
                    $("#tableSorter").hide();
                    $("#bc-container").hide();
                    $("#downloadButton").hide();
                    $("#stacker").hide();
                    $('#mapthemes').show();
                    $("#accessibility-colors").hide();
                    //    $('#map-info-wrapper').show();
                    $('#multiple').hide();
                    $('#form-menut').hide();
                    //    $('#color-sidebar').hide();
               /*     if(wwidth > threashold)
                        $('#ylapalkki').hide();
                    else
                        $('.topMenu2').hide();
*/

                    $('#coloring').hide();
                    $('#tag-layout').hide();
                    $('#toggle-a-colors').hide();
/*
                    $('#options-sidebar').css({
                        'position': 'absolute',
                        'width': '20%'
                    });
                    $('#main-content').css({
                        'margin-left': '310px',
                        //    'height': '100%'
                        'height': height
                    });
                    $('#color-sidebar').hide().css({
                        'position': 'absolute',
                        'right': '10px'
                    });
                    $('#logobox').css({
                        'left': '5px'
                    });
                    $('#vis-container').css({
                        'height': '100%',
                        'overflow-y': 'none'
                    });
*/
                    map.highcharts().reflow();
                } else if (window.PAGE.TYPE === "table") {
                    $('#map').hide();
                    $("#vis").hide();
                    $('#chart-type').hide();
                    $('#multiple').hide();
                    $('#form-menut').hide();
                    $("#stacker").hide();
                    $('#coloring').hide();
                    $("#accessibility-colors").hide();
                    //      $('#color-sidebar').hide();
                    $('#mapthemes').hide();
                    $('#map-unit').hide();
                    $('#map-suhde').hide();
                    $('#map-base').hide();
                    $('#tag-layout').hide();
                    $('#mapHelper').hide();
                    $("#bc-container").hide();
                    $('#color-sidebar').hide()
                    $('#tags-container').hide();

                    var body = $('#main-content')
                    body.css({'height': winHeight}).show();
                    $('.flexbox').css({'height': winHeight}).show();
                    //       $('#options-sidebar').css({'height': winHeight}).show();
                    $('#kirjastovis_container').css({'height': winHeight}).show();

                    if(window.PAGE.VIEW == "ColSel_Teema") {
                        $('#luokittelu').find('option[value="' + "Avustusmuoto" + '"]').attr('selected', true);
                        doRouting({
                            VIEW: "Avustusmuoto"
                        });
                    }

                    HankeVisTable(data, function () {
                    });

                    if (window.document.documentMode) {
                        // Do IE stuff
                        //      alert("IE")
                        $("#table-wrapper").css({'height': 1000})
                    }


                } else {
                    alert("unknown type");
                }

               //  alert(wwidth+" < "+threashold)
                if(wwidth < threashold) {
                    $(".suki-header-mobile-vertical-toggle").show()
                    $(".mobileShow").show()
                    $(".mobileHide").hide()
                    $("#mapHelper").hide()
                    $("#main-content").css({"margin-left": "1px"})
                    $(".title-area").css({"margin-left": "13%"})
                    var cwinHeight = winHeight

                    $("#bc-container").css({'height': winHeight})
                    // $("#vis-container").css({'height': winHeight*0.9});
                    //   $("#bar-container").highcharts().reflow();


                    $("#accessibility-colors").css({"left": "50px",right:null,top:0})

                    $("#infoButton").css({"left": "5px", top:0})

                    $("#circle-container").css({'height': cwinHeight*0.3}).highcharts().reflow();
                    $("#bar-container").css({'height': winHeight}).highcharts().reflow();

                } else {

                    $(".mobileShow").hide()
                    $(".mobileHide").show()
                }

            });
    }

    //var visuSelect = $('#textAndSelect').find('input[type="radio"]');

    //   $('input[type="radio"][name="s-group"][value="' + window.PAGE.TYPE + '"]').prop('checked', true);
    $('[name="s-group"][value="' + window.PAGE.TYPE + '"]').addClass('selected', true);
    $('[name="s-group"][value="' + window.PAGE.TYPE + '"]').attr('aria-checked', true);
    $('[name="s-group"]').on('click', function () {

        $('[name="s-group"]').removeClass('selected', true);
        $('[name="s-group"]').attr('aria-checked', false);
        $('[name="s-group"][value="' + $(this).val() + '"]').addClass('selected', true);
        $('[name="s-group"][value="' + $(this).val() + '"]').attr('aria-checked', true);
        doRouting({
            TYPE: $(this).val()
        }, true);
    });


    $('[name="r-group"][value="' + window.PAGE.STACK + '"]').addClass('selected', true);
    $('[name="r-group"][value="' + window.PAGE.STACK + '"]').attr('aria-checked', true);
    $('[name="r-group"]').on('click', function () {

        $('[name="r-group"]').removeClass('selected', true);
        $('[name="r-group"]').attr('aria-checked', false);
        $('[name="r-group"][value="' + $(this).val() + '"]').addClass('selected', true);
        $('[name="r-group"][value="' + $(this).val() + '"]').attr('aria-checked', true);
        doRouting({
            STACK: $(this).val()
        });
        HankeVisBar.update()
    });

    $('[name="mapUnitR"][value="' + window.PAGE.MAPVIEW.UNIT + '"]').addClass('selected', true);
    $('[name="mapUnitR"][value="' +  window.PAGE.MAPVIEW.UNIT + '"]').attr('aria-checked', true);
    $('[name="mapUnitR"]').on('click', function () {

        $('[name="mapUnitR"]').removeClass('selected', true);
        $('[name="mapUnitR"]').attr('aria-checked', false);
        $('[name="mapUnitR"][value="' + $(this).val() + '"]').addClass('selected', true);
        $('[name="mapUnitR"][value="' + $(this).val() + '"]').attr('aria-checked', true);
        MapVis.unit = $(this).val()

        doRouting({
            MAPVIEW: {
                UNIT: $(this).val()
            }
        });

        MapVis.start();
    });

    $('[name="mapSuhdeR"][value="' + window.PAGE.MAPVIEW.SUHDE + '"]').addClass('selected', true);
    $('[name="mapSuhdeR"][value="' +  window.PAGE.MAPVIEW.SUHDE + '"]').attr('aria-checked', true);
    $('[name="mapSuhdeR"]').on('click', function () {

        $('[name="mapSuhdeR"]').removeClass('selected', true);
        $('[name="mapSuhdeR"]').attr('aria-checked', false);
        $('[name="mapSuhdeR"][value="' + $(this).val() + '"]').addClass('selected', true);
        $('[name="mapSuhdeR"][value="' + $(this).val() + '"]').attr('aria-checked', true);
        MapVis.suhde = $(this).val()
        doRouting({
            MAPVIEW: {
                SUHDE: $(this).val()
            }
        });

        MapVis.start();
    });





    /*
     $('#select-vis-' + window.PAGE.TYPE).prop('checked', true).trigger("change");
     visuSelect.on('change', function() {
     alert("omg");
     //
     });

     visuSelect.val(window.PAGE.TYPE).trigger("change");
     visuSelect.bind("change", function (event, ui) {
     });
     //*/

    //    selectDatabase();

    $.get('data/thlregions.json',
        function (resp) {

            for (var k in resp) {
                //      if(resp[k].category == "KUNTA")
                //   console.log(resp[k])
                if(resp[k].title && resp[k].category == "KUNTA" || resp[k].category == "MAAKUNTA") {
                    if(resp[k].code == "01" || resp[k].code == "02" ||resp[k].code == "03" ||resp[k].code == "04" ||resp[k].code == "05" ||resp[k].code == "06" ||resp[k].code == "07" ||resp[k].code == "08" ||resp[k].code == "09")
                        resp[k].code = resp[k].code.substring(1)
                    if(resp[k].category == "MAAKUNTA") {
                        //       maakunnat[resp[k].id] = resp[k].title.fi
                        maakunnat[resp[k].title.fi] = resp[k].code
                        thlRegions[resp[k].code] = {"name":resp[k].title.fi,"cat":resp[k].category,kunnat: []}
                        for (var g in thlRegions) {
                            if(thlRegions[g].memberOf)
                                if (thlRegions[g].memberOf.indexOf(resp[k].id) > -1)
                                    thlRegions[resp[k].code].kunnat.push(thlRegions[g].name)
                        }

                    } else {
                        thlRegions[resp[k].code] = {"name":resp[k].title.fi,"cat":resp[k].category,memberOf:resp[k].memberOf}

                    }

                }

                //		thlDataList.push({id: resp[k].id, text: resp[k].id+"-"+resp[k].title["fi"]});
            }
            selectDatabase(window.PAGE.TERM);

        })
});

var toteuttajaList = [],
    teemaList = [],
    kuntaList = [],
    maakuntaList = [],
    sektoriList = [],
    rahoittajaList = [],
    vuosiList = [],
    avustusmuotoList = [];
//       kimppaList = [];

var uniqueToteuttaja,
    uniqueKunta,
    uniqueMaakunta,
    uniqueTeema,
    uniqueSektori,
    uniqueRahoittaja,
    uniqueVuosi,
    uniqueAvustusmuoto;

var listing = function (data, rows) {
    console.log(vuosiList)
    toteuttajaList = [],
        teemaList = [],
        kuntaList = [],
        maakuntaList = [],
        sektoriList = [],
        rahoittajaList = [],
        vuosiList = [],
        avustusmuotoList = [];

    var arrTeema = [],
        arrKunta = [],
        arrMaakunta = [],
        arrToteuttaja = [],
        arrVuosi = [],
        arrRahoittaja = [],
        arrAvustusmuoto = [],
        arrSektori = [];

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }



    for (var e = 0, el = data.length; e < el; ++e) {
        //    if (data[e].rahasto
        arrToteuttaja.push(data[e].Toteuttaja);
        arrKunta.push(data[e].Kunta);
        arrMaakunta.push(data[e].ColSel_Maakunta);

        arrAvustusmuoto.push(data[e].Avustusmuoto);
        arrSektori.push(data[e].Sektori);
        //        arrKimppa.push(data[e].Kimppa);
        arrRahoittaja.push(data[e].ColSel_Hanketyyppi);
     //   arrErityis.push(data[e].Erityisavustus);

        //   arrVuosi.push(parseInt(data[e].ColSel_Vuosi.toString()));
        arrVuosi.push(data[e].ColSel_Vuosi.toString());

    //    arrTeema.push(data[e].ColSel_Teema);

        var teemat = [];
        if(data[e].ColSel_Teema)
        teemat = data[e].ColSel_Teema.split("_");


        for (var t in teemat) {
            if(arrTeema.indexOf(teemat[t]) ==-1 && teemat[t] !== "")
            arrTeema.push(teemat[t]);
        }

    }
    //       arrRahoittaja.push("ELY / AVI");
    //       arrRahoittaja.push("Opetus- ja kulttuuriministeriö");

//console.log(arrTeema)

    uniqueToteuttaja = arrToteuttaja.filter(onlyUnique),
        uniqueKunta = arrKunta.filter(onlyUnique),
        uniqueMaakunta = arrMaakunta.filter(onlyUnique),

        uniqueVuosi = arrVuosi.filter(onlyUnique),
        uniqueSektori = arrSektori.filter(onlyUnique),
        uniqueAvustusmuoto = arrAvustusmuoto.filter(onlyUnique),
        uniqueRahoittaja = arrRahoittaja.filter(onlyUnique);
    //        uniqueKimppa = arrKimppa.filter(onlyUnique);
uniqueTeema = arrTeema

 //   uniqueVuosi.push("2021")

    console.log(uniqueVuosi)
   // uniqueToteuttaja.sort();
    uniqueToteuttaja.sort(function (a, b) {
        return a.localeCompare(b);
    });
    uniqueKunta.sort();
    uniqueMaakunta.sort();
    uniqueTeema.sort();
    uniqueSektori.sort();
    uniqueAvustusmuoto.sort();
    uniqueVuosi.sort();
    uniqueRahoittaja.sort();

    var elem;
//console.log(uniqueTeema)
    uniqueTeema.pop()
    console.log(vuosiList)
    console.log(uniqueVuosi)
  //  console.log(uniqueTeema)
    $('#Vuosi').empty()
    $('#Teema').empty()
    $('#Toteuttaja').empty()
    $('#Sektori').empty()
    $('#Kunta').empty()
    $('#Maakunta').empty()
    $('#Avustusmuoto').empty()
    $('#Rahoittaja').empty()
    //     if (window.PAGE.TYPE !== "map") {
    for (var q = 0, ql = uniqueTeema.length; q < ql; ++q) {
        teemaList.push("Teema//" + uniqueTeema[q]);
        elem = $('<option>').val("Teema//" + uniqueTeema[q]).text(_(uniqueTeema[q]));
        if (jQuery.inArray(uniqueTeema[q], window.PAGE.FILTER.TEEMA) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Teema');
    }
    for (var q = 0, ql = uniqueToteuttaja.length; q < ql; ++q) {
        toteuttajaList.push("Toteuttaja//" + uniqueToteuttaja[q]);
        elem = $('<option>').val("Toteuttaja//" + uniqueToteuttaja[q]).text(_(uniqueToteuttaja[q]));
        if (jQuery.inArray(uniqueToteuttaja[q], window.PAGE.FILTER.TOTEUTTAJA) >-1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Toteuttaja');
    }
    for (var q = 0, ql = uniqueKunta.length; q < ql; ++q) {
        kuntaList.push("Kunta//" + uniqueKunta[q]);
        elem = $('<option>').val("Kunta//" + uniqueKunta[q]).text(_(uniqueKunta[q]));
        if (jQuery.inArray(uniqueKunta[q], window.PAGE.FILTER.KUNTA) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Kunta');
    }
    for (var q = 0, ql = uniqueMaakunta.length; q < ql; ++q) {
        maakuntaList.push("Maakunta//" + uniqueMaakunta[q]);
        elem = $('<option>').val("Maakunta//" + uniqueMaakunta[q]).text(_(uniqueMaakunta[q]));
        if (jQuery.inArray(uniqueMaakunta[q], window.PAGE.FILTER.MAAKUNTA) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Maakunta');
    }
    for (var q = 0, ql = uniqueSektori.length; q < ql; ++q) {
        sektoriList.push("Sektori//" + uniqueSektori[q]);
        elem = $('<option>').val("Sektori//" + uniqueSektori[q]).text(_(uniqueSektori[q]));
        if (jQuery.inArray(uniqueSektori[q], window.PAGE.FILTER.SEKTORI) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Sektori');
    }
    for (var q = 0, ql = uniqueAvustusmuoto.length; q < ql; ++q) {
        avustusmuotoList.push("Avustusmuoto//" + uniqueAvustusmuoto[q]);
        var textElem = uniqueAvustusmuoto[q].match(/_(.*)/)
   //     console.log(textElem)
        elem = $('<option>').val("Avustusmuoto//" + uniqueAvustusmuoto[q]).text(_(textElem[1]));
        if (jQuery.inArray(uniqueAvustusmuoto[q], window.PAGE.FILTER.Avustusmuoto) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Avustusmuoto');
    }

    for (var q = 0, ql = uniqueRahoittaja.length; q < ql; ++q) {
        rahoittajaList.push("Rahoittaja//" + uniqueRahoittaja[q]);
        elem = $('<option>').val("Rahoittaja//" + uniqueRahoittaja[q]).text(_(uniqueRahoittaja[q]));
        if (jQuery.inArray(uniqueRahoittaja[q], window.PAGE.FILTER.RAHOITTAJA) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Rahoittaja');
    }
    //     }

    for (var q = 0, ql = uniqueVuosi.length; q < ql; ++q) {
        vuosiList.push("Vuosi//" + uniqueVuosi[q]);
        elem = $('<option>').val("Vuosi//" + uniqueVuosi[q]).text(_(uniqueVuosi[q]));
        if (jQuery.inArray(uniqueVuosi[q], window.PAGE.FILTER.VUOSI) > -1) {
            elem.prop('selected', true);
        }
        if (window.PAGE.TYPE === "map" && q === 0) {
            //         console.log("skipping", q, uniqueVuosi[q], window.PAGE.FILTER.VUOSI, (jQuery.inArray(q, window.PAGE.FILTER.VUOSI)));
            //    continue;
        } else {
            //         console.log("adding", q, uniqueVuosi[q], window.PAGE.FILTER.VUOSI, (jQuery.inArray(q, window.PAGE.FILTER.VUOSI)));
        }
        elem.appendTo('#Vuosi');
    }
    /*    if (window.PAGE.VIS === "projects")
     for (var q = 0, ql = uniqueKimppa.length; q < ql; ++q) {
     kimppaList.push("Kimppa//" + uniqueKimppa[q]);
     elem = $('<option>').val("Kimppa//" + uniqueKimppa[q]).text(_(uniqueKimppa[q]));
     if (jQuery.inArray(q, window.PAGE.FILTER.KIMPPA) === -1) {
     elem.prop('selected', true);
     }
     elem.appendTo('#Kimppa');
     }*/

    $('#select-size').trigger("chosen:updated");
    $("#example-optgroup").multiselect('refresh');
    $("#example-optgroup").multiselect('collapseAll');

    $(".collapseri").on("click", function(event, ui) {
        //Function body

        var heightl = $('li .ui-multiselect-optgroup ul').height();
        var height = $('.ui-corner-all').height();
        var heightl = $('#example-optgroup option:visible');


        $("#example-optgroup").multiselect("widget", function(event, ui) {
            //Function body

        })
    })

    $("#example-optgroup").on("multiselectcollapsetoggle", function(event, ui) {
        //Function body

    })
};
