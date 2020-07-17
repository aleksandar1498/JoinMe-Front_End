import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventModeratorComponent } from './event-moderator.component';

describe('EventModeratorComponent', () => {
  let component: EventModeratorComponent;
  let fixture: ComponentFixture<EventModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
