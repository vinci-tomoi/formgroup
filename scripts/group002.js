$(function() {

  var input_u = '<p id="user" class="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"><input type="button" value="×" id="removeuser" class="remove"></p>';

  var input_g = '<form name="group" id="group" class="group"><label for="name_g">グループ名</label><input type="text" name="name_g"  id="name_g" class="name_g" form="fileop"><div id="users" class="users"><p id="user" class="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop"></p></div><input type="button" value="+" id="adduser"><div id="removegroup" class="removegroup"><input type="button" value="×" class="remove_g"></div></form>';

  $(document).on('click', '#adduser', function() {

    var count = $(this).prev().children().length;

    if (count === 1) {
      $(this).prev().children('p:first').append('<input type="button" value="×" id="removeuser" class="remove"></input>');
    }
   

    $(this).prev().append(input_u);

    

  })

  $(document).on('click', '.remove', function() {

    var count = $(this).parents('.users').find('.user').length;

    if (count === 2) {
      $(this).parent().siblings().find('input:last').remove();
    }

    $(this).parent().remove();

  })


  $(document).on('click', '#addgroup', function() {

    var count = $(this).prev().children().length;

    if (count === 1) {
      $(this).prev().children('form:first').append('<div id="removegroup" class="removegroup"><input type="button" value="×" class="remove_g"></div>');
    }
   

    $(this).prev().append(input_g);

    

  })


  $(document).on('click', '.removegroup', function() {

    var count = $(this).parents('.groups').find('.group').length;

    if (count === 2) {
      $(this).parent().siblings().find('div:last').remove();
    }

    $(this).parent().remove();

  })
  

  $('#save').click(() => {
    
    var empty = false;

    $('#groups form').each(function() {

      if ($(this).find('.name_g').val() === '') {
        alert("未入力のグループ名があります。");
        empty = true;
        return false;
      }

      $(this).find('p .name_u').each(function() {
        if($(this).val() === '') {
          alert("未入力のユーザー名があります。");
          empty = true;
          return false;
        }
      });

    });

    if(empty) {
      return false;
    }


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

    var link = document.createElement('a');
    var blob = new Blob([ base ], { "type" : "application/x-msdownload" });
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

      // 画面の初期化
      if ($('#groups form').length >= 2) {
        $('#groups form:first').nextAll('form').remove();
        $('#groups form:first').find('div:last').remove();
      }
      if ($('.group p').length >= 2) {
        $('.group p:first').nextAll('p').remove();
        $('.group p:first').find('input:last').remove();
      }

      var readJson = JSON.parse(reader.result);

      $.each(readJson, function(index, val) {



        if (index === 0) {
          $('#name_g').val(val.name);
          
          for (var i = 0; i < val.users.length; i++) {

            if (i === 0) {
              $('#name_u').val(val.users[0]);
            } else {
              $('#groups > form:first').find('#users').append('<p id="user" class="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite"><input type="button" value="×" id="removeuser" class="remove"></p>');
              $("input[value='rewrite']").attr('value', val.users[i]);
              console.log(val.users[i]);
              // $('#groups > form:first').find('#users').css('color', '#FF0000');
            }

          }


        } else {

          $('#groups').append('<form id="group" name="group" class="group"><label for="name_g">グループ名</label><input type="text" name="name_g"  id="name_g" class="name_g" form="fileop" value="rewrite"><div id="users"><p id="user" class="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite2"><input type="button" value="×" id="removeuser" class="remove"></p></div><input type="button" value="+" id="adduser"><div id="removegroup" class="removegroup"><input type="button" value="×" class="remove"></div></form>');

          $("input[value='rewrite']").attr('value', val.name);

          for (var i = 0; i < val.users.length; i++) {

            if (i === 0) {
              $("input[value='rewrite2']").attr('value', val.users[0]);
            } else {
              $('#groups > form:last').find('#users').append('<p id="user" class="user"><label for="name_u">ユーザ名</label><input type="text" name="name_u" id="name_u" class="name_u" form="fileop" value="rewrite"><input type="button" value="×" id="removeuser" class="remove"></p>');
              $("input[value='rewrite']").attr('value', val.users[i]);
              console.log(val.users[i]);
            }

          }

        }

      });


    }

  })
  

});