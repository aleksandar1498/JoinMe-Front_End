import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/services/feeds.service';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: any[];
  constructor(private feedService: FeedsService, private errorService: ErrorService) { }

  ngOnInit(): void {
   this.renderFeeds();
  }

  view(feedId: string) {
    console.log(feedId);
    this.feedService.view(feedId).subscribe(() => {
      this.renderFeeds();
    }, err => {
      this.errorService.renderErrors(err);
    });
  }

  private renderFeeds(): void {
    this.feedService.getAllFeeds().subscribe(res => {
      this.feeds = res.filter(f => f.isViewed === false);
    }, err => {
      this.errorService.renderErrors(err);
    });
  }

}
