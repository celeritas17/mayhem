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
	for (var i = 0, j = upTo; i < j; i++, j--){
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

module.exports = Mayhem;