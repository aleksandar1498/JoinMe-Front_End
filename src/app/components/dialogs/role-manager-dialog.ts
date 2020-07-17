import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'events-manager-dialog',
    template: 'passed in {{ data.user.username }} {{data.user.roles}}',
})
export class RoleManagerDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}