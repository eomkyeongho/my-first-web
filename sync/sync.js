var fs = require('fs');

/*
console.log('A');
var result = fs.readFileSync('sync/sample.txt', 'utf-8');
console.log(result);
console.log('C');
*/

console.log('A');
fs.readFile('sync/sample.txt', 'utf-8', (err, result) =>{
  console.log(result);
});
console.log('C');
