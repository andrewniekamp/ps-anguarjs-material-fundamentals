/// <reference path="_all.ts" />

module ContactManagerApp { // Not the app name, just for scoping purposes
    angular.module('contactManagerApp', ['ngMaterial'])
        .service('userService', UserService)
        .controller('mainController', MainController);
}