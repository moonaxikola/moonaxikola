import { validateOrReject } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ClassConstructor } from '@moona/core/common/utils';

export abstract class BaseModel<Model extends object> {
  constructor(partial: Partial<Model>) {
    Object.assign(this, plainToInstance(this.getModel(), partial, { excludeExtraneousValues: true }));
  }

  protected async validate() {
    await validateOrReject(this);
  }

  protected abstract getModel(): ClassConstructor<Model>;
}
