/**
 * A Highcharts plugin for exporting data from a rendered chart as CSV, XLS or HTML table
 *
 * Author:   Torstein Honsi
 * Licence:  MIT
 * Version:  1.3.5
 */
/*global Highcharts, window, document, Blob */
(function (Highcharts) {

    'use strict';

    var each = Highcharts.each,
        downloadAttrSupported = document.createElement('a').download !== undefined;

    Highcharts.setOptions({
        lang: {
            downloadCSV: _('Lataa CSV-tiedosto'),
            downloadXLS: _('Lataa XLS-tiedosto')
        }
    });


    /**
     * Get the data rows as a two dimensional array
     */
    /*
    Highcharts.Chart.prototype.getDataRows = function () {
        var options = (this.options.exporting || {}).csv || {},
            xAxis = this.xAxis[0],
            rows = {},
            rowArr = [],
            dataRows,
            names = [],
            i,
            x,

        // Options
            dateFormat = options.dateFormat || '%Y-%m-%d %H:%M:%S';

        // Loop the series and index values
        i = 0;
        each(this.series, function (series) {
        var keys = series.options.keys,
                pointArrayMap = keys || series.pointArrayMap || ['y'],
                valueCount = pointArrayMap.length,
                j;
            console.log(series)
            if (series.options.includeInCSVExport !== false && series.visible !== false) { // #55
                names.push(series.name);

                each(series.points, function (point) {
                    if (point.y === null) point.y = 0;
                    j = 0;
                    if (!rows[point.x]) {
                        rows[point.x] = [];
                    }
                    rows[point.x].x = point.x;

                    // Pies, funnels etc. use point name in X row
                    if (!series.xAxis) {
                        rows[point.x].name = point.name;
                    }

                    while (j < valueCount) {
                        rows[point.x][i + j] = point[pointArrayMap[j]];
                        j = j + 1;
                    }

                });
                i = i + j;
            }
        });

        // Make a sortable array
        for (x in rows) {
            //    console.log(x)
            //     if (x === null) x = 0
            if (rows.hasOwnProperty(x)) {
                rowArr.push(rows[x]);
            }
        }
        // Sort it by X values
        rowArr.sort(function (a, b) {
            return a.x - b.x;
        });

        // Add header row
        dataRows = [[xAxis.isDatetimeAxis ? 'DateTime' : 'Kategoria'].concat(names)];

        // Transform the rows to CSV
        each(rowArr, function (row) {

            var category = row.name;
            if (!category) {
                if (xAxis.isDatetimeAxis) {
                    category = Highcharts.dateFormat(dateFormat, row.x);
                } else if (xAxis.categories) {
                    category = Highcharts.pick(xAxis.names[row.x], xAxis.categories[row.x], row.x)
                } else {
                    category = row.x;
                }
            }

            // Add the X/date/category
            row.unshift(category);
            dataRows.push(row);
        });

        dataRows.push([])
        dataRows.push([subtitle])

        return dataRows;
    };
*/
    Highcharts.Chart.prototype.getDataRows = function () {
        alert(9)
        var options = (this.options.exporting || {}).csv || {},
            xAxis = this.xAxis[0],
            rows = {},
            rowArr = [],
            dataRows,
            names = [],
            i,
            x,

            // Options
            dateFormat = options.dateFormat || '%Y-%m-%d %H:%M:%S';

        // Loop the series and index values
        i = 0;
        (this.series || []).forEach(function (series) { // Replacing each with forEach
            var keys = series.options.keys,
                pointArrayMap = keys || series.pointArrayMap || ['y'],
                valueCount = pointArrayMap.length,
                j;

            console.log(series);

            if (series.options.includeInCSVExport !== false && series.visible !== false) { // #55
                names.push(series.name);

                (series.points || []).forEach(function (point) { // Replacing each with forEach
                    if (point.y === null) point.y = 0;
                    j = 0;
                    if (!rows[point.x]) {
                        rows[point.x] = [];
                    }
                    rows[point.x].x = point.x;

                    // Pies, funnels etc. use point name in X row
                    if (!series.xAxis) {
                        rows[point.x].name = point.name;
                    }

                    while (j < valueCount) {
                        rows[point.x][i + j] = point[pointArrayMap[j]];
                        j = j + 1;
                    }
                });
                i = i + j;
            }
        });

        // Make a sortable array
        for (x in rows) {
            if (rows.hasOwnProperty(x)) {
                rowArr.push(rows[x]);
            }
        }

        // Sort it by X values
        rowArr.sort(function (a, b) {
            return a.x - b.x;
        });

        // Add header row
        dataRows = [[xAxis.isDatetimeAxis ? 'DateTime' : 'Kategoria'].concat(names)];

        // Transform the rows to CSV
        rowArr.forEach(function (row) { // Replacing each with forEach
            var category = row.name;
            if (!category) {
                if (xAxis.isDatetimeAxis) {
                    category = Highcharts.dateFormat(dateFormat, row.x);
                } else if (xAxis.categories) {
                    category = Highcharts.pick(xAxis.names[row.x], xAxis.categories[row.x], row.x);
                } else {
                    category = row.x;
                }
            }

            // Add the X/date/category
            row.unshift(category);
            dataRows.push(row);
        });

        dataRows.push([]);
        dataRows.push([subtitle]);

        return dataRows;
    };


    /**
     * Get a CSV string
     */
    /*
    Highcharts.Chart.prototype.getCSV = function (useLocalDecimalPoint) {
        var csv = '',
            rows = this.getDataRows(),
            options = (this.options.exporting || {}).csv || {},
            itemDelimiter = options.itemDelimiter || ',', // use ';' for direct import to Excel
            lineDelimiter = options.lineDelimiter || '\n'; // '\n' isn't working with the js csv data extraction

        // Transform the rows to CSV
        each(rows, function (row, i) {
            var val = '',
                j = row.length,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';
            while (j--) {
                val = row[j];
                if (typeof val === "string") {
                    val = '"' + val + '"';
                }
                if (typeof val === 'number') {
                    if (n === ',') {
                        val = val.toString().replace(".", ",");
                    }
                }
                row[j] = val;
            }
            // Add the values
            csv += row.join(itemDelimiter);

            // Add the line delimiter
            if (i < rows.length - 1) {
                csv += lineDelimiter;
            }
        });
        return csv;
    };
*/
    Highcharts.Chart.prototype.getCSV = function (useLocalDecimalPoint) {
        var csv = '',
            rows = this.getDataRows(),
            options = (this.options.exporting || {}).csv || {},
            itemDelimiter = options.itemDelimiter || ',', // use ';' for direct import to Excel
            lineDelimiter = options.lineDelimiter || '\n'; // '\n' isn't working with the js csv data extraction

        // Transform the rows to CSV
        rows.forEach(function (row, i) { // Replacing each with forEach
            var val = '',
                j = row.length,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';
            while (j--) {
                val = row[j];
                if (typeof val === "string") {
                    val = '"' + val + '"';
                }
                if (typeof val === 'number') {
                    if (n === ',') {
                        val = val.toString().replace(".", ",");
                    }
                }
                row[j] = val;
            }
            // Add the values
            csv += row.join(itemDelimiter);

            // Add the line delimiter
            if (i < rows.length - 1) {
                csv += lineDelimiter;
            }
        });
        return csv;
    };


    /**v
     * Build a HTML table with the data
     */
    /*
    Highcharts.Chart.prototype.getTable = function (useLocalDecimalPoint) {

        var html = '<table>',
            rows = this.getDataRows();

        // Transform the rows to HTML
        each(rows, function (row, i) {
            var tag = i ? 'td' : 'th',
                val,
                j,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';

            html += '<tr>';
            for (j = 0; j < row.length; j = j + 1) {
                val = row[j];
                // Add the cell
                if (typeof val === 'number') {
                    if (n === ',') {
                        html += '<' + tag + (typeof val === 'number' ? ' class="number"' : '') + '>' + val.toString().replace(".", ",") + '</' + tag + '>';
                    } else {
                        html += '<' + tag + (typeof val === 'number' ? ' class="number"' : '') + '>' + val.toString() + '</' + tag + '>';
                    }
                } else {
                    html += '<' + tag + '>' + val + '</' + tag + '>';
                }
            }

            html += '</tr>';
        });
        html += '</table>';
        return html;
    };
*/
    Highcharts.Chart.prototype.getTable = function (useLocalDecimalPoint) {

        var html = '<table>',
            rows = this.getDataRows();

        // Transform the rows to HTML
        rows.forEach(function (row, i) { // Replacing each with forEach
            var tag = i ? 'td' : 'th',
                val,
                j,
                n = useLocalDecimalPoint ? (1.1).toLocaleString()[1] : '.';

            html += '<tr>';
            for (j = 0; j < row.length; j = j + 1) {
                val = row[j];
                // Add the cell
                if (typeof val === 'number') {
                    if (n === ',') {
                        html += '<' + tag + (typeof val === 'number' ? ' class="number"' : '') + '>' + val.toString().replace(".", ",") + '</' + tag + '>';
                    } else {
                        html += '<' + tag + (typeof val === 'number' ? ' class="number"' : '') + '>' + val.toString() + '</' + tag + '>';
                    }
                } else {
                    html += '<' + tag + '>' + val + '</' + tag + '>';
                }
            }

            html += '</tr>';
        });
        html += '</table>';
        return html;
    };


    function getContent(chart, href, extension, content, MIME) {
        var a,
            blobObject,
            name,
            options = (chart.options.exporting || {}).csv || {},
            url = options.url || 'http://www.highcharts.com/studies/csv-export/download.php';

        if (chart.options.exporting.filename) {
            name = chart.options.exporting.filename;
        } else if (chart.title) {
            name = chart.title.textStr.replace(/ /g, '-').toLowerCase();
        } else {
            name = 'chart';
        }

        // Download attribute supported
        if (downloadAttrSupported) {
            a = document.createElement('a');
            a.href = href;
            //    a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + chart.getCSV().replace(/\n/g, '%0A');
            //    a.href = 'data:text/csv;charset=utf-8,%EF%BB%BF' + chart.getCSV();
            a.target = '_blank';
            a.download = name + '.' + extension;
            document.body.appendChild(a);
            a.click();
            a.remove();

        } else if (window.Blob && window.navigator.msSaveOrOpenBlob) {
            // Falls to msSaveOrOpenBlob if download attribute is not supported
            blobObject = new Blob([content]);
            window.navigator.msSaveOrOpenBlob(blobObject, name + '.' + extension);

        } else {
            // Fall back to server side handling
            Highcharts.post(url, {
                data: content,
                type: MIME,
                extension: extension
            });
        }
    }

    /**
     * Call this on click of 'Download CSV' button
     */
    Highcharts.Chart.prototype.downloadCSV = function () {
        var csv = this.getCSV(true);
        getContent(
            this,
            'data:text/csv,' + csv.replace(/\n/g, '%0A'),
            'csv',
            csv,
            'text/csv'
        );
    };

    /**
     * Call this on click of 'Download XLS' button
     */
    Highcharts.Chart.prototype.downloadXLS = function () {
        alert(2)
        var uri = 'data:application/vnd.ms-excel;base64,',
        //  var uri = 'data:application/vnd.ms-excel;base64;charset=utf-8,%EF%BB%BF',
            template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">' +
                '<head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
                '<x:Name>Ark1</x:Name>' +
                '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
                    //   '<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";}</style>' +
                '<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0";}</style>' +
                    //     '<meta name=ProgId content=Excel.Sheet>' +
                '<meta name=ProgId charset=utf-8 content=Excel.Sheet>' +
                '</head><body>' +
                this.getTable(true) +
                '</body></html>',
            base64 = function (s) {
                return window.btoa(unescape(encodeURIComponent(s))); // #50
            };
        getContent(
            this,
            uri + base64(template),
            'xls',
            template,
            'application/vnd.ms-excel'
        );
    };


    // Add "Download CSV" to the exporting menu. Use download attribute if supported, else
    // run a simple PHP script that returns a file. The source code for the PHP script can be viewed at
    // https://raw.github.com/highslide-software/highcharts.com/master/studies/csv-export/csv.php
    /*  if (Highcharts.getOptions().exporting) {
        Highcharts.getOptions().exporting.buttons.contextButton.menuItems.push({
            textKey: 'downloadCSV',
            onclick: function () {
                this.downloadCSV();
            }
        }, {
            textKey: 'downloadXLS',
            onclick: function () {
                this.downloadXLS();
            }
        });
    }
     */
}(Highcharts));

var CSVbuttons = Highcharts.getOptions().exporting.buttons.contextButton.menuItems;
/*
CSVbuttons.push({
    /*   textKey: 'downloadCSV',
     onclick: function () {
     this.downloadCSV();
     }
     }, {*//*
    textKey: 'downloadXLS',
    onclick: function () {
        this.downloadXLS();
    }
});

*/
