var UserService = {
  init: function () {
    var token = localStorage.getItem("user_token");
    if (token && token !== undefined) {
      window.location.replace("index.html");
    }
    $("#login-form").validate({
      submitHandler: function (form) {
        var entity = Object.fromEntries(new FormData(form).entries());
        UserService.login(entity);
      },
    });
  },
  login: function (entity) {
    $.ajax({
      url: Constants.PROJECT_BASE_URL + "auth/login",
      type: "POST",
      data: JSON.stringify(entity),
      contentType: "application/json",
      dataType: "json",
      success: function (result) {
        console.log(result);
        localStorage.setItem("user_token", result.data.token);
        if (result.data.role === Constants.USER_ROLE) {
          window.location.hash = "#home";
          window.location.reload();
        } else if (result.data.role === Constants.ADMIN_ROLE) {
          window.location.hash = "#admin";
          // window.location.reload();
        }
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
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
                <img src="img/mirna-logo-final.png" alt="" title="" />
              </a>
            </div>

            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li class="menu-active"><a href="#home">Home</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#profile">Profile</a></li>
              </ul>
            </nav>
          </div>
          `;
          $("#header").html(nav);
          main = `
          <section id="home" data-load="true" data-url="views/home.html"></section>
          <section id="contact" data-load="true" data-url="contact.html"></section>
          <section
            id="single_event_user"
            data-load="single_event_user.html"
            style="display: block !important"
          ></section>
          <section id="events" data-load="true" data-url="events.html"></section>
          <section id="faq" data-load="true" data-url="faq.html"></section>
          <section id="profile" data-load="true" data-url="profile.html"></section>
          <section
            id="subscribe"
            data-load="true"
            data-url="subscribe.html"
          ></section>
          `;
          $("#spapp").html(main);
          break;
        case Constants.ADMIN_ROLE:
          nav = `
          <div class="container">
            <div id="logo" class="pull-left">
              <a href="#home" class="scrollto">
                <img src="img/mirna-logo-final.png" alt="" title="" />
              </a>
            </div>
            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li><a href="#admin">Admin</a></li>
              </ul>
            </nav>
          </div>
          `;
          $("#header").html(nav);
          main = `
          <section
            id="admin"
            data-load="true"
            data-url="views/admin.html"
          ></section>
          <section
            id="admin-manage-events"
            data-load="true"
            data-url="views/admin-manage-events.html"
          ></section>
          <section
            id="admin-manage-users"
            data-load="true"
            data-url="views/admin-manage-users.html"
          ></section>
          `;
          $("#spapp").html(main);
          break;
        default:
          $("#header").html(nav);
          $("#spapp").html(main);
      }
    } else {
      window.location.hash = "#login";
    }
  },
};
