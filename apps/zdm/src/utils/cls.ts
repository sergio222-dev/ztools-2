import type { ClassList, Signal } from '@builder.io/qwik';

function isSignal(value: ClassList | Signal<ClassList>): value is Signal<ClassList> {
  return (value as Signal<ClassList>).value !== undefined;
}

export function cls(classList: ClassList | Signal<ClassList>) {
  // check if undefined
  if (classList === undefined) {
    return [];
  }
  // check if classList if an array
  if (Array.isArray(classList)) {
    return classList;
  }

  // check if is a signal
  if (isSignal(classList)) {
    return Array.isArray(classList.value) ? classList.value : [classList.value];
  }

  return [classList];
}
