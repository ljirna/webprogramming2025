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
              <a href="#buy-tickets" class="btn btn-primary btn-lg px-5">
                <i class="fa fa-ticket"></i> Reserve Tickets
              </a>
              </div>
            </div>
          </div>
        </div>
      `;
      }
      localStorage.setItem("selected_event_id", event_id);
      UserSideService.loadEventGallery(event_id);
    });
  },

  loadEventGallery: function (event_id) {
    RestClient.get("event_images/" + event_id, function (images) {
      const galleryGrid = document.querySelector(".gallery-grid");
      if (!galleryGrid) return;
      galleryGrid.innerHTML = "";
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

  subscribeNewsletter: function (email) {
    RestClient.post(
      "newsletter",
      { email: email },
      function (response) {
        if (window.toastr) {
          toastr.success("Subscribed successfully!");
        }
        const form = document.getElementById("newsletter-form");
        if (form) form.reset();
      },
      function (error) {
        if (window.toastr) {
          toastr.error("Subscription failed. Please try again.");
        }
      }
    );
  },

  reserveTicket: function (user_id, event_id, ticket_type) {
    RestClient.post(
      "reservations",
      {
        user_id: user_id,
        event_id: event_id,
        ticket_type: ticket_type,
      },
      function (response) {
        if (window.toastr) {
          toastr.success("Reservation successful!");
        }
        const form = document.getElementById("reserve-ticket-form");
        if (form) form.reset();
      },
      function (error) {
        if (window.toastr) {
          toastr.error("Reservation failed. Please try again.");
        }
      }
    );
  },
  initReserveFormHandler: function () {
    var form = document.getElementById("reserve-ticket-form");
    if (form) {
      form.onsubmit = function (e) {
        e.preventDefault();
        var ticketTypeRaw = document.getElementById("ticket-type").value;
        var ticketType = "standard";
        if (ticketTypeRaw === "pro-access") ticketType = "pro";
        if (ticketTypeRaw === "premium-access") ticketType = "vip";
        var eventId = localStorage.getItem("selected_event_id");
        var userId = localStorage.getItem("user_id");
        UserSideService.reserveTicket(userId, eventId, ticketType);
        if (typeof $ !== "undefined" && $("#buy-ticket-modal").length) {
          $("#buy-ticket-modal").modal("hide");
        }
      };
    }
  },
  getUserReservations: function () {
    const userId = localStorage.getItem("user_id");
    if (!userId) return;
    RestClient.get("reservations/user/" + userId, function (reservations) {
      const container = document.getElementById("user-reservations-list");
      if (!container) return;
      container.innerHTML = "";
      reservations.forEach(function (res) {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";

        const card = document.createElement("div");
        card.className = "card h-100";
        card.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">Event: ${res.event_title || res.event_id}</h5>
      <p class="card-text"><strong>Type:</strong> ${res.ticket_type}</p>
      <p class="card-text"><strong>Date:</strong> ${res.event_date || ""}</p>
      <p class="card-text"><strong>Time:</strong> ${res.event_time || ""}</p>
      <button class="btn btn-danger btn-sm mt-2 delete-reservation-btn" data-id="${
        res.reservation_id
      }">
        Delete Reservation
      </button>
    </div>
  `;
        col.appendChild(card);
        container.appendChild(col);
      });
      container
        .querySelectorAll(".delete-reservation-btn")
        .forEach(function (btn) {
          btn.addEventListener("click", function () {
            const reservationId = this.getAttribute("data-id");
            if (confirm("Are you sure you want to delete this reservation?")) {
              RestClient.delete(
                "reservations/" + reservationId,
                {},
                function (response) {
                  toastr.success("Reservation deleted.");
                  UserSideService.getUserReservations();
                },
                function (error) {
                  toastr.error("Failed to delete reservation.");
                }
              );
            }
          });
        });
    });
  },
};
