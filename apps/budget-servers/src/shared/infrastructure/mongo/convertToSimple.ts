// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
