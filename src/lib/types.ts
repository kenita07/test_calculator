export interface Stock {
  code: string;
  name: string;
  price: number;
  detectionDate: string;
  cupDepth: number;
  handleDays: number;
  volumeRatio: number;
}

export interface FilterConditions {
  minCupDepth: number;
  maxCupDepth: number;
  minHandleDays: number;
  maxHandleDays: number;
  minVolumeRatio: number;
  maxVolumeRatio: number;
}
