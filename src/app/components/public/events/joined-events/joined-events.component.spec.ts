import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedEventsComponent } from './joined-events.component';

describe('JoinedEventsComponent', () => {
  let component: JoinedEventsComponent;
  let fixture: ComponentFixture<JoinedEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinedEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
