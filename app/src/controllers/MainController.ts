/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class MainController {
        // Avoids issues with minification. In app, we will use a library for this
        static $inject = ['userService', '$mdSidenav', '$mdToast']; 

        // Using controllerAs directive (in html tag) to avoid using $scope

        constructor(
            private userService: IUserService
            private $mdSidenav: angular.material.ISidenavService,
            private $mdToast: angular.material.IToastService) { // Has interface! Takes component name (id specified in tag)
            var vm = this;

            vm.userService
                .loadAllUsers()
                .then( (users: User[]) => {
                    vm.users = users;
                    vm.selectedUser = users[0]; // Select first by default
                    console.log(vm.users);
                })
        }

        tabIndex: number = 0;
        searchText: string = '';
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
            this.tabIndex = 0;
        }

        removeNote(note: Note) : void {
            var foundIndex = this.selectedUser.notes.indexOf(note);
            this.selectedUser.notes.splice(foundIndex, 1);
            this.openToast('Note was removed!');
        }

        // Configure toast
        openToast(message: string) : void {
            this.$mdToast.show(
                this.$mdToast.simple()
                    .textContent(message)
                    .position('top right')
                    .hideDelay(3000)
            );
        }
    }
}