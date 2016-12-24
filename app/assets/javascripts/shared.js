function submit_all_forms() {
  var key = localStorage.getItem("key");
  $(".input_data").each(function(index) {
    $(this).val(sjcl.encrypt(key, $(this).val()));
  });

  $('form').each(function () {
    var action = $(this).attr("action");
    var data = $(this).serialize();

    $.ajax({
      url: action,
      data: data,
      type: 'POST',
      success: function (data) {
        console.log(action);
      },
      failure: function (data) {
        console.log(data);
      }
    });
  });

  window.location = "/multi_edit"
}

$(document).on('ready page:load turbolinks:load', function() {
  $("#save_all").unbind('click', submit_all_forms);
  $("#save_all").bind('click', submit_all_forms);
});
