import { chartOptionsDefaultLines,  chartOptionsDefaultPie,  ModeType } from "src/app/variables/charts";
import {
    Chart
  } from 'chart.js';
  
export class ChartTemplate {
    mode: ModeType = 'light';
    private _chart: Chart;
  
    constructor({
      mode,
      chartElement,
      options
    }: {
      chartElement: string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>
      mode?: ModeType,
      options: Chart.ChartConfiguration,
    }) {
  
      if (!!mode) this.mode = mode;
      const optionsDefault = options?.type == 'pie' || options?.type == 'doughnut' ? chartOptionsDefaultPie : chartOptionsDefaultLines;
  
      options.options = { ...optionsDefault, ...options.options };
  
      this._chart = new Chart(chartElement, options);
    }
  
  
    updateDataSets(cb: (dataSets: Chart.ChartDataSets[]) => Chart.ChartDataSets[]) {
      this._chart.data.datasets = cb(this._chart.data.datasets);
      this._chart.update();
    }
  
  }