import { serverSettings } from '../config.js';

export const jwtConstants = {
  secret: serverSettings.jwtKey,
};