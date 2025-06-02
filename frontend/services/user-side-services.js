let UserSideService = {
  // Fetch all events for the events page
  getAllEvents: function () {
    RestClient.get("events", function (data) {
      const container = document.getElementById("events-list");
      if (!container) return;
      container.innerHTML = "";
      data.forEach((event) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-6";
        div.innerHTML = `
          <div class="speaker">
            <img src="${event.image}" class="img-fluid" />
            <div class="details">
              <h3>
                <a href="javascript:void(0)" onclick="UserSideService.getSingleEvent(${event.event_id})">${event.title}</a>
              </h3>
              <p>${event.date} · ${event.time}</p>
            </div>
          </div>
        `;
        container.appendChild(div);
      });
    });
  },

  // Fetch first 6 events for the home page
  getSixEvents: function () {
    RestClient.get("events/six", function (data) {
      const container = document.getElementById("home-events-list");
      if (!container) return;
      container.innerHTML = "";
      data.forEach((event) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-6";
        div.innerHTML = `
          <div class="speaker">
            <img src="${event.image}" class="img-fluid" />
            <div class="details">
              <h3>
                <a href="javascript:void(0)" onclick="UserSideService.getSingleEvent(${event.event_id})">${event.title}</a>
              </h3>
              <p>${event.date} · ${event.time}</p>
            </div>
          </div>
        `;
        container.appendChild(div);
      });
    });
  },

  getSingleEvent: function (event_id) {
    window.location.hash = "#single_event_user";
    RestClient.get("events/" + event_id, function (event) {
      const singleEvent = document.getElementById("event-details-user");
      if (singleEvent) {
        singleEvent.innerHTML = `
        <div class="row align-items-center">
          <div class="col-md-6 mb-4 mb-md-0">
            <div class="event-photos text-center">
              <img src="${event.image}" class="img-fluid rounded shadow" alt="Event Photo" style="max-height:350px;object-fit:cover;" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="event-info p-4 bg-light rounded shadow-sm">
              <h2 class="mb-3">${event.title}</h2>
              <p class="mb-2"><strong>Date:</strong> ${event.date}</p>
              <p class="mb-2"><strong>Time:</strong> ${event.time}</p>
              <p class="mb-2"><strong>Location:</strong> ${event.location}</p>
              <p class="mb-4">${event.description}</p>
              <div class="text-center">
                <a href="#reserve" class="btn btn-primary btn-lg px-5">
                  <i class="fa fa-ticket"></i> Reserve Tickets
                </a>
              </div>
            </div>
          </div>
        </div>
      `;
      }
      UserSideService.loadEventGallery(event_id);
    });
  },
  loadEventGallery: function (event_id) {
    RestClient.get("event_images/" + event_id, function (images) {
      const galleryGrid = document.querySelector(".gallery-grid");
      if (!galleryGrid) return;
      galleryGrid.innerHTML = "";
      // Add grid styling
      galleryGrid.style.display = "grid";
      galleryGrid.style.gridTemplateColumns =
        "repeat(auto-fit, minmax(260px, 1fr))";
      galleryGrid.style.gap = "20px";
      galleryGrid.style.justifyItems = "center";
      if (!images || images.length === 0) {
        galleryGrid.innerHTML =
          "<p class='text-muted'>No gallery images for this event.</p>";
        return;
      }
      images.forEach((img) => {
        const imgElem = document.createElement("img");
        imgElem.src = img.image_url;
        imgElem.alt = "Event Gallery Image";
        imgElem.style =
          "width: 100%; max-width: 350px; height: 220px; object-fit: cover; border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.12);";
        galleryGrid.appendChild(imgElem);
      });
    });
  },
  getUserReservations: function () {
    RestClient.get("reservations/user", function (reservations) {
      const container = document.getElementById("user-reservations-list");
      if (!container) return;
      if (!reservations || reservations.length === 0) {
        container.innerHTML =
          "<p class='text-muted'>You have no reservations yet.</p>";
        return;
      }
      container.innerHTML = "";
      reservations.forEach((res) => {
        // Adjust property names based on your backend response!
        container.innerHTML += `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${
              res.event_title || (res.event && res.event.title) || "Event"
            }</h5>
            <p class="card-text mb-1"><strong>Date:</strong> ${
              res.event_date || (res.event && res.event.date) || ""
            }</p>
            <p class="card-text mb-1"><strong>Location:</strong> ${
              res.event_location || (res.event && res.event.location) || ""
            }</p>
            <p class="card-text mb-1"><strong>Ticket Type:</strong> ${
              res.ticket_type || ""
            }</p>
            <p class="card-text mb-1"><strong>Reservation ID:</strong> ${
              res.id || res.reservation_id || ""
            }</p>
          </div>
        </div>
      `;
      });
    });
  },
};
