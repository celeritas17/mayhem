var _ = require('underscore');

function Mayhem(sorter){
	this.sorter = sorter;
}

Mayhem.prototype.isSorted = function(arr){
	for (var i = 0; i < arr.length - 1; i++){
		if (arr[i + 1] < arr[i]){
			return false;
		}
	}
	return true;
};

Mayhem.prototype.sort = function(arr, sorter){
	if (_.isFunction(sorter)) return sorter(arr);
	if (_.isFunction(this.sorter)) return this.sorter(arr);
	return ['H', 'A', ' ', 'H', 'A', ' ', 'H', 'A'].join('');
};

Mayhem.prototype.casinoSort = function(arr){
	var ordered = false;
	while (!ordered){
		ordered = true;
		for (var i = 0; i < arr.length - 1; i++){
			if (arr[i] > arr[i + 1]){
				ordered = false;
				var newSpot = Math.floor((i + 1) + (arr.length - (i + 1))*Math.random());
				temp = arr[i];
				arr[i] = arr[newSpot];
				arr[newSpot] = temp;
			}
		}
	}
	return arr;
};

// "twist" (or "rotate") an array.
// e.g., [1, 2, 3] -> [3, 1, 2]
Mayhem.prototype.twist = function(arr){
	var i = 0;
	var temp1 = arr[i];
	for (; i < arr.length; i++){
		temp2 = arr[(i + 1)%arr.length];
		arr[(i + 1)%arr.length] = temp1;
		temp1 = temp2; 
	}
};

Mayhem.prototype.nTwist = function(arr, n){
	for (var i = 0; i < n; i++){
		this.twist(arr);
	}
};

// e.g., arr = [1, 2, 3, 4, 5], upTo = 3 produces [4, 3, 2, 1, 5]
Mayhem.prototype.foldUpTo = function(arr, upTo){
	for (var i = 0, j = upTo%arr.length; i < j; i++, j--){
		temp = arr[i];
		arr[i] = arr[j];
		arr[j] = temp;
	}
};

/* Bogo-type sorts */

// "Twist" and "fold" (producing a kind of "shuffle") the array a random 
// number of times until it's sorted. 
Mayhem.prototype.twistAndFoldSort = function(arr){
	while(!this.isSorted(arr)){
		this.nTwist(arr, Math.floor(Math.random()*arr.length));
		this.foldUpTo(arr, Math.floor(Math.random()*arr.length));
	}
	return arr;
};

// Send an array element on a (1-dimensional) random walk of n steps.
// Whatever is in the spot that the walking element lands on is moved to 
// the walking element's original spot. 
Mayhem.prototype.arrayElementRandomWalk = function(arr, index, n){
	var temp,
			index = index%arr.length,
	    spot = index;
	for (var i = 0; i < n; i++){
		spot = (spot += Math.random() < 0.5 ? 1 : -1) % arr.length;
		if (spot < 0) spot = arr.length - 1;
	}
	temp = arr[index], arr[index] = arr[spot], arr[spot] = temp
};

//Viciously slow. 
Mayhem.prototype.randomWalkSort = function(arr){
	while(!this.isSorted(arr)){
		for (var i = 0; i < arr.length; i++){
			this.arrayElementRandomWalk(arr, i, Math.random()*arr.length);
		}
	}
	return arr;
};

/* Never-sorts */

Mayhem.prototype.unSort = function(arr){
	var temp, i = 0;
	while (arr[i] == arr[i + 1] && i < arr.length - 2) i++;
	if (arr[i] > arr[i + 1])
		;
	else if (arr[i] < arr[i + 1])
		temp = arr[i], arr[i] = arr[i + 1], arr[i + 1] = temp;
};

// Make sure the array is (except possibly initially, and in certain degenerate cases) 
// always (always) unsorted.  
Mayhem.prototype.neverSort = function(arr){
	while (true){
		this.unSort(arr);
	}
};

Mayhem.prototype.surrealSort = function(arr){
	return this.casinoSort(['y', 'm']).join('') + 
				this.casinoSort([' ', 'm']).join('') +
				this.casinoSort(['n', 'i']).join('') + 
				this.casinoSort(['d']).join('') + 
				this.casinoSort([' ']).join('') + 
				this.casinoSort(['s', 'i']).join('') + 
				this.casinoSort([' ', 'g']).join('') +
				this.casinoSort(['o']).join('') + 
				this.casinoSort(['n', 'i']).join('') +
				this.casinoSort(['g']); 
};

module.exports = Mayhem;
