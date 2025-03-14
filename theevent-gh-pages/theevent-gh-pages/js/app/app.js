// $(document).ready(function(){
//     $('[data-load]').hide();
//     $('#home').show();

//     $.spapp({
//         templateDir: 'views/', // 改用相对路径
//         defaultView: 'home',
//         pageNotFound: 'home'
//     });

//     // 添加调试日志
//     $(document).ajaxError(function(event, jqxhr, settings, thrownError) {
//         console.log('Ajax error:', settings.url, thrownError);
//     });

//     $('#nav-menu-container a, #logo a').on('click', function(e){
//         e.preventDefault();
//         e.stopPropagation();
//         var href = $(this).attr('href').replace('#', '');
//         console.log('Loading page:', href); // 添加调试日志

//         $('[data-load]').hide();
//         $('#' + href).show();

//         window.location.hash = href;
//         loadPage(href);
//         return false;
//     });

//     $(document).on('spapp.page.ready', function(){
//         $('.nav-menu li').removeClass('menu-active');
//         $('.nav-menu li a[href="#' + window.location.hash.slice(1) + '"]').parent().addClass('menu-active');

//         initComponents();
//     });

//     // Add this to handle initial page load
//     if (window.location.hash) {
//         loadPage(window.location.hash.slice(1));
//     } else {
//         loadPage('home');
//     }
// });

$(document).ready(function () {
  // Debug logging
  console.log("App initialization started");

  // Initialize sections
  $("[data-load]").hide();
  $("#home").show(); // Change from #home to #home to match your HTML

  $.spapp({
    templateDir: "./views/", // Use relative path
    defaultView: "home", // Change to match your first section
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
    window.loadPage(href); // Use window.loadPage instead of loadPage
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
