/**
 * Highcharts pattern fill plugin
 *
 * Author:         Dirk De Wachter
 * Adapted from:   Torstein Honsi's code (https://github.com/highslide-software/pattern-fill-v2)
 * precompiled patterns from  http://github.com/iros/patternfills
 * Last revision:  2016-05-10
 * License:        MIT License
 *
 * Options:
 ** - pattern:      An object with different items:
 ** - type:         either 'line', 'cross' or 'circle'. Creates line-patterns, cross-patterns or (filled) circle-patterns (= dithering)
 ** -                OR one of the precompiled patterns below
 ** - rotate:       degrees to rotate the pattern
 ** - scale:        scale the pattern with this factor
 **** - src:          The URL for a pattern image file (fallback for pre-IE9)
 * - id:           The id for the pattern, defaults to highcharts-pattern-# with # an increasing number for each pattern without id
 * - width:        The width of the pattern or image file, defaults to 10
 * - height:       The height of the pattern or image file, defaults to 10
 * - opacity       A general opacity for the pattern
 * - path:         In SVG, the path for the pattern
 *                 (Note: this can be a string with only a path, or an object with d, stroke, strokeWidth and fill)
 * - image:        An image source for the pattern 
 * - color:        A color to be used instead of a path
*/

/* global Highcharts */

/* http://tutorials.jenkov.com/svg/index.html */
/* precompiled patterns */
var svgDefs = [
/* Basic structures - edge at(0,0) - no fill defined (use default (black) during creation of pattern if not supplied) */
{
 id: 'stripe',
 width: 10, height: 10,
 //svg: '<rect width="10" height="10" fill="none"/><rect x="0" y="0" width="10" height="5" fill="black"/>'
 svg: '<rect x="0" y="0" width="10" height="5"/>'
},
{
 id: 'circle',
 width: 10, height: 10,
 //svg: '<rect width="10" height="10" fill="none"/><circle cx="2.5" cy="2.5" r="2.5" fill="black"/>'
 svg: '<circle cx="2.5" cy="2.5" r="2.5"/>'
},
{
 id: 'dot',
 width: 10, height: 10,
 //svg: '<rect width="10" height="10" fill="none"/><rect x="0" y="0" width="5" height="5" fill="black"/>'
 svg: '<rect x="0" y="0" width="5" height="5"/>'
},
{
 id: 'triangle',
 width: 10, height: 10,
 svg: '<polygon points="5,0 10,10 0,10"/>'
},
/* create different patterns from these basic structures by cloning, scaling and rotating */
{
 id: 'crosshatch',
 width: 8,
 height: 8,
 svg: '<path d="M0 0L8 8ZM8 0L0 8Z" stroke-width="0.5" stroke="#aaa"/>'
 //clone: 'stripe', scale:0.4, rotate: -45 & 45, height:30, fill:"#aaa"
},
{
 id: 'houndstooth',
 width: 10,
 height: 10,
 svg: '<path d="M0 0L4 4" stroke="#aaa" fill="#aaa" stroke-width="1"/><path d="M2.5 0L5 2.5L5 5L9 9L5 5L10 5L10 0" stroke="#aaa" fill="#aaa" stroke-width="1"/><path d="M5 10L5 7.5L7.5 10" stroke="#aaa" fill="#aaa" stroke-width="1"/>'
},
{
 id: 'lightstripe',
 width: 5,
 height: 5,
 svg: '<path d="M0 5L5 0ZM6 4L4 6ZM-1 1L1 -1Z" stroke="#888" stroke-width="1"/>'
 //clone: 'stripe', scale:0.25, rotate:-45, height:15, fill: '#bbb'
},
{
 id: 'smalldot',
 width: 5,
 height: 5,
 svg: '<rect width="5" height="5" fill="white"/><rect width="1" height="1" fill="#ccc"/>'
 //clone: 'dots-1', scale:0.2, height:20, width:20, fill:'#ccc'
},
{
 id: 'verticalstripe',
 width: 6,
 height: 49,
 svg: '<rect width="3" height="50" fill="white"/><rect x="3" width="1" height="50" fill="#ccc"/>'
 //clone: 'vertical-stripe-5', fill:'#ccc'
},
{
 id: 'whitecarbon',
 width: 6,
 height: 6,
 svg: '<rect width="6" height="6" fill="#eeeeee"/><g id="c"><rect width="3" height="3" fill="#e6e6e6"/><rect y="1" width="3" height="2" fill="#d8d8d8"/></g><use xlink:href="#c" x="3" y="3"/>'
}
];


