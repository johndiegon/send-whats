import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardResType, DashboardType } from 'src/app/models/dashboardType';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import * as moment from 'moment';
import {
  colorsChart
} from "src/app/variables/charts";
import { ChartConfiguration } from 'chart.js';
import { ChartDataSetType } from './client-status-chart.model';
import { ChartTemplate } from 'src/app/shared/helpers/chart-template';

@Component({
  selector: 'dsw-client-status-chart',
  templateUrl: './client-status-chart.component.html',
  styleUrls: ['./client-status-chart.component.scss']
})
export class ClientStatusChartComponent implements OnChanges {
  @Input() dataDashboard: ReponseWrapper<DashboardResType>;
  _typeClientsStatus: ChartDataSetType[] = [
    new ChartDataSetType({ type: 'activeClients', label: 'Ativos', labelMini: 'Ativ', dataset: { data: [0], borderColor: colorsChart.theme['primary'] } }),
    new ChartDataSetType({ type: 'inactiveCustomers30Days', labelMini: 'Inat30', label: 'Inativos 30', dataset: { hidden: true, data: [0], borderColor: colorsChart.theme['danger'] } }),
    new ChartDataSetType({ type: 'inactiveCustomers60Days', labelMini: 'Inat60', label: 'Inativos 60', dataset: { hidden: true, data: [0], borderColor: colorsChart.theme['success'] } }),
    new ChartDataSetType({ type: 'inactiveCustomers90Days', labelMini: 'Inat90', label: 'Inativos 90', dataset: { hidden: true, data: [0], borderColor: colorsChart.theme['warning'] } })
  ]

  // _activeClientChart: ChartConfiguration;
  clientsChart: ChartTemplate;

  config: ChartConfiguration = {
    type: 'line',
    options: {
      legend: {
        display: true,
        position: 'bottom',
        fullWidth: true,
        onClick: () => {},
        labels: {
          boxWidth: 20,
          usePointStyle: true
        }
      }
    },
    data: {
      labels: ['Inicio'],
      datasets: []
    }
  };

  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataDashboard) {
      this.populateClientsStatus(this.dataDashboard);
      this.configChart();
    }
  }

  populateClientsStatus(dataDashs: ReponseWrapper<DashboardResType>) {
    const allDashs = dataDashs.allDashboard || [];
    const dashs = [dataDashs.dataDashboard, ...allDashs];

    dashs.forEach(dash => {
      this.createLabels(dash);
    });

    this._typeClientsStatus.forEach(statusType => {

      dashs.forEach(dash => {
        statusType.dataset.label = statusType.label;
        statusType.dataset.data.push(dash[statusType.type]);
      });

      this.config.data.datasets.push(statusType.dataset);
    });

    console.log('_typeClientsStatus', this._typeClientsStatus);

  }

  private createLabels(dash: DashboardType) {
    const dateMoment = moment(dash.dateTime);
    const dateFormated = dateMoment.format('DD/MMM');
    this.config.data.labels.push(dateFormated);
  }

  configChart() {
    console.log(this.config);
    const chartSales: HTMLCanvasElement = document.getElementById('chart-sales') as HTMLCanvasElement;
    this.clientsChart = new ChartTemplate({
      chartElement: chartSales,
      options: this.config
    });
  }

  checkBtnActive(item: ChartDataSetType) {
    if (this.config?.data?.datasets) {
      const dataSetFound = this.config.data.datasets.find(dataset => dataset.label == item.label);
      return !dataSetFound?.hidden;

    } else {
      return false;

    }
  }


  public updateClientStatus(item: ChartDataSetType) {

    this.clientsChart.updateDataSets((dataSets) => {
      const newDataSet = [...dataSets];

      dataSets.some(dataSet => {
        const find = dataSet.label == item.label;

        if (find) {
          dataSet.hidden = !dataSet.hidden;
        }

        return find;
      });

      this.config.data.datasets = dataSets;
      return newDataSet;
    });
  }

}
