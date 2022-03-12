import * as Chart from "chart.js";

export type ModeType = 'light' | 'dark';

// Colors
export const colorsChart = {
  gray: {
    100: '#f6f9fc',
    200: '#e9ecef',
    300: '#dee2e6',
    400: '#ced4da',
    500: '#adb5bd',
    600: '#8898aa',
    700: '#525f7f',
    800: '#32325d',
    900: '#212529'
  },
  theme: {
    'default': '#172b4d',
    'primary': '#5e72e4',
    'secondary': '#f4f5f7',
    'info': '#11cdef',
    'success': '#2dce89',
    'danger': '#f5365c',
    'warning': '#fb6340'
  },
  black: '#12263F',
  white: '#FFFFFF',
  transparent: 'transparent',
};
const fonts = {
  base: 'Open Sans'
};


export const chartOptionsDefaultLines: Chart.ChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    yAxes: [{
      gridLines: {
        color: 'rgba(180,180,180, 0.5)',
        zeroLineColor: '#2e6245'
      }
    }]
  },
  layout: {
    padding: 0
  },
  legend: {
    display: false,
    position: 'top',
    labels: {
      usePointStyle: true,
      padding: 16
    }
  },
  elements: {
    point: {
      radius: 1,
      borderWidth: 3,
      hoverBorderWidth: 5
    },
    line: {
      tension: .4,
      borderWidth: 4,
      borderColor: colorsChart.theme['primary'],
      backgroundColor: colorsChart.transparent,
      borderCapStyle: 'rounded'
    },
    rectangle: {
      backgroundColor: colorsChart.theme['warning']
    },
    arc: {
      backgroundColor: colorsChart.theme['primary'],
      borderColor: colorsChart.white,
      borderWidth: 4
    }
  },
  tooltips: {
    enabled: true,
    mode: 'nearest',
    intersect: false,
    custom: customModel => {
      customModel.legendColorBackground = 'transparent';
      customModel.borderWidth = 3;
    }
  }
}

export const chartOptionsDefaultPie: Chart.ChartOptions = {
  cutoutPercentage: 0,
  legendCallback: function (chart) {
    var data = chart.data;
    var content = '';

    data.labels.forEach(function (label, index) {
      var bgColor = data.datasets[0].backgroundColor[index];

      content += '<span class="chart-legend-item">';
      content += '<i class="chart-legend-indicator" style="background-color: ' + bgColor + '"></i>';
      content += label;
      content += '</span>';
    });

    return content;
  }
}
