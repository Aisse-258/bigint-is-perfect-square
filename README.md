# bigint-is-perfect-square

Checks if BigInt number is a perfect square

===========================

[![NPM](https://nodei.co/npm/bigint-is-perfect-square.png?downloads=true&stars=true)](https://nodei.co/npm/bigint-is-perfect-square/)

===========================

example:
```
var isFullSquare = require('bigint-is-perfect-square');

var r1 = 9n;
console.log(isFullSquare(r1));//true

r1 = 35n;
console.log(isFullSquare(r1));//false

r1 = 82120471531550314555681345949499512621827274120673745141541602816614526075010755373654280259022317599142038423759320355177481886719814621305828811322920076213800348341464996337890625n
console.log(isFullSquare(r1));//true

r1 = -225n;
console.log(isFullSquare(r1));//false

```