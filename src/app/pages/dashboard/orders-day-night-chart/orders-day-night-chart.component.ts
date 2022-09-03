import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { DashboardResType } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { ChartTemplate } from 'src/app/shared/helpers/chart-template';
import { colorsChart } from 'src/app/variables/charts';

@Component({
  selector: 'dsw-orders-day-night-chart',
  templateUrl: './orders-day-night-chart.component.html',
  styleUrls: ['./orders-day-night-chart.component.scss']
})
export class OrdersDayNightChartComponent implements OnChanges {
  @Input() dataDashboard: ReponseWrapper<DashboardResType>;
  config: ChartConfiguration = {
    type: 'pie',
    options: {
      legend: {
        display: true,
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
    { type: 'ordersDuringTheNigth', label: 'Noite', color: colorsChart.theme['success'] },
    { type: 'ordersDuringTheDay', label: 'Dia', color: colorsChart.theme['info'] }
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
    const chartSales: HTMLCanvasElement = document.getElementById('chart-day-week') as HTMLCanvasElement;

    this._chart = new ChartTemplate({
      mode: 'light',
      chartElement: chartSales,
      options: this.config
    });
  }

}
