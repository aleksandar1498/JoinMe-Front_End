import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AdminService } from 'src/app/services/admin.service';
import { User } from 'src/app/models/user';
import { UserWithRoles } from 'src/app/models/user-roles';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account-moderator',
  templateUrl: './account-moderator.component.html',
  styleUrls: ['./account-moderator.component.css']
})
export class AccountModeratorComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private adminService: AdminService, private authService: AuthService) { }

  ngOnInit(): void {
    this.renderUsers();
  }

  ban(user: UserWithRoles) {
    this.adminService.banUser(user).subscribe(() => {
      this.renderUsers();
    });
  }

  authorize(user: UserWithRoles) {
    this.adminService.authorizeUser(user).subscribe(() => {
      this.renderUsers();
    });
  }

  renderUsers() {
    this.userService.loadUsersWithRoles().subscribe((data) => {
      this.users = data.filter(u => this.authService.currentUserValue.username !== u.username);
    });
  }

}
