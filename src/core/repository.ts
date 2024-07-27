import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
  abstract findUnique(id: string): Promise<Partial<TEntity>>;
  abstract findMany(filter: Partial<TEntity>): Promise<Partial<TEntity>[]>;

  abstract update(
    id: string,
    data: Partial<TEntity>,
  ): Promise<Partial<TEntity>>;
  abstract delete(id: string): Promise<Partial<TEntity>>;
  abstract create(data: Partial<TEntity>): Promise<Partial<TEntity>>;
}
