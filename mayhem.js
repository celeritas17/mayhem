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
}

module.exports = Mayhem;