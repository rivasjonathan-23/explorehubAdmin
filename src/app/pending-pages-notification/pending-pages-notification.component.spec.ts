import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPagesNotificationComponent } from './pending-pages-notification.component';

describe('PendingPagesNotificationComponent', () => {
  let component: PendingPagesNotificationComponent;
  let fixture: ComponentFixture<PendingPagesNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPagesNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPagesNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
