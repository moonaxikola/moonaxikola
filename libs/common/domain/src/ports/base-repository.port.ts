export interface BaseRepositoryport<Entity> {
  findById(id: string): Promise<Entity>;
  findByIds(ids: string[]): Promise<Entity[]>;
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}
