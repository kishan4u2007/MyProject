$(document).ready(function() {
  var bar = document.getElementById("bar");
  var button = document.getElementById("giveNow");
  var input = document.getElementById("bar1_val");
  function setValue(b1) {
    var maxValue = 100;    
    if (b1 > maxValue) maxValue = b1;
    var perc1 = b1 * 100 / maxValue;
    $('#bar1').animate({
        width: perc1 + "%"
    }, 500) 
}
//get input value on click run set value function
  $('.bar_val').click(function () {
      var val1 = $('#bar1_val').val();   
      setValue(val1)
  });
})

