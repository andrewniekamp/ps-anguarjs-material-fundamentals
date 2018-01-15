/// <reference path="../_all.ts" />

module ContactManagerApp {

    export class AddUserDialogController {
        static $inject = ['$mdDialog'];

        constructor(private $mdDialog) {}

        user: CreateUser; // Will bind to its properties with input elements

        avatars = [
            'svg-1', 'svg-2', 'svg-3', 'svg-4'
        ];

        cancel(): void {
            // $mdDialog.cancel() is built in and cancels the most recent dialog
            this.$mdDialog.cancel();
        }

        save(): void {
            this.$mdDialog.hide(this.user);
        }
    }
}