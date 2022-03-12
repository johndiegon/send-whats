import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersDayNightChartComponent } from './orders-day-night-chart.component';

describe('OrdersDayNightChartComponent', () => {
  let component: OrdersDayNightChartComponent;
  let fixture: ComponentFixture<OrdersDayNightChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersDayNightChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersDayNightChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
