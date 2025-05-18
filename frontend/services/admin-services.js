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
              <img
                src="${event.image}"
                class="img-fluid"
              />
              <div class="details">
                <h3><a href="javascript:void(0);" onclick="AdminService.getSingleEvent(${event.event_id});">${event.title}</a></h3>
                <p>${event.description}</p>
              </div>
            </div>
        `;
        eventsContainer.appendChild(eventDiv);
      });
    });
  },
  getSingleEvent: function (event_id) {
    window.location.hash = "#single_event_admin";
    RestClient.get("events/" + event_id, function(event) {
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
};
