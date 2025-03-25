/**
 * Created by Roope on 20.10.2020.
 */
var thlRegions = {}, kuvaukset,maakunnat = {};

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

    $filterInput
        .multiselect({
            header: ['uncheckAll'],
            placeholder: "Syötä hakusana",
            groupsCollapsable: true,
            groupsSelectable: false,
            //       selectedText: title,
            checkAllText: _("Valitse kaikki"),
            uncheckAllText: _("Poista kaikki"),
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


    function selectDatabase() {
        var url;
        if (window.PAGE.VIS === 'good-practices') {
            url = 'data/hyvatkaytanteet.csv';
        } else if (window.PAGE.VIS === 'not-funded') {
            url = 'data/eirahoitusta15.csv';
        } else if (window.PAGE.VIS === 'projects') {
            if (window.PAGE.TYPE === "tags") {
                url = 'data/hankkeet2015_xy3.csv';
            } else {
                url = 'data/kaikki_okt_2020_2606.csv';
            }

            /*
             $.get('data/kimppahankkeet.csv',
             function (csv) {
             csv = csv.replace(new RegExp("\t", 'g'), "");
             //v3
             kimppadata = d3.csv.parse(csv);

             })
             */


            //       url = 'data/hankkeet2015.csv';
        } else if (window.PAGE.VIS === 'new-projects') {
            url = 'data/haetut.csv';
            //   window
        }

        $.ajax({
            url: "data/tiivistetytKuvaukset.json",
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        })
            .done(function (datam) {
                kuvaukset = datam
            })
            .fail(function () {
                console.log("Ajax failed to fetch data");
                alert(
                    "Sivusto ei kyennyt lataamaan tarvittavia tilastoja. Tämä johtuu todennäköisesti " +
                    "käyttämänne verkon palomuuriasetuksista. Ottakaa yhteyttä verkkonne järjestelmänvalvojaan."
                );
            });
var kirjastoKuvaukset = {}
        if(dataBase=="kirjasto")
        $.ajax({
            url: "data/hanke_kuvaukset.json",
            async: false,
            contentType: "application/x-www-form-urlencoded;charset=UTF-8",
            dataType: 'json'
        })
            .done(function (datam) {
                for (var i in datam) {
                    kirjastoKuvaukset[datam[i].id] = datam[i]
                }
            })
            .fail(function () {
                console.log("Ajax failed to fetch data");
                alert(
                    "Sivusto ei kyennyt lataamaan tarvittavia tilastoja. Tämä johtuu todennäköisesti " +
                    "käyttämänne verkon palomuuriasetuksista. Ottakaa yhteyttä verkkonne järjestelmänvalvojaan."
                );
            });

        $.ajax({
            url: "data/kirjastokartta2017.geojson",
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
            })
            .fail(function () {
                console.log("Ajax failed to fetch data");
            });
        var extradata,kirjastodata;

        $.get("data/vanhat_kirjastohankkeet.csv",
            function (csvc) {
                kirjastodata = d3.csv.parse(csvc);
console.log(kirjastodata)
            })


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
                var data = data.concat(kirjastodata)
//var data = data.concat(extradata)

                var filtteri = {
                    //         amount: '0',
                    AviKoodi: ''
                };

                console.log(data)
                data= data.filter(function(item) {
                    if(item)
                        for (var key in filtteri) {
                            if (item[key] === undefined || item[key] == filtteri[key])
                                return false;
                        }
                    return true;
                });

                data= data.filter(function(item) {

                    return item.AvustuskokonaisuusKoodi == "KiVa"
                });

                $.each(data, function (index, project) {
                    /*        if (window.PAGE.VIS === 'projects') {
                     project.Kimppa = "Yhden toteuttajan hanke"
                     $.each(kimppadata, function (indexx, kimpproject) {
                     var code = kimpproject.Koodi.match(/\d+/)
                     if (code == project.id) {
                     project.Osatoteuttajat = []
                     project.Kimppa = "Yhteistyöhanke"
                     var kimpar = kimpproject["Yhteistyö kunnat"].split(',');
                     for (var w = 0; w < kimpar.length; w++) {
                     project.Osatoteuttajat.push(kimpar[w].trim())
                     }

                     }

                     })
                     } else {
                     project.Kimppa = "Yhden toteuttajan hanke"
                     }
                     */

                    project.id = project["Asian nimi"]
                    project.ColSel_Vuosi = project["Vuosi"]

                    if(project.AvustuskokonaisuusKoodi == "LiVäh")
                        project.ColSel_Vuosi = "2019"
                    if(project.Kieli == "ruotsi") {
                        project.ColSel_Kieli = "ruotsinkielinen"
                    } else {
                        project.ColSel_Kieli = "suomenkielinen"
                    }
                    //     project.ColSel_Kieli = project.Kieli
                    project.hanke_name = project["HankeTaiToimintaNimi"] || project["Hanke"]
                    project.ColSel_Aluehallintovirasto = project["HankeTaiToimintaNimi"]
                    project.ColSel_Maakunta = project.Maakunta

                    if(sweFin[project.Kunta])
                        project.Kunta = sweFin[project.Kunta].fin
                    //   else
                    //       project.Kunta = project.Kunta
                    project.ToteutusAlue = project.Toteutusalue || project.HankkeenSijaintikuntaTeksti
                    //           project.ToteutusAlue = project.Toteutusalue || project.YhteistyotahotTeksti

                    var hNimi = project["Hakija"].match(/^.*(?=( \())/)
                    if(hNimi)
                        project.Toteuttaja = hNimi[0]
                    else
                        project.Toteuttaja = project["Hakija"]
                    //      project.Toteuttaja = project["ToimiNimi"] || project["Hakija"].match(/^.*(?=( \())/)[0]
                    //    project.Toteuttaja = project["ToimiNimi"] || project["Hakija"].match(/^(.*?)\s\(/)
                    project.amount = parseFloat(project["Myönnetty Avustus"])
                    project.lkm = 1

                    project.ColSel_Teema = project.TeemaKoodiTeksti

                    if(project.ColSel_Teema == "Läsfrämjande arbete: författarbesök, boktips, läsecirklar, sagotimmar osv.") {
                        project.ColSel_Teema = "Lukemisen edistäminen: kirjailijavierailut, kirjavinkkaus, lukupiirit, satutunnit ym."
                    } else if(project.ColSel_Teema == "Utvecklande av tjänster") {
                        project.ColSel_Teema = "Palvelujen kehittäminen"
                    } else if(project.ColSel_Teema == "Biblioteket som lärmiljö och samhällelig aktör") {
                        project.ColSel_Teema = "Kirjasto oppimisympäristönä ja yhteisöllisenä toimijana"
                    } else if(project.ColSel_Teema == "Strategisk utveckling") {
                        project.ColSel_Teema = "Strateginen kehittäminen"
                    }

                    if(project.AviKoodi == 1027) {
                        project.ColSel_Aluehallintovirasto = "Länsi- ja Sisä-Suomen aluehallintovirasto"
                    } else if (project.AviKoodi == 1023) {
                        project.ColSel_Aluehallintovirasto = "Etelä-Suomen aluehallintovirasto"
                    } else if (project.AviKoodi == 1026) {
                        project.ColSel_Aluehallintovirasto = "Lounais-Suomen aluehallintovirasto"
                    } else if (project.AviKoodi == 1028) {
                        project.ColSel_Aluehallintovirasto = "Lapin aluehallintovirasto"
                    } else if (project.AviKoodi == 1025) {
                        project.ColSel_Aluehallintovirasto = "Pohjois-Suomen aluehallintovirasto"
                    } else {
                        project.ColSel_Aluehallintovirasto = "Itä-Suomen aluehallintovirasto"
                    }

  //                  if(kirjastoKuvaukset[project.kid])
//console.log(kirjastoKuvaukset[project.kid])
console.log(project.kid)

                    project.ColSel_Hanketyyppi = "Kirjasto"
                    if(project.ColSel_Hanketyyppi == "Kirjasto") {
                        if(kuvaukset[project.id] && project.ColSel_Vuosi == "2019") {
                            project.KuvausTeksti = kuvaukset[project.id].kuvaus
                        } else if (kuvaukset[project.id] && project.ColSel_Vuosi == "2018") {
                            project.KuvausTeksti = project["TiivistettyKuvausHankkeestaTeksti"]
                        } else {
                            if(kirjastoKuvaukset[project.kid])
                                project.KuvausTeksti = kirjastoKuvaukset[project.kid].kuvaus
                        }
                    }

                    if(project.ColSel_Teema == "Liikunnallinen elämäntapa") {
                        //   project.KohdeRyhma = ""
                        if(project["HankkeenKohdistuminen.VarhaiskasvatusJaEsiopetusKytkin"] == "True") {
                            project.KohdeRyhma = "Varhaiskasvatus ja esiopetus"
                        } if(project["HankkeenKohdistuminen.TyoikaisetAikuisetKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Työikäiset ja aikuiset")
                        } if(project["HankkeenKohdistuminen.ElamankulkuKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Elämänkulku")
                        } if(project["HankkeenKohdistuminen.MuuKohderyhmaKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ",project["HankkeenKohdistuminen.MuuKohderyhmaTeksti"])
                        } if(project["HankkeenKohdistuminen.KotouttavaLiikuntaKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Kotouttava liikunta")
                        } if(project["HankkeenKohdistuminen.IkaihmisetKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Ikäihmiset")
                        } if(project["HankkeenKohdistuminen.MuuLastenJaNuortenKohderyhmaKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Muu lasten ja nuorten kohderyhma")
                        } if(project["HankkeenKohdistuminen.SoveltuvaLiikuntaKytkin"] == "True") {
                            project.KohdeRyhma =project.KohdeRyhma.concat(", ","Soveltuva liikunta")
                            //    } else if(project["HankkeenKohdistuminen.MuuKohderyhmaTeksti"] == "true") {

                        }

                    }

                    if(project.ColSel_Teema == "Liikuntapaikkarakentaminen") {
                        project.liikpaiktyyppi = ""
                        if(project["Liikuntapaikkatyyppi_LiikuntahalliKytkin"] == "True") {
                            project.liikpaiktyyppi = _("Liikuntahalli")
                        } if(project["Liikuntapaikkatyyppi_UlkoPalloYleisurheilukenttaKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Ulkokenttä, pallokenttä, yleisurheilukenttä"))
                        } if(project["Liikuntapaikkatyyppi_MuuliikuntapaikkaKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",project["Liikuntapaikkatyyppi_MuuliikuntapaikkaTeksti"])
                        } if(project["Liikuntapaikkatyyppi_JaahalliKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Jäähalli"))
                        } if(project["Liikuntapaikkatyyppi_LahiliikuntapaikkaKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Lähiliikuntapaikka"))
                        } if(project["Liikuntapaikkatyyppi_RantauimalaVenesatamaKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Rantauimala, venesatama"))
                        } if(project["Liikuntapaikkatyyppi_KuntorataValaistuLatuUlkoilureittiKytkin"] == "True") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Kuntorata, valaistu latu, ulkoilureitti"))
                        } else if(project["Liikuntapaikkatyyppi_UimahalliKytkin"] == "true") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Uimahalli"))
                        } else if(project["Liikuntapaikkatyyppi_LaskettelurinneHyppyrimakiKytkin"] == "true") {
                            project.liikpaiktyyppi =project.liikpaiktyyppi.concat(", ",_("Laskettelurinne, hyppyrimäki"))
                        }

                        project.liikpaiktyyppi = project.liikpaiktyyppi.replace(/^,/, '');

                    }


                    if (project.Erityisavustus == "undefined" || project.Erityisavustus == undefined || project.Erityisavustus == ""|| !project.Erityisavustus)
                        project.Erityisavustus = null

                    project.Kimppa = "Yhden toteuttajan hanke"
                    var numberPattern = /\d+/g;
                    var infArea = project.Toteutusalue || project.HankkeenSijaintikuntaTeksti || project.YhteistyotahotTeksti
                    //        console.log(infArea)
                    var numbers = infArea.match(numberPattern);
                    var areaCats = []
                    var tester = []
                    var tester2 = []
                    //        console.log(numbers)
                    /*
                     if(project.ColSel_Hanketyyppi = "Kirjasto") {

                     } else {
                     */


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
                    if(project.ColSel_Hanketyyppi == "Kirjasto") {
                        var va =project.VaikutusalueKoodiTeksti
                        if(va == "kommuner" || va == "kunnat"|| va == "kunnan- tai kaupunginosat"|| va == "kommun- eller stadsdelar") {
                            project.ColSel_Vaikutusalue = "kunnallinen"
                        } else if (va == "seutukunnat") {
                            project.ColSel_Vaikutusalue = "ylikunnallinen"
                        } else if (va == "maakunta") {
                            project.ColSel_Vaikutusalue = "maakunnallinen"
                        } else if (va == "valtakunnallinen"||va == "ylimaakunnallinen") {
                            project.ColSel_Vaikutusalue = "ylimaakunnallinen tai valtakunnallinen"
                        } else if (va == undefined) {
                            project.ColSel_Vaikutusalue = "kunnallinen"
                        } else {
                            project.ColSel_Vaikutusalue = project.VaikutusalueKoodiTeksti
                        }
                        var kr = project.KohdeRyhma.split(". ")
                        var aru= []

                        if(kr)
                            for (var t in kr) {
                                /*     var jj=kr[t].split(", ")
                                 aru.push(jj[jj.length])
                                 console.log(kr)
                                 console.log(jj)*/
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
                    var resArr = project.Toteutusalue.split(".") || project.YhteistyotahotTeksti.split(".");
                    var arri = []

                    for (var x in resArr) {
                        //    console.log(resArr[x].length)
                        if(resArr[x].length > 1) {
                            var ar = resArr[x].split(', ');
                            if(typeof parseInt(ar[0]) == "number") {
                                arri.push(ar[1])
                            } else {
                                arri.push(ar[0])
                            }
                        }

                    }
                    project.ToteutusAlueX = arri.join(", ")
                    //    }


//console.log(thlRegions)
                })

                listing(data, d3.csv.parseRows(csv));

                //     getInfluenceAreas(data)

                var getInfluenceAreas = function (dat) {
                    var project;


                    for (var i in dat) {
                        project = dat[i]
                        var infArea = project.ToteutusAlue
                        var numbers = infArea.match(numberPattern)

                        for (var x in numbers) {
                            //         console.log(regions[numbers[x]].code)
                        }
                    }

                };
                HankeVisData = data

                //v4
                //    var data = d3.csvParse(csv);
                //    listing(data, d3.csvParseRows(csv));

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
                        'width': '16.667%'
                    });

                    $('#mapHelper').hide();
                    $('#logobox').css({
                        'left': '5px'
                    });

                } else if (window.PAGE.TYPE === "bars") {
                    HankeVisBar(data, HankeVisBarReady);
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
                    $("#stacker").show();
                    $('body').addClass('vis-bars');

                    var winHeight = $(window).height() * 0.79;
                    if (winHeight < 300)
                        winHeight = $(document).height()*0.84
                    $("#bc-container").css({'height': winHeight}).show();
                    // $("#vis-container").css({'height': winHeight*0.9});
                    //   $("#bar-container").highcharts().reflow();

                    $("#circle-container").css({'height': winHeight}).highcharts().reflow();
                    $("#bar-container").css({'height': winHeight}).highcharts().reflow();
                    //    $("#circle-container").css({'height': winHeight})
                    $('#tags-container').hide();
                    $('#options-sidebar').css({
                        'position': 'absolute',
                        'width': '16.667%',
                        'top': '200px'
                    });
                    $('#main-content').css({
                        'margin-left': '16.667%'
                    });
                    $('#color-sidebar').hide().css({
                        'position': 'absolute',
                        'right': '10px'
                    });
                    $('#logobox').css({
                        'left': '5px'
                    });
                } else if (window.PAGE.TYPE === "map") {
                    var height = $(window).height() - $('.top-bar').height() - 25;
                    //       var conheight = $(window).height() * 0.79;
                    var map = $('#map')
                    map.css({'height': height});

                    HankeVisMap(data, function () {
                    });

                    $('body').addClass('vis-map');
                    $('#map-info').show();
                    $('#map-container').show();
                    $('#tags-container').hide();
                    $("#vis").hide();
                    $("#tableSorter").hide();
                    $("#bc-container").hide();
                    $("#downloadButton").hide();
                    $("#stacker").hide();
                    $('#mapthemes').show();
                    //    $('#map-info-wrapper').show();
                    $('#multiple').hide();
                    $('#form-menut').hide();
                    //    $('#color-sidebar').hide();
                    if(wwidth > threashold)
                        $('#ylapalkki').hide();
                    else
                        $('.topMenu2').hide();


                    $('#coloring').hide();
                    $('#tag-layout').hide();
                    $('#toggle-a-colors').hide();

                    $('#options-sidebar').css({
                        'position': 'absolute',
                        'width': '300px',
                        'margin-bottom': '100px'
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



                    map.highcharts().reflow();
                } else if (window.PAGE.TYPE === "table") {
                    $('#map').hide();
                    $("#vis").hide();
                    $('#multiple').hide();
                    $('#form-menut').hide();
                    $("#stacker").hide();
                    $('#coloring').hide();
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
                if(wwidth < threashold) {
                    $(".suki-header-mobile-vertical-toggle").show()
                    $(".mobileShow").show()
                    $(".mobileHide").hide()
                    $("#main-content").css({"margin-left": "1px"})
                    var cwinHeight = winHeight

                    $("#bc-container").css({'height': winHeight})
                    // $("#vis-container").css({'height': winHeight*0.9});
                    //   $("#bar-container").highcharts().reflow();
                    $("#circle-container").css({'height': cwinHeight}).highcharts().reflow();
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
            selectDatabase();

        })
});

