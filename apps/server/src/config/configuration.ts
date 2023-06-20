import Joi from 'joi';

const validationSchema = {
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(3000),
  APP_ORIGIN: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
};

export const configuration = Joi.object(validationSchema);
export type ConfigKeys = typeof validationSchema;
