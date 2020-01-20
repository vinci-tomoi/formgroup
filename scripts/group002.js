$(function() {

  $(document).on('click', '#adduser', function() {
    
    $(this).before('<p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"><input type="button" value="×" id="removeuser" class="remove"></p>');

  })

  $(document).on('click', '#removeuser', function() {
    
    $(this).parent().remove();

  })


  $('#addgroup').click(function() {
    $(this).before('<form id="group"><label for="name_g">グループ名</label><input type="text" name="name_g"  id="name_g" class="name_g" form="fileop"><p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"><input type="button" value="×" id="removeuser" class="remove"></p><input type="button" value="+" id="adduser"><div id="removegroup"><input type="button" value="×" class="remove"></div></form>');
  });

  $(document).on('click', '#removegroup', function() {
    
    $('#group').remove();

  })

  $('#save').click(() => {
    var form = $('#fileop');
    var formData = form.serializeArray();
    var formstr = '{"name":"' + formData[0].value + '","users":[';
    for ( let i = 1; i < formData.length; i++ ) {
      formstr = formstr + '"' + formData[i].value + '"' + ',';
    }
    formstr = formstr.slice(0, -1) + ']}';
    console.log(formstr);
    var formJson = JSON.stringify(formstr);
    setBlobUrl("download", formJson);
  });
  

  const setBlobUrl = (id, content) => {

    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });

    window.URL = window.URL || window.webkitURL;
    $("#" + id).attr("href", window.URL.createObjectURL(blob));
    $("#" + id).attr("download", "user.json");

  };


  

});