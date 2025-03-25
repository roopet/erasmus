// Copyright Vivid Information Ltd (Roope Tahvanainen). Circles grid-formation by Jason Axelson. Also contributed by Rivermouth Ltd.
var HankeVis = function (HankeVisData, HankeVisOnReadyCallBack) {
console.log(HankeVisData)
    $('.arrow_box_abs').hide();
    var BubbleChart, root, startTitleValue, titleLineheight, chart,
        __bind = function (fn, me) {
            return function () {
                return fn.apply(me, arguments);
            };
        },
        __indexOf = [].indexOf || function (item) {
                for (var i = 0, l = this.length; i < l; i++) {
                    if (i in this && this[i] === item) {
                        return i;
                    }
                }
                return -1;
            };
    var uprowValue;
    var numberofRows = {};
    var max_amount;
    var wWidth = $(window).width();
    var wheight = $(window).height();
    var subtitle = [];
    BubbleChart = (function () {
        function BubbleChart(data) {
            this.hide_details = __bind(this.hide_details, this);
            this.show_details = __bind(this.show_details, this);
            this.count_circle_size = __bind(this.count_circle_size, this);
            this.get_hanke_nimi = __bind(this.get_hanke_nimi, this);
            this.get_hanke_id = __bind(this.get_hanke_id, this);
            this.make_grid = __bind(this.make_grid, this);
            this.liikuta_kohti_hankes = __bind(this.liikuta_kohti_hankes, this);
            this.format_eurot = __bind(this.format_eurot, this);
            this.format_kappale = __bind(this.format_kappale, this);
            this.divide_up = __bind(this.divide_up, this);
            this.title_text = __bind(this.title_text, this);
            this.arrange_circles = __bind(this.arrange_circles, this);
            this.move_towards_center = __bind(this.move_towards_center, this);
            this.display_group_all = __bind(this.display_group_all, this);
            this.do_create_circles = __bind(this.do_create_circles, this);
            this.create_circles = __bind(this.create_circles, this);
            this.create_vis = __bind(this.create_vis, this);
            this.kill_forces = __bind(this.kill_forces, this);
            this.create_nodes = __bind(this.create_nodes, this);

            this.get_color_values = __bind(this.get_color_values, this);
            this.checkKey = __bind(this.checkKey, this);
            this.color_by = __bind(this.color_by, this);
            this.get_color_options = __bind(this.get_color_options, this);
            this.get_color_type = __bind(this.get_color_type, this);
            this.get_updateSearch = __bind(this.get_updateSearch, this);
            this.get_updateSearchx = __bind(this.get_updateSearch2, this);
            this.get_updateFilter = __bind(this.get_updateFilter, this);
            this.get_updateSize = __bind(this.get_updateSize, this);
            this.get_color_options_ColSel_set = __bind(this.get_color_options_ColSel_set, this);
            this.get_color_options_ColSel_Teema = __bind(this.get_color_options_ColSel_Teema, this);
            this.get_color_options_ColSel_Maakunta = __bind(this.get_color_options_ColSel_Maakunta, this);
            this.get_color_options_ColSel_Vaikutusalue = __bind(this.get_color_options_ColSel_Vaikutusalue, this);
            this.get_color_options_ColSel_Aluehallintovirasto = __bind(this.get_color_options_ColSel_Aluehallintovirasto, this);
            this.get_color_options_ColSel_Vuosi = __bind(this.get_color_options_ColSel_Vuosi, this);
            this.get_color_options_ColSel_Hanketyyppi = __bind(this.get_color_options_ColSel_Hanketyyppi, this);
            this.get_color_options_ColSel_Kieli = __bind(this.get_color_options_ColSel_Kieli, this);
            this.get_color_options_set10 = __bind(this.get_color_options_set10, this);
            this.get_color_options_set12 = __bind(this.get_color_options_set12, this);
            this.get_color_options_set18 = __bind(this.get_color_options_set18, this);
         //   this.get_color_options_Kimppa = __bind(this.get_color_options_Kimppa, this);

            this.totalAmountE = 0
            this.totalAmountKpl = 0
            //    var ylapalkki = document.getElementById('header');
            document.onkeydown = this.checkKey;

            this.keyAt = 0
            //     var visHeight = ylapalkki.offsetHeight;
            var visHeight = wheight;

            this.data = data;

            if ($(window).width() < 1200) {
                this.width = wWidth
                this.tooltip = CustomTooltip("my_tooltip", "my_bar", 240);
            } else if ($(window).width() < 1300) {
                this.width = wWidth * 0.65;
                this.tooltip = CustomTooltip("my_tooltip", "my_bar", 260);
            } else if ($(window).width() < 1400) {
                this.width = wWidth * 0.65;
                this.tooltip = CustomTooltip("my_tooltip", "my_bar", 290);
            } else {
                this.width = wWidth * 0.65;
                //   this.height = wheight - visHeight * 1.25;
                this.tooltip = CustomTooltip("my_tooltip", "my_bar", 335);
            }

            //      this.width = $("#vis-container").width() + 20;
            this.height = wheight;

            window.width = this.width;
            window.height = this.height;

            this.damper = 0.1;
            this.vis = null;
            this.nodes = [];
            this.forces = [];
            this.circles = null;
            max_amount = 1500000;
            //   if (wWidth < 1500) {
            //       this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, wWidth / 15]);
            //   } else {
        //    this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, wWidth / 18]);
            this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, wWidth / 30]);
            if ($(window).width() < 1200) {
                titleLineheight = wWidth / 1000;
                this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, wWidth / 10]);
            } else {
                titleLineheight = wWidth / 100;
                this.radius_scale = d3.scale.pow().exponent(0.5).domain([0, max_amount]).range([0, wWidth / 34]);
            }
            //   }

            this.create_nodes(this.data);

            this.create_vis();
        }

        BubbleChart.prototype.create_nodes = function (data) {
            this.nodes = [];
            var testarri = [],
                testarri2 = [];

            for (var key in data[0]) {
                testarri.push(key);
            }

            data.forEach((function (_this) {

                return function (d) {
                    for (var key in d) {
                        var value = d[key];
                        testarri2.push(value);
                    }

                    if (d.ColSel_Hanketyyppi === "ELY" || d.ColSel_Hanketyyppi === "Hyvä") {
                        d.ColSel_Hanketyyppi = "ELY / AVI";
                    }
                    if (d.ColSel_Hanketyyppi === "OKM") {
                        d.ColSel_Hanketyyppi = "Opetus- ja kulttuuriministeriö";
                    }
                    if (d.ColSel_Hanketyyppi === "HUONO" || d.ColSel_Hanketyyppi === "Huono") {
                  //      d.ColSel_Hanketyyppi = "Toteutumaton hanke";
                        return
                    }
                    if (d.ColSel_Kieli === "fi") {
                        d.ColSel_Kieli = "suomenkielinen";
                    }
                    if (d.ColSel_Kieli === "sv") {
                        d.ColSel_Kieli = "ruotsinkielinen";
                    }


                    var node, radius;
                    var parsId = d.id.replace(/\s/g, '')
                    node = {
                        "aria-hidden":true,
                        id: parsId,
                        original: d,
                        amount: d.amount,
                        oma: d.oma,
                        desc: "Tämä on testi selitysteksti numero 100",

                        radius: _this.radius_scale(parseInt(d.amount)) || 0,
                        orig_radius: _this.radius_scale(parseInt(d.amount)) || 0,
                        value: parseFloat(d.amount) || 0,
                        omarah: parseFloat(d.oma) || 0,
                        lkm_value: parseFloat(d.lkm) || 0,
                        name: d.hanke_name,
                        kunta: d.Kunta,
                    //    kohderyhma: d.Kohderyhma,
                        kohderyhma: d.ToteutusAlueX,
                        teema: d.ColSel_Teema,
                        toteuttaja: d.Toteuttaja,
                        Erityisavustus: d.Erityisavustus,
                        vaikutusalue: d.ColSel_Vaikutusalue,
                     //   toteutusAlueX: d.ToteutusAlueX,
                     //   aluehallintovirasto: d.ColSel_Vaik,
                        Osatoteuttajat: d.Osatoteuttajat,
                        maakunta: d.ColSel_Maakunta,
                        hvuosi: parseInt(d.ColSel_Vuosi).toString(),
//						tila: d.Tila,
                        lkm: d.lkm,
                        avi: d.ColSel_Aluehallintovirasto,
                        kieli: d.ColSel_Kieli,
                        //      tyyppi: if(d.ColSel_Hanketyyppi === "Ely")d.ColSel_Hanketyyppi = "ELY / AVI",
                        tyyppi: d.ColSel_Hanketyyppi,
                  //      Kimppa: d.Kimppa,
                        KuvausTeksti: d.KuvausTeksti,
                        link: d.link,
                        // muutos
                        target: d.linkki,
                        x: Math.random() * 1,
                        //  leveys: parseFloat(d.leveys),
                        y: Math.random() * 800
                        //   pituus: parseFloat(d.pituus)
                    };
                    this.totalAmountE +=value
                    if(value > 0)
                    this.totalAmountKpl +=1
                    for (var e = 20, el = testarri.length; e < el; ++e) {
                        //    if (data[e].rahasto

                        //   var testing = testarri[e]
                        if (testarri[e] === "joista naisia") {
                            testarri[e] = testarri[e - 1] + " (naisia)";
                        }
                        var testing = testarri[e];
                        node[testarri[e]] = d[testing];
              //          node[testarri[e] + "_radius"] = _this.radius_scale_yrit(parseInt(d[testing]));
                        node[testarri[e] + "_value"] = parseFloat(d[testing]);

                    }
                    radius = _this.radius_scale(parseInt(d.amount));
                    return _this.nodes.push(node);
                };
            })(this));

            this.nodes.sort(function (a, b) {
                return b.value - a.value;
            });
            return window.nodes = this.nodes;
        };

        // muutos


        BubbleChart.prototype.kill_forces = function () {
            return this.forces.forEach((function (_this) {
                return function (force) {
                    force.stop();
                    return force.nodes([]);
                };
            })(this));
        };

        BubbleChart.prototype.create_vis = function () {
            this.vis = d3.select("#vis").append("svg")
                .attr("width", this.width)
                .attr("height", this.height).attr("id", "svg_vis")
                .attr("tabindex", 0)
                .attr("aria-label", "Visualisointi myönnetyistä avustuksista. Jokaista avustusta kuvaa yksi pallo. Avustuksia on myönnetty yhteensä "+this.totalAmountE + " euroa ja "+this.totalAmountKpl +" kappaletta");

            this.create_patterns()
            window.viz = this.vis;
            return this.create_circles();
        };

        BubbleChart.prototype.create_patterns = function () {

            for (var c in colorings10) {

         //       var id = c.replace(/[ ]/gm,"_")
                var id = "pattern"+c
                var height= colorings10[c].height, width= colorings10[c].width

                var pattern = this.vis.append("defs")
                    .append("pattern")
                //    .attr({ id:"hash4_4", width:"8", height:"8", patternUnits:"userSpaceOnUse", patternTransform:"rotate(60)", fill:"white"})
               //     .attr({ id:id, width:"8", height:"8", patternUnits:"userSpaceOnUse", patternTransform:"rotate(60)", fill:"white"})
                    .attr('id',id)
                    .attr("width", 8)
                    .attr("height", 8)
                    .attr('patternUnits',"userSpaceOnUse")

                pattern
                    .append("rect")
                    .attr("height", "100%")
                    .attr("width", "100%")
                    .attr("fill", "white")


                pattern
                    .append('path')
                    .attr('fill',"#fff")
                    .attr('stroke',colorings10[c].pattern.color)
                    .attr('stroke-width','3')
              //      .attr('d','M0,0 Q10,20  20,10 T 40,0' );
                    .attr('d',colorings10[c].pattern.path );
/*

                /*
                pattern
                    .append("rect")
                    .attr({ width:"4", height:"8", transform:"translate(0,0)", fill:colorings[c].pattern.color });*/




            }


        };

        BubbleChart.prototype.create_circles = function () {
            this.circles = this.vis.selectAll("circle").data(this.nodes, function (d) {
                return d.id;
            });
            return this.do_create_circles(this.circles);
        };

        BubbleChart.prototype.do_create_circles = function (circles) {
            var that;
            that = this;
            // alkaa
            if ('ontouchstart' in document.documentElement) { /* JavaScript for your touch interface */
                var activeCirce = {d: undefined, i: undefined, elem: undefined, isActive: false};
                var hideDetailsOnOffClick = function (d, i, elem) {
                    activeCirce.d = d;
                    activeCirce.i = i;
                    activeCirce.elem = elem;
                    activeCirce.isActive = true;
                };

                var hideDetails = function () {
                    that.hide_details(activeCirce.d, activeCirce.i, activeCirce.elem);
                    activeCirce.isActive = false;
                };

                $("body").on("click", function (evt) {
                    if (evt.target.tagName !== "circle" && evt.target.id !== "my_tooltip") {
                        hideDetails();
                    }
                });

                // loppuu
                this.circles.enter().append("circle").attr("r", 0).attr("opacity", 1.0).style("fill", (function (_this) {
                    return function (d) {
                    };
                })

                (this)).attr("stroke-width", 2).attr("stroke", (function (_this) {
                    return function (d) {
                        return '#303030'; // tummanharmaa
                    };
                })(this)).attr("id", function (d) {
                    return "bubble_" + d.id;
                }).on("click", function (d, i) {
                    // alkaa
                    /*    $('#firstModal').foundation('reveal', 'open');
                     Kuntatilasto.selectedTown = d.kunta;*/

                    if (activeCirce.isActive) {
                     hideDetails();
                     hideDetailsOnOffClick(d,i,this);
                     that.show_details(d, i, this);
                     }
                     else {
                     that.show_details(d, i, this);
                     hideDetailsOnOffClick(d,i,this);
                    }
                    // loppuu
                }).attr("r", function (d) {
                    return d.radius;
                });
            } else {
                //	  this.circles.enter().append("circle").attr("r", 0).attr("opacity", 1).style("fill", (function(chart, colorwith, _this) {
                //     this.circles.enter().append("circle").attr("r", 0).attr("opacity", 1.0).style("fill", (function(chart, colorwith, _this) {

                this.circles
                    .enter()
                    .append("circle")
                    .attr("r", 0)
                    .attr("opacity", 1.0)
                    .style("fill", (function () {
                        return function (d) {
                            return '#cfcfcf'; // harmaa
                        };
                    })(this))
                    .attr("stroke-width", 2).attr("stroke", (function (_this) {
                        //           })(this)).attr("stroke-width", 2).attr("stroke", (function(_this) {
                        return function (d) {
                            return '#303030'; // tummanharmaa
                        };
                    })(this))
                    .attr("id", function (d) {
                        return "bubble_" + d.id;
                    })


                    .attr("aria-label", function (d) {
                        return d.name +". Avustukselle myönnettin rahaa "+ d.value + " euroa"
                    })
                    .on("mouseover", function (d, i,te,kk) {
                        console.log(te)
                        console.log(d)
                        console.log(i)
                        console.log(this)
                        that.show_details(d, i, this);
                   //     lastFocusedElement = document.activeElement;
                        focusedElementBeforeModal = document.activeElement;
                        console.log($("#my_tooltip"))
                        $("#my_tooltip").focus();
               //         clickProject(d.id,HankeVisData)
                    })
                    .on("mouseout", function (d, i) {
                        that.hide_details(d, i, this);
                    })
                    .on("click", function (d, i) {
                 /*       var url = d.link;

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
                        window.open(url);
                        */

                 clickProject(d.id,HankeVisData)
                    })
                    .attr("r", function (d) {
                        return d.radius;
                    });
            }
            return circles.exit().remove();
        };

        BubbleChart.prototype.charge = function (d) {
            return -(Math.pow(d.radius, 2.0) / 7) + -(d.radius * 0.1) + -(0.0002 * wWidth);
        };

        BubbleChart.prototype.display_group_all = function (textFunc) {
            var total_label, force, formatted_total, radius, titles, total_amount, units;
            this.kill_forces();
            force = d3.layout.force()
                .nodes(this.nodes)

                .size([this.width, this.height]);
            this.forces = [force];
            radius = this.count_circle_size(this.nodes) / 2;
            this.center = {
                x: this.width / 2,
                y: this.height / 2
            };

            this.vis.selectAll('.circleGroup').remove()
            //   force.gravity(0).theta(1.1).charge(this.charge).chargeDistance(Infinity).friction(0.88).on("tick", (function(_this) {
            force.gravity(0).theta(1.1).charge(this.charge).chargeDistance(Infinity).friction(0.89).on("tick", (function (_this) {
                return function (e) {
                    return _this.circles.each(_this.move_towards_center(e.alpha)).attr("cx", function (d) {
                        return d.x;
                    }).attr("cy", function (d) {
                        return d.y;
                    });



                };
//muutos
                /*
                return function (e) {
                    _this.links.each(_this.move_towards_center(e.alpha)).attr('x1', function(d) {
                        return d.source.x; })
                        .attr('y1', function(d) { return d.source.y; })
                        .attr('x2', function(d) { return d.target.x; })
                        .attr('y2', function(d) { return d.target.y; });
                };
*/
            })(this));
/*
            force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                         .attr("y1", function(d) { return d.source.y; })
                         .attr("x2", function(d) { return d.target.x; })
                         .attr("y2", function(d) { return d.target.y; });

                   });
*/
/*
            force_map.forEach((function (_this) {
                return function (force) {
                    var circles;
                    circles = _this.vis.selectAll("circle").filter(function (d) {
                        return force.key === accessor(d);
                    });
                    //         force.force.gravity(0).theta(1.0).charge(charge).chargeDistance(Infinity).friction(0.85).on("tick", function(e) {
                    force.force.gravity(0).theta(1.0).charge(charge).chargeDistance(Infinity).friction(0.85).on("tick", function (e) {
                        return circles.each(_this.liikuta_kohti_hankes(e.alpha, location_map, accessor)).attr('cx', function (d) {
                            return d.x;
                        }).attr('cy', function (d) {
                            return d.y;
                        });
                    });
                    return force.force.start();
                };
            })(this));
*/
            force.start();

            total_amount = d3.sum(this.nodes, function (d) {
                return d.value;
            });
      //      force.start();

            var total_kpl_amount = d3.sum(this.nodes, function (d) {
                return d.lkm_value;
            });
            formatted_total = this.format_eurot(total_amount);
            var kpl_total = this.format_kappale(total_kpl_amount);
            /*  total_label = [
                {
                    text: _('Kokonaissumma'),
                    "class": 'header',
                    dx: radius - wWidth * 0.37,
                    //    dy: -230
                    dy: -wWidth * 0.145 - 40
                }, {
                    text: _("{0} avustusta", addCommas(total_kpl_amount)),
                    "class": 'amount',
                    dx: radius - wWidth * 0.37,
                    //     dy: -190
                    dy: -wWidth * 0.145
                }, {
                    text: formatted_total,
                    "class": 'amount',
                    dx: radius - wWidth * 0.37,
                    //    dy: -210
                    dy: -wWidth * 0.145 - 20
                }
             ];*/
            var extraY = 0
            if(accessFont == true)
                extraY = 3
            else
            extraY= 0

                total_label = [
                    {
                        text: _('Kokonaissumma'),
                        "class": 'header',
                        //   dx: radius + wWidth*0.35,
                        dx: radius - wWidth * 0.038,
                        //    dy: -230
                        dy: -wWidth * 0.162 - 40
                        //    dy: radius - wWidth * 0.28 -40
                    }, {
                        text: formatted_total,
                        "class": 'amount',
                        dx: radius - wWidth * 0.038,
                        //    dy: -210
                        dy: -wWidth * 0.162 - 20+extraY
                    }, {
                        text: _("{0} avustusta", addCommas(total_kpl_amount)),
                        "class": 'amount',
                        //   dx: radius + wWidth*0.35,
                        dx: radius - wWidth * 0.038,
                        //     dy: -190
                        dy: -wWidth * 0.162+extraY
                    }
                ];



            titles = this.vis.selectAll('text.titles').remove();
            titles = this.vis.selectAll('text.titles').data(total_label, function (d) {
                return d.text;
            });
            titles.enter().append('text').text(function (d) {
                return d.text;
            }).attr('class', (function (_this) {
                return function (d) {
                    return "titles empty " + d["class"];
                };
            })(this)).attr('x', (function (_this) {
                return function (d) {
                    return _this.center.x + d.dx;
                };
            })(this)).attr('tabindex', (function (_this) {
                return function (d) {
                    return 0
                };
            })(this)).attr('y', (function (_this) {
                return function (d) {
                    return _this.center.y + d.dy;
                };
            })(this));
            return titles.exit().remove();
        };

        BubbleChart.prototype.move_towards_center = function (alpha) {
            return (function (_this) {
                return function (d) {
                    d.x = d.x + (_this.center.x - d.x) * (_this.damper + 0.02) * alpha;
                    return d.y = d.y + (_this.center.y - d.y) * (_this.damper + 0.02) * alpha;
                };
            })(this);
        };

        // visuContainer.velocity({height: numberofRows + 250}, { duration: "slow" });

        BubbleChart.prototype.arrange_circles = function (func, textFunc) {
            var radvalue;
            if (textFunc === "Toteutunut EU- ja valtion tuki") {
                radvalue = "radius";
            } else {
                radvalue = textFunc + "_value";
            }
            var extraH = 250
            if(wWidth < threashold)
                extraH = 500

            //palaa tähän äää

            var visuContainer = $('#vis-container'),
                svgVis = $('#svg_vis');
            if (func === 'hanke') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.name;
                    //         return d.name;
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'Kunta') {

                this.divide_up(function (d) {
                    if (d.radius > 0) return d.kunta;
                    //        return d.viranomainen
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Vaikutusalue') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.vaikutusalue;
                    //       return d.rahasto;
                });

                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Maakunta') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.maakunta;
                    //    return d.toteuttaja
                });

                visuContainer.velocity({height: numberofRows + extraH}, {duration: "slow"});
                svgVis.attr("height", numberofRows + extraH);
                this.title_text(textFunc);
            }
            if (func === 'Toteuttaja') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.toteuttaja;
                    //    return d.toteuttaja
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Hanketyyppi') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.tyyppi;
                    //        return d.toteuttajatyyppi;
                });
                visuContainer.velocity({height: numberofRows + 360}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 360);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Aluehallintovirasto') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.avi;
                    //        return d.toteuttajatyyppi;
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Kieli') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.kieli;
                    //     return d.tl;
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Teema') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.teema;
                    //          return d.teema;
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'ColSel_Vuosi') {
                this.divide_up(function (d) {
                    if (d.radius > 0) return d.hvuosi;
                    //          return d.teema;
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }
            if (func === 'amount') {
                console.log('do nothing');
                accessor = function (d) {
                    if (d.value > 1e6) {
                        return "Yli miljoonan";
                    } else if (d.value > 500000) {
                        return "500,000-1 miljoona";
                    } else if (d.value > 250000) {
                        return "250,000-500,000";
                    } else if (d.value > 200000) {
                        return "200,000-250,000";
                    } else if (d.value > 150000) {
                        return "150,000-200,000";
                    } else if (d.value > 100000) {
                        return "100,000-150,000";
                    } else if (d.value > 50000) {
                        return "50,000-100,000";
                    } else if (d.value > 25000) {
                        return "25,000-50,000";
                    } else if (d.value > 20000) {
                        return "20,000-25,000";
                    } else if (d.value > 15000) {
                        return "15,000-20,000";
                    } else if (d.value > 10000) {
                        return "10,000-15,000";
                    } else if (d.value > 5000) {
                        return "5,000-10,000";
                    } else if (d.value > 1000) {
                        return "1,000-5,000";
                    } else {
                        return "< 1,000";
                    }
                };
                this.divide_up(accessor, {
                    //sort: sort_func,
                    view_by_amount: true
                });
                visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
                svgVis.attr("height", numberofRows + 250);
                this.title_text(textFunc);
            }

            if (func === 'empty') {

                /*   if ($(window).height() > 1200) {
                 svgVis.attr("height", 900);
                 visuContainer.velocity({height: 900}, {duration: "slow"});
                 } else {*/
                svgVis.attr("height", this.height + 25);
                visuContainer.velocity({height: this.height + 25}, {duration: "slow"});
                //     }
                return this.display_group_all();
            }

        };
        /*
         BubbleChart.prototype.arrange_circles = function (func, textFunc) {

         console.log(func, textFunc)
            var accessor,
                sort_func,
                visuContainer = $('#vis-container');

            if (func === 'hanke') {
                this.divide_up(function (d) {
                    return d.name;
                });
            }
            if (func === 'Kunta') {
                this.divide_up(function (d) {
                    return d.kunta;
                });
            }
            if (func === 'ColSel_Vaikutusalue') {
                this.divide_up(function (d) {
                    return d.vaikutusalue;
                });
            }
            if (func === 'ColSel_Maakunta') {
                this.divide_up(function (d) {
                    return d.maakunta;
                });
            }
            if (func === 'tyyppi') {
                this.divide_up(function (d) {
                    return d.tyyppi;
                });
            }
            if (func === 'ColSel_Kieli') {
                this.divide_up(function (d) {
                    return d.kieli;
                });
            }
            if (func === 'ColSel_Aluehallintovirasto') {
                this.divide_up(function (d) {
                    return d.avi;
                });
            }
            if (func === 'vuosi') {
                this.divide_up(function (d) {
                    return d.hvuosi;
                });
            }
            if (func === 'ColSel_Teema') {
                this.divide_up(function (d) {
                    return d.teema;
                });
            }
            if (func === 'amount') {
                accessor = function (d) {
                    if (d.value > 1e6) {
                        return _("Yli miljoonan");
                    } else if (d.value > 500000) {
                        return _("500,000-1 miljoona");
                    } else if (d.value > 250000) {
                        return "250,000-500,000";
                    } else if (d.value > 200000) {
                        return "200,000-250,000";
                    } else if (d.value > 150000) {
                        return "150,000-200,000";
                    } else if (d.value > 100000) {
                        return "100,000-150,000";
                    } else if (d.value > 50000) {
                        return "50,000-100,000";
                    } else if (d.value > 25000) {
                        return "25,000-50,000";
                    } else if (d.value > 20000) {
                        return "20,000-25,000";
                    } else if (d.value > 15000) {
                        return "15,000-20,000";
                    } else if (d.value > 10000) {
                        return "10,000-15,000";
                    } else if (d.value > 5000) {
                        return "5,000-10,000";
                    } else if (d.value > 1000) {
                        return "1,000-5,000";
                    } else {
                        return "< 1,000";
                    }
                };

                this.divide_up(accessor, {
                    sort: sort_func,
                    view_by_amount: true
                });
            }

            if (func === 'empty') {
                return this.display_group_all();
            }

            this.title_text(textFunc);

            visuContainer.velocity({height: numberofRows + 250}, {duration: "slow"});
        };
         */
        var location_map;

        BubbleChart.prototype.divide_up = function (accessor, options) {
            //              var charge, force_map, line_height, line_offset, location_map, padding, title_accessor, titles;
            var charge, force_map, line_height, line_offset, padding, title_accessor, titles;
            if (options === null || options === undefined) {
                options = {};
            }

            location_map = this.make_grid(this.nodes, accessor, options);
            charge = options.charge !== null && options.charge !== undefined ? options.charge : this.charge;
            this.kill_forces();
            this.forces = [];
            force_map = location_map.keys().map((function (_this) {
                return function (key) {
                    var force, nodes;
                    nodes = _this.nodes.filter(function (d) {
                        return key === accessor(d);
                    });
                    force = d3.layout.force().nodes(nodes).size([_this.width, _this.height]);
                    _this.forces.push(force);
                    return {
                        force: force,
                        key: key,
                        nodes: nodes
                    };
                };
            })(this));

            force_map.forEach((function (_this) {
                return function (force) {
                    var circles;
                    circles = _this.vis.selectAll("circle").filter(function (d) {
                        return force.key === accessor(d);
                    });
                    //         force.force.gravity(0).theta(1.0).charge(charge).chargeDistance(Infinity).friction(0.85).on("tick", function(e) {
                    force.force.gravity(0).theta(1.0).charge(charge).chargeDistance(Infinity).friction(0.85).on("tick", function (e) {
                        return circles.each(_this.liikuta_kohti_hankes(e.alpha, location_map, accessor)).attr('cx', function (d) {
                            return d.x;
                        }).attr('cy', function (d) {
                            return d.y;
                        });
                    });
                    return force.force.start();
                };
            })(this));

        };

        BubbleChart.prototype.title_text = function (textFunc, accessor, options) {
            var line_height, line_offset, padding, title_accessor, titles,groups;
            if (options === null || options === undefined) {
                options = {};
            }

            titles = this.vis.selectAll('text.titles').remove();
            title_accessor = options.title_accessor != null ? function (d) {
                d.key = _(d.key);
                return options.title_accessor(d.key);
            } : function (d) {
                if (d.key != "undefined") {
                    d.key = _(d.key);
                    return d.key;
                }
            };
            /*
            titles = this.vis.selectAll('text.titles').data(location_map.values(), function (d) {
                return d.key;
            });*/
            //how far titles are from groups
            //    padding = options.view_by_amount != null ? padding = 90 : padding = 85;
            //    padding = options.view_by_amount != null ? padding = wWidth*0.07 : padding = wWidth*0.053;
            function alphabetical_sort_object_of_objects(data, attr) {
                var arr = [];
                for (var prop in data) {
                    if (data.hasOwnProperty(prop)) {
                        var obj = {};
                        obj[prop] = data[prop];
                        obj.tempSortName = data[prop][attr]//.toLowerCase();
                        arr.push(obj);
                    }
                }

                arr.sort(function(a, b) {
                    var at = a.tempSortName,
                        bt = b.tempSortName;
                    //    return at > bt ? 1 : ( at < bt ? -1 : 0 );
                    return bt - at;
                });

                var result = [];
                for (var i=0, l=arr.length; i<l; i++) {
                    var obj = arr[i];
                    delete obj.tempSortName;
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            var id = prop;
                        }
                    }
                    var item = obj[id];
                    result.push(item);
                }
                return result;
            }

            var your_object = alphabetical_sort_object_of_objects(location_map, 'sum');


            //        groups = this.vis.selectAll('text.titles').data(location_map.values(), function (d) {

            //      your_object.unshift({key:"fake"});

            this.vis.selectAll('.circleGroup').remove()
            /*
                        var parentGroup = this.vis.selectAll('parengGroup')

                        var tt = parentGroup.enter().append("div")
                            .attr("role", "circleGroup");
            */

            groups = this.vis.selectAll('text.titles').data(your_object, function (d) {
                return d.key;
            });


            titles = groups.enter().append("svg:g")
                .attr("tabindex", function (d,i) {
                //    return i+2
                    return 0
                })
                .attr("desc", function (d,i) {
                    //    return i+2
                    return "Tämä on testiteksti"
                })
                .attr("alt", function (d,i) {
                    //    return i+2
                    return "Tämä on toinen testiteksti"
                })
          //      .attr("role","tab tabpanel")
                .attr("aria-labeledby", function (d,i) {
                  return d.key
                })
                .attr("class", "circleGroup");




            padding = options.view_by_amount !== null && options.view_by_amount !== undefined ? padding = wWidth * 0.09 : padding = wWidth * 0.073;

            $('#vis tspan').remove();

            var extraY = 0
            if(accessFont == true)
                extraY = 50
            else
                extraY= 0

            if(this.width < threashold) {
                extraY = extraY+8
            }

            line_height = titleLineheight;
            line_offset = function (d, line_num) {
                return d.y + d.radius + padding + line_height * line_num;
            };

            if (uprowValue === "Toteuttaja" || uprowValue === "ColSel_Teema" || uprowValue === "ColSel_Aluehallintovirasto") {

                var otsikko, words;

                titles.append('text')
                    .attr("class", "titles header")
                    .attr("text-anchor", "middle")
                    .attr('dy', wWidth * 0.00004)
                    .text(function (d, i) {
                        otsikko = _(d.key);
                        if (otsikko == "undefined") {
                            // do nothing
                        } else if (otsikko === "Valmistumisen vauhdittaminen ja 2. asteen koulutukseen siirtymisen tukeminen") {
                            return _("Valmistumisen vauhdittaminen ja 2.");
                        } else {
                            if (otsikko.length > 20) {
                                var middle = Math.floor(otsikko.length / 2);
                                var before = otsikko.lastIndexOf(' ', middle);
                                var after = otsikko.indexOf(' ', middle + 1);
                                if (before == -1 || (after != -1 && middle - before >= after - middle)) {
                                    middle = after;
                                } else {
                                    middle = before;
                                }
                                return _(otsikko.substr(0, middle));
                            }
                        }
                    })
                    .attr('x', function (d) {
                        return d.x;
                    })
                    .attr('y', function (d) {
                        //      return d.y + d.radius + padding + line_height - 40;
                        //      return line_offset(d, 0) - wWidth*0.018;
                        // alemman otsikorivin korkeus, isompi -> korkeampi
                   //     return line_offset(d, 0) - wWidth * 0.034;
                        return line_offset(d, 0) - wWidth * 0.034-extraY*2;
                    });
                titles.append('text')
                    //  .attr('dy', '1.0em')
                    //     .attr('dy', wWidth*0.0075)
                    .attr("class", "titles header")
                    .attr("text-anchor", "middle")
                    .attr('dy', wWidth * 0.00005+extraY)
                    .text(function (d, i) {
                        otsikko = _(d.key);
                        if (otsikko == "undefined") {
                            // do nothnin
                        } else if (otsikko === "Valmistumisen vauhdittaminen ja 2. asteen koulutukseen siirtymisen tukeminen") {
                            return _("asteen koulutukseen siirtymisen tukeminen");
                        } else {
                            if (otsikko.length > 20) {
                                var middle = Math.floor(otsikko.length / 2);
                                var before = otsikko.lastIndexOf(' ', middle);
                                var after = otsikko.indexOf(' ', middle + 1);
                                if (before == -1 || (after != -1 && middle - before >= after - middle)) {
                                    middle = after;
                                } else {
                                    middle = before;
                                }

                                return otsikko.substr(middle + 1);
                            } else {
                                return otsikko;
                            }
                        }
                    })
                    .attr('x', function (d) {
                        return d.x;
                    })
                    .attr('y', function (d) {
                        //      return d.y + d.radius + padding + line_height - 40;
                        //      return line_offset(d, 0) - wWidth*0.018;
                        // alemman otsikorivin korkeus, isompi -> korkeampi
                   //     return line_offset(d, 0) - wWidth * 0.024+extraY;
                        return line_offset(d, 0) - wWidth * 0.024-extraY*2;
                    });
            } else {

          //      titles.enter().append('text')
                titles//.enter()
                    .append('text')
                    .attr("class", "titles header")
                    .text(title_accessor)
                    .attr("text-anchor", "middle")
                    .attr('x', function (d) {
                        if (d.key != "undefined") return d.x;
                    })
                    .attr('y', function (d) {
                        /*        otsikko = d.key;
                         console.log(otsikko)
                         if (otsikko == "ELY / AVI") {
                         return line_offset(d, 0) - wWidth * 0.3;
                         } else {
                         return line_offset(d, 0) - wWidth * 0.021;
                         }*/
                        return line_offset(d, 0) - wWidth * 0.021-extraY;
                    });
            }


            titles/*.enter()*/.append('text').attr('class', 'titles amount').text((function (_this) {
                return function (d) {
                    if (textFunc === "amount") {
                        if (_this.format_eurot(parseFloat(d.sum)) === _(" 0 €")) {
                    //        titles.exit().remove();
                            groups.exit().remove();
                        } else {
                            return _this.format_eurot(parseFloat(d.sum));
                        }
                    } else {
                        if (_this.format_any(parseFloat(d.value_sum)) === _("0 kpl")) {
                   //         titles.exit().remove();
                            groups.exit().remove();
                        } else {
                            return _this.format_eurot(parseFloat(d.sum));
                        }
                    }
                };
            })(this)).attr('text-anchor', 'middle').attr('x', function (d) {
                return d.x + 1;
            }).attr('y', function (d) {
                //     return line_offset(d, 1);
                return line_offset(d, 0) - wWidth * 0.012-extraY/8;
            });

            titles/*.enter()*/.append('text').attr('class', 'titles amount2').text((function (_this) {
                return function (d) {
                    /*         if (_this.format_eurot(parseFloat(d.value_sum)) === " 0 euroa") {
                     titles.exit().remove();
                     } else {
                     */
                    if (d.key !== "undefined") {
                        if (textFunc === "kpl") {
                            return _this.format_kappale(parseFloat(d.kpl_sum));
                        } else if (textFunc === "xtyöpaikat") {
                            return _this.format_tyop(parseFloat(d.tyop_sum));
                        } else if (textFunc === "xosalyritykset") {
                            return _this.format_osalyrit(parseFloat(d.osalyrit_sum));
                        } else if (textFunc === "xorganisaatiot") {
                            return _this.format_osalorg(parseFloat(d.osalorg_sum));
                        } else if (textFunc === "xuudetyritykset") {
                            return _this.format_yrit(parseFloat(d.yrit_sum));
                        } else if (textFunc === "xtutkinnot") {
                            return _this.format_tutkinnot(parseFloat(d.tutkinnot_sum));
                        } else if (textFunc === "xaloittaneet") {
                            return _this.format_aloittaneet(parseFloat(d.aloittaneet_sum));
                        } else if (textFunc === "xetaopetus") {
                            return _this.format_etaopetus(parseFloat(d.etaopetus_sum));
                        } else if (textFunc === "xkoulutuspaivat") {
                            return _this.format_koulutuspaivat(parseFloat(d.koulutuspaivat_sum));
                        } else if (textFunc === "Toteutunut EU- ja valtion tuki") {
                            return _this.format_kappale(parseFloat(d.kpl_sum));
                        } else {
                            return _this.format_any(parseFloat(d.kpl_sum));
                        }
                    }
                    //        }
                };

            })(this)).attr('text-anchor', 'middle').attr('x', function (d) {
                return d.x + 1;
            }).attr('y', function (d) {
                //     return line_offset(d, 2);
                return line_offset(d, 0) - wWidth * 0.003+extraY//*2;
            });
      //      return titles.exit().remove();
            return groups.exit().remove();
        };

        BubbleChart.prototype.format_eurot = function (amount_in_euros) {
            var amount_in_millions, totalCount, reducedtotalCount, procentValue;

            totalCount = total_amount = d3.sum(this.nodes, function (d) {
                return d.value;
            });

            amount_in_millions = amount_in_euros / 1e6;
            reducedtotalCount = totalCount / 1e8;
            procentValue = amount_in_millions / reducedtotalCount;

            if (amount_in_millions <= 0) {
                return _(" 0 €");
            } else if (amount_in_millions <= 0.01) {
                return _("< 0.01 milj. €");
            } else {
                return _('{0} milj. €' + ' ({1}%)', d3.format(',.2f')(amount_in_millions), d3.format(',.2f')(procentValue));
            }
        };

        BubbleChart.prototype.format_kappale = function (amount_kappaleet) {
            var amount_kpl_yhteensa;
            amount_kpl_yhteensa = amount_kappaleet;
            if (amount_kpl_yhteensa === 1) {
                return _('1 avustus');
            } else {
                return _('{0} avustusta', addCommas(amount_kpl_yhteensa));
            }
        };

        BubbleChart.prototype.format_any = function (amount_any) {
            var amount_any_yhteensa;
            amount_any_yhteensa = amount_any;
            if (amount_any_yhteensa === 1) {
                return _("1 avustus");
            } else {
                return _('{0} avustusta', addCommas(amount_any_yhteensa));
            }
        };


        BubbleChart.prototype.liikuta_kohti_hankes = function (alpha, location_map, accessor) {
            return (function (_this) {
                return function (d) {
                    var target;
                    target = location_map.get(accessor(d));
                    d.x = d.x + (target.x - d.x) * (_this.damper + 0.02) * alpha * 1.1;
                    return d.y = d.y + (target.y - d.y) * (_this.damper + 0.02) * alpha * 1.1;
                };
            })(this);
        };

        BubbleChart.prototype.make_grid = function (nodes, grouping_func, func, options) {
            var col_num, groups, label_padding, max_num_in_row, max_num_rows, num_in_row, padding, prev_radius, prev_y, sort;
            var textValue = textSelect + "_value";

            if (options === null || options === undefined) {
                options = {};
            }

            if (uprowValue === 'Toteuttaja') {
                groups = d3.nest().key(grouping_func).rollup((function (_this) {
                    return function (leaves) {
                        return {
                            sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.value);
                            }),
                            kpl_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.lkm_value);
                            }),
                            tyop_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.tyop_value);
                            }),
                            yrit_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.yrit_value);
                            }),
                            osalyrit_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.osalyrit_value);
                            }),
                            osalorg_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.osalorg_value);
                            }),
                            tutkinnot_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.tutkinnot_value);
                            }),
                            aloittaneet_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.aloittaneet_value);
                            }),
                            etaopetus_sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.etaopetus_value);
                            }),
                            value_sum: d3.sum(leaves, function (d) {
                                if (!isNaN(d[textValue]) && d[textValue] > 0) {
                                    return parseFloat(d [textValue]);
                                }
                            }),
                       //     hankes: d3.set(leaves.map(_this.get_hanke_nimi)).values(),
                      //      hankes: d3.set(leaves.map(_this.get_hanke_nimi)).values(),
                            hankes: d3.set(leaves.map(_this.get_hanke_id)).values(),
                            //    radius: _this.count_circle_size(leaves) / 2.2 // 2.7
                            radius: _this.count_circle_size(leaves) / (wWidth * 0.00215) // 2.7
                        };
                    };
                })(this)).map(nodes, d3.map);
            } else {
                groups = d3.nest().key(grouping_func).rollup((function (_this) {
                    //     var value_sum = textSelect + "_sum"

                    return function (leaves) {
                        return {
                            sum: d3.sum(leaves, function (d) {
                                return parseFloat(d.value);
                            }),
                            kpl_sum: d3.sum(leaves, function (d) {
                                if (d.lkm_value > 0) {
                                    return parseFloat(d.lkm_value);
                                }
                            }),
                            tyop_sum: d3.sum(leaves, function (d) {
                                if (d.tyop_value > 0) {
                                    return parseFloat(d.tyop_value);
                                }
                            }),
                            yrit_sum: d3.sum(leaves, function (d) {
                                if (d.yrit_value > 0) {
                                    return parseFloat(d.yrit_value);
                                }
                            }),
                            osalyrit_sum: d3.sum(leaves, function (d) {
                                if (d.osalyrit_value > 0) {
                                    return parseFloat(d.osalyrit_value);
                                }
                            }),
                            osalorg_sum: d3.sum(leaves, function (d) {
                                if (d.osalorg_value > 0) {
                                    return parseFloat(d.osalorg_value);
                                }
                            }),
                            tutkinnot_sum: d3.sum(leaves, function (d) {
                                if (d.tutkinnot_value > 0) {
                                    return parseFloat(d.tutkinnot_value);
                                }
                            }),
                            aloittaneet_sum: d3.sum(leaves, function (d) {
                                if (d.aloittaneet_value > 0) {
                                    return parseFloat(d.aloittaneet_value);
                                }
                            }),
                            etaopetus_sum: d3.sum(leaves, function (d) {
                                if (d.etaopetus_value > 0) {
                                    return parseFloat(d.etaopetus_value);
                                }
                            }),
                            koulutuspaivat_sum: d3.sum(leaves, function (d) {
                                if (d.koulutuspaivat_value > 0) {
                                    return parseFloat(d.koulutuspaivat_value);
                                }
                            }),

                            value_sum: d3.sum(leaves, function (d) {
                                if (!isNaN(d[textValue]) && d[textValue] > 0) {
                                    return parseFloat(d [textValue]);
                                }
                            }),
                       //     hankes: d3.set(leaves.map(_this.get_hanke_nimi)).values(),
                            hankes: d3.set(leaves.map(_this.get_hanke_id)).values(),
                            //   radius: _this.count_circle_size(leaves) / 2.7 // 2.7
                            //    radius: _this.count_circle_size(leaves) / (wWidth*0.00215) // 2.7
                            radius: _this.count_circle_size(leaves) / (wWidth * 0.00150) // 2.7
                        };
                    };
                })(this)).map(nodes, d3.map);
            }
            //    padding = options.view_by_amount != null ? 80 : 30;
            //    label_padding = 90;
            //   padding = options.view_by_amount != null ? (wWidth*0.042) : wWidth*0.016;
            padding = options.view_by_amount != null ? (wWidth * 0.15) : wWidth * 0.018;
            label_padding = wWidth * 0.065;
            col_num = prev_radius = 0;
            num_in_row = 1;

            //    if (uprowValue === "Toteuttaja" || uprowValue === "ColSel_Teema") {


            if (window.width < threashold) {
                max_num_in_row = 3;
            }else if (window.PAGE.VIEW === 'ColSel_Teema') {
                max_num_in_row = 4;
            } else if (window.width < 1500) {
                max_num_in_row = 5;
            } else {
                max_num_in_row = 5;
            }
            //     prev_y = options.view_by_amount != null ? -90 : -60;
            //       prev_y = options.view_by_amount != null ? (wWidth * -0.048) : (wWidth * -0.031);
            prev_y = options.view_by_amount !== null && options.view_by_amount !== undefined ? (wWidth * -0.068) : (wWidth * -0.041);

            sort = options.sort != null ? options.sort : function (a, b) {
//	  return d3.descending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
                if (textSelect === 'osalyritykset') {
                    return d3.descending(parseFloat(groups.get(a).osalyrit_sum), parseFloat(groups.get(b).osalyrit_sum));
                } else if (textSelect === "organisaatiot") {
                    return d3.descending(parseFloat(groups.get(a).osalorg_sum), parseFloat(groups.get(b).osalorg_sum));
                } else if (textSelect === "aloittaneet") {
                    return d3.descending(parseFloat(groups.get(a).aloittaneet_sum), parseFloat(groups.get(b).aloittaneet_sum));
                } else if (textSelect === "työpaikat") {
                    return d3.descending(parseFloat(groups.get(a).tyop_sum), parseFloat(groups.get(b).tyop_sum));
                } else if (textSelect === "uudetyritykset") {
                    return d3.descending(parseFloat(groups.get(a).yrit_sum), parseFloat(groups.get(b).yrit_sum));
                } else if (textSelect === "Toteutunut EU- ja valtion tuki") {
                    return d3.descending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
                } else {
                    //      return d3.descending(parseFloat(groups.get(a).value_sum), parseFloat(groups.get(b).value_sum));
                    return d3.descending(parseFloat(groups.get(a).sum), parseFloat(groups.get(b).sum));
                }
            };

            groups
                .keys()
                .sort(sort)
                .forEach((function (_this) {
                    return function (key, index) {
                        var entry, min_width, num_left_in_layout, prev_num_in_row, x, y;
                        entry = groups.get(key);

                        entry['key'] = key;
                        if (col_num >= num_in_row) {
                            col_num = 0;
                        }

                        if (col_num === 0) {
                            prev_num_in_row = num_in_row;
                            while ((_this.width / num_in_row) > entry.radius * 2 + padding * 3) {
                                num_in_row += 1;
                            }
                            num_in_row -= 1;
                            num_left_in_layout = groups.keys().length - index;
                            if (num_in_row > num_left_in_layout) {
                                if (num_left_in_layout <= groups.keys().length - 1) {
                                    num_in_row = prev_num_in_row;
                                }
                            }
                            num_in_row = Math.min(max_num_in_row, num_in_row);
                        }

                        min_width = _this.width / num_in_row;
                        x = min_width * col_num + min_width / 2;

                        if (col_num === 0) {
                            y = prev_y + prev_radius + entry.radius + padding * 2 + label_padding;
                            prev_y = y;
                            prev_radius = entry.radius;
                        }

                        y = prev_y;
                        entry['x'] = x + 25;
                        entry['y'] = y - 30;
                        if(wwidth < threashold)
                            prev_radius= prev_radius+15

                        entry['radius'] = prev_radius;
                        groups.set(key, entry);
                        return col_num += 1;
                    };
                })(this));
            numberofRows = prev_y;
            return groups;
        };

        BubbleChart.prototype.get_hanke_nimi = function (d) {
            return d.name.split(',')[0] + (" (" + d.name[0] + ")");
        };
        BubbleChart.prototype.get_hanke_id = function (d) {
            return d.id;
        };

        BubbleChart.prototype.count_circle_size = function (nodes) {
            var area, diameter, estimated_diameter;
            area = d3.sum(nodes, function (d) {
                if (textSelect === "osalyritykset") {
                    return Math.PI * Math.pow(d.osalyrit_radius, 2);
                } else if (textSelect === "organisaatiot") {
                    return Math.PI * Math.pow(d.osalorg_radius, 2);
                } else if (textSelect === "aloittaneet") {
                    return Math.PI * Math.pow(d.aloit_radius, 2);
                } else if (textSelect === "työpaikat") {
                    return Math.PI * Math.pow(d.tyop_radius, 2);
                } else if (textSelect === "uudetyritykset") {
                    return Math.PI * Math.pow(d.yrit_radius, 2);
                } else if (textSelect === "Toteutunut EU- ja valtion tuki") {
                    return Math.PI * Math.pow(d.radius, 2);
                } else {
                    //   var itvalue = d.[ textSelect_radius"
                    //    var itvalue = textSelect + "_radius"
                    //    return Math.PI * Math.pow(d[ itvalue ], 2);
                    return Math.PI * Math.pow(d.radius, 2);
                }

            });
            //    diameter = 2 * Math.sqrt(area / Math.PI);
            //    diameter = (wWidth*0.0009) * Math.sqrt(area / Math.PI);
            diameter = (wWidth * 0.0009) * Math.sqrt(area / Math.PI);
            //    estimated_diameter = (Math.log(nodes.length) / 140 + 1) * diameter;
            estimated_diameter = (Math.log(nodes.length) / (wWidth * 0.015) + 1) * diameter;
            return estimated_diameter;
        };

        BubbleChart.prototype.updateSearch = function (searchTerm) {
            var searchRegEx;
            searchRegEx = new RegExp(searchTerm.toLowerCase());
            return this.circles.each(function (d) {
                var element, match;
                element = d3.select(this);
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

        BubbleChart.prototype.updateFilter = function (filtered_values1, func, textFunc) {

            //    var Array1 = ["Rahasto/Aluekehitysrahasto", "Rahasto/Sosiaalirahasto", "Rahasto/Maaseuturahasto", "Ministerio/Koulutus- ja tiedepolitiikka", "Ministerio/Kulttuuri-, liikunta- ja nuorisopolitiikka", "Yksikko/Aikuiskoulutus", "Yksikko/Kaikki koulutusmuodot", "Yksikko/Korkeakoulutus ja tiede", "Yksikko/Kulttuurivienti", "Yksikko/Liikunta", "Yksikko/Nuoriso", "Yksikko/Nuorten ammatillinen koulutus", "Yksikko/Taide ja kulttuuriperintö", "Yksikko/Viestintäkulttuuri", "Yksikko/Yleissivistävä koulutus"];
            //    var Array1 = ["Rahasto/Aluekehitysrahasto", "Rahasto/Sosiaalirahasto", "Rahasto/Maaseuturahasto"]
            //    var Arrayx = ["Rahasto//Aluekehitysrahasto", "Rahasto//Sosiaalirahasto", "Rahasto//Maaseuturahasto", "Rahoittajaviranomainen//ELY-keskus", "Rahoittajaviranomainen//Maakuntaliitto", "Rahoittajaviranomainen//Tekes"]
    /*        var Arrayx = [];
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
*/
            var Arrayx = [];
            var Arrayz = [];
            var Array1 = []
            //
            /*
             if(filtered_values1.length > 0) {
             console.log("heps")
             $('#ruksi').show()
             } else {
             $('.ui-multiselect-none').hide()
             }
             */

            var XArray1 = Arrayx.concat(toteuttajaList, teemaList, kuntaList, maakuntaList, vuosiList, aviList, rahoittajaList,erityisList );
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
                    case "Erityisavustus":
                        origListLength = erityisList.length;
                        break;
                }

                if(name == "Teema") {
                    name = "Avustusmuoto"
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
var montako = 0;
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
                        if (Array1[a].indexOf("Erityisavustus") > -1) {
                            newparam = Array1[a].split("//");
                            if (d.Erityisavustus === newparam[1]) return false;
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
montako +=1
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

            if (montako > 2200) {
                alert("Sinulla on valittuna yli 2200 avustusta. Näin suuren määrän kanssa pallovisualisoinnilla voi olla hitausongelmia. Jos niitä esiintyy, kannattaa rajata näkyvien avustusten määriä suodattimista.")
            }

            if(func == undefined)
            func = "empty"

            seenCircles = []
            this.circles.each(function (d) {

                if (d.radius > 0)
                seenCircles.push(d)
            })

            parseColorTable(seenCircles)

            return window.get_chart().arrange_circles(func, textFunc);
        };



        BubbleChart.prototype.updateSearchx = function (searchtestiArr) {
            return this.circles.each(function (d) {
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


        BubbleChart.prototype.updateSize = function (bubbleSize, func, textFunc) {


            //var textFunc = $('#select-size').val();
            var textFunc = "amount",
                func = funkkis;

            var filtered_values1 = $.map($("#example-optgroup").multiselect("getChecked"), function (ui) {
                return ui.value;
            });

            if (filtered_values1.length <= 0) {
                filtered_values1.push("empty");
            }

            chart.updateFilter(filtered_values1, func, textFunc);
            /*
             this.circles.each(function (d) {
             var element = d3.select(this);
             if (bubbleSize == "euro") {
             d.radius = d.orig_radius;
             element.transition().duration(2000).attr("r", d.radius);
             } else if (bubbleSize == "uudetyritykset") {
             d.radius = d.yrit_radius;
             element.transition().duration(2000).attr("r", d.radius);
             } else if (bubbleSize == "osalyritykset") {
             d.radius = d.osalyrit_radius;
             element.transition().duration(2000).attr("r", d.radius);
             } else if (bubbleSize == "työpaikat") {
             d.radius = d.tyop_radius;
             element.transition().duration(2000).attr("r", d.radius);
             } else if (bubbleSize == "organisaatiot") {
             d.radius = d.tyop_radius;
             element.transition().duration(2000).attr("r", d.radius);
             } else if (bubbleSize == "aloittaneet") {
             d.radius = d.aloit_radius;
             element.transition().duration(2000).attr("r", d.radius);
             }
             BubbleChart.prototype.charge(d);
             });
             return window.get_chart().arrange_circles(func, textFunc); */
        };


        BubbleChart.prototype.show_details = function (data, i, element) {
            var url = data.link;

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
        //    d3.select(element).attr("stroke", "red");
            d3.select(element).attr("stroke-width", 7);
            content = "<span class=\"name\">" + data.name + "</span><br/><br/>";

            var transKohderyhmat = data.kohderyhma.split(',');
            for (var j = 0; j < transKohderyhmat.length; j++) {
                transKohderyhmat[j] = _(transKohderyhmat[j]);
            }

            var osat = [];
            if (data.Osatoteuttajat) {
              //  osat = data.Osatoteuttajat.split(',');
                for (var j = 0; j < data.Osatoteuttajat.length; j++) {
                //    osat[j] = _(data.Osatoteuttajat[j]);
                    osat.push(" "+_(data.Osatoteuttajat[j]))
                }
            }


            transKohderyhmat = transKohderyhmat.join(", ");

            content += "<span class=\"name\">" + _("Toteuttajan nimi") + ":" + "</span><span class=\"value\"> " + _(data.toteuttaja) + "</span><br/>";
            content += "<span class=\"name\">" + _("Avustusmuoto") + ":" + "</span><span class=\"value\"> " + _(data.teema) + "</span><br/>";
            content += "<span class=\"name\">" + _("Aluehallintovirasto") + ":" + "</span><span class=\"value\"> " + _(data.avi) + "</span><br/>";
            content += "<span class=\"name\">" + _("Maakunta") + ":" + "</span><span class=\"value\"> " + _(data.maakunta) + "</span><br/>";
            content += "<span class=\"name\">" + _("Kunta") + ":" + "</span><span class=\"value\"> " + _(data.kunta) + "</span><br/>";

            if (window.PAGE.VIS !== "good-practices") {
                content += "<span class=\"name\">" + _("Vaikutusalue") + ":" + "</span><span class=\"value\"> " + _(data.vaikutusalue) + "</span><br/>";
            }
            if(data.kohderyhma)
            content += "<span class=\"name\">" + _("Toteutusalue") + ":" + "</span><span class=\"value\"> " + transKohderyhmat + "</span><br/>";


            content += "<span class=\"name\">" + _("Vuosi") + ":" + "</span><span class=\"value\"> " + data.hvuosi + "</span><br/>";
            if (window.PAGE.VIS !== "good-practices") {
                if (window.PAGE.VIS !== "projects") {
                    content += "<span class=\"name\">" + _("Haettu avustus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.value))) + "</span><br/>";
                } else {
                    content += "<span class=\"name\">" + _("Myönnetty avustus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.value))) + "</span><br/>";
                }
            }

            if (window.PAGE.VIS === 'new-projects') {
                content += "<span class=\"name\">" + _("Oma rahoitus") + ":" + "</span><span class=\"value\"> " + _("{0} €", (addCommas(data.omarah))) + "</span><br/>";
            }

            if ('ontouchstart' in document.documentElement) {
            //    content += "<br><a href='" + url + "' target='_blank'>" + _("Tutustu hankkeeseen tarkemmin") + "</a>";
        //        content += "<br><a href='" + url + "' target='_blank'>" + _("Tutustu hankkeeseen tarkemmin") + "</a>";
       //         content += "<br><a onclick='clickProject("+data.id+",HankeVisData); return false;'>Tutustu hankkeeseen tarkemmin</a>";
      //          content += "<br><a class='linkbtn' id='"+data.id+"'>Tutustu hankkeeseen tarkemmin</a>";
            }

            if ('ontouchstart' in document.documentElement) {
                content += "<span id='close' onclick='this.tooltip.hideTooltip(); return false;'>x</span>";
            }

            this.tooltip.showTooltip(content, d3.event);
//        return d3.select(element).move_to_front();
        };

        BubbleChart.prototype.hide_details = function (data, i, element) {
            d3.select(element).attr("stroke", '#303030');
            d3.select(element).attr("stroke-width", 2);
            return this.tooltip.hideTooltip();
        };

        BubbleChart.prototype.get_color_options_ColSel_Teema = function (ColorSelectArray) {
            var baseArray,index,color_options, value, _i, _len;
            color_options = {};
            baseArray = [
                "#ffff99", // keltainen
                "#1f78b4",
                "#b2df8a",
                "#33a02c",
                "#fb9a99",
                "#e31a1c",
                "#fdbf6f",
                "#ff7f00",
                "#cab2d6",
                "#6a3d9a",
                "#a6cee3", // vaaleansininen
                "#b15928",
                "#84a9ac"
            ];
            index = 0;
            color_options = {};
            var runNum = 0
            var runNums = 0
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                if(accessColors==true) {
                    //    console.log(series[key].name,key)
                    //     series[key].color = colorings[series[key].name];
                    if(ColorSelectArray.length < 11) {
                        //        color_options[value] = colorings10[_i];
                        color_options[value] = "url(#pattern"+_i+")";
                    } else {
                        if(isEven(_i)) {
                            console.log(runNum)
                            //    color_options[value] = colorings10[runNum];
                            color_options[value] = "url(#pattern"+runNum+")";
                            runNum +=1
                        } else {
                            color_options[value] = cols9[runNums]
                            runNums +=1
                        }
                    }
                } else {
                    var valueID = value.replace(/[ ]/gm,"_")
                    switch (value) {

                        case "Etsivä nuorisotyö":
                            color_options[value] = '#a6cee3';
                            break;
                        case "Kirjastojen kehittämishankkeet":
                            color_options[value] = '#ff7f00';
                            break;
                        case "Lasten ja nuorten paikallinen harrastustoiminta":
                            color_options[value] = '#e31a1c';
                            break;
                        case "Liikunnallinen elämäntapa":
                            color_options[value] = '#b2df8a';
                            break;
                        case "Liikuntapaikkarakentaminen":
                            color_options[value] = '#33a02c';
                            break;
                        case "Maahanmuuttajien kotouttaminen liikunnan avulla":
                            color_options[value] = '#00BFFF';
                            break;
                        case "Nuorten tieto- ja neuvontatyö sekä digitaalinen nuorisotyö":
                            color_options[value] = 'grey';
                            break;
                        case "Nuorten työpajatoiminta":
                            color_options[value] = '#1f78b4';
                            break;
                        case "Liikkuva koulu":
                            color_options[value] = '#6a3d9a';
                            break;
                        case "Liikkuva opiskelu":
                            color_options[value] = '#fb9a99';
                            break;
                        case "Vähävaraisten perheiden lasten ja nuorten liikuntaharrastuksen tuki":
                            color_options[value] = '#e31a1c';
                            break;
                        case "Digitaalisen etävalmennuksen ja –harjoittelun kehittäminen ja tukeminen seuroissa":
                            color_options[value] = '#cab2d6';
                            break;
                        case "Nuorisotoimen kehittämis- ja kv-toiminta":
                            color_options[value] = '#fdbf6f';
                            break;

                        //kirjastoteemat
                        case "Digitointi":
                            color_options[value] = '#fdbf6f';
                            break;
                        case "Kirjastohenkilöstön osaamisen kehittäminen":
                            color_options[value] = '#ff7f00';
                            break;
                        case "Kokoelmien kehittäminen, e-aineistot":
                            color_options[value] = '#ffff99';
                            break;
                        case "Laitehankinnat":
                            color_options[value] = '#b2df8a';
                            break;
                        case "Lukemisen edistäminen: kirjailijavierailut, kirjavinkkaus, lukupiirit, satutunnit ym.":
                            color_options[value] = '#33a02c';
                            break;
                        case "Mediakasvatus: pelit, tiedonhankinnan ohjaus, lähdekriittisyys, monimedialukutaito jne.":
                            color_options[value] = '#cab2d6';
                            break;
                        case "Kirjasto oppimisympäristönä ja yhteisöllisenä toimijana":
                            color_options[value] = '#a6cee3';
                            break;
                        case "Palvelujen kehittäminen":
                            color_options[value] = '#1f78b4';
                            break;
                        case "Strateginen kehittäminen":
                            color_options[value] = '#6a3d9a';
                            break;
                        case "Kirjastotilat, tilasuunnittelu, opasteet":
                            color_options[value] = '#fb9a99';
                            break;
                        case "Verkkopalvelut ja tietojärjestelmät":
                            color_options[value] = '#e31a1c';
                            break;
                        default:
                            color_options[value] = '#DA635D';
                }


                }
            }
            return color_options;
        };

        BubbleChart.prototype.get_color_options_ColSel_Kieli = function (ColorSelectArray) {
            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "suomenkielinen":
                        color_options[value] = '#22adff';
                        break;
                    case "ruotsinkielinen":
                        color_options[value] = '#ccff00';
                        break;
                    default:
                        color_options[value] = '#d62728';
                }
            }
            return color_options;
        };
        BubbleChart.prototype.get_color_options_Kimppa = function (ColorSelectArray) {
            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "Yhteistyöhanke":
                        color_options[value] = '#1f78b4';
                        break;
                    case "Yhden toteuttajan hanke":
                        color_options[value] = '#a6cee3';
                        break;
                    default:
                        color_options[value] = '#d62728';
                }
            }
            return color_options;
        };

        BubbleChart.prototype.get_color_options_set10 = function (ColorSelectArray) {
            var baseArray, color_options, index, value, _i, _len;
            baseArray = [
                "#a6cee3",
                "#1f78b4",
                "#b2df8a",
                "#33a02c",
                "#fb9a99",
                "#e31a1c",
                "#fdbf6f",
                "#ff7f00",
                "#cab2d6",
            "#6a3d9a"];
            index = 0;
            color_options = {};
            var runNum = 0
            var runNums = 0
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                /*
                color_options[value] = baseArray[index];
                index = index + 1;
                if (index >= baseArray.length) {
                    index = 0;
                }*/
                console.log(accessColors)
                if(accessColors==true) {
                    //    console.log(series[key].name,key)
                    //     series[key].color = colorings[series[key].name];
                    if(ColorSelectArray.length < 11) {
                //        color_options[value] = colorings10[_i];
                        color_options[value] = "url(#pattern"+_i+")";
                    } else {
                        if(isEven(_i)) {
                            console.log(runNum)
                        //    color_options[value] = colorings10[runNum];
                            color_options[value] = "url(#pattern"+runNum+")";
                            runNum +=1
                        } else {
                            color_options[value] = cols9[runNums]
                            runNums +=1
                        }
                    }
                } else {
                    color_options[value] = baseArray[index];
                    index = index + 1;
                    if (index >= baseArray.length) {
                        index = 0;
                    }
                }
            }
            console.log(color_options)
            return color_options;
        };

        BubbleChart.prototype.get_color_options_set12 = function (ColorSelectArray) {
            var baseArray, color_options, index, value, _i, _len;
            baseArray = [
                "#ffff99", // keltainen
                "#1f78b4",
                "#b2df8a",
                "#33a02c",
                "#fb9a99",
                "#e31a1c",
                "#fdbf6f",
                "#ff7f00",
                "#cab2d6",
                "#6a3d9a",
                "#a6cee3", // vaaleansininen
            "#b15928",
            "#84a9ac"
            ];
            index = 0;
            color_options = {};
            var runNum = 0
            var runNums = 0
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                /*
                 color_options[value] = baseArray[index];
                 index = index + 1;
                 if (index >= baseArray.length) {
                 index = 0;
                 }*/
                console.log(accessColors)
                if(accessColors==true) {
                    //    console.log(series[key].name,key)
                    //     series[key].color = colorings[series[key].name];
                    if(ColorSelectArray.length < 11) {
                        //        color_options[value] = colorings10[_i];
                        color_options[value] = "url(#pattern"+_i+")";
                    } else {
                        if(isEven(_i)) {
                            console.log(runNum)
                            //    color_options[value] = colorings10[runNum];
                            color_options[value] = "url(#pattern"+runNum+")";
                            runNum +=1
                        } else {
                            color_options[value] = cols9[runNums]
                            runNums +=1
                        }
                    }
                } else {
                    color_options[value] = baseArray[index];
                    index = index + 1;
                    if (index >= baseArray.length) {
                        index = 0;
                    }
                }
            }
            console.log(color_options)
            return color_options;
        };

        BubbleChart.prototype.get_color_options_set18 = function (ColorSelectArray) {
            var baseArray, color_options, index, value, _i, _len;
            baseArray = ["#e4c36b",
                "#2b4ace",
                "#83a700",
                "#d96af1",
                "#00921a",
                "#ff88e2",
                "#00740f",
                "#dc0050",
                "#02c5df",
                "#d95106",
                "#7ea6ff",
                "#95d68b",
                "#77378d",
                "#ccc48b",
                "#a6053f",
                "#455920",
                "#ff918c",
                "#8d4d66"]
            index = 0;
            color_options = {};
            var runNum = 0
            var runNums = 0
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                /*
                 color_options[value] = baseArray[index];
                 index = index + 1;
                 if (index >= baseArray.length) {
                 index = 0;
                 }*/
                console.log(accessColors)
                if(accessColors==true) {
                    //    console.log(series[key].name,key)
                    //     series[key].color = colorings[series[key].name];
                    if(ColorSelectArray.length < 11) {
                        //        color_options[value] = colorings10[_i];
                        color_options[value] = "url(#pattern"+_i+")";
                    } else {
                        if(isEven(_i)) {
                            console.log(runNum)
                            //    color_options[value] = colorings10[runNum];
                            color_options[value] = "url(#pattern"+runNum+")";
                            runNum +=1
                        } else {
                            color_options[value] = cols9[runNums]
                            runNums +=1
                        }
                    }
                } else {
                    color_options[value] = baseArray[index];
                    index = index + 1;
                    if (index >= baseArray.length) {
                        index = 0;
                    }
                }
            }
            console.log(color_options)
            return color_options;
        };

        BubbleChart.prototype.get_color_options_ColSel_Hanketyyppi = function (ColorSelectArray) {
            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "Liikunta":
                        color_options[value] = '#1f78b4';
                        break;
                    case "Nuoriso":
                        color_options[value] = '#33a02c';
                        break;
                    case "Kirjasto":
                        color_options[value] = '#e31a1c';
                        break;
                    default:
                        color_options[value] = '#a6cee3';
                }
            }
            return color_options;
        };

        BubbleChart.prototype.get_color_options_ColSel_Vuosi = function (ColorSelectArray) {

            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "2010":
                        color_options[value] = '#4575b4';
                        break;
                    case "2011":
                        color_options[value] = '#74add1';
                        break;
                    case "2012":
                        color_options[value] = '#abd9e9';
                        break;
                    case "2013":
                        color_options[value] = '#e0f3f8';
                        break;
                    case "2014":
                        color_options[value] = '#fee090';
                        break;
                    case "2015":
                        color_options[value] = '#fdae61';
                        break;
                    case "2016":
                        color_options[value] = '#f46d43';
                        break;
                    case "2017":
                        color_options[value] = '#d73027';
                        break;
                    case "2018":
                        color_options[value] = '#abd9e9';
                        break;
                    case "2019":
                        color_options[value] = '#1f78b4';
                        break;
                    case "2020":
                        color_options[value] = '#33a02c';
                        break;
                    default:
                        color_options[value] = '#a50026';
                }
            }
            return color_options;
        };


        BubbleChart.prototype.get_color_options_ColSel_Vaikutusalue = function (ColorSelectArray) {
            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "ylikunnallinen":
                        color_options[value] = '#ffffbf';
                        break;
                    case "kunnallinen":
                        color_options[value] = '#fdae61';
                        break;
                    case "ylimaakunnallinen":
                        color_options[value] = '#2c7bb6';
                        break;
                    case "kunnan- tai kaupunginosat":
                        color_options[value] = '#d7191c';
                        break;
                    case "seutukunnat":
                        color_options[value] = '#fee090';
                        break;
                    case "valtakunnallinen":
                        color_options[value] = '#91bfdb';
                        break;
                    case "maakunnallinen":
                        color_options[value] = '#abd9e9';
                        break;
                    default:
                        color_options[value] = '#DA635D';
                }
            }
            return color_options;
        };

         BubbleChart.prototype.get_color_options_ColSel_Aluehallintovirasto = function (ColorSelectArray) {
            var color_options, value, _i, _len;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                switch (value) {
                    case "Etelä-Suomi":
                        color_options[value] = '#a6cee3'; // tummanvioletti
                        break;
                    case "Itä-Suomi":
                        color_options[value] = '#1f78b4'; // tummanvihreä
                        break;
                    case "Lappi":
                        color_options[value] = '#b2df8a'; // tumma oranssi
                        break;
                    case "Lounais-Suomi":
                        color_options[value] = '#33a02c'; // vaaleanvihreä
                        break;
                    case "Länsi- ja Sisä-Suomi":
                        color_options[value] = '#fb9a99'; // vaalean sininen
                        break;
                    case "Pohjois-Suomi":
                        color_options[value] = '#e31a1c'; // tummansininen
                        break;
                    default:
                        color_options[value] = '#DA635D';
                }
            }

            return color_options;
         };

        BubbleChart.prototype.get_color_options_ColSel_set = function (ColorSelectArray) {
            var baseArray, color_options, index, value, _i, _len;
            baseArray = [
                "#9817ff",
                "#24b7f1",
                "#fa82ce",
                "#736c31",
                "#a75312",
                "#f2917f",
                "#7b637c",
                "#a8b311",
                "#18c61a",
                "#FFD700",
                "#d00d5e",
                "#18c199", //Pkar
                "#1263e2", //
                "#1e7b1d",
                "#05767b",
                "#aaa1f9",
                "#d31911",
                "#a5aea1",
                "#ed990a"];
            index = 0;
            color_options = {};
            for (_i = 0, _len = ColorSelectArray.length; _i < _len; _i++) {
                value = ColorSelectArray[_i];
                color_options[value] = baseArray[index];
                index = index + 1;
                if (index >= baseArray.length) {
                    index = 0;
                }
            }
            return color_options;
        };

        BubbleChart.prototype.get_color_type = function (keyName) {
            if (/^ColSel_Kieli/.test(keyName)) {
                return "ColSel_Kieli";
            }
            if (/^Kimppa/.test(keyName)) {
                return "Kimppa";
            }
            if (/^ColSel_Teema/.test(keyName)) {
                return "ColSel_Teema";
            }
            if (/^ColSel_Vuosi/.test(keyName)) {
                return "ColSel_Vuosi";
            }
            if (/^ColSel_Vaikutusalue/.test(keyName)) {
                return "ColSel_Vaikutusalue";
            }
            if (/^ColSel_Hanketyyppi/.test(keyName)) {
                return "ColSel_Hanketyyppi";
            }
            if (/^ColSel_Maakunta/.test(keyName)) {
                return "ColSel_Maakunta";
            }
            if (/^ColSel_Aluehallintovirasto/.test(keyName)) {
                return "ColSel_Aluehallintovirasto";
            }
            return "Other";
        };

        BubbleChart.prototype.get_color_options = function (keyName, ColorSelectArray) {
            var key_type;
            key_type = this.get_color_type(keyName);
        //    alert(key_type)
       //     alert(keyName)
            switch (key_type) {
                case "ColSel_Kieli":
                    return this.get_color_options_ColSel_Kieli(ColorSelectArray);
                case "Kimppa":
                    return this.get_color_options_Kimppa(ColorSelectArray);
                case "ColSel_Teema":
                    return this.get_color_options_ColSel_Teema(ColorSelectArray);
            //        return this.get_color_options_set12(ColorSelectArray);
                case "ColSel_Vuosi":
                    return this.get_color_options_ColSel_Vuosi(ColorSelectArray);
                case "ColSel_Vaikutusalue":
                    return this.get_color_options_ColSel_Vaikutusalue(ColorSelectArray);
                case "ColSel_Hanketyyppi":
                    return this.get_color_options_ColSel_Hanketyyppi(ColorSelectArray);
                case "ColSel_Maakunta":
                    return this.get_color_options_set18(ColorSelectArray);
                case "ColSel_Aluehallintovirasto":
                //    return this.get_color_options_ColSel_Aluehallintovirasto(ColorSelectArray);
                    return this.get_color_options_set10(ColorSelectArray);
                default:
                    return this.get_color_options_set10(ColorSelectArray);
            }
        };

        BubbleChart.prototype.color_by = function (what_to_color_by) {
            var ColorSelectArray, color_grid;
            this.what_to_color_by = what_to_color_by;
            ColorSelectArray = this.get_color_values(what_to_color_by);
            color_grid = this.get_color_options(what_to_color_by, ColorSelectArray);

            show_color_table(what_to_color_by, color_grid);
            //  return this.circles.transition().duration(1000).style("fill", (function(_this) {
            this.circles.each(function (d) {
                var element;
                element = d3.select(this);
                element.style("fill", (function (_this) {
                    return function (d) {
                        return color_grid[d.original[what_to_color_by]];
                    };
                })(this));

            });

        };

        BubbleChart.prototype.get_color_values = function (what) {
            var ColorSelect, ColorSelectArray, key, value;
            ColorSelect = {};
            this.nodes.forEach((function (_this) {
                return function (d) {
                    var value;
                    value = d.original[what];
                    return ColorSelect[value] = true;
                };
            })(this));
            ColorSelectArray = [];
            for (key in ColorSelect) {
                value = ColorSelect[key];
                ColorSelectArray.push(key);
            }
            return ColorSelectArray.sort();
        };


        var nodes = this.nodes
        var oldSelection;
        BubbleChart.prototype.checkKey = function (e) {

            if(this.keyAt == -1)
                this.keyAt = nodes.length

            var evt = new MouseEvent("mouseover");
            var evto = new MouseEvent("mouseout");
            var evtr = new MouseEvent("mousemove");
            var click = new MouseEvent("click");
            var gg = "kokeilu"
            var event = new CustomEvent('mouseover', { detail: gg });

            e = e || window.event;
            if (e.keyCode == '9') {
                // tab
                var $focused = $(':focus');
                this.keyAt= 0
             //   var hasFocus = $('foo').is(':focus');
                nodes = $focused[0].__data__.hankes
                focusedElementBeforeModal = document.activeElement;
            } else if (e.keyCode == '38') {
                // up arrow
                var testi= d3.select(nodes[this.keyAt])
                this.keyAt -=1
                //    var ids = testi._groups[0][0].id
                var ids;
                if(testi[0][0])
                    ids = "bubble_"+testi[0][0].id
                else
                    ids = "bubble_"+nodes[this.keyAt]
                console.log(ids)
                if(oldSelection)
                    document.getElementById(oldSelection).dispatchEvent(evto);
                document.getElementById(ids).dispatchEvent(evt);
                document.getElementById(ids).dispatchEvent(evtr);

                oldSelection = ids
            } else if (e.keyCode == '40' ) {
                // down arrow
                var $focused2 = $(':focus');

                if($focused2[0] && $focused2[0].__data__)
                    nodes = $focused2[0].__data__.hankes
                // right arrow
                var test= d3.select(nodes[this.keyAt])
                console.log(test)
                this.keyAt +=1
                //      var id = test._groups[0][0].id
                var id;
                if(test[0][0])
                    id = "bubble_"+test[0][0].id
                else
                    id = "bubble_"+nodes[this.keyAt]
                console.log(id)
                if(oldSelection)
                    document.getElementById(oldSelection).dispatchEvent(evto);
                document.getElementById(id).dispatchEvent(event);
                document.getElementById(id).dispatchEvent(evtr);

                oldSelection = id
            } else if (e.keyCode == '37' || e.keyCode == '188') {
                // left arrow
                var testi= d3.select(nodes[this.keyAt])
                this.keyAt -=1
                console.log(testi)
            //    var ids = testi._groups[0][0].id
                var ids;
                if(testi[0][0])
                    ids = "bubble_"+testi[0][0].id
                else
                    ids = "bubble_"+nodes[this.keyAt]
                console.log(ids)
                if(oldSelection)
                    document.getElementById(oldSelection).dispatchEvent(evto);
                document.getElementById(ids).dispatchEvent(evt);
                document.getElementById(ids).dispatchEvent(evtr);

                oldSelection = ids
            }
            else if (e.keyCode == '39'|| e.keyCode == '190') {
                var $focused2 = $(':focus');

                if($focused2[0] && $focused2[0].__data__)
                nodes = $focused2[0].__data__.hankes
                // right arrow
                var test= d3.select(nodes[this.keyAt])
                console.log(test)
                this.keyAt +=1
          //      var id = test._groups[0][0].id
                var id;
                    if(test[0][0])
                id = "bubble_"+test[0][0].id
                else
                        id = "bubble_"+nodes[this.keyAt]
                console.log(id)
                if(oldSelection)
                    document.getElementById(oldSelection).dispatchEvent(evto);
                document.getElementById(id).dispatchEvent(event);
                document.getElementById(id).dispatchEvent(evtr);

                oldSelection = id

            } else if (e.keyCode == '13') {
                if(oldSelection)
                    document.getElementById(oldSelection).dispatchEvent(click);
            }
        }



        return BubbleChart;

    })();

    root = typeof exports !== "undefined" && exports !== null ? exports : this;


    $(function () {
        //	var chart, render_vis;
        var render_vis;
        chart = null;



        render_vis = function (error, records) {
            render_colors(records);
            chart = new BubbleChart(records);
            if (HankeVisOnReadyCallBack) {
                HankeVisOnReadyCallBack();
            }
            return chart.display_group_all();
        };

        root.get_chart = (function (_this) {
            return function () {
                return chart;
            };
        })(this);

        root.color_by = (function (_this) {
            return function (colorwith) {
                return chart.color_by(colorwith);
            };
        })(this);

        var Hanavico = $('#HankeVis_navi_container').find('.HankeVis_navi'),
            func,
            oldFunc,
            textFunc;

        Hanavico.on('click', function (e) {
            console.log(e)
            e.preventDefault();
            func = $(this).data('name');

            $('.HankeVis_navi').removeClass('selected');
            $(this).addClass('selected');

            //    textFunc = $('#select-size').val();
            textFunc = "amount";
            if (func === oldFunc) {
                doRouting({
                    VIEW: "total"
                });
                $(this).removeClass('selected');
                $('#vis').find('tspan').remove();
                oldFunc = null;
                funkkis = 'empty';
                return window.get_chart().arrange_circles('empty');
            } else {
                doRouting({
                    VIEW: func
                });
                funkkis = func;
                oldFunc = func;
                uprowValue = func;
                return window.get_chart().arrange_circles(func, textFunc);
            }
        });

        $("#select-vis").on("change", function (e) {

            func =e.currentTarget.value
            textFunc = "amount";
            if (func === oldFunc) {
                doRouting({
                    VIEW: "total"
                });
                $(this).removeClass('selected');
                $('#vis').find('tspan').remove();
                oldFunc = null;
                funkkis = 'empty';
                return window.get_chart().arrange_circles('empty');
            } else {
                doRouting({
                    VIEW: func
                });
                funkkis = func;
                oldFunc = func;
                uprowValue = func;
                return window.get_chart().arrange_circles(func, textFunc);
            }

        })

        $("#search").keyup(function () {
            var searchTerm;
            searchTerm = $(this).val();
            return chart.updateSearch(searchTerm);
        });

        var doFilter = function () {
            var multivalinta = $('#example-optgroupX');

            var wwidth = $(window).width();
            var mvwidth = wwidth * 0.14;
            $('.ui-multiselect .ui-widget .ui-state-default .ui-corner-all').css('width', mvwidth);

            var title;
            if (wwidth > 1365) {
                title = _("Rajaa hankkeiden määrää");
            } else {
                title = _("Rajaa");
            }

            multivalinta
                .multiselect({
                    header: ['uncheckAll'],
                    placeholder: "Syötä hakusana",
                    groupsCollapsable: true,
                    groupsSelectable: false,
                    //       selectedText: title,
                    checkAllText: _("Valitse kaikki"),
                    uncheckAllText: _("Poista kaikki")
          //          selectedText: title
            /*        position: {
                        my: 'left top',
                        at: 'left bottom'
                    }*/
                })
                .bind("multiselectclick multiselectcheckall multiselectuncheckall multiselectoptgrouptoggle multiselectfilterfilter", function (event, ui) {
                    //      var textFunc = $('#select-size').val();
                    var textFunc = "amount";
                    var func = funkkis;

             //       console.log("multivalinta triggered: %s %s", textFunc, func);

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
                        i = 0;/*
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
*/

                    $.each($("#example-optgroupX").multiselect("getChecked"), function (key, value) {
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
                        } else if (value.value.indexOf("Erityisavustus") > -1) {
                            if (prev !== "Erityisavustus") {
                                prev = "Erityisavustus";
                                i = 0;
                            }
                            if (value.checked) {
                                var filt = value.value.split("//");
                                filtered_unchecked.ERITYIS.push(filt[1]);
                            }
                        } else if (value.value.indexOf("Avi") > -1) {
                            if (prev !== "Avi") {
                                prev = "Avi";
                                i = 0;
                            }
                            if (value.checked) {
                                var filt = value.value.split("//");
                                filtered_unchecked.AVI.push(filt[1]);
                            }
                        } else if (value.value.indexOf("Rahoittaja") > -1) {
                            if (prev !== "Rahoittaja") {
                                prev = "Rahoittaja";
                                i = 0;
                            }
                            if (value.checked) {
                                var filt = value.value.split("//");
                                filtered_unchecked.RAHOITTAJA.push(filt[1]);
                            }
                        }
                        i++;
                    });

console.log(filtered_unchecked)
  /*                  doRouting({
                        FILTER: filtered_unchecked
                    });*/

                    var filtered_values1 = $.map($(this).multiselect("getChecked"), function (ui) {
                        return ui.value;
                    });
                    if (filtered_values1.length <= 0) {
                        filtered_values1.push("empty");
                    }
                    chart.updateFilter(filtered_values1, func, textFunc);
                    if (!func) {
                        return window.get_chart().display_group_all(textFunc);
                    }
                });
           // alert("doFilter")
        };
     //   doFilter();

        $filterInput.on("change", function () {
            var filtered_values1 = $.map($(this).multiselect("getChecked"), function (ui) {
                return ui.value;
            });
            var textFunc = "amount";
            var func = funkkis;
            filtering()

            if (window.PAGE.TYPE === "circles")
                chart.updateFilter(filtered_values1, func, textFunc);
        })
/*
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
*/
        render_vis(null, HankeVisData);

        $('.HankeVis_navi[data-name="' + window.PAGE.VIEW + '"]').click();

        var textFunc = "amount";
        var func = funkkis;
        var filtered_values1 = $.map($("#example-optgroup").multiselect("getChecked"), function (ui) {
            return ui.value;
        });
        if (filtered_values1.length <= 0) {
            filtered_values1.push("empty");
        }
        chart.updateFilter(filtered_values1, func, textFunc);
        if (!func) {
            window.get_chart().display_group_all(textFunc);
        }

    });
};
