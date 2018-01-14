/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class MainController {
        static $inject = ['userService']; // Avoids issues with minification. In app, we will use a library for this
        // Use controllerAs, avoid using $scope

        constructor(private userService: IUserService) {
            var vm = this;

            vm.userService
                .loadAllUsers()
                .then( (users: User[]) => {
                    vm.users = users;
                    console.log(vm.users);
                })
        }

        message: string = 'Hello from our controller'; // Accessible from template with vm.message (using controllerAs vm)
    }
}