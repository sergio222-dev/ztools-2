import zdm from '@zdm/index';
import { Implementation } from '@shared/infrastructure/implementation';

export const ImplementationHelper = {
  repositories(implementation: Implementation) {
    switch (implementation) {
      case Implementation.pg: {
        return [...zdm.pgRepositories];
      }
    }
  },
};
