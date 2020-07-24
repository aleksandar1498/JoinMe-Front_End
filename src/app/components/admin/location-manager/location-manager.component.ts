import { Component, OnInit } from '@angular/core';
import { Location } from '../../../models/location';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { LocationService } from 'src/app/services/location.service';
@Component({
  selector: 'app-location-manager',
  templateUrl: './location-manager.component.html',
  styleUrls: ['./location-manager.component.css']
})
export class LocationManagerComponent implements OnInit {
  constructor(private locationService: LocationService) { 
  }
  ngOnInit(): void {
  }

}
