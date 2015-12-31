import angular from 'angular';
import uirouter from 'angular-ui-router';

import home from './modules/home/index';
import login from './modules/login/index';

import routing from './app.config';

angular.module('app', [uirouter, home, login])
  .config(routing);