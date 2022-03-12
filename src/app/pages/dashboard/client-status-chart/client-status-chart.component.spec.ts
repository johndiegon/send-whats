import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStatusChartComponent } from './client-status-chart.component';

describe('ClientStatusChartComponent', () => {
  let component: ClientStatusChartComponent;
  let fixture: ComponentFixture<ClientStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientStatusChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
