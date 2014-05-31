var Mayhem = require('../mayhem'),
		mayhem = new Mayhem(function(arr){}),
		list = [3, 2, 1, 14, 14, 15, 17, 19, 18, 5, 29];

console.log(mayhem.twistAndFoldSort(list));
console.log(mayhem.casinoSort(list));
console.log(mayhem.randomWalkSort(list)); // Takes about 10 seconds to complete.
console.log(mayhem.surrealSort(list));
