// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

function encrypt_input(sender, key) {
  $(sender).find(".input_data").each(function(index) {
    $(this).val(sjcl.encrypt(key, $(this).val()));
  });
}

function decrypt_data(key) {
  $(".input_data").each(function() {
    try {
      if ($(this).val().length > 0) {
        var decrypted = sjcl.decrypt(key, $(this).val());
        $(this).val(decrypted);
      }
    } catch (e) { /* can't decrypt */ }
  });

  $(".data").each(function() {
    try {
      var decrypted = sjcl.decrypt(key, $(this).text());

      if ($(this).hasClass("markdown")) {
        var html = markdown.toHTML(decrypted);
        $(this).html(html);
      } else {
        $(this).text(decrypted);
      }
    } catch (e) { /* can't decrypt */ }
  });
}

$(document).on('ready page:load turbolinks:load', function() {
  $('#key').on('input', function() {
    localStorage.setItem("key", $("#key").val());
    decrypt_data($("#key").val());
  });

  $('#show_key').on('click', function() {
    var key = localStorage.getItem("key");
    $("#key").val(key);
  });

  $('.encrypted_submit').submit(function(e) {
    e.preventDefault();

    var key = localStorage.getItem("key");

    encrypt_input(e.target, key);

    $(this).unbind('submit').submit();
  });

  var key = localStorage.getItem("key");
  decrypt_data(key);
  setTimeout(decrypt_data(key), 500);

  if (key == null || key == "") {
    $("#key").attr("placeholder", "You must set a key here");
  } else {
    $("#key").attr("placeholder", key.length.toString() + " character key hidden");
  }
});
