export const FlowTypeValue = {
  IN: 'IN',
  OUT: 'OUT',
  NONE: 'NONE',
  INVALID: 'INVALID',
} as const;

export type FlowType = keyof typeof FlowTypeValue;
