import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartService } from 'src/app/common/services/chart.service';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphComponent implements OnChanges {
  @Input() graphData: any;
  chart!: any;

  constructor(private chartService: ChartService) { }

  ngOnChanges(): void {
    this.createChart();
  }

  private createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("chart", this.chartService.createChart(this.graphData));
  }
}
