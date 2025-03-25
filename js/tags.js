// Copyright: Vividin Oy. All rights reserved.

var force;
var simulation;
var nodes;
//var simulation = null
var layout = "map"
var colorCircles, tooltip;
var tabIndex = 3
var HankeVisTags = function (HankeVisData, HankeVisOnReadyCallBack) {

//    HankeVisTags.Options = {}
//    HankeVisTags.Options.colorTable = {}
    var xMin, xMax, yMax, yMin;
    var wwidth = $(window).width(),
        wheight = $(window).height()
    var width;
    var height = $(window).height() - 35 - $("#navbar-menu").height() - 15
    if ($(window).width() < 1100) {
        width = wwidth * 0.83;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 240);
    } else if ($(window).width() < 1300) {
        width = wwidth * 0.83;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 260);
    } else if ($(window).width() < 1400) {
        width = wwidth * 0.83;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 310);
    } else {
        width = wwidth * 0.83;
        //   this.height = wheight - visHeight * 1.25;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 485);
    }

    function getMaxMin(hankkeet) {
        var xArray = []
        var yArray = []

        for (var i = 0; i < hankkeet.length; i++) {
            yArray.push(parseFloat(hankkeet[i].y))
            xArray.push(parseFloat(hankkeet[i].x))

        }

        xMax = d3.max(xArray)
        xMin = d3.min(xArray)
        yMax = d3.max(yArray)
        yMin = d3.min(yArray)

    }



    var hankedata = getMaxMin(HankeVisData)
 //   console.log(hankedata)
 //   console.log(HankeVisData)

    //v3
    var xScale = d3.scale.linear().domain([xMin,xMax]).range([30,width-30]),
        yScale = d3.scale.linear().domain([yMin,yMax]).range([30,height-30]);

    //v4
 //   var xScale = d3.scaleLinear().domain([xMin,xMax]).range([50,wwidth-50]),
 //       yScale = d3.scaleLinear().domain([yMin,yMax]).range([60,wheight-50]);

    var allValues = [], minValue, maxValue;

    var minRadiusDomain = d3.min(HankeVisData, function(d) {
        return +d.amount;
    });
    var maxRadiusDomain = d3.max(HankeVisData, function(d) {
        return +d.amount;
    });

    //v4
    //  var scaleRadius = d3.scaleLinear()
    //v3
    //  var scaleRadius = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([1, wwidth / 25]);

    var scaleRadius = d3.scale.linear()
        .domain([minRadiusDomain, maxRadiusDomain])
        .range([3, 32])

    var axes = [
        { 'label': 'Paljon yhteisiä asiasanoja', 'value': 15 },
        { 'label': 'Useampia yhteisiä asiasanoja', 'value': 30 },
        { 'label': 'Joitain yhteisiä asiasanoja', 'value': 45 },
        { 'label': '1-2 yhteistä asiasanaa', 'value': 60 }/*,
        { 'label': 'extremely different', 'value': 75}*/
    ];






    HankeVisData.forEach( function(d,i) {
        if (d.ColSel_Hanketyyppi === "ELY" || d.ColSel_Hanketyyppi === "Hyvä") {
            d.ColSel_Hanketyyppi = "ELY / AVI";
        }
        if (d.ColSel_Hanketyyppi === "OKM") {
       //     console.log(d)
            d.ColSel_Hanketyyppi = "Opetus- ja kulttuuriministeriö";
        }
        if (d.ColSel_Hanketyyppi === "HUONO" || d.ColSel_Hanketyyppi === "Huono") {
                  d.ColSel_Hanketyyppi = "Toteutumaton hanke";

         //   return
        }
        if (d.ColSel_Kieli === "fi") {
            d.ColSel_Kieli = "suomenkielinen";
        }
        if (d.ColSel_Kieli === "sv") {
            d.ColSel_Kieli = "ruotsinkielinen";
        }
    /*    var node
        node = {
            y: yScale(parseFloat(d.y)),
            //   d.x = parseFloat(d.x),
            x : xScale(parseFloat(d.x)),
            amount : parseFloat(d.amount),
            radius :parseFloat(d.amount),
            tagArray : d.tag.split(',')
        };
        tagsData.push(node)
     */
        d.name = d.hanke_name
        d.spaceY = yScale(parseFloat(d.y))
        d.spaceX = xScale(parseFloat(d.x))
        d.y = yScale(parseFloat(d.y))
        d.x = xScale(parseFloat(d.x))
        d.amount = parseFloat(d.amount)
        d.radius =scaleRadius(parseFloat(d.amount))
        d.orig_radius =scaleRadius(parseFloat(d.amount))
        d.tagArray = d.tag.split(',')
        d.avi = d.ColSel_Aluehallintovirasto
        d.toteuttaja = d.Toteuttaja
        d.kunta = d.Kunta
        d.vaikutusalue = d.ColSel_Vaikutusalue
        d.teema = d.ColSel_Teema
        d.tyyppi = d.ColSel_Hanketyyppi
        d.kieli = d.ColSel_Kieli
        d.kohderyhma = d.Kohderyhma
        d.maakunta = d.ColSel_Maakunta
  //      d.link = d.link
        d.hvuosi = parseInt(d.ColSel_Vuosi).toString()
        d.connections = {}
        d.s = i

    })

    var graph = HankeVisData
    var hankkeet = HankeVisData
    var links = []

    for (var k = 0, kl = graph.length; k < kl; ++k) {
        for (var t = 0, tl = hankkeet.length; t < tl; ++t) {

       //     var inputar1 = graph[k].tagit
            var inputar1 = graph[k].tagArray
       //     var inputar2 = hankkeet[t].tagit
            var inputar2 = hankkeet[t].tagArray
            var results = [];

            for (var i = 0; i < inputar1.length; i++) {
                for (var g = 0; g < inputar2.length; g++) {
                if (inputar1[i] == inputar2[g]) {
                    results.push(inputar2[g]);
                }
                }
            }

            var value = results.length * ((results.length / inputar1.length+results.length / inputar1.length)/2)
            allValues.push(value)
            if (value > 0 && hankkeet[t].id !== graph[k].id) {
         //   if (value > 0 && HankeVisData[k].id == ) {
            //    links.push({source:hankkeet[t].id, target:graph[k].id, value:value,connection:hankkeet[t].tagit[e] })
                links.push({source:hankkeet[t].id, target:graph[k].id, value:value })
            }

        }
    }


    HankeVisData.forEach( function(d) {
        for (var k = 0, kl = links.length; k < kl; ++k) {
            if(d.id == links[k].source)
                d.connections[links[k].target] = links[k].value
        }

    });

 //   var minValueDomain = Math.min(allValues)
 //   var maxValueDomain = Math.max(allValues)

  //  var rl = d3.scale.linear().domain([0, maxValueDomain]).range([10, width / 2]);
    var rl = d3.scale.linear().domain([0, 55]).range([0, height / 3]);

    var scaleDistance = d3.scale.linear().domain([5, 0]).range([1, height / 3]);



    function init() {
        var tagsChart = bubbleChart().width(width).height(height);
        d3.select('#tags-container').data(HankeVisData).call(tagsChart);
    }
    init()




    function bubbleChart() {

            var marginTop = 96,
            columnForColors = window.PAGE.COLOR,
            columnForTitle = "hanke_name",
            columnForRadius = "amount",
            unitName="Toteuttaja",
            chartSelection,
            chartSVG;

        colorCircles = function (variarvo) {
            //   var colorTable = {}
            var color;
            HankeVisTags.Options.colorTable[variarvo] = {}

            if (variarvo === _("Digitointi")) {
                //   color = '#fdbf6f';
                color = '#fdbf6f';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Henkilöstön osaaminen")) {
                color = '#ff7f00';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Kokoelmat")) {
                color = '#ffff99';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Laitehankinnat")) {
                color = '#b2df8a';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Lukemisen edistäminen")) {
                color = '#33a02c';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Mediakasvatus")) {
                color = '#cab2d6';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Oppimisympäristö ja yhteisöllisyys")) {
                color = '#a6cee3';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Palvelujen kehittäminen")) {
                color = '#1f78b4';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Strateginen kehittäminen")) {
                color = '#6a3d9a';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Tilasuunnittelu")) {
                color = '#fb9a99';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Verkkopalvelut")) {
                color = '#e31a1c';
                HankeVisTags.Options.colorTable[variarvo] = color
                // Avit
            } else if (variarvo === _("Etelä-Suomi")) {
                color = '#a6cee3';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Itä-Suomi")) {
                color = '#1f78b4';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Lappi")) {
                color = '#b2df8a';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Lounais-Suomi")) {
                color = '#33a02c';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Länsi-ja Sisä-Suomi")) {
                color = '#fb9a99';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("Pohjois-Suomi")) {
                color = '#e31a1c';
                HankeVisTags.Options.colorTable[variarvo] = color
                // Vaikutusalueet
            } else if (variarvo === _("kunnan- tai kaupunginosat")) {
                color = '#d73027';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("kunnat")) {
                color = '#fc8d59';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("seutukunnat")) {
                color = '#fee090';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("maakunta")) {
                color = '#ffffbf';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("ylimaakunnallinen")) {
                color = '#e0f3f8';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("valtakunnallinen")) {
                color = '#91bfdb';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("kansainvälinen")) {
                color = '#4575b4';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "fi") {
                variarvo = _("suomenkielinen");
                color = '#22adff';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("sv")) {
                variarvo = _("ruotsinkielinen");
                //     variarvo = "ruotsinkielinen";
                color = '#ccff00';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("ELY / AVI")) {
                color = "#1f78b4";
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === _("OKM") || _("Opetus- ja kulttuuriministeriö")) {
                variarvo = _("Opetus- ja kulttuuriministeriö");
                color = "#a6cee3";
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2010" || variarvo === "2010-01-01") {
                color = '#4575b4';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2011" || variarvo === "2011-01-01") {
                color = '#74add1';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2012" || variarvo === "2012-01-01") {
                color = '#abd9e9';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2013" || variarvo === "2013-01-01") {
                color = '#e0f3f8';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2014" || variarvo === "2014-01-01") {
                color = '#fee090';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2015" || variarvo === "2015-01-01") {
                color = '#fdae61';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2016" || variarvo === "2016-01-01") {
                color = '#f46d43';
                HankeVisTags.Options.colorTable[variarvo] = color
            } else if (variarvo === "2017" || variarvo === "2017-01-01") {
                color = '#d73027';
                HankeVisTags.Options.colorTable[variarvo] = color
            }
            return color
        }

     //   var index = 7235; //3d
        var index = 7692, indexData;
    //    d3.select("#cityselector").property("selectedIndex", index);

        d3.select("#cityselector")
            .on("change", function(d) {
                index = this.value;
           //     update();
            })

//	var zoom = d3.behavior.zoom()

        /**
         * The command to actually render the chart after setting the settings.
         * @public
         * @param {string} selection - The div ID that you want to render in
         */
        function chart(selection) {
        //    var data = selection.enter().data();
            var data = HankeVisData;

            chartSelection=selection;
            var div = selection,
            //    svg = div.selectAll('svg');
                svg = div.selectAll('svg');
            svg.attr('width', width)
                .attr('height', height)
                .attr('tabindex', 0)
          //      	.attr("transform", "translate(450,-150) rotate(45)")
         //       	.attr("transform", "translate(0,0) rotate(45)")
            //    v3
                	.call(d3.behavior.zoom().on("zoom", function () {
                //v4
         //       .call(d3.zoom().on("zoom", function () {
                //    		svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
           //         svg.attr("transform", d3.event.transform)
                }))

            chartSVG=svg;
            console.log("setting nodes")
            var node = svg.selectAll("circle")
                .data(data)
                .enter()
                //        .append("g")
                //        .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
                //        .style('opacity',1);

                //     node.append("circle")
                .append("circle")
                .attr("id",function(d,i) {
                    return "circle"+d.id;
                })
                .attr("class",function(d,i) {
                    return d.tag;
                    //        return "circle";
                })
                .attr('r', function(d) {
                    //     return scaleRadius(d[columnForRadius]) || 0;
                    return d.radius || 0;
                })
                .attr('tabindex', function(d) {
                    //     return scaleRadius(d[columnForRadius]) || 0;
                    tabIndex +=1
                    return tabIndex
                })
                .attr('stroke-width', function(d) {
                    return 1
                })
                .attr('stroke', function(d) {
                    return '#303030'; // tummanharmaa
                })

                .attr('x', function(d) {
                    return d.x;
                })
                .attr('y', function(d) {
                    return d.y;
                })
                .attr('cx', function(d) {
                    return d.x;
                })
                .attr('cy', function(d) {
                    return d.y;
                })/*
                .attr('spaceX', function(d) {
                    return d.x;
                })
                .attr('spaceY', function(d) {
                    return d.y;
                })
*/
                .attr("transform", function(d) {
                    //     return "rotate(45)"
                    //    return "translate(450,-150) rotate(45)"
                    //       return "transform", "translate(" + (width/2) + "," + (height/2) + ") rotate(45) translate(" + (d.radius/2) + "," + (d.radius/2) + ")"
                    //        return "translate(" + (width/2) + "," + (height/2) + ") rotate(45)"
                })/*
             .attr("transform",function(d) {
             //		return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
             return "translate(" + [d.x, d.y] +")";
             })*/
                .style("fill", function(d) {
                    //     console.log(d[columnForColors])
                    //       color = '#FFFF'
                    return colorCircles(d[columnForColors]);
                })
                .on("mouseover", function(d, i) {
                    if(layout !=="radial")
                        highlightConnections(this)
                    globalFuncs.show_details(d, i, this,indexData);
                })
                .on("keydown", function(d, i) {
                    if(layout !=="radial")
                        highlightConnections(this)
                    globalFuncs.show_details(d, i, this,indexData);
                })
                .on("mousemove", function() {
                    updatePosition(d3.event)
                    //	return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("click", function(d) {
                    $('input[type="radio"][name="tag-layout"][value="radial"]').prop('checked', true);
                    layRadial(d.id)
                    indexData = d.tagArray
                    //	return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function(d, i) {
                    svg.selectAll("circle").style("opacity", 1)
                    //	d3.select(this).style('opacity', 1)
                    /*		svg.selectAll('.tag_title').filter((t) -> t == d)
                     .style('opacity', 0.5)*/
                    globalFuncs.hide_details(d, i, this);
                    //      return tooltip.style("visibility", "hidden");
                });

            nodes = node
            console.log(nodes)
/*
            var minRadiusDomain = d3.min(data, function(d) {
                return +d[columnForRadius];
            });
            var maxRadiusDomain = d3.max(data, function(d) {
                return +d[columnForRadius];
            });
            //v4
          //  var scaleRadius = d3.scaleLinear()
            //v3
            var scaleRadius = d3.scale.linear()
                .domain([minRadiusDomain, maxRadiusDomain])
                .range([minRadius, maxRadius])
/*
            var scaleY = d3.scale.linear()
                .domain([minRadiusDomain, maxRadiusDomain])
                .range([minRadius, maxRadius])

            var scaleX = d3.scale.linear()
                .domain([100, maxRadiusDomain])
                .range([minRadius, maxRadius])
*/

            function charge(d) {
                return -Math.pow(d.radius, 2.0) /8;
            }


            console.log("before sim",data)
            simulation = d3.layout.force()
                .nodes(data)
                .size([width, height])
                .on("tick", tick)
            //    .charge(-1)
                .gravity(0.00)
                .friction(0.09)
            //    .force('x', d3.forceX().strength(0.03).x(width/2))
            //    .force('y', d3.forceY().strength(.03).y(height/2))
             //   .chargeDistance(charge);
                .charge(HankeVisTags.charge);

                //v4
          //      colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
                //v3
            //    colorCircles = d3.scale.ordinal(d3.scale.category20());


            var highlightConnections = function (node) {
           //     console.log(node)
                var test = node.__data__.tag.split(',')


                var nodsit = svg.selectAll("circle")
                nodsit.style('opacity', 0.1)

                //	d3.select(this).style('opacity', 0.1)
            //    console.log(nodsit)

                test.forEach(function(element) {
                    //v4
                //    nodsit._groups[0].forEach(function(luokka) {
                    //v3
                    nodsit[0].forEach(function(luokka) {
                        var classArray = luokka.className["baseVal"]
                        if (classArray.indexOf(element) > -1) {
                            //	console.log(luokka.id)
                            d3.select("#"+luokka.id).style('opacity', 1)
                            //		d3.select('[id='+luokka.id+']').style('opacity', 0.1)

                        }
                    });

                });

            }
/*
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
            //    .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("Sepal Width (cm)");
*/
            var layMap = function () {
layout = "map"
                /*
                data.forEach( function(d,i) {
                    d.x = d.spaceX
                    d.y = d.spaceY
                })
*/

console.log("laymap",data)


                d3.selectAll("#axisgroup")
                    .transition()
                    .duration(300)
                    .style("opacity", 0)
/*
                data.forEach( function(d,i) {
              //      console.log(d)
                    d.x = d.spaceX
                    d.y = d.spaceY
                })
*/
                simulation
                    .gravity(0)
                 //   .friction(0.09)
                 //   .friction(0.9)
                    .chargeDistance(Infinity)
                  //  .theta(0.8)
                    .theta(1.1)
                    //    .force('x', d3.forceX().strength(0.03).x(width/2))
                    //    .force('y', d3.forceY().strength(.03).y(height/2))
                    //   .chargeDistance(charge);
              //      .charge(HankeVisTags.charge)
                    .on("tick", tick);
                /*    .on("tick", (function (_this) {
                        return function (e) {
                            return _this.nodes.each(move_towards_centerX(e.alpha))
                                .attr("cx", function (d) {
                                    return d.x;})
                                .attr("cy", function (d) {
                                    return d.y;
                                });
                        };

                    })(this));
*/
                console.log("laymap-start")
                simulation.start()
            }

       //     if(layout=="map")
      //          layMap()

            var layRadial = function (project) {

                if(project)
                index= project

                data.forEach( function(d,i) {
                    var angleDeg = Math.atan2(height/2-d.spaceY, width/2-d.spaceX ) * 180 / Math.PI;
               //     var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
                    var angleRad = Math.atan2(height/2-d.spaceY, width/2-d.spaceX );

                    var distance = Math.sqrt( ( d.x - width/2 ) * (
                    d.x - width/2 ) + ( d.y - height/2 )
                    * ( d.y - height/2 ) );

//console.log(angleDeg,angleRad)
                     if (d.id == index) {
                        d.newX = width / 2
                        d.newY = height / 2
                    } else if (d.connections[index]) {
                    //    d.newX= (scaleDistance(d.connections[index]) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                    //    d.newY= (scaleDistance(d.connections[index]) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                  //      d.newX= width/2 + scaleDistance(d.connections[index]) * Math.cos(angleRad*Math.PI/180) * distance;
                  //      d.newY= height/2 + scaleDistance(d.connections[index]) * Math.sin(angleRad*Math.PI/180) * distance;
                         d.newX= width/2 - scaleDistance(d.connections[index]) * Math.cos(angleRad)// * 300;
                         d.newY= height/2 + scaleDistance(d.connections[index]) * Math.sin(-angleRad)// * 300;
                    } else {
                  //      d.newX= ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                  //      d.newY= ((height / 2) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                      //  d.newX= width/2 + 300 * Math.cos(-angleDeg*Math.PI/180)// * 300;
                     //   d.newX= width/2  + Math.cos(-angle*Math.PI/180) * distance;
                      //  d.newY= height/2 + 300 * Math.sin(-angleDeg*Math.PI/180)// * 300;
                    //    d.newY= height/2  + Math.sin(-angle*Math.PI/180) * distance;
                         d.newX= width/2 - (height/2.3) * Math.cos(angleRad)// * 300;
                         d.newY= height/2 + (height/2.7) * Math.sin(-angleRad)// * 300;

                    }

                })
/*
                var distance = Math.sqrt( ( firstObject.x - secondObject.x ) * (
                firstObject.x - secondObject.x ) + ( firstObject.y - secondObject.y )
                * ( firstObject.y - secondObject.y ) )
*/
                var move_towards_center = function (alpha) {
                    return (function (_this) {
                        return function (d) {
                                    d.x = d.x + (d.newX - d.x) * (0.1 + 0.02) * alpha;
                            return d.y = d.y + (d.newY - d.y) * (0.1 + 0.02) * alpha;
                        };
                    })(this);
                };

                layout = "radial";
                console.log(data)
                //    force.nodes(data)
             //   force.stop()
             //   simulation.stop()
console.log("radial-simu")
                simulation
                    .gravity(0.0)
                    .theta(1.1)
                    .charge(HankeVisTags.charge)
                  //  .charge(0)
                //    .chargeDistance(100)
                    .friction(0.82)
                    .on("tick", tick)
                    /*
                    .on("tick", (function (_this) {
                    return function (e) {
                        return _this.nodes.each(move_towards_center(e.alpha))
                            .attr("cx", function (d) {
                            return d.x;})
                            .attr("cy", function (d) {
                            return d.y;
                        });

                    };

                })(this));

/*
                var locX,locY
                data.forEach( function(d,i) {
                    //   d.y = yScale(parseFloat(d.y))
                    //   d.x = xScale(parseFloat(d.x))
                    if (d.id == index) {
                        d.cx =  width / 2
                        d.cy = height / 2
                        //force.force('x', d3.forceX().strength(0.03).x(width / 2));
                        //force.force('y', d3.forceY().strength(0.03).y(height / 2));
                     //   locX =  width / 2
                     //   locY =height / 2
                    } else if (d.connections[index]) {
                        //    console.log(d.connections[index].value)
                        //    console.log(d.connections[index])
                        d.cx= (scaleDistance(d.connections[index]) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                        d.cy= (scaleDistance(d.connections[index]) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                    //    locX= (scaleDistance(d.connections[index]) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                    //    locY= (scaleDistance(d.connections[index]) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                    } else {
                        //       return ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                        d.cx= ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                        d.cy= ((height / 2) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                   //     locX = ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                   //     locY= ((height / 2) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                    }

                })



                var circle = d3.selectAll("circle").data(data)
                //     d3.selectAll("circle")
                //    nodes
                circle
                    .transition()
                    .duration(1300)
                    //      .attr("cy", 0)
                    //      .attr("cx", function(d, i) { return rs(d['chi'][index] == 0 ? 1 : d['chi'][index])})

                    .attr("cx", function(d, i) {
                        if (d.id == index) {
                            return width / 2
                        } else if (d.connections[index]) {
                            //    console.log(d.connections[index].value)
                            //    console.log(d.connections[index])
                            return (scaleDistance(d.connections[index]) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                        } else {
                            //       return ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                            return ((height / 2) * Math.cos((i / (HankeVisData.length/2)) * Math.PI)) + (width/2)
                        }
                    })

                    .attr("cy", function(d, i) {
                        if (d.id == index) {
                            return height / 2
                        } else if (d.connections[index]) {
                            return (scaleDistance(d.connections[index]) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                        } else {
                            //      return ((height / 2) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                            return ((height / 2) * Math.sin((i / (HankeVisData.length/2)) * Math.PI)) + (height/2)
                        }
                    })
                //      .attr("transform", function(d, i) { return "rotate(" + d.s/data.length * 360 + " 0 0)"; })
                //     .attr("transform", function(d, i) {
                //         if (d.id !== index)
                //         return "rotate(" + d.s/HankeVisData.length * 360 + " 0 0)"; })

                //    circle.exit().remove();

                //    force.start();
                */

                d3.selectAll("#axisgroup")
                    .transition()
                    .duration(1300)
                    .style("opacity", 1)

                d3.select("#layout_radial")
                    .attr("class", "selected")

                d3.select("#layout_geo")
                    .attr("class", "notselected")

                    simulation.start()


            }

            var g = svg.append('g')
                .attr('transform', 'translate(' + width / 2 + ', ' + height / 2 + ')')

            var arc = d3.svg.arc()
                .outerRadius(function(d) { return rl(d.value); })
                .startAngle(0)
                .endAngle(2 * Math.PI)

            var ga = g.append("g")
                .attr("id", "axisgroup")
                .style("opacity", 0)

            ga.selectAll(".axispath")
                .data(axes)
                .enter().append("path")
                .attr("id", function(d, i) { return "axispath" + i; })
                .attr("class", "axispath")
                .attr("d", arc)
                .style("stroke", "#91B6D4")
                .style("fill", "none")
                .style("opacity", 0.6)

            ga.selectAll(".axislabel")
                .data(axes)
                .enter().append("text")
                .attr("class", "axislabel")
                .attr("dy", -5)
                .attr("dx", 0)
                .style("fill", "#91B6D4")
                .style("font-size", "11px")
                .style("text-anchor", "middle")
                .append("textPath")
                .attr("xlink:href", function(d, i) { return "#axispath" + i; })
                .attr("startOffset", "50%")
                .text(function(d, i) { return d.label; })

            d3.select("#radial")
                .on("click", function() {
                    layout ="radial"
                   layRadial()
                })

            d3.select("#tagMap")
                .on("click", function(d) {
                    layMap();
                })



            /*
            node.append("clipPath")
                .attr("id",function(d,i) {
                    return "clip-"+i;
                })
                .append("use")
                .attr("xlink:href",function(d,i) {
                    return "#" + i;
                });

/*
            svg.append('text')
                .attr('x',width/2).attr('y',marginTop)
                .attr("text-anchor", "middle")
                .attr("font-size","1.8em")
                .text("Koneoppimismenetelmällä (t-sne) lajitellut kirjastohankkeet asiasanojen mukaan");
*/
         //   groupBubbles()


            function tick(e) {
            //    gggg
                if (layout == "map") {
                    node.each(moveTowardDataPositionK(e.alpha));
                } else {
                    node.each(moveTowardDataPositionR(e.alpha));
                }

                if (layout === "radial") {
                //    if(e.alpha < 0.08)
              //      node.each(collideMap(e.alpha));
                } else {
                    node.each(collideMap(e.alpha));
                }

                if (layout === "map") {
                    node
                        .attr("cx", function(d) {return d.x; })
                        .attr("cy", function(d) {return d.y; })
                } else {
                    node
                        .attr("cx", function(d) {return d.x; })
                        .attr("cy", function(d) {return d.y; })
                }


                    /*
                    .attr("transform",function(d) {
                    //		return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
                    return "translate(" + [d.x, d.y] +")"
                });*/
            }

            function moveTowardDataPosition(alpha) {
                return function(d, i) {
                    d.x = (data[i]).x;
                    d.y = (data[i]).y
                };
            }

            function moveTowardDataPositionK(alpha) {
                return function(d, i) {
                 //   d.x += (d.cx - d.x) * 0.1 * alpha;
                 //   d.y += (d.cy - d.y) * 0.1 * alpha;
                //    d.x = (data[i]).cx;
                //    d.y = (data[i]).cy
                //    d.x = d.x + (d.spaceX - d.x) * (0.1 + 0.02) * alpha
                    d.x = d.x + ((data[i]).spaceX - d.x) * (/*0.1 + 0.02*/0.202) * alpha
                //    d.y = d.y + (d.spaceY - d.y) * (0.1 + 0.02) * alpha
                    d.y = d.y + ((data[i]).spaceY - d.y) * (0.202) * alpha
                };
            }
            function moveTowardDataPositionR(alpha) {
                return function(d, i) {
                    //   d.x += (d.cx - d.x) * 0.1 * alpha;
                    //   d.y += (d.cy - d.y) * 0.1 * alpha;
                    //    d.x = (data[i]).cx;
                    //    d.y = (data[i]).cy
                    //    d.x = d.x + (d.spaceX - d.x) * (0.1 + 0.02) * alpha
                    d.x = d.x + ((data[i]).newX - d.x) * (/*0.1 + 0.02*/0.202) * alpha
                    //    d.y = d.y + (d.spaceY - d.y) * (0.1 + 0.02) * alpha
                    d.y = d.y + ((data[i]).newY - d.y) * (0.202) * alpha
                };
            }
            function moveTowardDataPositionS(alpha) {
                return function(d, i) {
               //     d.x = d.x + (d.spaceX - d.x) * (0.1 + 0.02) * alpha
               //     d.y = d.y + (d.spaceY - d.y) * (0.1 + 0.02) * alpha
                    d.x = (data[i]).spaceX;
                    d.y = (data[i]).spaceY;


                };
            }

            // Resolve collisions between nodes.
            function collideMap(alpha) {
                var quadtree = d3.geom.quadtree(data)
            //        .extent([[-1, -1], [width + 1, height + 1]])
            //    (data);
             //   console.log(quadtree)
                return function(d) {
               //     var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
                //    var r = scaleRadius(d.radius), //+ maxRadius + 1,
                    var r = (d.radius), //+ maxRadius + 1,
                        nx1 = d.x - r,
                        nx2 = d.x + r,
                        ny1 = d.y - r,
                        ny2 = d.y + r;
                    quadtree.visit(function(quad, x1, y1, x2, y2) {
                        if (quad.point && (quad.point !== d)) {
                            var x = d.x - quad.point.x,
                                y = d.y - quad.point.y,
                                l = Math.sqrt(x * x + y * y);
                            //    r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
                           //     r = scaleRadius(d.radius) + scaleRadius(quad.point.radius);
                       //         r = (d.radius) + (quad.point.radius);
                       //     r = d.radius + (quad.point.radius)
                       //     r = 0
                         //   if (layout == "map")
                     //       if (d.id !==index)
                            for (var w = 0; w < d.tagArray.length; w++) {
                                //	if (quad.data.tag.indexOf(d.tagArray[w]) > -1)
                                //	if (quad.data.tag.indexOf(d.tagArray[w]) > -1) {
                                if (d.tag.indexOf(quad.point.tagArray[w]) > -1) {
                                    //         r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)
                                    r = (d.radius) + (quad.point.radius)
                                    break
                                } else {
                                    //      r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)+10
                                    r = (d.radius) + (quad.point.radius)+8
                                }
                            }
                            if (l < r) {
                                l = (l - r) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                        }
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                };
            }
/*
            function collideB(alpha) {
                var quadtree = d3.geom.quadtree(data);
                return function(d) {
                    var r = d.radius, //+ radius + padding,
                        nx1 = d.x - r,
                        nx2 = d.x + r,
                        ny1 = d.y - r,
                        ny2 = d.y + r;
                    quadtree.visit(function(quad, x1, y1, x2, y2) {
                        if (quad.point && (quad.point !== d)) {
                            var x = d.x - quad.point.x,
                                y = d.y - quad.point.y,
                                l = Math.sqrt(x * x + y * y),
                                r = d.radius + quad.point.radius //+ (d.color !== quad.point.color)// * padding;
                            if (l < r) {
                                l = (l - r) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.point.x += x;
                                quad.point.y += y;
                            }
                        }
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                };
            }
*/


            if (HankeVisOnReadyCallBack) {
                HankeVisOnReadyCallBack();
            }

    //        force.resume();
        }


        chart.width = chartWidth;
        chart.height = chartHeight;
        chart.columnForColors = chartColForColors;
        chart.columnForRadius = chartColForRadius;
        chart.columnForTitle = chartColForTitle;
        chart.minRadius = chartMinRadius;
        chart.maxRadius = chartMaxRadius;
        chart.unitName = chartUnitName;
        chart.colorBy = tags_color_by;
//        HankeVisTags.updateSearch = chartSearch
//        HankeVisTags.filterProjects = updateFilter


     //   chart.color_by = function (what_to_color_by) {

        /**
         * Get/set the height of the chart
         * Use 'chart.width' to get or set.
         * @example
         * chart.columnForColors(960);	// Sets the width of the SVG to 960
         * chart.columnForColors();	// returns 960
         *
         * @public
         * @param {number} [value] - The width of the chart
         * @returns function - Chart, allowing chaining of commands
         */
        function chartWidth(value) {
            if (!arguments.length) {
                return width;
            }
            width = value;
            return chart;
        };

        function updatePosition(event) {

            var ttid = "#" + "tooltippi";
            var xOffset = 20;
            var yOffset = 10;

            var ttw = $(ttid).width();
            var tth = $(ttid).height();
            var wscrY = $(window).scrollTop();
            var wscrX = $(window).scrollLeft();
            var curX = (document.all) ? event.clientX + wscrX : event.pageX;
            var curY = (document.all) ? event.clientY + wscrY : event.pageY;
            var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > $(window).width()) ? curX - ttw - xOffset * 2 : curX + xOffset;
            if (ttleft < wscrX + xOffset) {
                ttleft = wscrX + xOffset;
            }
            var tttop = ((curY - wscrY + yOffset * 2 + tth) > $(window).height()) ? curY - tth - yOffset * 2 : curY + yOffset;
            if (tttop < wscrY + yOffset) {
                tttop = curY + yOffset;
            }
            $(ttid).css('top', tttop + 'px').css('left', ttleft + 'px');
            //	doBar(barWidth);
        }

        /**
         * Get/set the height of the chart.
         * Use 'chart.height' to get or set.
         * @example
         * chart.height(960);	// Sets the height of the SVG to 960
         * chart.height();		// returns 960
         *
         * @public
         * @param {number} [value] - The height of the chart
         * @returns function - Chart, allowing chaining of commands
         */
        function chartHeight(value) {
            if (!arguments.length) {
                return height;
            }
            height = value;
            marginTop=0.05*height;
            return chart;
        };


        /**
         * Get/set the property used to determine the colors of the bubbles.
         * Use 'chart.columnForColors' to get or set.
         * @example
         * chart.columnForColors("Sex");	// Sets the column to birthCount
         * chart.columnForColors();	// returns "Sex"
         * @public
         * @param {string} [value] - Property name to bind the bubble color to.
         * @returns function - Chart, allowing chaining of commands
         */
        function chartColForColors(value) {
            if (!arguments.length) {
                return columnForColors;
            }
            columnForColors = value;
            return chart;
        };

        /**
         * Get/set the property to determine the titles of the bubbles.
         * Use 'chart.columnForTitle' to get or set.
         * @example
         * chart.columnForTitle("Name");	// Sets the column to birthCount
         * chart.columnForTitle();		// returns "Name"
         *
         * @param {string} [value] - Property name to bind the bubble title to.
         * @returns function - Chart, allowing chaining of commands
         */
        function chartColForTitle(value) {
            if (!arguments.length) {
                return columnForTitle;
            }
            columnForTitle = value;
            return chart;
        };

        /**
         * Get/set the property to determine the radii of the bubbles.
         * Use 'chart.columnForRadius' to get or set.
         *
         * @example
         * chart.columnForRadius("birthCount");	// Sets the column to birthCount
         * chart.columnForRadius();		// returns "birthCount"
         * @public
         * @param {string} [value] - Property name to bind the bubble radius to. Requires a numerical property.
         * @returns function - Chart, allowing chaining of commands
         */
        function chartColForRadius (value) {
            if (!arguments.length) {
                return columnForRadius;
            }
            columnForRadius = value;
            return chart;
        };

        /**
         * Get/set the minimum radius of the bubbles.
         * Use 'chart.minRadius' to get or set.
         * @example
         * 	chart.columnForColors(3); 	// Sets the column to birthCount
         *  chart.columnForColors();	// returns 3
         *
         * @param {number} [value] - The minimum radius for the width of the bubbles
         * @returns function - Chart, allowing chaining of commands
         */
        function chartMinRadius(value) {
            if (!arguments.length) {
                return minRadius;
            }
            minRadius = value;
            return chart;
        };

        /**
         * Get/set the maximum radius of the bubbles.
         * Use 'chart.maxRadius' to get or set.
         *
         * @public
         * @param {number} [value] - The maximum radius of the bubbles for the largest value in the dataset
         * @returns function - Chart, allowing chaining of commands
         */
        function chartMaxRadius(value) {
            if (!arguments.length) {
                return maxRadius;
            }
            maxRadius = value;
            return chart;
        };

        /**
         * Get/set the unit name for the property the is represented by the radius of the bubbles.
         * Used in the tooltip of the bubbles.
         * Use 'chart.unitName' to get or set.
         * @example
         * chart.unitName(" babies");	// Sets the column to birthCount
         * chart.unitName();		// returns " babies"
         *
         * @public
         * @param {any} [value] - The unit name to display on the tooltip when hovering over a bubble
         * @returns function - Chart, allowing chaining of commands
         */
        function chartUnitName(value) {
            if (!arguments.length) {
                return unitName;
            }
            unitName = value;
            return chart;
        };





        return chart;
    }
 //   force.start();
    console.log("bottom-start")
    simulation.start();

    HankeVisTags.update = init;

};

HankeVisTags.update = function () {
};

HankeVisTags.charge = function (d) {
    return -Math.pow(d.radius, 2.0) /5;
};

$("#search").keyup(function () {
    var searchTerm;
    searchTerm = $(this).val();
    return HankeVisTags.updateSearch(searchTerm);
});



function tags_color_by(what_to_color_by) {
    /*    var ColorSelectArray, color_grid;
     this.what_to_color_by = what_to_color_by;
     ColorSelectArray = BubbleChart.prototype.get_color_values(what_to_color_by);
     color_grid = BubbleChart.prototype.get_color_options(what_to_color_by, ColorSelectArray);
     show_color_table(what_to_color_by, color_grid);
     //  return this.circles.transition().duration(1000).style("fill", (function(_this) {*/

    var svg = d3.select("#tags-container")
     var node = svg.selectAll("circle")
    node.each(function (d) {
        var element;
        element = d3.select(this);
        element.style("fill", (function (_this) {
            return function (d) {
                return colorCircles(d[what_to_color_by])
            };
        })(this));

    });
};




