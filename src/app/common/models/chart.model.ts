export interface MyChart {
  type: any;
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: string[];
      backgroundColor: string;
    }[];
  }
}