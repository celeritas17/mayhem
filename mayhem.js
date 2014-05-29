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


