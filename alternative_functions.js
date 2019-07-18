'use strict';

var sqrt = require('bigint-isqrt');

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

function isFullSquare_more_res(x){
    // console.log(x);

    if(x===0n){
        return true;
    }

    // Firstly, we divide x by 4 while divisible
    // The condition above is needed to prevent an infinite loop
    while ((x & 3n) === 0n){
        x >>= 2n;
    }

    // So, for now x is not divisible by 2
    // The only possible residual modulo 8 for such x is 1

    if ((x & 7n) !== 1n){
        return false;
    }

    // Residual modulo 16, 32, ... , 256 does not give anything new -
    // each of the variants is possible

    let res255 = x;
	res255 = (res255 & 65535n) + (res255 >> 16n);
    while(res255 > 255n){
        res255 = (res255 & 255n) + (res255 >> 8n);
    }

	let res15 = (res255 & 15n) + (res255 >> 4n);
	res15 = (res15 & 15n) + (res15 >> 4n);

	if(
        res15 !== 15n
    &&
        res15 !== 1n
    &&
        res15 !== 4n
    &&
        res15 !== 6n
    &&
        res15 !== 9n
    &&
        res15 !== 10n    
    ){
        return false;
    }

	let res17 = res255 % 17n;
	if(
        res17 !== 0n
    &&
		res17 !== 1n
	&&
		res17 !== 4n
	&&
		res17 !== 9n
	&&
		res17 !== 16n
	&&
		res17 !== 8n
	&&
		res17 !== 2n
	&&
		res17 !== 15n
	&&
		res17 !== 13n
    ){
        return false;
    }

	//console.log(x);
    return x === sqrt(x)**2n;
}

function isFullSquare_no2(x){
    // console.log(x);
    while ((x & 3n) === 0n && x !== 0n){
        x >>= 2n;
    }
    if ((x & 3n) === 2n || (x & 3n) === 3n){
        return false;
    }
    if ((x & 5n) === 5n){ // x % 7 == 5 or 7
        return false;
    }
    let y = sqrt(x);

    // The square root, if any, should not be divisible by 2
    if(!(y & 1n)){
        return false;
    }
    return x === y**2n;
}

function isFullSquare_no3(x){
	// console.log(x);
	while ((x & 3n) === 0n && x !== 0n){
		x >>= 2n;
	}
	// So, for now x is not divisible by 2
	// The only possible residual modulo 8 for such x is 1

	if ((x & 7n) !== 1n){
		return false;
	}
	let y = sqrt(x);

	// The square root, if any, should not be divisible by 2
	if( (y & 1n) === 0n ){
		return false;
	}
	return x === y**2n;
}

function isFullSquare_no4(x){
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

const Performance = require('perf_hooks').performance;

let p;

let t = [];

for(let i = 0n; i < 2000000n; i++){
   t.push(i); 
   t.push(i + 20090449n);
   t.push(i + 3916368113625n); 
}
/*
p = Performance.now();
let tests_true = [], tests_false = [];
for(let i = 1000n; i < 2000n; i++){
    tests_true.push(i**2n);
    tests_true.push((i+72975437934762976n)**2n);
    for(let j = 1n; j < 200n; j++){
        tests_false.push(i**2n+j); 
        tests_false.push((i+72975437934762976n)**2n+j); 
        tests_false.push((i+72975437934762976n)**2n-j); 
        if(i**2n-j >= 0n){
            tests_false.push(i**2n-j); 
        }
    }
}

tests_true.map(i =>{
    if(!isFullSquare_more_res(i)){
		console.log(i + " should be true");
		//console.log(i % 15n);
    }
})

tests_false.map(i =>{
    if(isFullSquare_more_res(i)){
        console.log(i + " should be false");
    }
})
*/
console.log('Creating and running tests:',Performance.now()-p);

//console.log("isFullsquare(x):");
p = Performance.now();
for(let n of t){
    isFullSquare(n);
}
console.log(Performance.now()-p);

//console.log("isFullsquare_more_res(x):");
p = Performance.now();
for(let n of t){
    isFullSquare_more_res(n);
}
console.log(Performance.now()-p);

//console.log("isFullsquare_no2(x):");
p = Performance.now();
for(let n of t){
    isFullSquare_no2(n);
}
console.log(Performance.now()-p);

//console.log("isFullsquare_no3(x):");
p = Performance.now();
for(let n of t){
    isFullSquare_no3(n);
}
console.log(Performance.now()-p);

//console.log("isFullsquare_no4(x):");
p = Performance.now();
for(let n of t){
    isFullSquare_no4(n);
}
console.log(Performance.now()-p);
