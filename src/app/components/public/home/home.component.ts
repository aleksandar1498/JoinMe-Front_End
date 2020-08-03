import { Component, OnInit } from '@angular/core';
import { JwtValidationService } from 'src/app/auth/jwt-validation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  roles: string[];
  constructor(private jwtService: JwtValidationService) { }

  ngOnInit() {
    this.roles = this.jwtService.getRoles();
  }

}
