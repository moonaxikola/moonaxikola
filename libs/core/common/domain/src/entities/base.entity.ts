import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { validate } from '@moona-backend/core/common/utils';

import { Optional } from '../interfaces';
import { EntityValidationException, EntityEmptyIdException } from '../exceptions';

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
