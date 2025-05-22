let AdminService = {
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
              <a href="#single_event_admin" onclick="AdminService.getSingleEvent(${event.event_id})">${event.title}</a>
            </h3>
            <p>${event.date} · ${event.time}</p>
            <p>${event.description}</p>
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
    RestClient.get("events/" + event_id, function (event) {
      console.log(event);
      const singleEvent = document.getElementById("event-details-admin");
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
                <div class="text-center"></div>
              </div>
              <div class="text-center mt-3">
                <a class="btn btn-primary btn-lg me-2">Edit Event</a>
                <a class="btn btn-danger btn-lg">Delete Event</a>
              </div>
            </div>
      `;
    });
  },

  editEvent: function (event_id) {
    RestClient.get("events/" + event_id, function (event) {
      const newTitle = prompt("Edit event title:", event.title);
      if (newTitle === null) return;

      const newDescription = prompt(
        "Edit event description:",
        event.description
      );
      if (newDescription === null) return;

      const newDate = prompt("Edit event date (YYYY-MM-DD):", event.date);
      if (newDate === null) return;

      const newTime = prompt("Edit event time (HH:MM):", event.time);
      if (newTime === null) return;

      const updatedEvent = {
        title: newTitle,
        description: newDescription,
        date: newDate,
        time: newTime,
      };

      RestClient.put("events/" + event_id, updatedEvent, function (response) {
        alert("Event updated!");
        AdminService.getAllEvents();
      });
    });
  },

  getAllUsers: function () {
    RestClient.get("events/" + event_id, function (event) {
      document.getElementById("edit_event_title").value = event.title || "";
      document.getElementById("edit_event_date").value = event.date || "";
      document.getElementById("edit_event_time").value = event.time || "";
      document.getElementById("edit_event_location").value =
        event.location || "";
      document.getElementById("edit_event_description").value =
        event.description || "";
      document
        .getElementById("edit-event-form")
        .setAttribute("data-event-id", event_id);
    });
  },
};
