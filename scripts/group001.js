$(function() {

  $('#adduser').click(function() {
    $(this).before('<p id="name_u">ユーザ名<input type="text" name="name_u"><input type="button" value="×" id="removeuser"></p>');
  });

  // $('#removeuser').click(function() {
  //   $('#name_u').remove();
  // });

  $(document).on('click', '#removeuser', function() {
    
    $('#name_u').remove();

})
  

});