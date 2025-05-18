// filepath: /c:/xampp/htdocs/MirnaLjiljic/webprogramming2025/theevent-gh-pages/theevent-gh-pages/js/app/app.js
$(document).ready(function () {
  console.log("App initialization started");

  $(document).ready(function () {
    // Function to handle section visibility based on URL hash
    function handleSectionVisibility() {
      var hash = window.location.hash; // Get the current URL hash

      // Hide all sections with data-load attribute
      $("[data-load]").hide();

      // Show the section corresponding to the current hash
      if (hash) {
        $(hash).show();
      } else {
        $("#home").show(); // Default to showing the home section if no hash is present
      }
    }

    // Initial check on page load
    handleSectionVisibility();

    // Listen for hash changes
    $(window).on("hashchange", function () {
      handleSectionVisibility();
    });

    // Modified click handler for navigation links
    $("#nav-menu-container a, #logo a").on("click", function (e) {
      e.preventDefault();
      var href = $(this).attr("href").replace("#", "");

      // Update the URL hash
      window.location.hash = href;

      // Manually trigger hashchange event
      $(window).trigger("hashchange");
    });

    // Handle event details link click
    $(document).on("click", "a[href^='#event-details']", function (e) {
      e.preventDefault();
      var href = "views/single_event_user.html";

      // Load the single event content
      $("#event-details").load(href, function (response, status, xhr) {
        if (status == "error") {
          console.error("Failed to load file:", href);
          console.error("Error:", xhr.status, xhr.statusText);
        } else {
          console.log("File loaded successfully:", href);
        }
      });

      // Show the event details section
      $("[data-load]").hide();
      $("#event-details").show();

      // Update the URL hash
      window.location.hash = "event-details";
    });
  });

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

    var href = "views/single_event_user.html";
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

// Function to open the edit modal and populate the form
function openEditModal(title, date, time, location, description, image) {
  // Populate the form fields with the event details
  document.getElementById("edit_event_title").value = title;
  document.getElementById("edit_event_date").value = date;
  document.getElementById("edit_event_time").value = time;
  document.getElementById("edit_event_location").value = location;
  document.getElementById("edit_event_description").value = description;
  // Note: For the image, you can display the current image and allow the user to upload a new one.

  // Open the modal
  $("#editEventModal").modal("show");
}

// Function to handle form submission (save changes)
// document
//   .getElementById("edit-event-form")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();

//     // Get the updated values from the form
//     const updatedEvent = {
//       title: document.getElementById("edit_event_title").value,
//       date: document.getElementById("edit_event_date").value,
//       time: document.getElementById("edit_event_time").value,
//       location: document.getElementById("edit_event_location").value,
//       description: document.getElementById("edit_event_description").value,
//       image: document.getElementById("edit_event_image").files[0] || null, // Handle file upload
//     };

//     // Perform the update action (e.g., send an AJAX request to the server)
//     console.log("Updated Event:", updatedEvent);

//     // Close the modal after saving
//     $("#editEventModal").modal("hide");
//   });

// Function to handle deleting an event
function deleteEvent(eventName) {
  // Show a confirmation dialog
  const isConfirmed = confirm(
    `Are you sure you want to delete the event: ${eventName}?`
  );

  if (isConfirmed) {
    // Perform the delete action (e.g., send an AJAX request to the server)
    console.log(`Deleting event: ${eventName}`);

    // Example: Remove the event card from the DOM
    const eventCard = document
      .querySelector(`h3:contains('${eventName}')`)
      .closest(".col-lg-4");
    if (eventCard) {
      eventCard.remove();
    }

    // Optionally, show a success message
    alert(`Event "${eventName}" has been deleted successfully.`);
  } else {
    // User clicked "Cancel", do nothing
    console.log("Delete action canceled.");
  }
}
