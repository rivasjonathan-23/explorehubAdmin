import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifDetailsComponent } from './notif-details.component';

describe('NotifDetailsComponent', () => {
  let component: NotifDetailsComponent;
  let fixture: ComponentFixture<NotifDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotifDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
