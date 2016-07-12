/*
1.1 multiply numbers sync and serially, with re-usability and testability
1.2 multiply number async serially
1.3 multiply number async in parallel

2.1, 2.2, 2.3 above, but only for a small set of numbers from  a large list

*/

//1.1
var numbers = [1, 2, 3, 4],
    constant = 2,
    result = [];

function multiply(a, b) {
    return a * b;
}
for (var i = 0; i < numbers.length; i++) {
    result.push(multiply(constant, numbers[i]));
}
console.log(result);


var multiplyByConstant = (k) => (a) => a * k;
result = numbers.map(multiplyByConstant(constant));
console.log(result);


var waterfall = function(ops, cb) {
    var runNext = () => {
        var next = ops.shift();
        if (next) {
            next(function(err, result) {
                if (err) {
                    cb(err)
                } else {
                    setTimeout(runNext, 500);
                }
            })
        } else {
            cb();
        }
    }
    setTimeout(runNext, 500);
}

var log = console.log.bind(console);

// async serially
// returns a list of functions
var ops = numbers.map((n) => {
    return (cb) => {
        log(multiplyByConstant(constant)(n));
        cb();
    }
});

// waterfall(ops, () => console.log('done'))

var parallel = (ops, cb) => {
    var count = 0;
    var completeWhenDone= function() {
        count++;
        if (count === ops.length) {
            cb();
        }
    }
    ops.forEach(function(op) {
        setTimeout( () => op(completeWhenDone) , 1000);
    });
};

parallel(ops, () => console.log('done'))
