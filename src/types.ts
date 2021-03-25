type SeriesSize = 'sm' | 'md' | 'lg';

export interface SlopeGraphOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
  numLines: number;
  leftHeader: string;
  rightHeader: string;
}
