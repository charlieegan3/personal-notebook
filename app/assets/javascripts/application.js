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
//= require bootstrap
//= require_tree .

function format_input(sender) {
  $(sender).find(".input_data.content_field:not(.encrypted)").each(function(index) {
    var content = $(this).val();
    content = content.replace(/[^\(]http\S+/g, function(m) {
      return " [" + m.replace(/https?:\/\//, "").trim() + "](" + m.trim() + ")"
    });
    $(this).val(content);
  });
}

function encrypt_input(sender, key) {
  var cryptoConfig = { count: 2048, ks: 256 };

  $(sender).find(".input_data:not(.encrypted)").each(function(index) {
    if ($(this).val() != "" && $(this).val()[0] != "{") {
      $(this).val(sjcl.encrypt(key, $(this).val(), cryptoConfig));
    } else {
      $(this).val(sjcl.encrypt(key, "Empty", cryptoConfig));
    }
    $(this).addClass("encrypted");
  });
}

function decrypt_data(key) {
  $(".input_data:not(.decrypted)").each(function() {
    try {
      if ($(this).val().length > 0) {
        var decrypted = sjcl.decrypt(key, $(this).val());
        $(this).val(decrypted);
      }
    } catch (e) {
      console.log($(this).val());
      console.log(e);
      $(this).css("border-color", "red");
    }
    if ($(this).val()[0] != "{") {
      $(this).addClass("decrypted");
    };
  });

  $(".data:not(.decrypted)").each(function() {
    try {
      var decrypted = sjcl.decrypt(key, $(this).text());

      if ($(this).hasClass("markdown")) {
        var html = markdown.toHTML(decrypted);
        $(this).html(html);
      } else {
        $(this).text(decrypted);
      }
    } catch (e) {
      console.log($(this).text());
      console.log(e);
      $(this).css("color", "red");
    }
    if ($(this).text()[0] != "{") {
      $(this).addClass("decrypted");
    }
  });

  $(".markdown p, .markdown li").click(function() {
    $(this).attr("data-clipboard-text", $(this).text().trim());
    $("#clipboard").html("Copied! (" + $(this).text().trim() + ")");
  });
  new Clipboard(".markdown p, .markdown li");
}

$(document).on('turbolinks:load', function() {
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

    format_input(e.target);
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
