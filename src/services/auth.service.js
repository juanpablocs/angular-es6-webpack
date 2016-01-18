'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

class Auth {
  constructor($http, $q) {
    this.$http = $http;
    this.$q    = $q;
    this.token = localStorage.getItem('token');
    this.user  = localStorage.getItem('user');
  }

  isAuth() {
    return !!this.token;
  }

  getUser() {
    return this.user;
  }

  login(username, password) {
    let deferred = this.$q.defer();
    if(username=='demo' && password=='demo'){
      this.token = 1234566789;
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', username);
      deferred.resolve(true);
    }else{
      deferred.reject(false);
    }
    return deferred.promise;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
  }
}

Auth.$inject = ['$http', '$q'];

export default angular.module('services.auth', [uirouter])
  .service('auth', Auth)
  .name;
