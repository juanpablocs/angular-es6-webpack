'use strict';

class LoginController {
  constructor($state, auth) {
    this.$state = $state;
    this.authSvc = auth;
  }

  login() {
    this.authSvc.login(this.user.name, this.user.password).then(() => {
      this.$state.go('home');
    }).catch(()=>{
      alert('error user=demo, pass=demo');
    });
  }
}

LoginController.$inject = ['$state', 'auth'];

export default LoginController;
