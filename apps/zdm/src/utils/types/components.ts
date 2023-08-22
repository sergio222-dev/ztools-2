import type { QwikIntrinsicElements } from '@builder.io/qwik';

type ComponentAttributes<K extends keyof QwikIntrinsicElements> = Omit<QwikIntrinsicElements[K], 'children'>;

export type ComponentProps<K extends keyof QwikIntrinsicElements> = ComponentAttributes<K> & {
  loading?: boolean;
};
