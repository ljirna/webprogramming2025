let AdminService = {
  //  Functions for managing events
  getAllEvents: function () {
    RestClient.get("events", function (data) {
      const eventsContainer = document.getElementById(
        "events-on-admin-dashboard"
      );
      eventsContainer.innerHTML = "";

      data.forEach((event) => {
        const eventDiv = document.createElement("div");
        eventDiv.className = "col-lg-4 col-md-6";
        eventDiv.innerHTML = `
        <div class="speaker">
          <img src="${event.image}" class="img-fluid" />
          <div class="details">
            <h3>
              <a href="javascript:void(0)" onclick="AdminService.getSingleEvent(${event.event_id})">${event.title}</a>
            </h3>
            <p>${event.date} · ${event.time}</p>
            <p>${event.location}</p>
            <div class="admin-buttons">
              <button class="btn-edit" onclick="AdminService.editEvent(${event.event_id})">Edit</button>
              <button class="btn-delete" onclick="AdminService.deleteEvent(${event.event_id})">Delete</button>
            </div>
          </div>
        </div>
      `;
        eventsContainer.appendChild(eventDiv);
      });
    });
  },

  getSingleEvent: function (event_id) {
    if (event_id === null) {
      event_id = localStorage.getItem("event_id");
    }
    if (
      localStorage.getItem("event_id") !== event_id ||
      localStorage.getItem("event_id") === null
    ) {
      window.localStorage.setItem("event_id", event_id);
    }
    window.localStorage.setItem("event_id", event_id);
    window.location.hash = "#single_event_admin";
    RestClient.get("events/" + event_id, function (response) {
      const event = response;
      console.log(event);
      const singleEvent = document.getElementById("event-details-admin");
      if (singleEvent) {
        singleEvent.innerHTML = `
            <div class="col-md-6">
              <div class="event-photos">
                <img src="${event.image}" class="img-fluid" alt="Event Photo 1" />
              </div>
            </div>

            <div class="col-md-6">
              <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><strong>Location: </strong>${event.location}</p>
                <p><strong>Date: </strong>${event.date}</p>
                <p><strong>Time: </strong>${event.time}</p>
                <div class="text-center"></div>
              </div>
              <div class="text-center mt-3">
                <a class="btn btn-danger btn-lg" href="javascript:void(0)" onclick="AdminService.deleteEvent(${event.event_id})">Delete Event</a>
              </div>
            </div>
          `;
      }
      AdminService.loadEventGallery(event_id);
    });
  },

  editEvent: function (id) {
    RestClient.get(`events/${id}`, function (event) {
      document.getElementById("edit_event_id").value = event.event_id || "";
      document.getElementById("edit_event_title").value = event.title || "";
      document.getElementById("edit_event_date").value = event.date || "";
      document.getElementById("edit_event_time").value = event.time || "";
      document.getElementById("edit_event_location").value =
        event.location || "";
      document.getElementById("edit_event_description").value =
        event.description || "";
      var modal = new bootstrap.Modal(
        document.getElementById("editEventModal")
      );
      modal.show();
    });
  },

  deleteEvent: function (event_id) {
    if (confirm("Are you sure you want to delete this event?")) {
      RestClient.delete("events/" + event_id, {}, function () {
        toastr.success("Event succesfully deleted");
        window.location.hash = "#admin-manage-events";
        AdminService.getAllEvents();
      });
    }
  },

  //Functions for managing users

  getAllUsers: function () {
    RestClient.get("users", function (data) {
      const usersContainer = document.getElementById(
        "users-on-admin-dashboard"
      );
      if (!usersContainer) return;
      usersContainer.innerHTML = "";

      //Sortiranje usera po roli na admin strani
      data.sort((a, b) => {
        if (a.role === "admin" && b.role !== "admin") return -1;
        if (a.role !== "admin" && b.role === "admin") return 1;
        return 0;
      });

      data.forEach((user) => {
        const userDiv = document.createElement("div");
        userDiv.className = "col-lg-4 col-md-6";
        userDiv.id = "user-card-" + user.user_id;
        userDiv.innerHTML = `
          <div class="speaker">
            <div class="details">
              <h3>${user.first_name || ""} ${user.last_name || ""}<h3>
              <p>Username: ${user.username}</p>
              <p>Email: ${user.email || ""}</p>
              <p>Role: ${user.role || ""}</p>
              <div class="admin-buttons">
                <button class="btn-edit" onclick="AdminService.editUser(${
                  user.user_id
                })">Edit</button>
                <button class="btn-delete" onclick="AdminService.deleteUser(${
                  user.user_id
                })">Delete</button>
              </div>
            </div>
          </div>
          `;
        usersContainer.appendChild(userDiv);
      });
    });
  },
  deleteUser: function (user_id) {
    if (confirm("Are you sure you want to delete this user?")) {
      RestClient.delete("users/" + user_id, {}, function () {
        toastr.success("User succesfully deleted");
        AdminService.getAllUsers();
      });
    }
  },
  editUser: function (user_id) {
    RestClient.get("users/" + user_id, function (user) {
      document.getElementById("edit_user_id").value = user.user_id || "";
      document.getElementById("edit_user_username").value = user.username || "";
      document.getElementById("edit_user_first_name").value =
        user.first_name || "";
      document.getElementById("edit_user_last_name").value =
        user.last_name || "";
      document.getElementById("edit_user_email").value = user.email || "";
      document.getElementById("edit_user_role").value = user.role || "user";
      var modal = new bootstrap.Modal(document.getElementById("editUserModal"));
      modal.show();
    });
  },

  //Functions for managing newsletters
  getAllNewsletters: function () {
    RestClient.get("newsletter", function (data) {
      const container = document.getElementById(
        "newsletters-on-admin-dashboard"
      );
      container.innerHTML = "";
      data.forEach((newsletter) => {
        const div = document.createElement("div");
        div.className = "col-lg-4 col-md-6";
        div.innerHTML = `
        <div class="newsletter-card">
          <div class="details">
            <h3>${newsletter.email}</h3>
          </div>
        </div>
      `;
        container.appendChild(div);
      });
    });
  },

  //Functions for managing reservations
  getAllReservations: function () {
    RestClient.get("reservations", function (data) {
      const container = document.getElementById(
        "reservations-on-admin-dashboard"
      );
      container.innerHTML = "";
      data.forEach((reservation) => {
        const div = document.createElement("div");
        div.className = "col-md-6 col-12";
        div.innerHTML = `
        <div class="reservation-card">
          <div class="details">
            <h3>Reservation #${reservation.reservation_id}</h3>
            <p><strong>User:</strong> ${reservation.user_email || "N/A"}</p>
            <p><strong>Event:</strong> ${reservation.event_title || "N/A"}</p>
          </div>
          <div class="admin-actions">
            <button class="btn btn-danger btn-sm" onclick="AdminService.deleteReservation(${
              reservation.reservation_id
            })">Delete</button>
          </div>
        </div>
      `;
        container.appendChild(div);
      });
    });
  },

  deleteReservation: function (reservation_id) {
    if (confirm("Are you sure you want to delete this reservation?")) {
      RestClient.delete(
        "admin/reservations/" + reservation_id,
        {},
        function () {
          toastr.success("Reservation deleted");
          AdminService.getAllReservations();
        }
      );
    }
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
};
