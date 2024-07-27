export abstract class Usecase<T> {
  abstract execute(...args: any[]): Promise<Partial<T>>;
}
