import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as CanvasJS from './canvasjs.min.js';
import * as $ from 'jquery';
import { EventsService } from 'src/app/services/events.service.js';
import { CdkStepHeader } from '@angular/cdk/stepper';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  html;
  userBehaviour: BehaviorSubject<User>;
  roles: string[];
  constructor(private authService: AuthService, private userService: UserService, private eventService: EventsService) {
    this.userBehaviour = new BehaviorSubject<User>(new User());
  }
  get user() {
    return this.userBehaviour.value;
  }
  ngOnInit(): void {
    this.userService.findByUsername(this.authService.currentUserValue.username).subscribe(res => {
      this.userBehaviour.next(Object.setPrototypeOf(res, User.prototype));
      this.showStatistic(this.user);
    });
  }
  showStatistic(user: User) {
    const dataPoints = [];
    const chart = new CanvasJS.Chart('chartContainer', {
      exportEnabled: true,
      title: {
        text: 'Created events per month'
      },
      data: [{
        type: 'spline',
        dataPoints,
      }]
    });
    $.ajax({
      url: 'http://localhost:9090/stat/user/' + user.id + '/events',
      type: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log(data);
        for (const stat of data) {
          dataPoints.push({
            label: stat.month + ' ' + stat.year,
            y: stat.count
          });
        }
        chart.render();
      },
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', this.authService.currentUserValue.token);
      }
    });
  }
}

