export abstract class Mapper<D, E> {
  abstract toEntity(entity: Partial<E>): Partial<D>;
  abstract toModel(domain: Partial<D>): Partial<E>;
}
