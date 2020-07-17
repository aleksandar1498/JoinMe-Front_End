import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountModeratorComponent } from './account-moderator.component';

describe('AccountModeratorComponent', () => {
  let component: AccountModeratorComponent;
  let fixture: ComponentFixture<AccountModeratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountModeratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
