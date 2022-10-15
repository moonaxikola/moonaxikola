import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Optional } from '../@types';
import { EntityValidationException, EntityEmptyIdException } from '../exceptions';
import { validate } from '../utils';

export abstract class BaseEntity<Identifier extends string | number> {
  @IsNotEmpty()
  protected _id: Optional<Identifier>;

  @Expose()
  public get id(): Identifier {
    if (!this._id) {
      throw new EntityEmptyIdException(this.constructor.name);
    }

    return this._id;
  }

  public async validate(): Promise<void> {
    const result = await validate(this);

    if (result) {
      throw new EntityValidationException(this.constructor.name, result);
    }
  }
}
