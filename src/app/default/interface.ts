export interface ISendMessageParams {
  devicecode: number;
  rainfall: number;
  monitortime: string;
}

export interface IConsumerRainfallData extends ISendMessageParams {
  uploadtime: string;
}