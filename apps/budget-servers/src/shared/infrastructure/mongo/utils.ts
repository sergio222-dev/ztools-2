import { Document } from 'mongoose';

export type ExtendOfDocument<T> = ConvertToDefinition<T> & Document<string, object, T>;

export type ConvertToDefinition<T> = {
  [K in keyof T]: T[keyof T] extends Array<infer U> ? ExtendOfDocument<U>['_id'][] : T[keyof T];
};
