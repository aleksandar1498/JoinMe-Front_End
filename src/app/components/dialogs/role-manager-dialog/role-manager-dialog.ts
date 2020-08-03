import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/models/enums/role-type';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ErrorService } from 'src/app/services/error.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'role-manager-dialog',
    templateUrl: 'role-manager-dialog.html',
})
export class RoleManagerDialogComponent {
    authorities: Role[];
    manageRoleForm = new FormGroup({
        authorities: new FormControl([]),
    });
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private dialogRef: MatDialogRef<RoleManagerDialogComponent>,
        private errorService: ErrorService) {
        dialogRef.disableClose = true;
        this.authorities = Object.values(Role).map(key => {
            return Role[key];
        }).filter(auth => {
            return !isNaN(Number(Role[auth]));
        });
        this.manageRoleForm.get('authorities').setValue(data.user.authorities);
    }

    save() {
        this.data.user.authorities = this.manageRoleForm.get('authorities').value;
        this.userService.editRoles(this.data.user).subscribe(res => {
            this.dialogRef.close(this.data.res);
        },
            (err: HttpErrorResponse) => {
                this.errorService.renderErrors(err);
            });

    }
}