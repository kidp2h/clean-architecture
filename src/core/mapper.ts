export abstract class Mapper<E, M> {
  abstract toEntity(entity: Partial<M>): Partial<E>;
  abstract toModel(domain: Partial<E>): Partial<M>;
}
