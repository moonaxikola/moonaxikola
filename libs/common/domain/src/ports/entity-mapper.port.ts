export interface EntityMapper<Entity, OrmEntity> {
  toDomain: (orm: OrmEntity) => Promise<Entity>;
  toOrm: (entity: Entity) => OrmEntity;
}
