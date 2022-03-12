import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersWeekChartComponent } from './orders-week-chart.component';

describe('OrdersWeekChartComponent', () => {
  let component: OrdersWeekChartComponent;
  let fixture: ComponentFixture<OrdersWeekChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersWeekChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersWeekChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
