export default interface HorizontalWeatherCardModel {
  LocationName: string;
  TemperatureMax: number;
  TemperatureMin: number;
  Condition?: string;
  ConditionIconUrl?: string;
}
