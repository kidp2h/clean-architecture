export abstract class Usecase<T = unknown> {
  abstract execute(...args: any[]): Promise<Partial<T>>;
}
