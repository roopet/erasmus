/**
 * Created by Roope on 20.10.2020.
 */
HankeVisBar.Options = {
    textSelect: "",
    sizeSelect: "",
    colorWith: "",
    stacked: true,
    filteredValues: [],
    doFilter: {}
};

HankeVisTags.Options = {
    colorTable: {}
};

if (window.PAGE.VIS === 'good-practices') {
    $('#textAndSelect').hide();
}

var funkkis;
var colorwith;
var seenColors = []
var seenCircles = []
var termit = {
    ColSel_Teema: _("Teema"),
    ColSel_Maakunta: _("Maakunta"),
    Avustusmuoto: _("Toimintotyyppi"),
    Sektori: _("Sektori"),
    OrganisationType: _("Organisaatiotyyppi"),
    ColSel_Hanketyyppi: _("Toimiala"),
    ColSel_Kieli: _("Kieli")
}

var HankeVisReady = function () {
    $('#color-everything-with').find('option[value="' + window.PAGE.COLOR + '"]').attr('selected', true);
    color_by(window.PAGE.COLOR);
};

var HankeVisBarReady = function () {
    $('#color-everything-with').find('option[value="' + window.PAGE.COLOR + '"]').attr('selected', true);
    $('#luokittelu').find('option[value="' + window.PAGE.VIEW + '"]').attr('selected', true);
};

var HankeVisTagsReady = function () {
    //     $('#color-everything-with').find('option[value="' + window.PAGE.COLOR + '"]').attr('selected', true);
    $('#color-everything-with').find('option[value="' + window.PAGE.COLOR + '"]').attr('selected', true);
    HankeVisTags.Options.colorTable = {}
    tags_color_by(window.PAGE.COLOR);
    show_color_table(window.PAGE.COLOR, HankeVisTags.Options.colorTable)
};


$(".chosencss").chosen({disable_search_threshold: 10});

var $select = $("#select-size");
var textSelect = $select.find('option:selected').val();

var sizeSelect = "amount";

var $filterInput = $('#example-optgroup');
var colorSelect = $('#color-everything-with');
var mapBaseSelect = $('#mapBaseSelect');
var kausiSelect = $('#kausi');

var doFilter = {};

HankeVisBar.Options.textSelect = sizeSelect;
HankeVisBar.Options.sizeSelect = sizeSelect;
HankeVisBar.Options.sizeText = sizeSelect;
HankeVisBar.Options.colorWith = window.PAGE.COLOR;
HankeVisBar.Options.filteredValues = $filterInput.val();


$("#select-text").on("change", function () {
    HankeVisBar.Options.textSelect = $(this).val();
    HankeVisBar.update();
});

//console.log($filterInput)

$filterInput.on("change", function () {

    if(window.PAGE.TYPE === "bars") {
        HankeVisBar.update();
    } else if (window.PAGE.TYPE === "tags") {
        HankeVisTags.update();
    } else if(window.PAGE.TYPE === "map") {
        MapVis.start()
    } else if(window.PAGE.TYPE === "circles") {
        //          doFilter()
    } else if(window.PAGE.TYPE === "table") {
        TableVis.start()
    }
});



$select.on("change", function () {
    HankeVisBar.Options.sizeSelect = $(this).val();
    HankeVisBar.Options.sizeText = $('#select-size').find('option:selected').text();
    HankeVisBar.update();
});

kausiSelect.on("change", function () {
//    HankeVisBar.Options.sizeSelect = $(this).val();
//    HankeVisBar.Options.sizeText = $('#select-size').find('option:selected').text();
//    HankeVisBar.update();
    var selKausi = $('#kausi').find('option:selected').text()

    if(selKausi == '2021-2027') {
        if (window.PAGE.LANG === 'en') {
            $('#erasmuslogo').attr("src", "css/images/Erasmus+_with_baseline-pos-ALL_lang_EN.png");
        } else if (window.PAGE.LANG === 'fi') {
            $('#erasmuslogo').attr("src", "css/images/Erasmus+_with_baseline-pos-ALL_lang_FI.png");
        } else {
            $('#erasmuslogo').attr("src", "css/images/Erasmus+_with_baseline-pos-ALL_lang_SV.png");
        }
    } else {
        $('#erasmuslogo').attr("src", "css/images/erasmus.jpg");
    }

    selectDatabase(selKausi)
    doRouting({
        TERM: selKausi
    });
});

colorSelect.on("change", function () {
    var newColor = colorSelect.find("option:selected").val();

    doRouting({
        COLOR: newColor
    });

    if(window.PAGE.TYPE === "bars") {
        HankeVisBar.Options.colorWith = newColor;
        HankeVisBar.update();
    } else if (window.PAGE.TYPE === "tags") {
        HankeVisTags.Options.colorTable = {}
        tags_color_by(newColor)
        show_color_table(window.PAGE.COLOR, HankeVisTags.Options.colorTable)
    }

});


