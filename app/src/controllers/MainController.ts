/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class MainController {
        // Avoids issues with minification. In app, we will use a library for this
        static $inject = [
            'userService',
            '$mdSidenav',
            '$mdToast',
            '$mdDialog',
            '$mdMedia',
            '$mdBottomSheet']; 

        // Using controllerAs directive (in html tag) to avoid using $scope

        constructor(
            private userService: IUserService
            private $mdSidenav: angular.material.ISidenavService,
            private $mdToast: angular.material.IToastService
            private $mdDialog: angular.material.IDialogService
            private $mdMedia: angular.material.IMedia,
            private $mdBottomSheet: angular.material.IBottomSheetService
        ) { // Has interface! Takes component name (id specified in tag)
            var vm = this;

            vm.userService
                .loadAllUsers()
                .then( (users: User[]) => {
                    vm.users = users;
                    vm.selectedUser = users[0]; // Select first by default
                    vm.userService.selectedUser = vm.selectedUser;
                })
        }

        tabIndex: number = 0;
        searchText: string = '';
        users: User[] = [];
        selectedUser: User = null;
        newNote: Note = new Note('', null);

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

        showContactOptions($event) {
            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('wrapper')),
                templateUrl: './dist/views/contact-sheet.html',
                controller: ContactPanelController,
                controllerAs: 'vm',
                bindToController: true,
                targetEvent: $event,
            }).then( clickedItem => { // We get an action with a name and icon
                // If click outside of the area, it will cancel and be undefined
                // If undefined, it won't log to console
                clickedItem && console.log(clickedItem.name + ' clicked!')
            })
        }

        addUser($event) {
            var stillThis = this;
            var useFullScreen = (this.$mdMedia('sm') || this.$mdMedia('xs'));

            this.$mdDialog.show({ // Options
                templateUrl: './dist/views/new-user-dialog.html',
                parent: angular.element(document.body),
                targetEvent: $event,
                controllerAs: 'vm',
                controller: AddUserDialogController,
                clickOutsideToClose: true,
                fullscreen: useFullScreen, // Resolved to boolean
            }).then( (user: CreateUser) => {
                var newUser: User = User.fromCreate(user);
                stillThis.users.push(newUser);
                stillThis.selectedUser = newUser;
                stillThis.openToast('User added');
            }, () => {
                console.log('You cancelled the dialog.')
            });
        }

        clearNotes($event) {
            var confirm = this.$mdDialog.confirm()
                .title("Are you sure you want to delete all notes?")
                .textContent("This action cannot be undone!")
                .targetEvent($event)
                .ok('Yes')
                .cancel('No');

            var stillThis = this;
            this.$mdDialog.show(confirm)
                .then(() => {
                    stillThis.selectedUser.notes = [];
                    stillThis.openToast('Cleared notes!')
                });
        }

        addNote() {
            this.selectedUser.notes.push(this.newNote);
            this.newNote = new Note('', null); // Clears out form
            this.openToast("Note added!");
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