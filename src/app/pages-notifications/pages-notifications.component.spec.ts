import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNotificationsComponent } from './pages-notifications.component';

describe('PagesNotificationsComponent', () => {
  let component: PagesNotificationsComponent;
  let fixture: ComponentFixture<PagesNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesNotificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
