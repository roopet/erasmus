// Copyright: Vividin Oy. All rights reserved.


var HankeVisTags = function (HankeVisData, HankeVisOnReadyCallBack) {

    var xMin, xMax, yMax, yMin;

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

    var wwidth = $(window).width(),
        wheight = $(window).height()

    var hankedata = getMaxMin(HankeVisData)
    console.log(hankedata)
    console.log(HankeVisData)

    //v3
 ///   var xScale = d3.scale.linear().domain([xMin,xMax]).range([0,wwidth]),
 //       yScale = d3.scale.linear().domain([yMin,yMax]).range([0,wheight]);

    //v4
    var xScale = d3.scaleLinear().domain([xMin,xMax]).range([50,wwidth-50]),
        yScale = d3.scaleLinear().domain([yMin,yMax]).range([60,wheight-50]);

    HankeVisData.forEach( function(d) {
        //d.y = parseFloat(d.y)
        d.y = yScale(parseFloat(d.y))
        //   d.x = parseFloat(d.x)
        d.x = xScale(parseFloat(d.x))
        d.amount = parseFloat(d.amount)
        d.radius =parseFloat(d.amount)
        d.tagArray = d.tag.split(',')
    })

    var chart = bubbleChart().width(wwidth).height(wheight);
    d3.select('#tags-container').data(HankeVisData).call(chart);


    function bubbleChart() {
        var width = 960,
            height = 960,
            marginTop = 96,
            minRadius = 3,
            maxRadius = 40,
            columnForColors = "ColSel_Teema",
            columnForTitle = "hanke_name",
            columnForRadius = "amount",
            forceApart = -10,
            unitName="Toteuttaja",
            customColors=false,
            customRange,
            customDomain,
            chartSelection,
            chartSVG,
            showTitleOnCircle=false;

//	var zoom = d3.behavior.zoom()

        /**
         * The command to actually render the chart after setting the settings.
         * @public
         * @param {string} selection - The div ID that you want to render in
         */
        function chart(selection) {
            console.log(selection)
        //    var data = selection.enter().data();
            var data = HankeVisData;
            chartSelection=selection;
            var div = selection,
            //    svg = div.selectAll('svg');
                svg = div.selectAll('svg');
            svg.attr('width', width).attr('height', height)
                //	svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            //    v3
             //   	.call(d3.behavior.zoom().on("zoom", function () {
                //v4
                .call(d3.zoom().on("zoom", function () {
                    //		svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
               //     svg.attr("transform", d3.event.transform)
                }))

            chartSVG=svg;

            var minRadiusDomain = d3.min(data, function(d) {
                return +d[columnForRadius];
            });
            var maxRadiusDomain = d3.max(data, function(d) {
                return +d[columnForRadius];
            });
            //v4
            var scaleRadius = d3.scaleLinear()
            //v3
          //  var scaleRadius = d3.scale.linear()
                .domain([minRadiusDomain, maxRadiusDomain])
                .range([minRadius, maxRadius])

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

            //v4
            var quadtree = d3.quadtree()
            //v3
        //    var quadtree = d3.geom.quadtree()
                    .x((d) => d.x)
        .y((d) => d.y)
        .addAll(data);

            var cc=0
            var simulation = d3.forceSimulation(data)

                .force("x", d3.forceX(function(d) {return d.x; }).strength(0.2))
                .force("y", d3.forceY(function(d) { return d.y; }).strength(0.2))
                //	.force("collide", collide)
                .force("collide", d3.forceCollide().radius(function(d){return scaleRadius(d.amount) + 0}))
                //		.stop()
                .on("tick", ticked);


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
            /*
             function collide(alpha) {
             var quadtree = d3.quadtree(data)
             .x((d) => d.x)
             .y((d) => d.y)
             //	.x(node.x)
             //	.y(node.y)
             .addAll(data);
             var padding= 1,
             clusterPadding = 10

             console.log(quadtree)

             return function(d) {
             //	if (d.track_id =="98")
             console.log(d)
             var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
             nx1 = d.x - r,
             nx2 = d.x + r,
             ny1 = d.y - r,
             ny2 = d.y + r;
             quadtree.visit(function(quad, x1, y1, x2, y2) {
             console.log(quad)
             if (quad.point && (quad.point !== d)) {
             var x = d.x - quad.point.x,
             y = d.y - quad.point.y,
             l = Math.sqrt(x * x + y * y),
             r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
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



            function collide(alpha) {

                var quadtree = d3.quadtree()
                        .x((d) => d.x)
            .y((d) => d.y)

            .addAll(data);

                data.forEach(function(d) {
                    //	var r = d.r + maxRadius + Math.max(padding, clusterPadding),
                    var r = scaleRadius(d.radius),
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
                                    r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)
                                    break
                                } else {
                                    r = scaleRadius(d.radius) + scaleRadius(quad.data.radius)+10
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


            var colorCircles;
            if (!customColors) {
                colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
            }
            else {
                colorCircles = d3.scaleOrdinal()
                    .domain(customDomain)
                    .range(customRange);
            }

            var highlightConnections = function (node) {

                var test = node.__data__.tag.split(',')


                var nodsit = svg.selectAll("circle")
                nodsit.style('opacity', 0.1)

                //	d3.select(this).style('opacity', 0.1)

                test.forEach(function(element) {
                    nodsit._groups[0].forEach(function(luokka) {
                        var classArray = luokka.className["baseVal"]
                        if (classArray.indexOf(element) > -1) {
                            //	console.log(luokka.id)
                            d3.select("#"+luokka.id).style('opacity', 1)
                            //		d3.select('[id='+luokka.id+']').style('opacity', 0.1)

                        }
                    });

                });

            }



            var node = svg.selectAll("circle")
                .data(data)
                .enter()
                .append("g")
                .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
                .style('opacity',1);

            node.append("circle")
                .attr("id",function(d,i) {
                    return "circle"+d.track_id;
                })
                .attr("class",function(d,i) {
                    return d.tag;
                })
                .attr('r', function(d) {
                    return scaleRadius(d[columnForRadius]);
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
                })/*
             .attr("transform",function(d) {
             //		return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
             return "translate(" + [d.x, d.y] +")";
             })*/
                .style("fill", function(d) {
                    return colorCircles(d[columnForColors]);
                })
                .on("mouseover", function(d) {
                    highlightConnections(this)
                    tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" +"<br/>" + d.tag);
                    return tooltip.style("visibility", "visible");
                })
                .on("mousemove", function() {
                    updatePosition(d3.event)
                    //	return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                })
                .on("mouseout", function(d) {
                    svg.selectAll("circle").style("opacity", 1)
                    //	d3.select(this).style('opacity', 1)
                    /*		svg.selectAll('.tag_title').filter((t) -> t == d)
                     .style('opacity', 0.5)*/

                    return tooltip.style("visibility", "hidden");
                });
            node.append("clipPath")
                .attr("id",function(d,i) {
                    return "clip-"+i;
                })
                .append("use")
                .attr("xlink:href",function(d,i) {
                    return "#" + i;
                });
            if (showTitleOnCircle) {
                node.append("text")
                    .attr("clip-path",function(d,i) {
                        return "url(#clip-" + i + ")"
                    })
                    .attr("text-anchor", "middle")
                    .append("tspan")
                    .attr("x",function(d) {
                        return 0;//-1*scaleRadius(d[columnForRadius])/3;
                    })
                    .attr("y",function(d) {
                        return ".3em";//scaleRadius(d[columnForRadius])/4;
                    })
                    .text(function(d) {
                        return d[columnForTitle];
                    })
                    .on("mouseover", function(d) {
                        tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + "<br/>" + d.tag);
                        return tooltip.style("visibility", "visible");
                    })
                    .on("mousemove", function() {
                        return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
                    })
                    .on("mouseout", function() {
                        return tooltip.style("visibility", "hidden");
                    });
            }

            svg.append('text')
                .attr('x',width/2).attr('y',marginTop)
                .attr("text-anchor", "middle")
                .attr("font-size","1.8em")
                .text("Koneoppimismenetelmällä (t-sne) lajitellut kirjastohankkeet asiasanojen mukaan");
        }


        chart.width = chartWidth;
        chart.height = chartHeight;
        chart.columnForColors = chartColForColors;
        chart.columnForRadius = chartColForRadius;
        chart.columnForTitle = chartColForTitle;
        chart.minRadius = chartMinRadius;
        chart.maxRadius = chartMaxRadius;
        chart.forceApart = chartForceApart;
        chart.unitName = chartUnitName;
        chart.customColors = chartCustomColors;
        chart.showTitleOnCircle = chartShowTitleOnCircle;
        chart.title=chartTitle;
        chart.remove = chartRemove;

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
            console.log(event)
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

        /**
         * Get/set the force the separates and pushes together the bubbles on loading of the chart
         * Use 'chart.forceApart' to get or set.
         * @example
         * chart.forceApart(150);	// Sets the column to birthCount
         * chart.forceApart();	// returns 150
         *
         * @public
         * @param {any} [value] - Determines the force to separate the bubbles from each other when loading the chart
         * @returns function - Chart, allowing chaining of commands
         */
        function chartForceApart(value) {
            if (!arguments.length) {
                return forceApart;
            }
            forceApart = value;
            return chart;
        };

        /**
         * Get/set the property that determines if we show or hide the title of the data on the bubbles.
         * Use 'chart.showTitleOnCircle' to get or set.
         * @example
         * chart.showTitleOnCircle(true);
         * chart.forceApart();	// returns true
         *
         * @public
         * @param {boolean} [value] - Determines whether to show or hide the title of the data on the bubbles
         * @returns function - Chart, allowing chaining of commands
         */
        function chartShowTitleOnCircle(value) {
            if (!arguments.length) {
                return showTitleOnCircle;
            }
            showTitleOnCircle = value;
            return chart;
        };

        /**
         * Set the domain and range of the colors used for the bubbles. This is only needed if you want to use custom colors in the chart.
         * Use 'chart.customColors' to set.
         * @example
         * chart.customColors(["M","F"], ["#70b7f0","#e76486"]); 	// Sets the custom colors domain and range
         *
         * @param {any[]} domain - The domain. This is the set of categories used for binding the colors.
         * @param {string[]} range - The range. This is an array of color codes that you want to represent each category in the domain.
         * 							 Note: The length of the array must perfectly match the length of the domain array.
         * @returns function - Chart, allowing chaining of commands
         */
        function chartCustomColors(domain,range) {
            customColors=true;
            customDomain=domain;
            customRange=range;
            return chart;
        };

        /**
         * Get/set the property that determines the title of the chart.
         * Use 'chart.title' to get or set.
         * @example
         * chart.title("Birth Count in the U.S. in 2016"); // Sets the chart title
         * chart.title();	// returns "Birth Count in the U.S. in 2016"
         * @public
         * @param {string} value - The title of the chart
         * @returns function - Chart, allowing chaining of commands
         */
        function chartTitle(value) {
            if (!arguments.length) {
                return title;
            }
            title = value;
            return chart;
        }

        /**
         * Animate the removal of data from the chart (and the title)
         * @public
         * @param {function} [callback] - At the end of each node animation call this function for each node
         * @returns function - Chart, allowing chaining of commands
         */
        function chartRemove(callback) {
            chartSVG.selectAll("text")
                .style("opacity",1)
                .transition()
                .duration(500)
                .style("opacity", "0")
                .remove();
            if (!arguments.length) {
                chartSVG.selectAll("g")
                    .style("opacity",1)
                    .transition()
                    .duration(500)
                    .style("opacity", "0")
                    .remove();
            }
            else {
                chartSVG.selectAll("g")
                    .style("opacity",1)
                    .duration(500)
                    .style("opacity", "0")
                    .remove()
                    .on("end", callback);
            }
            return chart;
        }

        return chart;
    }




};


