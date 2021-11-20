import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinedDetailsComponent } from './declined-details.component';

describe('DeclinedDetailsComponent', () => {
  let component: DeclinedDetailsComponent;
  let fixture: ComponentFixture<DeclinedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclinedDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
