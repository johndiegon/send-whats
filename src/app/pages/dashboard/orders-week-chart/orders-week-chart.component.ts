import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardResType } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { ChartTemplate } from 'src/app/shared/helpers/chart-template';
import { colorsChart } from 'src/app/variables/charts';

@Component({
  selector: 'dsw-orders-week-chart',
  templateUrl: './orders-week-chart.component.html',
  styleUrls: ['./orders-week-chart.component.scss']
})
export class OrdersWeekChartComponent implements OnChanges {
  @Input() dataDashboard: ReponseWrapper<DashboardResType>;
  config: ChartConfiguration = {
    type: 'bar',
    options: {
      tooltips: {
        mode: 'point',
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16
        }
      }
    },
    data: {
      labels: [],
      datasets: [{
        label: 'Qtd de Pedidos',
        data: [],
        backgroundColor: []
      }]
    }
  };
  private _chart: ChartTemplate;
  _typeDatas = [
    { type: 'ordersOnSunday', label: 'Domingo', color: colorsChart.theme['success'] },
    { type: 'ordersOnMonday', label: 'Segunda-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnTuesday', label: 'Terça-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnWednesday', label: 'Quarta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnThursday', label: 'Quinta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnFriday', label: 'Sexta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnSaturday', label: 'Sadabo', color: colorsChart.theme['success'] }
  ]

  constructor() { }

  ngOnChanges(): void {
    if (this.dataDashboard) {
      this.populateConfig(this.dataDashboard);
      this.configChart();
    }
  }

  populateConfig(dataDashs: ReponseWrapper<DashboardResType>) {
    this._typeDatas.forEach(data => {
      this.config.data.labels.push(data.label);
      this.config.data.datasets[0].data.push(dataDashs.dataDashboard[data.type]);
      (this.config.data.datasets[0].backgroundColor as any[]).push(data.color);
    });

    console.log('config', this.config);
  }

  configChart() {
    const chartSales: HTMLCanvasElement = document.getElementById('chart-day-night') as HTMLCanvasElement;

    this._chart = new ChartTemplate({
      mode: 'light',
      chartElement: chartSales,
      options: this.config
    });
  }

}
