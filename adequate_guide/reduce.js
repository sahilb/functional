var log = console.log.bind(console);
var head = (xs) => xs[0];
var tail = (xs) => xs.slice(1);

function reduce(f, acc, xs) {
    if (xs.length === 0) {
        return acc;
    }
    return reduce(f, f(acc, head(xs)), tail(xs))
}

function map(f, xs) {
    return reduce((acc, x) => acc.concat(f(x)), [], xs);
}

function filter(f, xs) {
    return reduce((acc, x) => f(x) ? acc.concat(x) : acc, [], xs);
}

function any(f, xs) {
    return reduce((acc, x) => acc || f(x), false, xs);
}

function all(f, xs) {
    return reduce((acc, x) => acc && f(x), true, xs);
}

function size(xs) {
    return reduce((acc, x) => acc + 1, 0, xs);
}

function max(xs) {
    if (xs.length === 0) {
        return
    }
    return reduce((acc, x) => Math.max(acc, x), -Infinity, xs);
}

function min(xs) {
    if (xs.length === 0) {
        return
    }
    return reduce((acc, x) => Math.min(acc, x), Infinity, xs);
}

// tests
var a = [2, 3, 5, 8, 4, -2];
var sum = (a, b) => a + b;
var double = (x) => x * 2;
var isEven = (x) => (x % 2 === 0);
var isNonNegative = (x) => (x >= 0);

log(map(double, a));
log(filter(isEven, a));
log('any even', any(isEven, a));
log('any isNonNegative', any(isNonNegative, a));
log('all isNonNegative', all(isNonNegative, a));
log('all even', all(isEven, a));
log('size', size(a));
log('size after slice 2', size(a.slice(2)));

log('max', max(a));
log('min', min(a));
log('min', min([]));