export default interface UseCaseInterface<T = any> {
  execute(input: T): Promise<T>;
}
