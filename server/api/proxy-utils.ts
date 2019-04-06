import * as dotEnv from 'dotenv';

dotEnv.config();

export const environement = {
  API_PROXY_ADDRESS: process.env['API_PROXY_ADDRESS'] || 'http://localhost:8080'
};
