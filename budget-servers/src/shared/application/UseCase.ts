export interface UseCase<T, R = void> {
  execute(payload: T): Promise<R>;
}
