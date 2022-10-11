export interface BaseRepositoryport<Entity> {
  save(entity: Entity): Promise<void>;
}
