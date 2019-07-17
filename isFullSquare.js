'use strict';

var sqrt = require ('bigint-isqrt');

function isFullSquare(x){
    // console.log(x);
    // Firstly, we divide x by 4 while divisible
    while ((x & 3n) === 0n && x !== 0n){
        x >>= 2n;
    }
    // A perfect square cannot have residual 2 or 3 modulo 4
    if ((x & 3n) === 2n || (x & 3n) === 3n){
        return false;
    }
    if ((x & 5n) === 5n){ // x % 7 == 5 or 7
        return false;
    }
    return x === sqrt(x)**2n;
}

module.exports = isFullSquare;