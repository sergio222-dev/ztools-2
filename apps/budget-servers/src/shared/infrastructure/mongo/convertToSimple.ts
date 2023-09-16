// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { v4 as uuid } from 'uuid';

/**
 * @todo can't find a way to list all getter keys in a mapped type, so in this we are not doing type checking this file
 */
export function convertToSimple<T>(value: T): T {
  const keys = Object.entries(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(value)))
    .filter(([, descriptor]) => typeof descriptor.get === 'function')
    .map(([key]) => key);

  const simple = {};

  for (const key of keys) {
    simple[key] = value[key];
  }

  return simple;
}

const eventKeys = new Set(['aggregateId', 'eventId', 'occurredOn']);

export function convertToSimpleEvent<T>(value: T): T {
  const keys = Object.entries(value)
    .filter(([, descriptor]) => typeof descriptor.get !== 'function')
    .map(([key]) => key.slice(1));

  const keysData = keys.filter(k => !eventKeys.has(k));
  const keysEvent = keys.filter(k => eventKeys.has(k));

  const data = {};

  for (const key of keysData) {
    data[key] = value[key];
  }

  const simple = {};
  const id = uuid();
  simple['id'] = id;
  simple['_id'] = id;
  for (const key of keysEvent) {
    simple[key] = value[key];
  }

  simple['data'] = JSON.stringify(data);

  return simple;
}
