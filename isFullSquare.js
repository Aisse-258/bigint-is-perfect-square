'use strict';

var sqrt = require ('bigint-isqrt');

function isFullSquare(x){
	// console.log(x);
	// Firstly, we divide x by 4 while divisible
	while ((x & 3n) === 0n && x !== 0n){
		x >>= 2n;
	}
	// So, for now x is not divisible by 2
	// The only possible residual modulo 8 for such x is 1
 
	if ((x & 7n) !== 1n){
		return false;
	}
	return x === sqrt(x)**2n;
}

module.exports = isFullSquare;