// Switch rows and columns in the exported CSV

Highcharts.wrap(Highcharts.Chart.prototype, 'getDataRows', function (proceed) {

    // Method borrowed from our data module (/modules/data.src.js)

    function rowsToColumns(rows) {
        var row,
            rowsLength,
            col,
            colsLength,
            columns;

        if (rows) {
            columns = [];
            rowsLength = rows.length;

            for (row = 0; row < rowsLength; row++) {
                colsLength = rows[row].length;
                for (col = 0; col < colsLength; col++) {
                    if (!columns[col]) {
                        columns[col] = [];
                    }
                    if (!columns[row]) {
                        columns[row] = [];
                    }
                    if (typetestValue === "line") {
                        columns[col][row] = rows[row][col];
                    } else {
                        columns[row][col] = rows[row][col];
                    }

                }
            }
        }
        return columns;
    }

    return rowsToColumns(proceed.call(this));
});
