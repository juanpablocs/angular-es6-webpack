'use strict';

class HomeController {

  constructor(auth) {
    this.authSvc = auth;

    this.isAuth = this.authSvc.isAuth();

    if (this.isAuth) {
      this.user = this.authSvc.getUser();
    }
  }

  logout(event) {
    event.preventDefault();
    this.authSvc.logout();
    this.isAuth = false;
    this.user = null;
  }

}

HomeController.$inject = ['auth'];

export default HomeController;
