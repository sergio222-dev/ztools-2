import { container, InjectionToken } from 'tsyringe';

export const useService = <T>(token: InjectionToken<T>) => {
  return container.resolve<T>(token);
};
