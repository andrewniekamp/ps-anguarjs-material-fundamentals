/// <reference path="_all.ts" />

module ContactManagerApp { // Not the app name, just for scoping purposes
    angular.module('contactManagerApp', ['ngMaterial', 'ngMdIcons'])
        .service('userService', UserService)
        .controller('mainController', MainController)
        .config((   $mdIconProvider: angular.material.IIconProvider,
                    $mdThemingProvider: angular.material.IThemingProvider) => {
            $mdIconProvider
                .defaultIconSet('./assets/svg/avatars.svg', 128)
                .icon('menu', './assets/svg/menu.svg', 24);

            $mdThemingProvider.theme('default')
                .primaryPalette('blue')
                .accentPalette('red');
        })
}