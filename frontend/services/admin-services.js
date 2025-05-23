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
            <p>${event.description}</p>
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
    window.location.hash = "#single_event_admin";
    RestClient.get("events/" + event_id, function (response) {
      const event = response;
      console.log(event);
      const singleEvent = document.getElementById("event-details-admin");
      if (singleEvent) {
        singleEvent.innerHTML = `
            <div class="col-md-6">
              <div class="event-photos">
                <img src="assets/${event.image}" class="img-fluid" alt="Event Photo 1" />
              </div>
            </div>

            <div class="col-md-6">
              <div class="event-info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="text-center"></div>
              </div>
              <div class="text-center mt-3">
                <a class="btn btn-primary btn-lg me-2">Edit Event</a>
                <a class="btn btn-danger btn-lg">Delete Event</a>
              </div>
            </div>
          `;
      }
    });
  },

  editEvent: function (id) {
    RestClient.get(`events/${id}`, function (event) {
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
};
