import Client from './client';
import EventStream from './eventstream';

export const API = new Client();
export const SSE = new EventStream();
export const ServerEvents = SSE;
