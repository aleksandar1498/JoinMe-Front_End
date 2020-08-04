import { Component, OnInit, SecurityContext } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import * as CanvasJS from './canvasjs.min.js';
import * as $ from 'jquery';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.css']
})
export class OrganizerComponent implements OnInit {
  html;
  userBehaviour: BehaviorSubject<User>;
  roles: string[];
  constructor(private authService: AuthService, private userService: UserService) {
    this.userBehaviour = new BehaviorSubject<User>(new User());
  }
  get user() {
    return this.userBehaviour.value;
  }
  ngOnInit(): void {


    this.userService.findByUsername(this.authService.currentUserValue.username).subscribe(res => {
      this.userBehaviour.next(Object.setPrototypeOf(res, User.prototype));
    });

    const dataPoints = [];
    let dpsLength = 0;
    const chart = new CanvasJS.Chart('chartContainer', {
      exportEnabled: true,
      title: {
        text: 'Live Chart with Data-Points from External JSON'
      },
      data: [{
        type: 'spline',
        dataPoints,
      }]
    });

    $.getJSON('https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?', function(data) {
      $.each(data, function(key, value) {
        dataPoints.push({ x: value[0], y: parseInt(value[1]) });
      });
      dpsLength = dataPoints.length;
      chart.render();
      updateChart();
    });
    function updateChart() {
      $.getJSON('https://canvasjs.com/services/data/datapoints.php?xstart=' + (dpsLength + 1) + '&ystart=' + (dataPoints[dataPoints.length - 1].y) + '&length=1&type=json&callback=?', function(data) {
        $.each(data, function(key, value) {
          dataPoints.push({
            x: parseInt(value[0]),
            y: parseInt(value[1])
          });
          dpsLength++;
        });

        if (dataPoints.length > 20) {
          dataPoints.shift();
        }
        chart.render();
     //   setTimeout(function() { updateChart(); }, 1000);
      });
    }
  }
}
