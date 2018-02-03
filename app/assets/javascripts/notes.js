$(document).on('ready page:load turbolinks:load', function() {
  $.each($('textarea'), function() {
    var offset = this.offsetHeight - this.clientHeight;
    var resizeTextarea = function(el) {
      $(el).css('height', 'auto').css('height', el.scrollHeight + offset + 100);
    };
    $(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
  });
});
