'use strict';
var mocha  = require('mocha'),
	assert = require('chai').assert,
	expect = require('chai').expect,
	sqrt = require('bigint-isqrt'),
	isFullSquare = require('../isFullSquare.js');

let tt = [];

for (let i = 1n; i < 2000001n; i++){
	tt.push(i**2n);
	tt.push((i + 2000000n)**2n);
	tt.push((i + 4000000n)**2n);
	tt.push((i + 6000000n)**2n);
}

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
describe("Testing isFullSquare(value) function", function(){

    it("Should return true if number is perfect square", function(done){
		let l = true;
		tests_true.map(i =>{
			if(!isFullSquare(i))
				l = false;
		})
		for (let n of tt){
			if(!isFullSquare(n))
				l = false;
		}
		expect(l).to.equal(true);
		done();
	});
	it("Should return false if number is not perfect square", function(done){
		let l = false;
		tests_false.map(i =>{
			if(isFullSquare(i))
				l = true;
		})
		expect(l).to.equal(false);
		done();
	});
	it("Should return false if number is not positive", function(done){
		expect(isFullSquare(0n)).to.equal(true);
		expect(isFullSquare(-4n)).to.equal(false);
		expect(isFullSquare(-5n)).to.equal(false);
		done();
	});
});