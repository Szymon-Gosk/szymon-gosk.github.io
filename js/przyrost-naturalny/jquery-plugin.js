$(document).ready(function() {

    // przycisk 'Zatwierdź'
    $('#submit-button').click(function() {

        // inicjalizacja zmiennych
        let inputsI = [];
        let yearsI = [];
        let x = parseInt($('#year-6').val());
        let isDataCorrect = true;

        // Zebranie wartości z inputów
        $('.input-y').each(function () {
            yearsI.push($(this).val());
        });

        $('.input-v').each(function () {
            inputsI.push($(this).val());
        });

        for(let i = 0; i < 5; i++) {
            isDataCorrect = isDataCorrect &&
                !((inputsI[i] === "" && yearsI[i] !== "") || (inputsI[i] !== "" && yearsI[i] === ""));
        }

        $('#d-1-2').css('display', 'flex');

        // Sprawdzenie czy są przynajmniej 3 lata TODO
        if(!isDataCorrect || isNaN(x)) {
            $('#polynomial').html('Uzupełnij pola poprawnymi zmiennymi!');
            $('#result').html('Przynajmniej 3 lata i rok do wyliczenia');
        } else {

            let inputs = [];
            let years = [];

            inputsI.forEach(element => {
                if(element !== "") {
                    inputs.push(element);
                }
            });

            yearsI.forEach(element => {
                if(element !== "") {
                    years.push(element);
                }
            });

            // zamiana stringów na inty
            let values = [];
            inputs = inputs.map(x => +x);
            years = years.map(x => +x);

            for (let i = 0; i < inputs.length; i++) {
                let temp = [];
                temp[0] = years[i];
                temp[1] = inputs[i];
                values[i] = temp
            }

            // values[X][0] - X-th year       (x)
            // values[X][1] - X-th value      (y)
            let N = values.length;
            let b = [];

            b[0] = values[0][1];

            for(let k = 1; k <= N-1; k++) {

                let sum = values[0][1];
                let denominator = 1;

                for(let i = 1; i <= k-1; i++) {
                    let product = 1;
                    for(let j = 0; j < i; j++) {
                        product *= (values[k][0] - values[j][0]);
                    }
                    sum += b[i]*product;
                }

                for(let i = 0; i <= k-1; i++) {
                    denominator *= (values[k][0] - values[i][0]);
                }

                b[k] = (values[k][1] - sum)/denominator;
            }

            // Wielomian Newtona

            let polynomial = "P(x) = " + b[0];
            let polynomial_graph = "" + b[0];

            for(let k = 1; k <= N-1; k++) {
                if(b[k] < 0) {
                    polynomial = polynomial + " - " + Math.abs(b[k]);
                    polynomial_graph = polynomial_graph + " - " + Math.abs(b[k]);
                } else {
                    polynomial = polynomial + " + " + b[k];
                    polynomial_graph = polynomial_graph + " + " + b[k];
                }
                for(let i = 0; i <= k-1; i++) {
                    polynomial = polynomial + "(x - " + values[i][0] + ")";
                    polynomial_graph = polynomial_graph + "*(x - " + values[i][0] + ")";
                }
            }

            $("#polynomial").html(polynomial);

            // Wyliczenie

            let P = b[0];

            for (let k = 1; k <= N - 1; k++) {
                let ingredient = b[k];
                for (let i = 0; i <= k - 1; i++) {
                    ingredient *= (x - values[i][0]);
                    polynomial = polynomial + "(x - " + values[i][0] + ")";
                }
                P += ingredient;
            }

            P = Math.round(P * 100) / 100;

            $('#result').html('P(' + x + ') = ' + P);

            // Wykres

            // TODO

            var board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox:[-5000,5000,5000,-5000], axis:true});

            // Macro function plotter
            function addCurve(board, func, atts) {
                return board.create('functiongraph', [func], atts);
            }

            // Simplified plotting of function
            function plot(func, atts) {
                if (atts==null) {
                    return addCurve(board, func, {strokewidth:2});
                } else {
                    return addCurve(board, func, atts);
                }
            }

            let func = 'function f(x) { ' +
                '   return ' + polynomial_graph + '; ' +
                '} ' +
                'c = plot(f);';

            // Usage of the macro
            function doIt() {
                eval(func);
            }

            doIt();
        }
    });

});