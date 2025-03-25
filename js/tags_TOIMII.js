// Copyright: Vividin Oy. All rights reserved.

var force;
var nodes;
var colorCircles, tooltip;
var HankeVisTags = function (HankeVisData, HankeVisOnReadyCallBack) {

//    HankeVisTags.Options = {}
//    HankeVisTags.Options.colorTable = {}
    var xMin, xMax, yMax, yMin;
    var wwidth = $(window).width(),
        wheight = $(window).height()
    var width;
    var height = $(window).height() - 35 - $("#navbar-menu").height() - 15
    if ($(window).width() < 1100) {
        width = wwidth * 0.65;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 240);
    } else if ($(window).width() < 1300) {
        width = wwidth * 0.65;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 260);
    } else if ($(window).width() < 1400) {
        width = wwidth * 0.65;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 290);
    } else {
        width = wwidth * 0.83;
        //   this.height = wheight - visHeight * 1.25;
        tooltip = CustomTooltip("my_tooltip", "my_bar", 335);
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

    var minRadiusDomain = d3.min(HankeVisData, function(d) {
        return +d.amount;
    });
    var maxRadiusDomain = d3.max(HankeVisData, function(d) {
        return +d.amount;
    });
    //v4
    //  var scaleRadius = d3.scaleLinear()
    //v3
    var max_amount = 1500000;


  //  var scaleRadius = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([1, wwidth / 25]);

  var scaleRadius = d3.scale.linear()
        .domain([minRadiusDomain, maxRadiusDomain])
        .range([3, 40])


    HankeVisData.forEach( function(d) {
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

    })




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
            svg.attr('width', width).attr('height', height)
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
            var tooltip = selection
                .append("div")
                .attr("id", "tooltippi")
                .style("position", "absolute")
                .style("visibility", "hidden")
                .style("color", "black")
                .style("padding", "8px")
                .style("background-color", "white")
                .style("border-radius", "6px")
                .style("border-color", "black")
                .style("border-width", "1px")
                .style("border", "1px solid black")
                .style("text-align", "center")
                .style("font-family", "monospace")
                .style("width", "500px")
                .text("");

            var cc=0
            /*
            var simulation = d3.forceSimulation(data)

                .force("x", d3.forceX(function(d) {return d.x; }).strength(0.2))
                .force("y", d3.forceY(function(d) { return d.y; }).strength(0.2))
                //	.force("collide", collide)
                .force("collide", d3.forceCollide().radius(function(d){return scaleRadius(d.amount) + 0}))
                //		.stop()
                .on("tick", ticked);
*/
            function charge(d) {
                return -Math.pow(d.radius, 2.0) /8;
            }


            force = d3.layout.force()
                .nodes(data)
                .size([width, height])
                .on("tick", tick)
            //    .charge(-1)
                .gravity(0.00)
                .friction(0.09)
             //   .chargeDistance(charge);
                .charge(HankeVisTags.charge);



/*
            function groupBubbles() {


                force.on('tick', function (e) {
                 //   node.each(moveToYears(e.alpha))
                    node.each(moveToCenter(e.alpha))
                        .attr('cx', function (d) {
                  //          console.log(d.x)
                            return d.x; })
                        .attr('cy', function (d) { return d.y; });
                });

                force.start();
            }
*/
          //  var center.x
            /*
            var damper = 0.102;
            var center = {};
            center.x = width / 2
            center.y = width / 2
            */

            function ticked(e) {
                //v3
                //	var q = d3.geom.quadtree(nodes),
                //v4
                /*
                 var q = d3.quadtree(data),
                 i = 0,
                 n = data.length;

                 while (++i < n) {
                 //		q.visit(collide(data[i]));
                 }
                 */
                node
                    //	.each(collide(.5))
                    //	.attr("cx", function(d) { return d.x; })
                    //	.attr("cy", function(d) { return d.y; })
                    .attr("transform",function(d) {
                        //		return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
                        return "translate(" + [d.x, d.y] +")";
                    });

                //		collide(0.5)
                //		node.each(collide(node))
            }



            function collideX(alpha) {
//v4
           //     var quadtree = d3.quadtree()
    //        .x((d) => d.x)
      //      .y((d) => d.y)
                var quadtree = d3.geom.quadtree()
                        .x((d) = d.x)
                        .y((d) = d.y)
          //  .addAll(data);

                data.forEach(function(d) {
                    //	var r = d.r + maxRadius + Math.max(padding, clusterPadding),
                //    var r = scaleRadius(d.radius),
                    var r = (d.radius)+10,
                        nx1 = d.x - r,
                        nx2 = d.x + r,
                        ny1 = d.y - r,
                        ny2 = d.y + r;
                    quadtree.visit(function(quad, x1, y1, x2, y2) {

                        if (quad.data && (quad.data !== d)) {
                            var x = d.x - quad.data.x,
                                y = d.y - quad.data.y,
                                l = Math.sqrt(x * x + y * y);
                            //	r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding : clusterPadding);
                            //	r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)+10 //+ (d.cluster === quad.data.cluster ? padding : clusterPadding);
                            for (var w = 0; w < d.tagArray.length; w++) {
                                //	if (quad.data.tag.indexOf(d.tagArray[w]) > -1)
                                //	if (quad.data.tag.indexOf(d.tagArray[w]) > -1) {
                                if (d.tag.indexOf(quad.data.tagArray[w]) > -1) {
                           //         r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)
                                    r = (d.radius) + (quad.data.radius)
                                    break
                                } else {
                                    console.log(d)
                              //      r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)+10
                                    r = (d.radius) + (quad.data.radius)+10
                                }
                            }

                            if (l < r) {
                                l = (l - r) / l * alpha;
                                d.x -= x *= l;
                                d.y -= y *= l;
                                quad.data.x += x;
                                quad.data.y += y;
                            }
                        }
                        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                });
            }




                //v4
          //      colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
                //v3
            //    colorCircles = d3.scale.ordinal(d3.scale.category20());
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
                })
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
                    highlightConnections(this)
                    /*
                    tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" +"<br/>" + d.tag);
                    return tooltip.style("visibility", "visible");*/
                    globalFuncs.show_details(d, i, this);
                })
                .on("mousemove", function() {
                    updatePosition(d3.event)
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
                node.each(moveTowardDataPosition(e.alpha));

            //    if (checkbox.node().checked)
                    node.each(collide(e.alpha));

                node.attr("cx", function(d) {return d.x; })
                    .attr("cy", function(d) {return d.y; })
                    /*
                    .attr("transform",function(d) {
                    //		return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
                    return "translate(" + [d.x, d.y] +")"
                });*/
            }

            function moveTowardDataPosition(alpha) {
                return function(d, i) {
                //    dddd
             //       console.log(data)
              //      d.x = d.x
                    d.x = (data[i]).x;
         //           d.x += (d.cx - d.x) * 0.1 * alpha;
          //          console.log(d.x += (d.x - d.x) * 0.1 * alpha)
             //       d.x += (d.x - d.x) * 0.1 * alpha;
           //         return d.x = 1000
                    d.y = (data[i]).y
               //     d.y += (d.cy - d.y) * 0.1 * alpha;
               //     d.y += (d.y - d.y) * 0.1 * alpha;


                };
            }

            // Resolve collisions between nodes.
            function collide(alpha) {
                var quadtree = d3.geom.quadtree(data)
            //        .extent([[-1, -1], [width + 1, height + 1]])
            //    (data);
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

        function chartSearchx(searchTerm) {
            console.log(searchTerm)
            var searchRegEx;
            searchRegEx = new RegExp(searchTerm.toLowerCase());
            return nodes.each(function (d) {

                var element, match;
                element = d3.select(this);
                match = d.hanke_name.toLowerCase().search(searchRegEx);

                if (searchTerm.length > 0 && match >= 0) {
                    element.style("stroke-width", 6.0);  //  #000000
                    return d.searched = true;
                } else {
                    d.searched = false;
                    element.style("stroke-width", 2.0);
                }
            });
        };

        function updateFilterx(filtered_values1, func, textFunc) {
            //    var Array1 = ["Rahasto/Aluekehitysrahasto", "Rahasto/Sosiaalirahasto", "Rahasto/Maaseuturahasto", "Ministerio/Koulutus- ja tiedepolitiikka", "Ministerio/Kulttuuri-, liikunta- ja nuorisopolitiikka", "Yksikko/Aikuiskoulutus", "Yksikko/Kaikki koulutusmuodot", "Yksikko/Korkeakoulutus ja tiede", "Yksikko/Kulttuurivienti", "Yksikko/Liikunta", "Yksikko/Nuoriso", "Yksikko/Nuorten ammatillinen koulutus", "Yksikko/Taide ja kulttuuriperintö", "Yksikko/Viestintäkulttuuri", "Yksikko/Yleissivistävä koulutus"];
            //    var Array1 = ["Rahasto/Aluekehitysrahasto", "Rahasto/Sosiaalirahasto", "Rahasto/Maaseuturahasto"]
            //    var Arrayx = ["Rahasto//Aluekehitysrahasto", "Rahasto//Sosiaalirahasto", "Rahasto//Maaseuturahasto", "Rahoittajaviranomainen//ELY-keskus", "Rahoittajaviranomainen//Maakuntaliitto", "Rahoittajaviranomainen//Tekes"]
            var Arrayx = [];
            var Array1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, aviList, vuosiList, rahoittajaList);
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

            subtitle = [];
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
            this.circles.each(function (d) {
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
                    d.tyop_value = parseFloat(d.tyop_value);
                    d.radius = d.orig_radius;
                    d.tyop_value = parseFloat(d.tyop);
                    d.yrit_value = parseFloat(d.yrit);
                    d.osalorg_value = parseFloat(d.osalorg);
                    d.osalyrit_value = parseFloat(d.osalyrit);
                    d.tutkinnot_value = parseFloat(d.tutkinnot);
                    d.aloittaneet_value = parseFloat(d.aloittaneet);
                    d.koulutuspaivat_value = parseFloat(d.koulutuspaivat);

                    element.transition().duration(2000).attr("r", d.radius);
                    foundSomething = true;
                    return d.searched = true;
                } else {
                    var textValue2 = textFunc + "_value";

                    d.value = 0;
                    d.lkm_value = 0;
                    d.radius = 0;
                    d.tyop_value = 0;
                    d.tyop_value = 0;
                    d.yrit_value = 0;
                    d.osalorg_value = 0;
                    d.osalyrit_value = 0;
                    d.tutkinnot_value = 0;
                    d.aloittaneet_value = 0;
                    d.koulutuspaivat_value = 0;
                    d[textValue2] = 0;
                    element.transition().duration(2000).attr("r", 0);
                    d.searched = false;
                }
                BubbleChart.prototype.charge(d);
            });

            if (!foundSomething) {
                $('#subtitle').html(_("Ei rajausta vastaavia hankkeita"));
            } else {
                $('#subtitle').html(subtitle.join('<br>'));
            }

            return window.get_chart().arrange_circles(func, textFunc);
        };

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
    force.start();

    HankeVisTags.update = init;

};

HankeVisTags.update = function () {
};

HankeVisTags.charge = function (d) {
    return -Math.pow(d.radius, 2.0) /8;
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




