/*
function a()
{
  consolog.log('A');
}
*/

var a = function()
{
  console.log('A');
}

function slowfunc(callback)
{
  callback();
}

slowfunc(a);
