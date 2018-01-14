/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class MainController {
        static $inject = []; // Avoids issues with minification. In app, we will use a library for this
        // Use controllerAs, avoid using $scope
        // message: string = 'Hello from our controller'; // Accessible from template with vm.message (using controllerAs vm)
    }
}