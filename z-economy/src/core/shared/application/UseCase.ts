export interface UseCase<T, R> {
  execute(payload: T): Promise<R> | R;
}
