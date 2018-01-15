/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class MainController {
        // Avoids issues with minification. In app, we will use a library for this
        static $inject = ['userService', '$mdSidenav']; 

        // Using controllerAs directive (in html tag) to avoid using $scope

        constructor(
            private userService: IUserService
            private $mdSidenav: angular.material.ISidenavService) { // Has interface! Takes component name (id specified in tag)
            var vm = this;

            vm.userService
                .loadAllUsers()
                .then( (users: User[]) => {
                    vm.users = users;
                    vm.selectedUser = users[0]; // Select first by default
                    console.log(vm.users);
                })
        }

        users: User[] = [];
        selectedUser: User = null;
        message: string = 'Hello from our controller'; // Accessible from template with vm.message (using controllerAs vm)

        toggleSideNav() : void {
            this.$mdSidenav('left').toggle();
        }

        selectUser(user: User) : void {
            this.selectedUser = user; // Assign selected user

            var sideNav = this.$mdSidenav('left');
            if (sideNav.isOpen()) {
                sideNav.close();
            }
        }
    }
}