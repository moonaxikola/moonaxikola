import { Optional } from '../@types';
import { EntityValidationException, EntityEmptyIdException } from '../exceptions';
import { validate } from '../utils';

export abstract class BaseEntity<Identifier extends string | number> {
  protected id: Optional<Identifier>;

  public getId(): Identifier {
    if (!this.id) {
      throw new EntityEmptyIdException(this.constructor.name);
    }

    return this.id;
  }

  public async validate(): Promise<void> {
    const result = await validate(this);

    if (result) {
      throw new EntityValidationException(this.constructor.name, result);
    }
  }
}
