/**
 * Created by Roope on 25.3.2020.
 */
var TableVis = {};
TableVis.masterData = null;


var HankeVisTable = function (data, callback) {
    TableVis.masterData = data
    TableVis.start(data);

if (callback) {
    callback();
}
}
//var HankeVisTable = function (data, callback) {
    TableVis.start = function () {
//console.log(TableVis.data)
        $('#luokittelu').find('option[value="' + window.PAGE.VIEW + '"]').attr('selected', true);
        TableVis.data = filterData(TableVis.masterData);

        if(window.PAGE.VIEW == "ColSel_Teema") {
            TableVis.data = TableVis.data.filter(function (el) {
                if (el.ColSel_Teema.length === 0) {
                    return false;
                } else {
                    return true
                }
            })
        }

    'use strict';

    //   $("#arrow_box_abs").css({'visibility': "hidden"});
    //   $(".arrow_box_abs").css({'opacity': 0});
    $('.arrow_box_abs').hide();

    var id = "Joensuu"

    var data = {
        townName: _(id),
        projects: [],
        yearProjects: [],
        skipCount: 0,
        //    partnerprojects: [],
        kunta: false
    };
    var area;

    for (var i = 0; i < TableVis.data.length; i++) {
        if (TableVis.data[i]['ColSel_Hanketyyppi'] === "Huono")
            continue


        var project = TableVis.data[i],
        //   kunta = project['Kunta'],
            kunta = findkunta(project['Kunta']),
            maakunta = project['ColSel_Maakunta'],
            avi = project['ColSel_Aluehallintovirasto'],
            rahna = project['amount'],
        //      partners = project['Osatoteuttajat'],
            kimppa = project['Kimppa'],
      //      vuosi = project['ColSel_Vuosi'];//.substr(0, 4);
        //    vuosi = project['ColSel_Vuosi'].substr(0, 5);

/*
        if (MapVis.base === "kunta") {
            area = kunta;
        } else if (MapVis.base === "maakunta") {
            area = maakunta;
        } else if (MapVis.base === "avi") {
            area = avi;
        } else {
            area = kehitKirjasto
        }
*/
        area = "Joensuu"

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
/*
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
*/
var avustusm =project.Avustusmuoto.match(/_(.*)/)[1]

            data.projects.push({
                "id": project.id,
                "hanke_name": _(project.hanke_name),
                "Toteuttaja": _(project.Toteuttaja),
                "Sektori": _(project.Sektori),
                "ColSel_Teema": _(project.ColSel_Teema),
                "OrganisationType": _(project.OrganisationType),
                "Avustusmuoto": _(avustusm),
                "AvustusmuotoSort": _(project.Avustusmuoto).match(/\d+/)[0],
                "ColSel_Maakunta": _(project.ColSel_Maakunta),
                "ColSel_Aluehallintovirasto": _(project.ColSel_Aluehallintovirasto),
                "Kunta": _(project.Kunta),
                "myonto": Highcharts.numberFormat(project.amount, 0) + " €",
                "ColSel_Vuosi": project.ColSel_Vuosi,
                "link": "https://erasmus-plus.ec.europa.eu/projects/search/details/" +project.link
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

        function compare(a, b) {
            // Use toUpperCase() to ignore character casing
            var bandA = a.Toteuttaja.toUpperCase(),
             bandB = b.Toteuttaja.toUpperCase();

            var comparison = 0;
            if (bandA > bandB) {
                comparison = 1;
            } else if (bandA < bandB) {
                comparison = -1;
            }
            return comparison;
        }

        data.projects.sort(compare)

      //  data.projects.compa
   //     if(window.PAGE.VIEW)


    var tmpData = {};
    var tmpAvustusmuoto = {};
    for (var i = 0; i < data.projects.length; i++) {
        var project = data.projects[i];

        if(window.PAGE.VIEW == "total") {
            if (!tmpData[_("Kaikki hankkeet")]) {
                tmpData[_("Kaikki hankkeet")] = [project]
            } else {
                tmpData[_("Kaikki hankkeet")].push(project);
            }

        } else {
            if(window.PAGE.VIEW == "Avustusmuoto") {
                if (project.AvustusmuotoSort in tmpData) {
                    tmpData[project.AvustusmuotoSort].push(project);
               //     tmpAvustusmuoto[project[window.PAGE.VIEW]].push(project);
                } else {
                    tmpData[project.AvustusmuotoSort] = [project];
                    tmpAvustusmuoto[project.AvustusmuotoSort] = _(project.Avustusmuoto);
                }
          //      tmpData[project.AvustusmuotoSort].push(project);
            } else {
                if (project[window.PAGE.VIEW] in tmpData) {
                    tmpData[project[window.PAGE.VIEW]].push(project);
                } else {
                    tmpData[project[window.PAGE.VIEW]] = [project];
                }
            }

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
   // MapVis.allowedYears = ["2019","2020"]
        TableVis.chosenLuokittelu = []
        for (var k in tmpData) {
            TableVis.chosenLuokittelu.push(k)

        }
/*
        if(window.PAGE.SORT == "ColSel_Maakunta") {
            TableVis.allowedYears = uniqueMaakunta
        } else {
            TableVis.allowedYears = uniqueTeema
        }
console.log(tmpData)*/
        TableVis.chosenLuokittelu.sort()
        console.log(subtitle)
        data.yearProjects = []
        data.subtitle= subtitle.join(", ")

        var translations = {
            toteuttaja: _("Organisaatio"),
            nimi: _("Hankkeen nimi"),
            muoto: _("Toimintotyyppi"),
            vuosi: _("Myöntövuosi"),
            myonto: _("Myönnetty avustus"),
            link: _("Hankkeen verkkosivu")
        }
        TableVis.tablenums = []
        TableVis.tablenames = []

    $.each(TableVis.chosenLuokittelu, function (index, el) {
        var tabname = "table_"+index
        TableVis.tablenums.push(tabname)
        if(window.PAGE.VIEW == "Avustusmuoto") {
            TableVis.tablenames.push("KA"+el)
        } else {
            TableVis.tablenames.push(el)
        }

        data.yearProjects.push({
            sorter: tmpAvustusmuoto[el] || el,
            tablename: tabname,
            projects: tmpData[el] || [],
            partnerprojects: tmpData2[el] || [],
            kunta:isitKunta,
            translations: translations
            // mainPartner: _("Päätoteuttajana")
            //    partner: _("Kumppanina")
        });
    });

 //   data.yearProjects.reverse();

    data.skipText = _('{0} ' + (data.skipCount > 1 ? _('piilotettua projektia') : 'piilotettu projekti'), data.skipCount);

console.log(data)

    var source = $('#table-template').html(),
        template = Handlebars.compile(source),
        container = $('#table'),
        html = template(data);
    container.html(html);
        container.show()
    var modalLink = container.find('.mapModal');
/*
    var modalSource = $('#map-info-modal-template').html(),
        modalTemplate = Handlebars.compile(modalSource),
        modalContainer = $('#map-info-details');
        */
        var acc = document.getElementsByClassName("accordion");
        var ic;

        for (ic = 0; ic < acc.length; ic++) {
            acc[ic].addEventListener("click", function() {
                /* Toggle between adding and removing the "active" class,
                 to highlight the button that controls the panel */
                this.classList.toggle("active");

                /* Toggle between hiding and showing the active panel */
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });
        }

        modalLink.each(function () {
            var that = $(this),
                projectIds = that.data('project-id');

            that.click(function (e) {
                e.preventDefault();

                clickProject(projectIds,MapVis.data)
            });

        });


}
