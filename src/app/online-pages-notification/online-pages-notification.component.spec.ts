import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlinePagesNotificationComponent } from './online-pages-notification.component';

describe('OnlinePagesNotificationComponent', () => {
  let component: OnlinePagesNotificationComponent;
  let fixture: ComponentFixture<OnlinePagesNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlinePagesNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePagesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
