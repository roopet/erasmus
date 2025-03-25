(function () {
    var t, e, n, r, i, a = function (t, e) {
            return function () {
                return t.apply(e, arguments)
            }
        },
        o = [].indexOf || function (t) {
                for (var e = 0, n = this.length; n > e; e++)
                    if (e in this && this[e] === t) return e;
                return -1
            };
    t = function () {
        function t(t) {
            this.size_legend_init = a(this.size_legend_init, this), this.update_modal_center = a(this.update_modal_center, this), this.update_modal = a(this.update_modal, this), this.render_modal = a(this.render_modal, this), this.hide_details = a(this.hide_details, this), this.show_details = a(this.show_details, this), this.move_towards_year = a(this.move_towards_year, this), this.estimate_circle_diameter = a(this.estimate_circle_diameter, this), this.get_candidate_short_name = a(this.get_candidate_short_name, this), this.get_supercategory = a(this.get_supercategory, this), this.move_to_location_map = a(this.move_to_location_map, this), this.move_towards_candidates = a(this.move_towards_candidates, this), this.format_money_millions = a(this.format_money_millions, this), this.do_split = a(this.do_split, this), this.show_viz_type = a(this.show_viz_type, this), this.move_towards_center = a(this.move_towards_center, this), this.display_group_all = a(this.display_group_all, this), this.do_create_circles = a(this.do_create_circles, this), this.create_circles = a(this.create_circles, this), this.create_vis = a(this.create_vis, this), this.update_data = a(this.update_data, this), this.kill_forces = a(this.kill_forces, this), this.create_nodes = a(this.create_nodes, this);
            var e;
            this.data = t, this.width = 1350, this.height = 3500, window.width = this.width, window.height = this.height, this.tooltip = CustomTooltip("expenditure_tooltip", 300), this.damper = .1, this.vis = null, this.nodes = [], this.forces = [], this.circles = null, e = 2593700.2, this.radius_scale = d3.scale.pow().exponent(.5).domain([0, e]).range([2, 85]), this.create_nodes(this.data), this.create_vis(), this.initialize_candidate_autocomplete()
        }

        return t.prototype.create_nodes = function (t) {
            return this.nodes = [], t.forEach(function (t) {
                return function (e) {
                    var n, r;
                    return n = {
                        id: e.id,
                        radius: t.radius_scale(parseInt(e.amount)),
                        value: parseFloat(e.amount),
                        name: e.candidate_name,
                        org: "org",
                        group: "group",
                        party: e.party,
                        reg_no: e.reg_no,
                        category: e.expenditure_category,
                        super_category: t.get_supercategory(e.expenditure_category),
                        office: e.office,
                        district: e.district,
                        election_period: e.election_period,
                        election_year: e.election_period.split("-")[1],
                        x: 1 * Math.random(),
                        y: 800 * Math.random()
                    }, r = t.radius_scale(parseInt(e.amount)), 0 > r && console.log("Radius less than 0 for node! " + JSON.stringify(n)), t.nodes.push(n)
                }
            }(this)), this.nodes.sort(function (t, e) {
                return e.value - t.value
            }), window.nodes = this.nodes
        }, t.prototype.kill_forces = function () {
            return this.forces.forEach(function () {
                return function (t) {
                    return t.stop(), t.nodes([])
                }
            }(this))
        }, t.prototype.update_data = function (t) {
            var e;
            return this.kill_forces(), this.create_nodes(t), this.create_circles(), e = $(".viz_nav.btn.selected").data("name"), null == e && (e = "year"), this.show_viz_type(e)
        }, t.prototype.create_vis = function () {
            return this.vis = d3.select("#vis").append("svg").attr("width", this.width).attr("height", this.height).attr("id", "svg_vis"), window.viz = this.vis, this.create_circles()
        }, t.prototype.create_circles = function () {
            return this.circles = this.vis.selectAll("circle").data(this.nodes, function (t) {
                return t.id
            }), this.do_create_circles(this.circles)
        }, t.prototype.do_create_circles = function (t) {
            var e;
            return e = this, t.enter().append("circle").attr("class", function (t) {
                return function (e) {
                    return "" + t.get_supercategory(e.category) + " " + e.reg_no
                }
            }(this)).attr("stroke-width", 2).attr("id", function (t) {
                return "bubble_" + t.id
            }).on("mouseover", function (t, n) {
                return e.show_details(t, n, this), e.circles.filter(function () {
                    return function (e) {
                        return e.reg_no !== t.reg_no
                    }
                }(this)).transition().duration(1e3).style("opacity", .3)
            }).on("mouseout", function (t, n) {
                return e.hide_details(t, n, this), e.circles.transition().duration(1e3).style("opacity", 1)
            }).on("click", function (t, n) {
                var r, i;
                return i = $("#candidate_modal"), r = this, i.is(":visible") ? e.update_modal_center(t, n, r) : ($(document).off("opened", "[data-reveal]"), $(document).on("opened", "[data-reveal]", function () {
                    var a;
                    return console.log("modal callback"), a = $(this), a.attr("id") === i.attr("id") ? e.render_modal(t, n, r) : void 0
                }), $(r).data("center", !0), i.foundation("reveal", "open"))
            }).attr("r", function (t) {
                return t.radius
            }), t.exit().remove()
        }, t.prototype.charge = function (t) {
            return -(Math.pow(t.radius, 2) / 7) + -(.1 * t.radius) + -.3
        }, t.prototype.display_group_all = function () {
            var t, e, n, r, i, a;
            return this.kill_forces(), e = d3.layout.force().nodes(this.nodes).size([this.width, this.height]), this.forces = [e], r = this.estimate_circle_diameter(this.nodes) / 2, this.center = {
                x: this.width / 2,
                y: r + 80
            }, e.gravity(0).theta(1.1).charge(this.charge).chargeDistance(1 / 0).friction(.9).on("tick", function (t) {
                return function (e) {
                    return t.circles.each(t.move_towards_center(e.alpha)).attr("cx", function (t) {
                        return t.x
                    }).attr("cy", function (t) {
                        return t.y
                    })
                }
            }(this)), e.start(), a = d3.sum(this.nodes, function (t) {
                return t.value
            }), n = this.format_money_millions(a), t = [{
                text: "Total Campaign Spending",
                "class": "header",
                dx: r + 30,
                dy: 80
            }, {
                text: n,
                "class": "amount",
                dx: r + 30,
                dy: 100
            }], i = this.vis.selectAll("text.titles").remove(), i = this.vis.selectAll("text.titles").data(t, function (t) {
                return t.text
            }), i.enter().append("text").text(function (t) {
                return t.text
            }).attr("class", function () {
                return function (t) {
                    return "titles year " + t["class"]
                }
            }(this)).attr("x", function (t) {
                return function (e) {
                    return t.center.x + e.dx
                }
            }(this)).attr("y", function (t) {
                return function (e) {
                    return t.center.y + e.dy
                }
            }(this)), i.exit().remove(), this.show_legend(r)
        }, t.prototype.move_towards_center = function (t) {
            return function (e) {
                return function (n) {
                    return n.x = n.x + (e.center.x - n.x) * (e.damper + .02) * t, n.y = n.y + (e.center.y - n.y) * (e.damper + .02) * t
                }
            }(this)
        }, t.prototype.show_viz_type = function (t) {
            var e, n;
            return this.candidate_search_input().slideUp(), this.show_all_candidates(), this.hide_legend(), "candidate" === t && this.show_by_candidate(), "party" === t && this.do_split(function (t) {
                return t.party
            }), "expenditure" === t && (n = {
                communication: "Communication & Outreach",
                overhead: "Overhead",
                staff: "Staff & Professional Services",
                contributions: "Contributions",
                fees: "Taxes & Fees",
                other: "Other"
            }, e = function (t) {
                return t.super_category
            }, this.do_split(e, {
                charge: function (t) {
                    return function (e) {
                        return 1.3 * t.charge(e)
                    }
                }(this),
                title_accessor: function (t) {
                    return n[t]
                }
            })), "island" === t && this.do_split(function (t) {
                return candidate_utils.get_island(t)
            }), "office" === t && this.do_split(function (t) {
                return t.office
            }), "year" === t ? this.display_group_all() : void 0
        }, t.prototype.candidate_search_input = function () {
            return this._candidate_search_input || $(".candidate_search_container input.autocomplete")
        }, t.prototype.show_all_candidates = function () {
            return this.circles.transition().duration(1e3).style("opacity", 1), this.candidate_search_input().val("")
        }, t.prototype.show_by_candidate = function (t) {
            var e;
            return null == t && (t = {}), e = function (t) {
                return t.name
            }, this.candidate_search_input().slideDown(), this.do_split(e, t)
        }, t.prototype.do_split = function (t, e) {
            var n, r, i, a, o, s, c, u;
            return null == e && (e = {}), o = this.move_to_location_map(this.nodes, t, e), null != e.modify_location_map && (o = e.modify_location_map(o)), n = null != e.charge ? e.charge : this.charge, this.kill_forces(), this.forces = [], r = o.keys().map(function (e) {
                return function (n) {
                    var r, i;
                    return i = e.nodes.filter(function (e) {
                        return n === t(e)
                    }), r = d3.layout.force().nodes(i).size([e.width, e.height]), e.forces.push(r), {
                        force: r,
                        key: n,
                        nodes: i
                    }
                }
            }(this)), r.forEach(function (e) {
                return function (r) {
                    var i;
                    return i = e.vis.selectAll("circle").filter(function (e) {
                        return r.key === t(e)
                    }), r.force.gravity(0).theta(1).charge(n).chargeDistance(1 / 0).friction(.87).on("tick", function (n) {
                        return i.each(e.move_towards_candidates(n.alpha, o, t)).attr("cx", function (t) {
                            return t.x
                        }).attr("cy", function (t) {
                            return t.y
                        })
                    }), r.force.start()
                }
            }(this)), u = this.vis.selectAll("text.titles").remove(), c = null != e.title_accessor ? function (t) {
                return e.title_accessor(t.key)
            } : function (t) {
                return t.key
            }, u = this.vis.selectAll("text.titles").data(o.values(), function (t) {
                return t.key
            }), s = 55, i = 20, a = function (t, e) {
                return t.y + t.radius + s + i * e
            }, u.enter().append("text").attr("class", "titles header").text(c).attr("text-anchor", "middle").attr("x", function (t) {
                return t.x
            }).attr("y", function (t) {
                return a(t, 0)
            }), u.enter().append("text").attr("class", "titles amount").text(function (t) {
                return function (e) {
                    return t.format_money_millions(parseFloat(e.sum))
                }
            }(this)).attr("text-anchor", "middle").attr("x", function (t) {
                return t.x
            }).attr("y", function (t) {
                return a(t, 1)
            }), u.exit().remove()
        }, t.prototype.format_money_millions = function (t) {
            var e;
            return e = t / 1e6, .01 >= e ? "< $0.01 million" : d3.format("$,.2f")(e) + " million"
        }, t.prototype.move_towards_candidates = function (t, e, n) {
            return function (r) {
                return function (i) {
                    var a;
                    return a = e.get(n(i)), i.x = i.x + (a.x - i.x) * (r.damper + .02) * t * 1.1, i.y = i.y + (a.y - i.y) * (r.damper + .02) * t * 1.1
                }
            }(this)
        }, t.prototype.move_to_location_map = function (t, e, n) {
            var r, i, a, o, s, c, u, d, l, h, _, f, p, g, y;
            return null == n && (n = {}), h = 300, o = Math.floor(this.width / h) - 1, l = 450, a = function () {
                return function (t) {
                    return (t % o + 1) * h
                }
            }(this), i = function () {
                return function (t) {
                    var e;
                    return e = Math.floor(t / o) + 1, e * l - 100
                }
            }(this), s = d3.nest().key(e).rollup(function (t) {
                return function (e) {
                    return {
                        sum: d3.sum(e, function (t) {
                            return parseFloat(t.value)
                        }),
                        candidates: d3.set(e.map(t.get_candidate_short_name)).values(),
                        radius: t.estimate_circle_diameter(e) / 2
                    }
                }
            }(this)).map(t, d3.map), d = 5, f = 30, c = 90, r = p = 0, _ = 1, u = 6, g = -60, y = null != n.sort ? n.sort : function (t, e) {
                return d3.descending(parseFloat(s.get(t).sum), parseFloat(s.get(e).sum))
            }, s.keys().sort(y).forEach(function (t) {
                return function (e, n) {
                    var i, a, o, d, l, h;
                    if (i = s.get(e), i.key = e, r >= _ && (r = 0), 0 === r) {
                        for (d = _; t.width / _ > 2 * i.radius + 3 * f;) _ += 1;
                        _ -= 1, o = s.keys().length - n, _ > o && (o > s.keys().length - 1 || (_ = d)), _ = Math.min(u, _)
                    }
                    return a = t.width / _, l = a * r + a / 2, 0 === r && (h = g + p + i.radius + 2 * f + c, g = h, p = i.radius), h = g, i.x = l, i.y = h, i.radius = p, s.set(e, i), r += 1
                }
            }(this)), s
        }, t.prototype.get_supercategory = function (t) {
            return "Durable Assets" === t || "Food & Beverages" === t || "Insurance" === t || "Lease/Rent" === t || "Office Supplies" === t || "Travel & Lodging" === t || "Utilities" === t || "Vehicle" === t ? "overhead" : "Contribution to Community Organization" === t || "Contribution to Political Party" === t || "Hawaii Election Campaign Fund" === t ? "contributions" : "Advertising" === t || "Candidate Fundraiser Tickets" === t || "Postage/Mailing" === t || "Printing" === t || "Surveys, Polls & Voter Lists" === t ? "communication" : "Employee Services" === t || "Professional Services" === t ? "staff" : "Bank Charges & Adjustments" === t || "Filing Fee" === t || "Taxes" === t ? "fees" : "Other" === t ? "other" : void 0
        }, t.prototype.get_candidate_short_name = function (t) {
            return t.name.split(",")[0] + (" (" + t.party[0] + ")")
        }, t.prototype.estimate_circle_diameter = function (t) {
            var e, n, r;
            return e = d3.sum(t, function (t) {
                return Math.PI * Math.pow(t.radius, 2)
            }), n = 2 * Math.sqrt(e / Math.PI), r = (Math.log(t.length) / 140 + 1) * n
        }, t.prototype.move_towards_year = function (t) {
            return function (e) {
                return function (n) {
                    var r;
                    return r = e.year_centers[n.election_period], n.x = n.x + (r.x - n.x) * (e.damper + .02) * t * 1.1, n.y = n.y + (r.y - n.y) * (e.damper + .02) * t * 1.1
                }
            }(this)
        }, t.prototype.show_details = function (t, e, n) {
            var r;
            return d3.select(n).attr("stroke", "black"), r = '<div class="inner_tooltip">', r += '<span class="candidate">' + t.name + "</span><br/>", r += '<span class="office">' + t.election_year + ", " + t.office + "</span><br/>", r += '<span class="amount"> ' + t.category + " $" + addCommas(t.value) + "</span><br/>", r += "</div>", this.tooltip.showTooltip(r, d3.event)
        }, t.prototype.hide_details = function (t, e, n) {
            return d3.select(n).attr("stroke", ""), this.tooltip.hideTooltip()
        }, t.prototype.render_modal = function (t) {
            var e, n, r, i, a, o, s, c, u, d, l, h, _, f, p, g, y, m;
            return this.kill_forces(), $("#candidate_vis").find("svg").remove(), $("#candidate_modal").find("#expenditure-record-table-container").empty(), g = t.reg_no, ga("send", "event", "modal", "show", t.name, 1), p = window.records.filter(function (t) {
                return t.reg_no === g
            }), _ = window.viz.selectAll("circle").filter(function () {
                return function (t) {
                    return t.reg_no === g
                }
            }(this)).sort(function (t, e) {
                return d3.descending(t.radius, e.radius)
            }).data(), n = _.filter(function (e) {
                return t.category === e.category
            })[0], f = _.filter(function (e) {
                return t.category !== e.category
            }), a = d3.max(f, function (t) {
                return t.radius
            }), console.log("largest radius is " + a + ", similar to 61?"), s = a > 40 ? 90 : 55, c = f.map(function (t) {
                return {
                    source: n,
                    target: t
                }
            }), o = Math.max(40, n.radius) + s, d = 5, u = 2 * o + 2 * a + 2 * d, l = $("#candidate_vis").width(), m = d3.select("#candidate_vis").append("svg").attr("width", "100%").attr("height", u), r = m.selectAll("circle").data(_, function (t) {
                return t.id
            }), this.do_create_circles(r), r.filter(function (e) {
                return e.category !== t.category
            }).transition().duration(1e3).style("opacity", .5), r.attr("cx", function (t) {
                return t.x
            }).attr("cy", function (t) {
                return t.y
            }), e = {
                x: l / 2,
                y: u / 2
            }, console.log("Center loc is " + JSON.stringify(e)), h = function (t) {
                return function (r) {
                    return function (i) {
                        return i.id === n.id ? (i.x = i.x + (e.x - i.x) * (t.damper + .02) * r, i.y = i.y + (e.y - i.y) * (t.damper + .02) * r) : void 0
                    }
                }
            }(this), y = function () {
                return function (t) {
                    return r.each(h(t.alpha)).attr("cx", function (t) {
                        return t.x
                    }).attr("cy", function (t) {
                        return t.y
                    })
                }
            }(this), console.log("force layout with width " + l + " height: " + u), i = d3.layout.force().size([l, u]).nodes(_).links(c).friction(.7).theta(.5).gravity(.4).charge(function (t) {
                return function (e) {
                    var n;
                    return n = -300 + -200 * Math.log(e.radius), 50 * t.charge(e), n
                }
            }(this)).linkDistance(o).on("tick", y).start(), window.force = i, this.update_modal(g, t.category)
        }, t.prototype.update_modal = function (t, e) {
            var n, r, a, o, s, c, u, d, l, h;
            return console.log("updating modal"), d = "https://data.hawaii.gov/resource/3maa-4fgr.json", c = encodeURIComponent(e), h = candidate_utils.get_vis_year(), s = "" + (h - 2) + "-" + h, l = "$limit=20&$where=reg_no='" + t + ("'and expenditure_category='" + c + "' and election_period = '") + s + "'&$order=amount desc", u = $("#candidate_modal"), u.find(".expenditure-error").hide(), u.find(".expenditure-loading").show(), $.get("" + d + "?" + l, function (t) {
                var e;
                return e = [{
                    name: "date",
                    display_name: "Date",
                    func: function (t) {
                        return t.substring(0, 10)
                    }
                }, {
                    name: "expenditure_category",
                    display_name: "Expenditure Category"
                }, {
                    name: "vendor_name",
                    display_name: "Vendor Name"
                }, {
                    name: "purpose_of_expenditure",
                    display_name: "Purpose of Expenditure"
                }, {
                    name: "amount",
                    display_name: "Amount",
                    func: function (t) {
                        return money(t)
                    }
                }], tabulate("#candidate_modal #expenditure-record-table-container", "expenditure-record-table", t, e)
            }).always(function () {
                return u.find(".expenditure-loading").hide()
            }).error(function () {
                return u.find(".expenditure-error").show()
            }), n = window.organizational_records.filter(function (e) {
                return e.reg_no === t
            })[0], r = n.candidate_name, a = n.office, u.find(".candidate_name").text(r), o = candidate_utils.get_vis_year(), u.find(".current_year").text(o), u.find(".candidate_office").text(a), u.find(".expenditure_category_title").text(e), i(u.find("a.powerballot").hide(), t)
        }, t.prototype.update_modal_center = function (t, e, n) {
            return this.render_modal(t, e, n)
        }, t.prototype.size_legend_init = function () {
            var t, e, n, r, i, a, o, s, c, u, d, l, h;
            return e = 200, o = [{
                label: "$ 100,000",
                r: 1e5
            }, {
                label: "$ 500,000",
                r: 5e5
            }, {
                label: "$ 1 million",
                r: 1e6
            }], $.each(o, function (t) {
                return function (e, n) {
                    return n.r = t.radius_scale(n.r)
                }
            }(this)), i = 40, a = d3.max(o, function (t) {
                return t.r
            }), u = d3.extent(o, function (t) {
                return t.r
            }), h = d3.scale.ordinal().domain(o.map(function (t) {
                return t.r
            })).range([-u[0], -(u[1] + i + u[0]) / 2, -(u[1] + i)]), h.range(h.range().map(function (t) {
                return Math.round(t)
            })), l = $("#size-legend-container").width(), d = d3.select("#size-legend-container").append("svg").attr("width", l).attr("height", e).append("g").attr("transform", function () {
                return "translate(" + (l / 2 - l / 6) + "," + (e / 2 + a) + ")"
            }), t = d.selectAll("circle").data(o), t.enter().append("circle").attr("r", function () {
                return function (t) {
                    return t.r
                }
            }(this)).attr("cx", 0).attr("cy", function (t) {
                return -t.r
            }), n = 40, r = 10, c = function (t) {
                return -t.r - t.r * Math.sin(t.y_ang)
            }, s = function (t) {
                var e;
                return e = Math.sqrt(Math.pow(t.r, 2) - Math.pow(h(t.r) + t.r, 2))
            }, t.enter().append("polyline").attr("points", function (t) {
                return "" + s(t) + ", " + h(t.r) + ", " + (a + n) + ", " + h(t.r)
            }), t.enter().append("text").attr("class", "size_label").attr("x", a + n + r).attr("y", function (t) {
                return h(t.r)
            }).text(function (t) {
                return t.label
            })
        }, t.prototype.show_legend = function (t) {
            return d3.select("#vis-full-key").transition().duration(1500).style("opacity", 1).style("top", 2 * t + 80 + 85 + "px")
        }, t.prototype.hide_legend = function () {
            return d3.select("#vis-full-key").transition().duration(1500).style("opacity", 0).style("top", "2000px")
        }, t.prototype.handle_anchor_link = function () {
            var t, e;
            return window.location.hash.length > 0 ? (e = window.location.hash.substr(1), $('#viz_nav_container .viz_nav[data-name="candidate"]').click(), t = window.organizational_records.filter(function (t) {
                return t.reg_no === e
            })[0], null != t ? this.highlightSingleCandidate(t.candidate_name) : console.warn("Unable to find candidate_name from reg_no " + e)) : void 0
        }, t.prototype.highlightSingleCandidate = function (t) {
            return this.show_by_candidate({
                modify_location_map: function (e) {
                    return function (n) {
                        return n.keys().forEach(function (r) {
                            return r !== t ? n.get(r).x = -200 : (n.get(r).x = e.width / 2, n.get(r).y = 200)
                        }), n
                    }
                }(this)
            })
        }, t.prototype.initialize_candidate_autocomplete = function () {
            var t, e, n, r;
            return n = window.organizational_records.map(function (t) {
                return {
                    value: t.candidate_name,
                    data: t.reg_no
                }
            }), t = $(".candidate_search_container"), e = this.candidate_search_input(), r = function (t) {
                return function () {
                    return t.show_all_candidates(), t.show_by_candidate()
                }
            }(this), e.bind("input", function () {
                return $(this).val().length <= 0 ? r() : void 0
            }), e.autocomplete({
                lookup: n,
                lookupLimit: 6,
                lookupFilter: function (t, e, n) {
                    var r;
                    return r = n.match(/[^ ]+/g), r.every(function (e) {
                        return -1 !== t.value.toLowerCase().indexOf(e)
                    })
                },
                autoSelectFirst: !0,
                onSelect: function (t) {
                    return function (e) {
                        return ga("send", "event", "candidate_search", "select", e.value, 1), t.highlightSingleCandidate(e.value)
                    }
                }(this),
                appendTo: t,
                showNoSuggestionNotice: !0,
                noSuggestionNotice: "No candidates match your query",
                formatResult: function (t, e) {
                    var n;
                    return n = t.value, e.match(/[^ ]+/g).forEach(function (t) {
                        var e;
                        return e = "(" + $.Autocomplete.utils.escapeRegExChars(t) + ")", n = n.replace(new RegExp(e, "gi"), "<strong>$1</strong>")
                    }), n
                },
                onSearchComplete: function (t) {
                    return function (e, n) {
                        var i;
                        return ga("send", "event", "candidate_search", "search", e, 1), i = n.map(function (t) {
                            return t.data
                        }), n.length <= 0 ? r() : n.length <= 6 && n.length > 0 ? (t.circles.filter(function (t) {
                            var e;
                            return e = t.reg_no, o.call(i, e) >= 0
                        }).transition().duration(1e3).style("opacity", 1), t.circles.filter(function (t) {
                            var e;
                            return e = t.reg_no, o.call(i, e) < 0
                        }).transition().duration(1e3).style("opacity", .3)) : void 0
                    }
                }(this)
            })
        }, t
    }(), r = "undefined" != typeof exports && null !== exports ? exports : this, e = function () {
        function t() {
            this.get_island = a(this.get_island, this), this.get_vis_year = a(this.get_vis_year, this)
        }

        return t.prototype.get_vis_year = function () {
            var t, e;
            return t = $(".viz_nav.year"), e = t.data("year")
        }, t.prototype.get_island = function (t) {
            var e, n, r, i, a, o, s, c, u, d, l;
            return i = "Maui, Lanai, Molokai", n = "Kauai, Niihau", e = function (t) {
                var e, r;
                return e = parseInt(t.substring(0, 2) + t.substring(3, 5)), r = 707 >= e ? "Hawaii" : 1303 >= e ? i : 1304 >= e ? i : 1309 >= e ? i : 1605 >= e ? n : 1606 >= e ? n : 5106 >= e ? "Oahu" : "Error"
            }, "Governor" === (a = t.office) || "Mayor" === a || "Lt. Governor" === a || "Prosecuting Attorney" === a || "OHA" === a || "BOE" === a ? "All" : "Honolulu Council" === (o = t.office) ? "Oahu" : "Maui Council" === (s = t.office) ? i : "Kauai Council" === (c = t.office) ? n : "Hawaii Council" === (u = t.office) ? "Hawaii" : "Senate" === (d = t.office) ? (r = window.precinct_records.filter(function (e) {
                return e.senate === t.district
            }), e(r[0].precinct)) : "House" === (l = t.office) ? (r = window.precinct_records.filter(function (e) {
                return e.house === t.district
            }), e(r[0].precinct)) : "Other"
        }, t
    }(), r.candidate_utils = new e, i = function (t, e) {
        var n, r, i;
        return r = "http://codeforhawaii.github.io/hawaii-power-ballot/allgeneral.htm", i = "http://services2.arcgis.com/tuFQUQg1xd48W6M5/arcgis/rest/services/HI_2014_primary_candidates/FeatureServer/1/query", n = {
            where: "CC_Reg_No='" + e + "'",
            f: "pjson",
            outFields: "Candidate_ID"
        }, $.get(i, n, function (n) {
            var i, a;
            return a = JSON.parse(n).features[0], null != a ? (i = a.attributes.Candidate_ID, t.show().attr("href", r + "#" + i)) : console.warn("Unable to find candidate id for reg no " + e)
        })
    }, n = function () {
        return $(".legend tr").on("mouseenter", function () {
            var t, e;
            return t = $(this).data("category"), e = d3.selectAll("circle"), e.filter(function (e) {
                return e.super_category !== t
            }).transition().duration(1e3).style("opacity", .3)
        }), $(".legend tr[data-category]").on("mouseleave", function () {
            var t, e;
            return t = $(this).data("category"), e = d3.selectAll("circle"), e.transition().duration(1e3).style("opacity", 1)
        })
    }, $(function () {
        var e, i, a, s;
        return e = null, n(), a = function (t, e) {
            var n, r, i, a, o;
            for (r = [], i = 0, a = 0; ;) {
                if (n = t[i], o = e[a], null == n || null == o) break;
                n.reg_no === o.reg_no ? (r.push($.extend({}, n, o)), i++) : n.reg_no !== o.reg_no && a++
            }
            return r
        }, i = function (t, e) {
            var n, r, i;
            return n = t.filter(function (t) {
                return parseInt(t.amount) < 0 ? !1 : 2014 === e ? "2012-2014" === t.election_period : 2012 === e ? "2010-2012" === t.election_period : 2010 === e ? "2008-2010" === t.election_period : 2008 === e ? "2006-2008" === t.election_period : "gov" === e ? "2012-2014" === t.election_period && "Governor" === t.office : "senate" === e ? "2012-2014" === t.election_period && "Senate" === t.office : !1
            }), i = n.sort(function (t, e) {
                return d3.descending(parseFloat(t.amount), parseFloat(e.amount))
            }), r = _.reduce(n, function (t, e) {
                var n;
                return n = t[e.candidate_name], null == n && (n = []), n.push(e), n = _.sortBy(n, function (t) {
                    return parseFloat(t.amount.slice(5))
                }).reverse(), t[e.candidate_name] = _.first(n, 1), t
            }, {}), i
        }, r.update_year = function (t) {
            var n, r, a, s, c, u, d;
            return d = window.raw_records, r = candidate_utils.get_vis_year(), a = t ? 1 : -1, c = r + 2 * a, 2008 === c ? $(".viz_nav.year .left-arrow").attr("src", "images/year_arrow_disabled.png").removeClass("clickable") : $(".viz_nav.year .left-arrow").attr("src", "images/year_arrow_transparent.png").addClass("clickable"), 2014 === c ? $(".viz_nav.year .right-arrow").attr("src", "images/year_arrow_disabled.png").removeClass("clickable") : $(".viz_nav.year .right-arrow").attr("src", "images/year_arrow_transparent.png").addClass("clickable"), u = d3.range(2008, 2014.1, 2), o.call(u, c) < 0 ? void 0 : (n = $(".viz_nav.year"), n.animate({
                color: "white"
            }, {
                complete: function () {
                    return n.find(".year-text").text(c), n.data("year", c), n.animate({
                        color: "#454542"
                    })
                }
            }), s = i(d, c), window.debug_now = !0, window.records = s, e.update_data(s))
        }, s = function (n, r, o, s) {
            var c, u;
            return u = a(r, o), window.raw_records = u, c = i(u, 2014), window.precinct_records = s, window.records = c, window.organizational_records = o, e = new t(c), e.display_group_all(), e.size_legend_init(), e.handle_anchor_link()
        }, r.get_chart = function () {
            return function () {
                return e
            }
        }(this), $("#viz_nav_container .viz_nav").on("click", function (t) {
            var e, n, r;
            return t.preventDefault(), e = $(t.target).closest(".viz_nav"), r = e.data("name"), n = $(".viz_nav.btn.selected").data("name"), ga("send", "event", "click", "navigation", r, 1), e.animate({
                backgroundColor: "#73884f"
            }), e.animate({
                backgroundColor: "#FFFFFF"
            }), r !== n ? (e.siblings(".btn").removeClass("selected"), e.addClass("selected"), window.get_chart().show_viz_type(r)) : (e.removeClass("selected"), window.get_chart().show_viz_type("year"))
        }), $(".viz_nav .right-arrow").on("click", function (t) {
            return t.stopPropagation(), ga("send", "event", "click", "navigation", "next_year", 1), $(this).hasClass("clickable") ? window.update_year(!0) : void 0
        }), $(".viz_nav .left-arrow").on("click", function (t) {
            return t.stopPropagation(), ga("send", "event", "click", "navigation", "previous_year", 1), $(this).hasClass("clickable") ? window.update_year(!1) : void 0
        }), $("#nav #mini-legend").on("click", function (t) {
            var e;
            return t.preventDefault(), ga("send", "event", "click", "navigation", "toggle_mini_legend", 1), e = $(this).offset(), e.top = 50, $("#mini-legend-body").slideToggle().offset(e)
        }), queue().defer(d3.csv, "data/campaign_spending_summary.csv").defer(d3.csv, "data/organizational_report.csv").defer(d3.csv, "data/precinct.csv").await(s)
    })
}).call(this);
