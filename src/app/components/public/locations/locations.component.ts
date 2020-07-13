import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: Location[];

  constructor(private locationService: LocationService) {
    this.renderLocations = this.renderLocations.bind(this);
  }


  ngOnInit(): void {
    this.renderLocations();
   
  }

  renderLocations() {
    this.locationService.findAllLocations().subscribe((data: Location[]) => {
      this.locations = data;
    });
  }



}
