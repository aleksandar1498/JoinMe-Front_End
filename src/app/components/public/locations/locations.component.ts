import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/services/location.service';
import { LocationCategory } from 'src/app/models/enums/location-category';
import { Location } from 'src/app/models/location';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  locations: Location[];

  constructor(private locationService: LocationService, private router: Router, private current: ActivatedRoute) {
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
  edit(event: any, locationId: string) {
    event.preventDefault();
    const url = '/locations/edit/' + locationId;
    this.router.navigate([url], { queryParams: { returnUrl: '/admin/locations' } });
  }
  remove(event: any, locationId: string) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete the location with ID ' + locationId + ' ?') === true) {
      this.locationService.remove(locationId).subscribe(data => {
        console.log(data);
        this.router.navigateByUrl('/admin/locations');
      },
        (err: HttpErrorResponse) => {
          console.log(err);
        });
    }
  }



}
