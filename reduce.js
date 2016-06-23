var log = console.log.bind(console);

function reduce(f, acc, xs) {
    if (xs.length === 0) {
        return acc;
    }
    return reduce(f, f(acc, head(xs)), tail(xs))
}

function head(xs) {
    return xs[0];
}

function tail(xs) {
    return xs.slice(1);
}

function map(f, xs) {
    return reduce( (acc, x) => acc.concat(f(x)) , [], xs);
}

function filter(f, xs){
    return reduce( (acc, x) => f(x) ? acc.concat(x) : acc , [], xs);
}
var a = [10, 20, 25, 30, 40, 45];

var sum = (a, b) => a + b;
var double = (x) => x * 2;
var evenOnly = (x) => (x%2 === 0);

log(map(double, a));
log(filter(evenOnly, a));