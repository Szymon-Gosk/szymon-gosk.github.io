$(document).ready(function() {

    $("#aux0").html(katex.renderToString("f(x) = x^4 + x^2 + 5x - 2sin(x) + 1", {
        throwOnError: false,
    }));

    // number of steps
    let K = 0;

    // TODO : co jak ktos poda przedzial np -20, 20 - wyjdzie 0 rozwiazan, a sa 2

    $('#submit-button').click(function() {

        let aF = $('#number1');
        let bF = $('#number2');
        let eF = $('#number3');

        if(aF.val() === "" || bF.val() === "" || eF.val() === "") {
            $('#error').html("Podaj wszystkie wartości!");
            return;
        }

        let A = parseFloat(aF.val());
        let B = parseFloat(bF.val());
        let E = parseFloat(eF.val());

        if(E <= 0 || E >= 1) {
            $('#error').html(katex.renderToString("\\mathrm{Podaj} \\ \\ \\varepsilon \\in (0, 1)", {
                throwOnError: false,
            }));
            return;
        } if(A >= B) {
            $('#error').html(katex.renderToString("\\mathrm{Niepoprawne \\ dane!} \\ \\ a \\geq b", {
                throwOnError: false,
            }));
            return;
        }

        $("#aux1").html(katex.renderToString("x \\in [" + A + ", " + B + "]", {
            throwOnError: false,
        }));

        $("#aux2").html(katex.renderToString("\\varepsilon = " + E, {
            throwOnError: false,
        }));

        console.log(solve(A, B, E));

        let output = "x_0 = " + solve(A, B, E);

        if(output === "x_0 = ") output = "x_0 \\in \\varnothing";

        $("#result1").html(katex.renderToString(output, {
            throwOnError: false,
        }));
        $("#result2").html(katex.renderToString("N = " + K, {
            throwOnError: false,
        }));

        $('#d-1-2').css('display', 'flex');

    });


    function f(x) {
        return Math.pow(x, 4) + (x*x) + (5*x) - (2*Math.sin(x)) + 1
    }

    function sign(a, b) {
        return Math.sign(f(a)*f(b));
    }

    function isPrecise(a, b, epsilon) {
        return Math.abs(a - b) < epsilon
    }

    // a < b
    function solve(a, b, epsilon) {
        K = 0;
        let solutions = [];

        if(sign(a, b) > 0) { // No solutions exist in the given interval
            return solutions; // returns empty set
        } else if(sign(a, b) === 0) { // Solution is at either of the ends
            if(f(a) === 0) {
                solutions.push(a);
            }
            if(f(b) === 0) {
                solutions.push(b);
            }
            return solutions;
        } else {// Solution is in the interval
            let x = (a + b)/2;

            if(f(x) === 0) {
                solutions.push(x);
                return solutions;
            } else {
                let A = a;
                let B = b;

                // algorithm
                while(!isPrecise(A, B, epsilon)) {
                    x = (A + B)/2;
                    if(sign(A, x) < 0) {
                        B = x;
                    }
                    if(sign(x, B) < 0) {
                        A = x;
                    }
                    K++; //increase numbers of steps by one
                }
                // approximated solution found with desired precision
                solutions.push((A+B)/2);
                return solutions;
            }
        }
    }

});