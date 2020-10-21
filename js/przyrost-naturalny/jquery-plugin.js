$(document).ready(function() {

    // przycisk 'Zatwierdź'
    $('#submit-button').click(function() {

        // inicjalizacja zmiennych
        let inputs = [];
        let years = [];
        let empty = 0;

        // Zebranie wartości z inputów
        $('.input').each(function () {
            if($(this).val() === "") {
                empty += 1;
            } else {
                inputs.push($(this).val());
            }
        });

        $('.label').each(function () {
            if($(this).html() !== "") {
                years.push($(this).html());
            }
        });

        // Sprawdzenie czy są przynajmniej 3 lata TODO
        if(empty > 2) {

        }

        // zamiana stringów na inty
        var values = {};
        inputs = inputs.map(x => +x);
        years = years.map(x => +x);

        // TODO change not working
        years.forEach(
            (key, i) => {
                if(inputs[i] !== undefined) {
                    values[key] = inputs[i]
                } else {

                }

            }
        );

        for(let p in values) {
            console.log (p, values[p])
        }

    });

});
