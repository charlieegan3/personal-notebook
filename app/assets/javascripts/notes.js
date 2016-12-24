function append_password() {
  $.getJSON('/words.json', function(words) {
    var phrase = [];
    for (var i = 0; i < 4; i++) {
      phrase.push(words[Math.floor(Math.random()*words.length)]);
    }

    $("#note_content").val($("#note_content").val() + "\n\n" + phrase.join(' '));
  });
}

$(document).on('ready page:load turbolinks:load', function() {
  $("#expand_textarea").click(function() {
    var textarea = $("#note_content");
    var new_row_count = parseInt(textarea.attr("rows")) + 1;
    textarea.attr("rows", new_row_count.toString());
  });

  $("#generate_password").unbind('click', append_password);
  $("#generate_password").bind('click', append_password);
});
