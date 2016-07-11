var log = console.log.bind(console);

Function.prototype.partialApply = function(...args) {
    log('partial apply', ...args); 
    return (...newArgs) => {
        log('run: ',  args.concat(...newArgs));
        return this.apply(null, args.concat(...newArgs));
    }
};

function sum(...args){
    return args.reduce((acc,x) => acc + x,0);
}

Function.prototype.partialApplyRight = function(...args) {
    log('partial apply right', ...args); 
    return (...newArgs) => {
        var allargs = newArgs.concat(...args)
        log('allargs', allargs)
        return this.apply(null, allargs);
    }
};

var y = sum.partialApplyRight(1,2);
log( y(10,11) );
var x = sum.partialApply(1,2); 
log(x(5,6));

var _ = require('lodash');

var greetings = [{
    origin: 'english',
    value: 'hello'
},{
    origin: 'spanish',
    value: 'hola'
},{
    origin: 'hindi',
    value: 'namaste'
}];

Function.prototype.curry = function() {
    var numArgs = this.length;
    function curriedFunction(f) {
        return function(x){
            
        }
    }
    return curriedFunction(this);
};

function sum(x,y,z) {
    return x + y + z;
}

a = sum.curry();
a(1)(2)(3)
a(1)(2) // returns a function
a(1) // returns a function
a()? // returns a back















