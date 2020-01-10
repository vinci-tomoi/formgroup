$(function() {

  $('#adduser').click(function() {
    $(this).before('<p>');
  });

  $('#removeuser').click(function() {
    $('#name_u').remove();
  });

  var user = $('<p>');
  var name_u = $('<input type="text">');
  var remove_u = $('<input type="button" value="×">');

  user.append(name_u);
  user.append(remove_u);

  

});