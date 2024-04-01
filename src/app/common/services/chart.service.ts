import { Injectable } from '@angular/core';
import { GraphData } from '../models/graph.mode';
import { MyChart } from '../models/chart.model';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  public createChart(graphData: GraphData): MyChart {
    const type: any = graphData.type;
    const labels = Object.keys(graphData.data);
    const dataArray = Object.values(graphData.data).map(String);;
    const chartData: MyChart = {
      type: type,
      data: {
        labels: labels,
        datasets: [
          {
            label: "metrics",
            data: dataArray,
            backgroundColor: this.randomColor(),
          },
        ]
      },
    }
    return chartData;
  }

  private randomColor(): string {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    return "#" + color
  }
}
