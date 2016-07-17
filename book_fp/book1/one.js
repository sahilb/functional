var log = console.log.bind(console);
var columbian = {
        basePrice: 5,
        name: 'columbian'
    },
    frenchRoast = {
        basePrice: 6,
        name: 'frenchRoast'
    },
    decaf = {
        basePrice: 3,
        name: 'decaf'
    };

var coffees = [columbian, frenchRoast, decaf];
var sizes = ['small', 'medium', 'large'];

function getPrice(basePrice, size) {
    return 	size === 'small' ? basePrice + 2 :
        	size === 'medium' ? basePrice + 4 :
        	size === 'large' ? basePrice + 6 : 0;
}

function getLabel(label, size, price) {
    return label + ":" + size + ":" + price;
}

var priceLabels = coffees.reduce((acc, coffee) => {
    var getLabelsForCoffeeSize = (size) => getLabel(coffee.name, coffee.size, getPrice(basePrice, size))

    var labels = sizes.map(getLabelsForCoffeeSize)
    return acc.concat(labels);
}, []);


log(priceLabels());
var greetings = [{
    origin: 'english',
    value: 'hello'
}, {
    origin: 'spanish',
    value: 'hola'
}, {
    origin: 'hindi',
    value: 'namaste'
}];
