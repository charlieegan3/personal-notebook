$(document).on('ready page:load turbolinks:load', function() {
  $("#expand_textarea").click(function() {
    var textarea = $("#note_content");
    var new_row_count = parseInt(textarea.attr("rows")) + 1;
    textarea.attr("rows", new_row_count.toString());
  });
});
