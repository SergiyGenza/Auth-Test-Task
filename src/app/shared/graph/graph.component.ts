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
  isError: boolean = false

  constructor(private chartService: ChartService) { }

  ngOnChanges(): void {
    this.setData();
  }

  private setData(): void {
    this.isError = false;
    this.title = this.graphData.title;

    if (this.chart) {
      this.chart.destroy();
    }

    if (!this.graphData.data) {
      this.isError = true;
      return
    }
    this.chart = new Chart("chart", this.chartService.createChart(this.graphData.data));
  }
}
