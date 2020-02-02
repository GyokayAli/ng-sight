import { Component, OnInit } from '@angular/core';
import { LINE_CHART_COLORS } from '../../shared/chart.colors';

const SAMPLE_LINECHART_DATA: any[] = [
  { data: [65, 59, 81, 56, 54, 30], label: 'Sentiment Analysis' },
  { data: [25, 60, 89, 36, 54, 50], label: 'Image Recognition' },
  { data: [13, 44, 25, 49, 54, 69], label: 'Forecasting' },
];

const SAMPLE_LINECHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  lineChartData = SAMPLE_LINECHART_DATA;
  lineChartLabels = SAMPLE_LINECHART_LABELS;
  lineChartOptions: any = {
    responsive: true
  };
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit() {
  }

}
