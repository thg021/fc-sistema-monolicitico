export default interface UseCaseInterface<T = any, R = void> {
  execute(input: T): Promise<R>;
}
