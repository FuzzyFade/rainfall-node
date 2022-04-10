import * as joi from 'joi';

export interface ISendMessageParams {
  rainfall: number;
  devicecode: string;
  monitortime: string;
}

export const rainfallScheme = joi.object({
  devicecode: joi.string().required(),
  rainfall: joi.number().required(),
  monitortime: joi.string().required(),
});

export interface IConsumerRainfallData extends ISendMessageParams {
  uploadtime: string;
}
