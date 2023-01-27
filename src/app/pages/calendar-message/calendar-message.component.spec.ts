import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMessageComponent } from './calendar-message.component';

describe('CalendarMessageComponent', () => {
  let component: CalendarMessageComponent;
  let fixture: ComponentFixture<CalendarMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarMessageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
