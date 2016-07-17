var log = console.log.bind(console);



function partialApplyRight(fn, ...args) {
    return function(...newArgs) {
        return fn.apply(null, ([newArgs].concat(args)));
    }
}

function partialApplyLeft(fn, ...args) {
    return function(...newArgs) {
        return fn.apply(null, ([args].concat(newArgs)))
    }
}

Function.prototype.partialApply = function(...args) {
    return partialApplyLeft(this, ...args);
}
Function.prototype.partialApplyRight = function(...args) {
    return partialApplyRight(this, ...args);
}

var powersOf2 = Math.pow.partialApply(2);
log(powersOf2(5))

var cubeOf = Math.pow.partialApplyRight(3);
log(cubeOf(5));


function curry(fn) {
    var totalArgsLen = fn.length;
    //log('fn length', totalArgsLen);

    function subCurry(...args) {
        return function(newArg) {
            var seenArgs = args.concat(newArg);
            // log('seen args', seenArgs);
            if (seenArgs.length === totalArgsLen) {
                return fn.apply(null, seenArgs);
            } else {
                return subCurry.apply(null, seenArgs);
            }
        }
    }
    return subCurry();
}

var product = function(x, y, z) {
    return x * y * z;
};

Function.prototype.curry = function() { // can't use arrow functions, "this" will be current scope
    return curry(this)
};

var sum = (a, b, c) => a + b + c;

var curriedSum = curry(sum);
var add1 = curriedSum(1);
log(add1(2)(5));

var add1And4 = add1(4);
log(add1And4(5));


var curriedProduct = product.curry();

log(curriedProduct(2)(4)(6));