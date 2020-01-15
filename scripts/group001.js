$(function() {

  // $('#adduser').click(function() {
  //   $(this).before('<p id="user">ユーザ名<input type="text" name="name_u" class="name_u"><input type="button" value="×" id="removeuser" class="remove"></p>');
  // });

  $(document).on('click', '#adduser', function() {
    
    $(this).before('<p id="user">ユーザ名<input type="text" name="name_u" class="name_u"><input type="button" value="×" id="removeuser" class="remove"></p>');

  })

  $(document).on('click', '#removeuser', function() {
    
    $('#user').remove();

  })


  $('#addgroup').click(function() {
    $(this).before('<div id="group">グループ名<input type="text" name="name_g" class="name_g"><p id="user">ユーザ名<input type="text" name="name_u" class="name_u"><input type="button" value="×" id="removeuser" class="remove"></p><input type="button" value="+" id="adduser"><div id="removegroup"><input type="button" value="×" class="remove"></div></div>');
  });

  $(document).on('click', '#removegroup', function() {
    
    $('#group').remove();

  })


  

});