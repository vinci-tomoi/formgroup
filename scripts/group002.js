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

    var base = '';

    $.each(formData, function(i, val) {

      if (val.name === "name_g") {
        base = base + '{"name":"' + val.value + '","users":[';
      // データが終わりかどうか
      } else if (i === formData.length - 1) {
        base = base + '"' + val.value + '"]}';
      // ユーザが末尾かどうか
      } else if (formData[i + 1].name === "name_g") {
        base = base + '"' + val.value + '"]},';
      } else {
        base = base + '"' + val.value + '",'
      }

    });

    base = '[' + base + ']';
    console.log(base);

    base = JSON.parse(base);
    var formJson = JSON.stringify(base);
    setBlobUrl("download", formJson);

  });
  

  const setBlobUrl = (id, content) => {

    var blob = new Blob([ content ], { "type" : "application/x-msdownload" });

    window.URL = window.URL || window.webkitURL;
    $("#" + id).attr("href", window.URL.createObjectURL(blob));
    $("#" + id).attr("download", "user.json");

  };


  

});