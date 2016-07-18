var log = console.log.bind(console);
var _ = require('lodash');

function compose(fn1, fn2) {
    return function(...args) {
        return fn1(fn2.apply(null, args));
    }
}

function composeN(...functions) {
    return function(args) {
        while (functions.length) {
            var f = functions.pop();
            args = f(args);
        }
        return args;
    }
}

Function.prototype.compose = function(fn) {
    return compose(this, fn);
};
var sum = (a, b) => a + b;
var half = (a) => a / 2;

var addAndHalf = half.compose(sum);
var x = addAndHalf(20, 10);
log(x);

var fromCharCode = String.fromCharCode.bind(String);
var getCharCode = (s) => s.charCodeAt(0);
var add1 = (x) => x + 1;
var subtract1 = (x) => x - 1;


var nextChar = (c) => fromCharCode(c.charCodeAt(0) + 1);
var nextChar1 = fromCharCode.compose(add1.compose(getCharCode))
var nextChar2 = composeN(fromCharCode, add1, getCharCode);


var prevChar = fromCharCode.compose(subtract1.compose(getCharCode));
var _prevChar = _.flowRight([fromCharCode, subtract1, getCharCode]);
var _prevChar1 = _.flow(getCharCode, subtract1, fromCharCode);

log(nextChar('a'));
log(nextChar1('a'));
log(nextChar2('a'));

log(prevChar('x'));
log(_prevChar('x'));
log(_prevChar1('x'));