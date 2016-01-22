'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './login.routes';
import LoginController from './login.controller';
import authService from '../../services/auth.service';

import './css/login.styl';

export default angular.module('app.login', [uirouter, authService])
  .config(routing)
  .controller('LoginController', LoginController)
  .name;
