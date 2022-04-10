export interface ISendMessageParams {
  rainfall: number;
  devicecode: string;
  monitortime: string;
}

export interface IConsumerRainfallData extends ISendMessageParams {
  uploadtime: string;
}