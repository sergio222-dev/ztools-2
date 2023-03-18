import { container } from 'tsyringe';
import { TransactionGet } from '../../../TableData/application/useCase/TransactionGet';

export function buildContainer() {
  container.register<TransactionGet>(TransactionGet, {
    useClass: TransactionGet,
  });
}
