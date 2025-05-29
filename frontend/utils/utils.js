let Utils = {
  init_spapp: () => {
    const role = localStorage.getItem("role");
    let href = "";
    if (role === Constants.USER_ROLE) {
      href = "#home";
    } else if (role === Constants.ADMIN_ROLE) {
      href = "#admin";
    }
    var app = $.spapp({
      defaultView: href,
      templateDir: "../frontend/views/",
      reloadView: true,
    });
    app.route({
      view: "home",
      load: "home.html",
    });
    app.route({
      view: "events",
      load: "events.html",
    });
    app.route({
      view: "admin-manage-events",
      load: "admin-manage-events.html",
    });
    app.route({
      view: "admin-manage-users",
      load: "admin-manage-users.html",
    });
    app.route({
      view: "buy-tickets",
      load: "buy-tickets.html",
    });
    app.route({
      view: "faq",
      load: "faq.html",
    });
    app.route({
      view: "gallery",
      load: "gallery.html",
    });
    app.route({
      view: "profile",
      load: "profile.html",
    });
    app.route({
      view: "admin",
      load: "admin.html",
    });
    app.route({
      view: "subscribe",
      load: "subscribe.html",
    });
    app.route({
      view: "single_event_admin",
      load: "single_event_admin.html",
    });
    app.route({
      view: "single_event_user",
      load: "single_event_user.html",
    });
    app.run();
  },
  datatable: function (table_id, columns, data, pageLength = 15) {
    if ($.fn.dataTable.isDataTable("#" + table_id)) {
      $("#" + table_id)
        .DataTable()
        .destroy();
    }
    $("#" + table_id).DataTable({
      data: data,
      columns: columns,
      pageLength: pageLength,
      lengthMenu: [2, 5, 10, 15, 25, 50, 100, "All"],
    });
  },
  parseJwt: function (token) {
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error("Invalid JWT token", e);
      return null;
    }
  },
};
