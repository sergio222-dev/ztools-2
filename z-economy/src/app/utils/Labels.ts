export enum Labels {
  PRIORITY,
  LOW_COST,
}

export function getLabelName(labelId: Labels) {
  switch (labelId) {
    case Labels.LOW_COST: {
      return 'Costo Bajo';
    }
    case Labels.PRIORITY: {
      return 'Prioritario';
    }
    default: {
      throw new Error('No existe ese label');
    }
  }
}
