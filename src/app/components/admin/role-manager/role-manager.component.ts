import { Component, OnInit } from '@angular/core';
import { Role } from 'src/app/models/enums/role-type';
import { UserWithRoles } from 'src/app/models/user-roles';
import { RoleManagerDialogComponent } from '../../dialogs/role-manager-dialog/role-manager-dialog';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {

  users: UserWithRoles[];
  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadUsersWithRoles().subscribe(users => {

      users.map(u => {
        u.authorities = u.authorities.map(a => {
          return a['authority'];
        });
        return u;
      });
      this.users = users;
    });
  }

  showDialog(event, user: UserWithRoles) {
    console.log(user);
    const dialogRef = this.dialog.open(RoleManagerDialogComponent, {
      data: { user },
    });
    /*dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });*/
  }

}
