import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/enums/role-type';
import { User } from 'src/app/models/user';
import { UserWithRoles } from 'src/app/models/user-roles';
import { RoleManagerDialog } from '../../dialogs/role-manager-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {
  roles: Role[];
  users: UserWithRoles[];
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.roles = Object.values(Role).map(key => Role[key]).filter(key => !isNaN(Number(Role[key])));
    this.users = [
      new UserWithRoles('alex123', 'alex', 'stefanov', 'alex@gmail.com', ['USER']),
      new UserWithRoles('fani32', 'fani', 'ah', 'alex@gmail.com', ['USER']),
      new UserWithRoles('kosi', 'konstantin', 'domanov', 'kosi@gmail.com', ['ORGANIZER']),
    ];
  }

  showDialog(event, user) {
    console.log(user);
    let dialogRef = this.dialog.open(RoleManagerDialog, {
      data: { user },
    });
  }

}