(function() {

    'use strict';

    var idCounter = 0;

    /**
     * Exposed method to add a pattern to the renderer.
     */
    Highcharts.SVGRenderer.prototype.addPattern = function (id, options) {
        var pattern,
            path, ellipse, rect,
            w = options.width || 10,
            h = options.height || 10,
            ren = this;

        /**
         * Add a rectangle for solid color
         */
        function rect (fill) {
            ren.rect(0, 0, w, h)
                .attr({
                    fill: fill
                })
                .add(pattern);
        }

        if (!id) {
        		if (options.id) id = options.id;
            else {
            	id = 'highcharts-pattern-' + idCounter;
            	idCounter += 1;
            }
        }

        pattern = this.createElement('pattern').attr({
            id: id,
            patternUnits: 'userSpaceOnUse',
            width: options.width || 10,
            height: options.height || 10
        }).add(this.defs);

        // Get id
        pattern.id = pattern.element.id;

		// set background or solid color
        if (options.color) {
            rect(options.color);
        }
		
		// add transformation
		var transform=null;
		if (options.rotate || options.scale) { 
			var angle = options.rotate || 0;
			var size = options.scale || 1;
			transform = "rotate(" + angle + ") scale(" + size + ") ";
		}

		// Use an SVG path for the pattern
		// foreach options.path, options.circle, ...
        if (options.path) {
            path = options.path;
            // The pattern
            this.createElement('path').attr({
                'd': path.d || path,
                'stroke': path.stroke || options.color || '#343434',
                'stroke-width': path.strokeWidth || 2,
                'fill': path.fill || 'none'
            }).add(pattern);

        } if (options.circle || options.ellipse) {
        	ellipse = options.circle || options.ellipse;
        	this.createElement('ellipse').attr({
				'cx': w/2, 'cy': h/2,
				'rx': ellipse.radius || ellipse.rx || (options.circle ? (h < w ? h : w) : w)/2,
				'ry': ellipse.radius || ellipse.ry || (options.circle ? (h < w ? h : w) : h)/2,
				'stroke': ellipse.stroke || options.color || '#343434',
				'stroke-width': ellipse.strokeWidth || 0,
				'fill': ellipse.fill || 'none'
			}).add(pattern);

        // predefined pattern
        // Image pattern
		// SVG definition
        } if (options.image || options.url || options.svg || options.clone) {
			var defElem = null;
			var fillRegExp= new RegExp('fill=[\\s]*[\'|"][\\S]+[\'|"]');
			if (options.clone) { 
				defElem=document.getElementById('I'+ (options.clone.id || options.clone)); 
				if (defElem) {
					w = defElem.getAttribute('width') || w;
					h = defElem.getAttribute('height') || h;
					pattern.attr({ 
						width: options.width || w,
						height: options.height || h
					});
				}
			}
        	var imagedata=options.image || options.url || (defElem? defElem.getAttribute('href') : null) || null;
            if (options.color || options.fill || options.svg) {
	            var decoded = (options.svg? 
					'<svg xmlns="http://www.w3.org/2000/svg" ' + 
						(options.svg.search('xlink:')>0?'xmlns:xlink="http://www.w3.org/1999/xlink" ':'') +
						'width="'+w+'" height="'+h+'">'+options.svg+'</svg>'
					: (imagedata && imagedata.substring(0,10)=='data:image' && imagedata.length>26 ? atob(imagedata.substring(26)) : null));
				var fills = (decoded ? decoded.match(/fill=/g) : null); /* search fills in definition */
				var strokes = (decoded ? decoded.match(/stroke=/g) : null); /* search strokes in definition */
				var nsecfill=0;
				if (fills && fills.length >= 2) {
					if (decoded && options.color) decoded=decoded.replace(fillRegExp,'fill="none"'); /* make background transparent */
					if (options.fill) { 
						nsecfill = decoded.substring(decoded.search(fillRegExp)+1).search(fillRegExp);
					}
				}
				if (fills && fills.length>=1) nsecfill += decoded.search(fillRegExp);
				if (nsecfill>0 && options.fill) 
					decoded = decoded.substring(0,nsecfill) +
							decoded.substring(nsecfill).replace(fillRegExp,'fill="'+options.fill+'"');
				else if (decoded && options.fill) decoded = decoded.replace(/\/>\s*<\/svg>\s*$/,' fill="' + options.fill + '"/></svg>');
				if (decoded) imagedata='data:image/svg+xml;base64,'+btoa(decoded);
            }
			var image;
			if (imagedata && imagedata.substring(0,10)=='data:image' && imagedata.length>26) 
				image = this.image(imagedata, 0, 0, w, h).attr({id: 'I'+id}).add(this.defs);
			var uselem = this.createElement('use').attr({
			  href: (imagedata && imagedata.substring(0,10)=='data:image' && imagedata.length>26 ? '#I'+id : options.image) 
			}).add(pattern);
			//if (options.fill) uselem.attr({fill: options.fill});
			//if (transform) uselem.attr({ transform: transform });
			//this.image(imagedata, 0, 0, w, h).add(pattern);
        } 

		if (transform) pattern.attr({ patternTransform: transform });
        if (options.opacity !== undefined) { // enkel voor images ??
            Highcharts.each(pattern.element.childNodes, function (child) {
				if (child.nodeType == 1) // ELEMENT_NODE
                child.setAttribute('opacity', options.opacity);
            });
        }

        return pattern;
    };

    if (Highcharts.VMLElement) {

        Highcharts.VMLRenderer.prototype.addPattern = function (id, options) {

            var patterns;
            if (!id) {
                id = 'highcharts-pattern-' + idCounter;
                idCounter += 1;
            }
            patterns = this.patterns || {};
            patterns[id] = options;
            this.patterns = patterns;
        };

        Highcharts.wrap(Highcharts.VMLRenderer.prototype.Element.prototype, 'fillSetter', function (proceed, color, prop, elem) {
            if (typeof color === 'string' && color.substring(0, 5) === 'url(#') {
                var id = color.substring(5, color.length - 1),
                    pattern = this.renderer.patterns[id],
                    markup;

                if (pattern.image) {
                    // Remove Previous fills                    
                    if (elem.getElementsByTagName('fill').length) {
                        elem.removeChild(elem.getElementsByTagName('fill')[0]);
                    }

                    markup = this.renderer.prepVML(['<', prop, ' type="tile" src="', pattern.image, '" />']);
                    elem.appendChild(document.createElement(markup));

                    // Work around display bug on updating attached nodes
                    if (elem.parentNode.nodeType === 1) {
                        elem.outerHTML = elem.outerHTML;
                    }

                } else if (pattern.color) {
                    proceed.call(this, pattern.color, prop, elem);
                } else {
                    proceed.call(this, '#A0A0A0', prop, elem);
                }
            } else {
                proceed.call(this, color, prop, elem);
            }
        });
    }

    /**
     * Add the predefined patterns
     */
    function addPredefinedPatterns(renderer) {
        var colors = Highcharts.getOptions().colors;

        Highcharts.each([
            'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
            'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
            'M 3 0 L 3 10 M 8 0 L 8 10',
            'M 0 3 L 10 3 M 0 8 L 10 8',
            'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
            'M 3 3 L 8 3 L 8 8 L 3 8 Z',
            'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
            'M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7',
            'M 2 5 L 5 2 L 8 5 L 5 8 Z',
            'M 0 0 L 5 10 L 10 0'
        ], function (pattern, i) {
            renderer.addPattern('highcharts-default-pattern-' + i, {
                path: {
                		d:pattern
                		,stroke: colors[i]
                		//,fill: 'black'
                }
            });
        });
    }

    // Add patterns to the defs element
    Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
        proceed.apply(this);

        var chart = this,
            renderer = chart.renderer,
            options = chart.options,
            patterns = options.defs && options.defs.patterns;

        // First add default patterns
        addPredefinedPatterns(renderer);
		
		// Second set of default patterns /* svgPatterns -> svgDefs */
		if (svgDefs) {
			Highcharts.each(svgDefs, function(patdef) {
				renderer.addPattern(null,patdef);
				if (patdef.id == 'dot') {
					for (var p=1; p<10; p++) {
						var newpat = new Object();
						var scale= p/5;
						newpat.width = patdef.width/scale;
						newpat.height = patdef.height/scale;
						newpat.scale = scale;
						newpat.clone = 'dot';
						renderer.addPattern(patdef.id+'s-'+p,newpat);
					}
				}
				else if (patdef.id == 'circle') {
					for (var p=1; p<10; p++) {
						var newpat = new Object();
						var scale= 1+(p-4)/5;
						newpat.width = patdef.width/scale;
						newpat.height = patdef.height/scale;
						newpat.scale = scale;
						newpat.clone = 'circle';
						renderer.addPattern(patdef.id+'s-'+p,newpat);
					}
				}
				else if (patdef.id == 'stripe') {
					var orientation = ["horizontal", "diagonalup", "vertical", "diagonaldown"];
					var angle = [0, -45, 90, 45];
					orientation.forEach( function(o,i) {
						for (var p=1; p<10; p++) {
						  var newpat = new Object();
						  var scale= p/5;
						  newpat.width = patdef.width;
						  newpat.height = patdef.height/scale;
						  newpat.scale = scale;
						  newpat.clone = 'stripe';
						  if (angle[i]!=0) newpat.rotate = angle[i];
						  renderer.addPattern(o+'-'+patdef.id+'-'+p,newpat);
						}
					});
				}
			});
		}

        // Add user defined patterns
        if (patterns) {
            Highcharts.each(patterns, function (pattern) {
                renderer.addPattern(pattern.id, pattern);
            });
        }

    });

}());