var UserService = {
  init: function () {
    var token = localStorage.getItem("user_token");
    if (token && token !== undefined) {
      window.location.replace("index.html");
    }

    // Login form validation
    $("#login-form").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 20,
        },
      },
      messages: {
        email: {
          required: "Please enter your email",
          email: "Please enter a valid email address",
        },
        password: {
          required: "Please enter your password",
          minlength: "Password must be at least 8 characters long",
          maxlength: "Password cannot be longer than 20 characters",
        },
      },
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.login(entity);
        form.reset();
      },
    });

    // Register form validation
    $("#register-form").validate({
      rules: {
        name: "required",
        username: {
          required: true,
          minlength: 3,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 8,
          maxlength: 20,
        },
      },
      messages: {
        name: "Please enter your name",
        email: {
          required: "Please enter your email",
          email: "Please enter a valid email address",
        },
        password: {
          required: "Please enter a password",
          minlength: "Password must be at least 8 characters long",
          maxlength: "Password cannot be longer than 20 characters",
        },
      },
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.register(entity);
        form.reset();
      },
    });
  },
  register: function (entity) {
    $.blockUI({ message: "<h3>Processing...</h3>" });
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/register",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $.unblockUI();
        toastr.success("Registration successful! You can now log in.");
        window.location.replace("login.html");
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $.unblockUI();
        toastr.error(
          XMLHttpRequest?.responseText ? XMLHttpRequest.responseText : "Error"
        );
      },
    });
  },

  login: function (entity) {
    $.blockUI({ message: "<h3>Processing...</h3>" });
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/login",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        $.unblockUI();
        localStorage.setItem("user_token", result.data.token);
        localStorage.setItem("role", result.data.role);
        localStorage.setItem("user_id", result.data.user_id);
        window.location.replace("index.html");
        if (result.data.role === Constants.USER_ROLE) {
          window.location.hash = "#home";
        } else if (result.data.role === Constants.ADMIN_ROLE) {
          window.location.hash = "#admin";
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        $.unblockUI();
        toastr.error(
          XMLHttpRequest?.responseText ? XMLHttpRequest.responseText : "Error"
        );
      },
    });
  },

  logout: function () {
    localStorage.clear();
    window.location.replace("login.html");
  },
  generateMenuItems: function () {
    const token = localStorage.getItem("user_token");

    if (token) {
      const user = Utils.parseJwt(token).user;
      let nav = "";
      let main = "";
      switch (user.role) {
        case Constants.USER_ROLE:
          nav = `
          <div class="container">
            <div id="logo" class="pull-left">
              <a href="#home" class="scrollto">
                <img src="assets/img/mirna-logo-final.png" alt="" title="" />
              </a>
            </div>

            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li class="menu-active"><a href="#home">Home</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#profile">Profile</a></li>
              </ul>
            </nav>
          </div>
          `;
          $("#header").html(nav);
          main = `
          <section id="home" data-load="home.html"></section>
          <section id="single_event_user" data-load="single_event_user.html"></section>
          <section id="events" data-load="events.html"></section>
          <section id="faq" data-load="faq.html"></section>
          <section id="profile" data-load="profile.html"></section>
          <section id="subscribe" data-load="subscribe.html"></section>
          <section id="buy-tickets" data-load="buy-tickets.html"></section>
          `;
          $("#spapp").html(main);
          break;
        case Constants.ADMIN_ROLE:
          nav = `
          <div class="container">
            <div id="logo" class="pull-left">
              <a href="#admin" class="scrollto">
                <img src="assets/img/mirna-logo-final.png" alt="" title="" />
              </a>
            </div>
            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li><a href="#admin">Admin</a></li>
                <li><a href="#profile">Profile</a></li> 
              </ul>
            </nav>
          </div>
          `;
          $("#header").html(nav);
          main = `
          <section id="admin" data-load="admin.html"></section>
          <section id="profile" data-load="profile.html"></section>
          <section id="admin-manage-events" data-load="admin-manage-events.html"></section>
          <section id="admin-manage-users" data-load="admin-manage-users.html"></section>
          <section id="admin-manage-newsletters" data-load="admin-manage-newsletters.html"></section>
          <section id="admin-manage-reservations" data-load="admin-manage-reservations.html"></section>
          <section id="single_event_admin" data-load="single_event_admin.html"></section>
          `;
          $("#spapp").html(main);
          break;
        default:
          $("#header").html(nav);
          $("#spapp").html(main);
      }
    } else {
      window.location.replace("login.html");
    }
  },
};
