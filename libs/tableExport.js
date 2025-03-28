/**
 * Created by Roope on 20.10.2020.
 */
var tableToExcel = (function() {

    var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
            'xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" ' +
            'content="application/vnd.ms-excel; charset=UTF-8">' +
            '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
            '</head><body><table>{table}</table></body></html>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) {
            return s.replace(/{(\w+)}/g, function(m, p) {
                //           return c[p]; }) }
                return c[p].replace(/<a[^>]*>|<\/a>/g, ""); }) }
    return function (table, name, filename) {

        name ="erasmus-avustukset"
        if (table === "testitabxx") {
            //      showAll()
            filename = "test" + ".xls"
            if (!table.nodeType) table = document.getElementById(table)
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
            var link = document.getElementById("dlink-hankkeet")
            link.href = uri + base64(format(template, ctx));
            link.download = filename;
            if (navigator.msSaveBlob)
            { // IE 10+
                var data = format(table.innerHTML)
                var templateX = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" ' +
                    'content="application/vnd.ms-excel; charset=UTF-8">' +
                    '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
                    '</head><body><table>'+data+'</table></body></html>';
                var blobObject = new Blob([templateX]);
                window.navigator.msSaveOrOpenBlob(blobObject, filename);

            } else {
                link.click();
            }
        } else if (table === "testitab") {
            filename = _("Lähteet") + ".xls"
            //         setTimeout(function() {
            if (!table.nodeType) table = document.getElementById(table)
            var ctx2 = { worksheet: name || 'Worksheet', table: table.innerHTML }
            document.getElementById("dlink-src").href = uri + base64(format(template, ctx2));
            document.getElementById("dlink-src").download = filename;

            if (navigator.msSaveBlob)
            { // IE 10+
                var data = format(table.innerHTML)
                var templateX = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" ' +
                    'content="application/vnd.ms-excel; charset=UTF-8">' +
                    '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
                    '</head><body><table>'+data+'</table></body></html>';
                var blobObject = new Blob([templateX]);
                window.navigator.msSaveOrOpenBlob(blobObject, filename);

            } else {
                document.getElementById("dlink-src").click();
            }
            //
        } else if (table === "palvelutTable") {
            if (window.PAGE.db == "osallistuminen") {
                filename = _(window.PAGE.osalKysymys) + ".xls"
            } else {
                filename = _("Palvelut") + ".xls"
            }
            //     filename = _("Palvelut") + ".xls"
            if (!table.nodeType) table = document.getElementById(table)
            var ctx3 = { worksheet: name || 'Worksheet', table: table.innerHTML }
            document.getElementById("dlink-palvelut").href = uri + base64(format(template, ctx3));
            document.getElementById("dlink-palvelut").download = filename;

            if (navigator.msSaveBlob)
            { // IE 10+
                var data = format(table.innerHTML)
                var templateX = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="content-type" ' +
                    'content="application/vnd.ms-excel; charset=UTF-8">' +
                    '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
                    '</head><body><table>'+data+'</table></body></html>';
                var blobObject = new Blob([templateX]);
                window.navigator.msSaveOrOpenBlob(blobObject, filename);

            } else {
                document.getElementById("dlink-palvelut").click();
            }
        }
    }

})()

var tablesToExcel = (function() {
    alert("hep")
    var uri = 'data:application/vnd.ms-excel;base64,'
        , tmplWorkbookXML = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">'
            + '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office"><Author>Axel Richter</Author><Created>{created}</Created></DocumentProperties>'
            + '<Styles>'
            + '<Style ss:ID="Currency"><NumberFormat ss:Format="Currency"></NumberFormat></Style>'
            + '<Style ss:ID="Date"><NumberFormat ss:Format="Medium Date"></NumberFormat></Style>'
            + '</Styles>'
            + '{worksheets}</Workbook>'
        , tmplWorksheetXML = '<Worksheet ss:Name="{nameWS}"><Table>{rows}</Table></Worksheet>'
        , tmplCellXML = '<Cell{attributeStyleID}{attributeFormula}><Data ss:Type="{nameType}">{data}</Data></Cell>'
        , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    return function(tables, wsnames, wbname, appname) {
        var ctx = "";
        var workbookXML = "";
        var worksheetsXML = "";
        var rowsXML = "";

        for (var i = 0; i < tables.length; i++) {
            if (!tables[i].nodeType) tables[i] = document.getElementById(tables[i]);
            for (var j = 0; j < tables[i].rows.length; j++) {
                rowsXML += '<Row>'
                for (var k = 0; k < tables[i].rows[j].cells.length; k++) {
                    var dataType = tables[i].rows[j].cells[k].getAttribute("data-type");
                    var dataStyle = tables[i].rows[j].cells[k].getAttribute("data-style");
                    var dataValue = tables[i].rows[j].cells[k].getAttribute("data-value");
                    dataValue = (dataValue)?dataValue:tables[i].rows[j].cells[k].innerHTML;
console.log(dataValue)
                    if (dataValue.indexOf("href") > -1) {
                //        dataValue = dataValue.match(/>(.*?)<\/a>/)[1];
                    }
                    var dataFormula = tables[i].rows[j].cells[k].getAttribute("data-formula");
                    dataFormula = (dataFormula)?dataFormula:(appname=='Calc' && dataType=='DateTime')?dataValue:null;
                    ctx = {  attributeStyleID: (dataStyle=='Currency' || dataStyle=='Date')?' ss:StyleID="'+dataStyle+'"':''
                        , nameType: (dataType=='Number' || dataType=='DateTime' || dataType=='Boolean' || dataType=='Error')?dataType:'String'
                        , data: (dataFormula)?'':dataValue
                        , attributeFormula: (dataFormula)?' ss:Formula="'+dataFormula+'"':''
                    };
                    rowsXML += format(tmplCellXML, ctx);
                }
                rowsXML += '</Row>'
            }
            ctx = {rows: rowsXML, nameWS: wsnames[i] || 'Sheet' + i};
            worksheetsXML += format(tmplWorksheetXML, ctx);
            rowsXML = "";
        }

        ctx = {created: (new Date()).getTime(), worksheets: worksheetsXML};
        workbookXML = format(tmplWorkbookXML, ctx);



        var link = document.createElement("A");
        link.href = uri + base64(workbookXML);
        link.download = wbname || 'Workbook.xls';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
})();
