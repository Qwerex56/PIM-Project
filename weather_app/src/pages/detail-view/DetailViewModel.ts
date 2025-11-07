import type HorizontalWeatherCardModel from 'src/components/HorizontalWeatherCard/HorizontalWeatherCardModel';
export default interface DetailViewModel {
  LocationName: string;
  Temperature: number;
  TemperaturePerceived: number;
  ConditionIconUrl?: string ;
  // weatherDataList: Array<HorizontalWeatherCardModel>;
}