var $visSelectSelect = $('#visSelectSelect');
//visun vaihto äää
$visSelectSelect.val(window.PAGE.VIS);
$visSelectSelect.on("change", function () {

    doRouting({
        VIS: $('#visSelectSelect').val()
    }, true);



});

$("#stacked").on("click", function (e) {
    HankeVisBar.Options.stacked = true;
    HankeVisBar.update();
});

$("#hamMenu").on("click", function (e) {

    var sb = $("#options-sidebar")
    var cb = $("#cornerButton")

//    $(document).ready(function(){$('#hamburger-modal').foundation('reveal', 'open')});
    if(sb.width() / $(window).width() < 0.7) {
        sb.css({
            left: 0,
            width:"82%",
            zIndex:3
        });
        cb.html('<i class="fa fa-times"></i>')
    } else {
        sb.css({
            left: -wwidth,
            width:0
        });
        cb.html('<i class="fa fa-bars"></i>')
    }
sb.focus()

    $(".ui-multiselect-menu").css({
        width:"100%"
    });

});

$("#notStacked").on("click", function (e) {
    HankeVisBar.Options.stacked = false;
    HankeVisBar.update();
});
/*
 $('[name="t-group"]').on("click", function (e) {
 console.log(e)
 console.log(e.target.id)
 doRouting({
 SORT: e.target.id
 });
 TableVis.start()
 //   HankeVisBar.Options.stacked = false;
 //   HankeVisBar.update();
 });
 */
HankeVisBar.Options.category = window.PAGE.VIEW === "total" ? undefined : window.PAGE.VIEW;
HankeVisBar.update();

if (window.PAGE.VIEW !== "total") {
    $(".HankeVis_navi.btn[data-name='" + window.PAGE.VIEW + "']").addClass('selected');
}

$("#Kunnittain").on("click", function (e) {

});

//$(".HankeVis_navi.btn, li a.HankeVis_navi.btn").on("click", function (e) {
$("#luokittelu").on("change", function (e) {

 //   e.preventDefault();

 //   $('.HankeVis_navi').removeClass('selected');

 //   var newName = $(this).data("name");
    var newName = this.value;
    console.log(newName)
    console.log(e)
    console.log(this.value)

    if(window.PAGE.TYPE == "bars") {
        if (newName === HankeVisBar.Options.category) {
            newName = undefined;
        } else {
  //          $(this).addClass('selected');
        }

        HankeVisBar.Options.category = newName;
        //HankeVisBar.update();

        doRouting({
            VIEW: (HankeVisBar.Options.category === undefined ? "total" : HankeVisBar.Options.category)
        });
        HankeVisBar.update();
    } else if (window.PAGE.TYPE == "table") {
        doRouting({
            VIEW: newName
        });
        TableVis.start()
    }

});

$("#select-vis").on("change", function (e) {

    var newName =e.currentTarget.value
    if (newName === HankeVisBar.Options.category) {
        newName = undefined;
    } else {
        $(this).addClass('selected');
    }
    HankeVisBar.Options.category = newName;
    //HankeVisBar.update();
    doRouting({
        VIEW: (HankeVisBar.Options.category === undefined ? "total" : HankeVisBar.Options.category)
    });
    HankeVisBar.update();
})

$('[name="sortMapTable"]').on('click', function () {

    sortTable($(this)[0].id)
});

