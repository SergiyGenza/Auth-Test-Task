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
  @Input() graphData!: any;
  title!: string;
  chart!: any;

  constructor(private chartService: ChartService) { }

  ngOnChanges(): void {
    this.createChart();
  }

  private createChart(): void {
    this.title = this.graphData.title;
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart("chart", this.chartService.createChart(this.graphData.data));
  }
}
