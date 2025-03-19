// filepath: /c:/xampp/htdocs/MirnaLjiljic/webprogramming2025/theevent-gh-pages/theevent-gh-pages/js/app/app.js
$(document).ready(function () {
  console.log("App initialization started");

  // Initialize sections
  $("[data-load]").hide();
  $("#home").show();

  $.spapp({
    templateDir: "./views/",
    defaultView: "home",
    pageNotFound: "home.html",
  });

  // Modified click handler
  $("#nav-menu-container a, #logo a").on("click", function (e) {
    e.preventDefault();
    console.log("Click detected");

    var href = $(this).attr("href").replace("#", "");
    console.log("Loading section:", href);

    $("[data-load]").hide();
    $("#" + href).show();

    window.location.hash = href;
    window.loadPage(href);
  });

  // Handle event details link click
  $(document).on("click", "a[href^='#event-details']", function (e) {
    e.preventDefault();
    console.log("Loading event details");

    var href = "views/single_event.html";
    console.log("Loading file:", href);

    $("#event-details").load(href, function (response, status, xhr) {
      if (status == "error") {
        console.error("Failed to load file:", href);
        console.error("Error:", xhr.status, xhr.statusText);
      } else {
        console.log("File loaded successfully:", href);
      }
    });

    $("[data-load]").hide();
    $("#event-details").show();

    window.location.hash = "event-details";
  });

  // Add error handling for ajax requests
  $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
    console.error("Ajax error:", {
      url: settings.url,
      status: jqxhr.status,
      error: thrownError,
    });
  });

  // Initial page load
  var initialPage = window.location.hash.slice(1) || "home";
  window.loadPage(initialPage);
});

function initComponents() {
  new WOW().init();
  $(".venobox").venobox();
  $(".owl-carousel").owlCarousel();
}
