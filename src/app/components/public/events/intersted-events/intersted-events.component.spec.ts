import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstedEventsComponent } from './intersted-events.component';

describe('InterstedEventsComponent', () => {
  let component: InterstedEventsComponent;
  let fixture: ComponentFixture<InterstedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterstedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterstedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
