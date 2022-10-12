export interface BaseRepositoryport<Entity> {
  getOneById(id: string): Promise<Entity>;
  getManyByIds(ids: string[]): Promise<Entity[]>;
  create(entity: Entity): Promise<void>;
  update(entity: Entity): Promise<void>;
}
