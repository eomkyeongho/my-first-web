var IDfirst =
{
  setColor:function(color)
  {
    // document.querySelector('#first').style.color = color;
    $('#first').css('color',color);
  }
}

var Links =
{
  setColor:function(color)
  {
    // var aList = document.querySelectorAll('a');
    //
    // for(let i=0; i<aList.length; i++)
    // {
    //   aList[i].style.background=color;
    // }
    $('a').css('color',color);
  }
}

function changeColor(self)
{
  Links.setColor(self.value);

  if(self.value === 'green')
  {
    IDfirst.setColor('green');
    self.value='red';
  }
  else
  {
    IDfirst.setColor('red');
    self.value='green';
  }
}
