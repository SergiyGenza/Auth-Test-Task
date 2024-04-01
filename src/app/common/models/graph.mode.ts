export interface GraphData {
  id?: number,
  type: string,
  data: {
    agreeableness: number,
    drive: number,
    luck: number,
    openness: number
  },
}