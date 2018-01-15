/// <reference path="../_all.ts" />

module ContactManagerApp {
    export class AddUserDialogController {
        static $inject = ['$mdDialog'];

        constructor(private $mdDialog) {}

        cancel(): void {
            // $mdDialog.cancel() is built in and cancels the most recent dialog
            this.$mdDialog.cancel();
        }

        save(): void {
            // Hide and pass in a result object which will eventually be a new user from the form
            this.$mdDialog.hide(new User('placeholder', '', '', []));
        }
    }
}