var toteuttajaList = [],
    teemaList = [],
    kuntaList = [],
    maakuntaList = [],
    aviList = [],
    rahoittajaList = [],
    vuosiList = [],
    erityisList = [];
//       kimppaList = [];

var uniqueToteuttaja,
    uniqueKunta,
    uniqueMaakunta,
    uniqueTeema,
    uniqueAvi,
    uniqueRahoittaja,
    uniqueVuosi,
    uniqueErityis;

var listing = function (data, rows) {
    var arrTeema = [],
        arrKunta = [],
        arrMaakunta = [],
        arrToteuttaja = [],
        arrVuosi = [],
        arrRahoittaja = [],
        arrErityis = [],
        arrAvi = [];

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }



    for (var e = 0, el = data.length; e < el; ++e) {
        //    if (data[e].rahasto
        arrToteuttaja.push(data[e].Toteuttaja);
        arrKunta.push(data[e].Kunta);
        arrMaakunta.push(data[e].ColSel_Maakunta);
        arrTeema.push(data[e].ColSel_Teema);
        arrAvi.push(data[e].ColSel_Aluehallintovirasto);
        //        arrKimppa.push(data[e].Kimppa);
        arrRahoittaja.push(data[e].ColSel_Hanketyyppi);
        arrErityis.push(data[e].Erityisavustus);

        //   arrVuosi.push(parseInt(data[e].ColSel_Vuosi.toString()));
        arrVuosi.push(data[e].ColSel_Vuosi.toString());
    }
    //       arrRahoittaja.push("ELY / AVI");
    //       arrRahoittaja.push("Opetus- ja kulttuuriministeriö");



    uniqueToteuttaja = arrToteuttaja.filter(onlyUnique),
        uniqueKunta = arrKunta.filter(onlyUnique),
        uniqueMaakunta = arrMaakunta.filter(onlyUnique),
        uniqueTeema = arrTeema.filter(onlyUnique),
        uniqueVuosi = arrVuosi.filter(onlyUnique),
        uniqueAvi = arrAvi.filter(onlyUnique),
        uniqueErityis = arrErityis.filter(onlyUnique),
        uniqueRahoittaja = arrRahoittaja.filter(onlyUnique);
    //        uniqueKimppa = arrKimppa.filter(onlyUnique);


    uniqueToteuttaja.sort();
    uniqueKunta.sort();
    uniqueMaakunta.sort();
    uniqueTeema.sort();
    uniqueAvi.sort();
    uniqueErityis.sort();
    uniqueVuosi.sort();
    uniqueRahoittaja.sort();

    var elem;

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
    for (var q = 0, ql = uniqueAvi.length; q < ql; ++q) {
        aviList.push("Avi//" + uniqueAvi[q]);
        elem = $('<option>').val("Avi//" + uniqueAvi[q]).text(_(uniqueAvi[q]));
        if (jQuery.inArray(uniqueAvi[q], window.PAGE.FILTER.AVI) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Aluehallintovirasto');
    }
    for (var q = 0, ql = uniqueErityis.length; q < ql; ++q) {
        erityisList.push("Erityisavustus//" + uniqueErityis[q]);
        elem = $('<option>').val("Erityisavustus//" + uniqueErityis[q]).text(_(uniqueErityis[q]));
        if (jQuery.inArray(uniqueErityis[q], window.PAGE.FILTER.ERITYIS) > -1) {
            elem.prop('selected', true);
        }
        elem.appendTo('#Erityisavustus');
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
};
