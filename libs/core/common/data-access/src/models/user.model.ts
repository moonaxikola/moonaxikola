import { Type, Expose } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsDate } from 'class-validator';

import { BaseModel } from './base.model';

export class User extends BaseModel<User> {
  @IsString()
  @IsNotEmpty()
  @Expose()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsDate()
  @Type(() => Date)
  @Expose()
  createdAt: Date;

  @IsDate()
  @Type(() => Date)
  @Expose()
  updatedAt: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Expose()
  emailVerifiedAt?: Date;

  protected getModel() {
    return User;
  }

  static async factory(partial: Partial<User>) {
    const user = new User(partial);
    await user.validate();
    return user;
  }
}
