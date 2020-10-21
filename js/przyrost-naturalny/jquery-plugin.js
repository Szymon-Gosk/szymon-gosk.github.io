$(document).ready(function() {

    // przycisk 'Zatwierdź'
    $('#submit-button').click(function() {

        // inicjalizacja zmiennych
        let inputs = [];
        let empty = 0;

        // Zebranie wartości z inputów
        $('.input').each(function () {
            if($(this).val() === "") {
                empty += 1;
            } else {
                inputs.push($(this).val());
            }
        });

        // Sprawdzenie czy są przynajmniej 3 lata TODO
        if(empty > 2) {

        }

        // (100000, 2017)

        // zamiana stringów na inty
        inputs = inputs.map(x=>+x);

        let sum = 0;
        for(let i = 0; i < inputs.length; i++) {
            sum += inputs[i];
        }

        $('#wyniki-temp').text(sum);

    });

});
