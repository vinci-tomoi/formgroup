$(function() {

  $(document).on('click', '#adduser', function() {
    
    $(this).before('<p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"><input type="button" value="×" id="removeuser" class="remove"></p>');

  })

  $(document).on('click', '#removeuser', function() {
    
    $(this).parent().remove();

  })


  $('#addgroup').click(function() {
    $(this).before('<form id="group"><label for="name_g">グループ名</label><input type="text" name="name_g"  id="name_g" class="name_g" form="fileop"><div id="users"><p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"><input type="button" value="×" id="removeuser" class="remove"></p></div><input type="button" value="+" id="adduser"><div id="removegroup"><input type="button" value="×" class="remove"></div></form>');
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
    // setBlobUrl("download", formJson);

    var link = document.createElement('a');
    var blob = new Blob([ formJson ], { "type" : "application/x-msdownload" });
    link.href = window.URL.createObjectURL(blob);
    link.download = "user.json";
    link.click();

  });

  var operation = document.forms.fileop;

  operation.load.addEventListener("change", function(e) {
    var result = e.target.files[0];

    var reader = new FileReader();
    reader.readAsText(result);
    reader.onload = function(e){
      var readJson = JSON.parse(reader.result);
      console.log(readJson);

      $.each(readJson, function(index, val) {

        if (index === 0) {
          $('#name_g').val(val.name);
          
          for (var i = 0; i < val.users.length; i++) {

            if (i === 0) {
              $('#name_u').val(val.users[0]);
            } else {
              $('#groups > form:first').find('#users').append('<p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite"><input type="button" value="×" id="removeuser" class="remove"></p>');
              $("input[value='rewrite']").attr('value', val.users[i]);
              console.log(val.users[i]);
              // $('#groups > form:first').find('#users').css('color', '#FF0000');
            }

          }


        } else {

          $('#groups').append('<form id="group" name="group"><label for="name_g">グループ名</label><input type="text" name="name_g"  id="name_g" class="name_g" form="fileop" value="rewrite"><div id="users"><p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite2"><input type="button" value="×" id="removeuser" class="remove"></p></div><input type="button" value="+" id="adduser"><div id="removegroup"><input type="button" value="×" class="remove"></div></form>');

          $("input[value='rewrite']").attr('value', val.name);

          for (var i = 0; i < val.users.length; i++) {

            if (i === 0) {
              $("input[value='rewrite2']").attr('value', val.users[0]);
            } else {
              $('#groups > form:last').find('#users').append('<p id="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite"><input type="button" value="×" id="removeuser" class="remove"></p>');
              $("input[value='rewrite']").attr('value', val.users[i]);
              console.log(val.users[i]);
            }

          }

        }

      });


    }

  })
  

});