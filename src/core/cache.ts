export abstract class BaseCache {
  abstract get(key: unknown): Promise<unknown>;
  abstract set(key: unknown, value: unknown): Promise<unknown>;
}
