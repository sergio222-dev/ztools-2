export const enum Labels {
  PRIORITY,
  LOW_COST,
}

type LabelNames = Record<Labels, string>;

export const labelNames: LabelNames = {
  [Labels.LOW_COST]: 'Costo Bajo',
  [Labels.PRIORITY]: 'Prioritario',
};

export function getLabelName(labelId: Labels) {
  const labelName = labelNames[labelId];

  if (!labelName) {
    throw new Error('No existe ese label');
  }

  return labelName;
}
