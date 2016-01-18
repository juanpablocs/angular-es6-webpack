'use strict';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './home.routes';
import HomeController from './home.controller';

import authService from '../../services/auth.service';

import './css/home.css'

export default angular.module('app.home', [uirouter, authService])
  .config(routing)
  .controller('HomeController', HomeController)
  .name;