function sortTable(sorts) {
    var itemsArray = MapVis.settings.series[0].data

    if (sorts == "sortAmount") {
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
    table.html("")

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

}

var csvData;

var multipleSelect = $('#newSelect');
var Kuntatilasto = {};

Kuntatilasto.selectedTown = null;

multipleSelect.multipleSelect({
    filter: true,
    multiple: true
});

var controlsVisible = true;

$(".trigger").click(function () {
    var el = $(this);
    el.text() == el.data("text-swap")
        ? el.text(el.data("text-original"))
        : el.text(el.data("text-swap"));
    $("#ohjeet").toggle("fast");
    $(this).toggleClass("active");
    return false;
});

$(".maptrigger").click(function () {
//alert("ww")
    var chart = $("#mappi");
    var el = $(this);
    el.text() == el.data("text-swap")
        ? el.text(el.data("text-original"))
        : el.text(el.data("text-swap"));
    $("#mapcontainer").toggle("fast");
    $(this).toggleClass("active");
    chart.highcharts().reflow();
    chart.css({'width': "100%"});
});

var eakrTest;
var initiate_CS = function () {
    var colorSelect = $('#color-everything-with');
    var SetColors = function () {

        colorwith = colorSelect.val();
        color_by(colorwith);
    };

    colorSelect.change(SetColors);
};

function get_distinct_values(records, keyType, key) {
    var allValues = {};
    for (var s in records) {
        var value = records[s][key];
        allValues[value] = true;
    }

    var allValuesArray = [];
    for (var i in allValues)
        allValuesArray.push(i);

    console.log(allValuesArray)
    allValuesArray.sort();
    return allValuesArray
}

function keyToColSel(key) {
    var firstPartEnds = key.indexOf('_');
    if (firstPartEnds <= 0)
        return {key: key, type: key, title: key};

    var firstPart = key.substring(0, firstPartEnds);
    var secondPart = key.substring(firstPartEnds + 1);

    return {key: key, type: firstPart, title: secondPart};
}

function render_colors(records) {
    var first = records[0];
    var ColSels = [];
    for (var key in first) {
        var ColSel = keyToColSel(key);
        switch (ColSel.type) {
            case "ColSel":
                ColSels.push(ColSel);
                break;
            default:
                break;
        }
    }
    initiate_CS(ColSels);
}



function show_color_table(what_to_color_by, color_grid) {
    var right = $('#right-sidebar-toggle');
    var wwidth = $(window).width();
    var rightContainer = $('#color-container');

    var gridLength = Object.keys(color_grid).length

    var cutPoint = Math.ceil(gridLength/2)
    var runNum = 0
console.log(what_to_color_by)
console.log(color_grid)
console.log(seenColors)



    var map = {};
    var colar =[];
    Object.keys(color_grid)
        .sort(function (a, b) {
            a = _(a);
            b = _(b);

            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        })
        .forEach(function (key, i) {

            if(window.PAGE.TYPE === "circles") {
                map[key] = color_grid[key];
                colar.push({text:key,color:color_grid[key]})
            }

        });
//alert(1)

    rightContainer.empty();

    /*
     sampleCategoricalData = ["Something","Something Else", "Another", "This", "That", "Etc"]
     sampleOrdinal = d3.scale.category20().domain(sampleCategoricalData);

     verticalLegend = d3.svg.legend().labelFormat("none").cellPadding(5).orientation("vertical").units("Things in a List").cellWidth(25).cellHeight(18).inputScale(sampleOrdinal).cellStepping(10);

     d3.select("svg").append("g").attr("transform", "translate(50,140)").attr("class", "legend").call(verticalLegend);

     */
    var table;
    if(window.PAGE.TYPE === "circles") {
        if(accessColors == true ||accessColors == false) {
            table = $('<table id="first" style="width:100%; margin-bottom:0.5rem; float:left"/>');

            for (var key in map) {
                if (key !== "(ei teemaa)") {
                    var row = $('<tr/>'),
                        cell = $('<td/>'),
                        cell2 = $('<td/>'),
                        square;
                    if (wwidth < 1100) {
                        square = $('<div style="width: 10px; height: 10px; background: ' + color_grid[key] + ';">&nbsp;</div>');
                    } else {
                        if(accessColors == false) {
                            square = $('<div style="width: 15px; height: 15px; background: ' + color_grid[key] + ';">&nbsp;</div>');
                        } else {
                            square = $('<div style="width: 15px; height: 15px;"><svg style="height:15px; width:15px" id="accessable-legend'+runNum+'"></svg></div>');
                        }

                    }

                    if(wwidth < threashold) {

                    } else {

                    }

                    square.appendTo(cell);
                    cell.appendTo(row);

                    cell = $('<td/>');
                    if (key.indexOf("00:00") > -1 || key.indexOf("-01-01") > -1) {
                        cell.text(' ' + _(parseFloat(key)) + ' ');
                    } else {
                        cell.text(' ' + _(key) + ' ');
                    }

                    cell.appendTo(row);
                    row.appendTo(table);


                }
                runNum +=1
            }
            table.appendTo(rightContainer);
            if(accessColors == true)
                for (var x in colar) {
                    var SVG = d3.select('#accessable-legend' + x)

                    var size = 15
                    /*
                     SVG.selectAll("mydots")
                     .data(runNum)
                     .enter()
                     .append("rect")
                     .attr("x", 5)
                     .attr("y", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
                     .attr("width", size)
                     .attr("height", size)
                     .style("fill", function(d,i){
                     console.log(d)
                     console.log(i)
                     return color_grid[key]})
                     */
                    var lege = SVG.append("rect"
                    )
                        /*    .attr("x", 5)
                         .attr("y", function(d,i){
                         return i*(size+5)})*/
                        // 100 is where the first dot appears. 25 is the distance between dots
                        .attr("width", size)
                        .attr("height", size)
                        .style("fill", function(d,i){
                            return colar[x].color}
                    )

                }
        } else {


            table = $('<div><svg id="accessable-legend" width=100%></svg></div>');
            table.appendTo(rightContainer);
            var SVG = d3.select("#accessable-legend")
            var size=15
            SVG.selectAll("mydots")
                .data(colar)
                .enter()
                .append("rect")
                .attr("x", 5)
                .attr("y", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("width", size)
                .attr("height", size)
                .style("fill", function(d,i){

                    return d.color})

            SVG.selectAll("mylabels")
                .data(colar)
                .enter()
                .append("text")
                .attr("x", 10+size*1.2)
                .attr("y", function(d,i){ return i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", function(d){ return "white"})
                .text(function(d){ return d.text})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")

        }
        parseColorTable(seenCircles)
    }
}
