import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/enums/role-type';
import { UserWithRoles } from 'src/app/models/user-roles';
import { RoleManagerDialogComponent } from '../../dialogs/role-manager-dialog/role-manager-dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {

  users: UserWithRoles[];
  constructor(public dialog: MatDialog, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userService.loadUsersWithRoles().subscribe(users => {
      console.log(users);
      this.users = users.map(u => {
        u.authorities = u.authorities.map(a => {
          return a['authority'];
        });
        return u;
      }).filter(user => {
        return this.authService.currentUserValue.username !== user.username;
      });
    });
  }

  showDialog(event, user: UserWithRoles) {
    this.dialog.open(RoleManagerDialogComponent, {
      data: { user },
    });
  }

}
