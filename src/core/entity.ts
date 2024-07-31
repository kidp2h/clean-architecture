export abstract class Entity {
  abstract id: string;
  abstract createdAt: Date;
  abstract updatedAt: Date | null;
  abstract deletedAt: Date | null;
}
