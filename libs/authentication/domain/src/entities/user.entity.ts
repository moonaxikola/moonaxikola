import { IsEmail, IsDate, IsOptional } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@moona-backend/common/domain';
import { UserFactoryPayload } from '../@types';
import { IsPassword } from '@moona-backend/common/utils';

export class User extends BaseEntity<string> {
  @IsEmail()
  private _email: string;

  @IsPassword()
  private _password: string;

  @IsDate()
  @IsOptional()
  private _emailVerifiedAt?: Date;

  private constructor(payload: UserFactoryPayload) {
    super();

    this._id = payload.id;
    this._email = payload.email;
    this._password = payload.password;
    this._emailVerifiedAt = payload.emailVerifiedAt;
  }

  public get email(): string {
    return this._email;
  }

  public isEmailVerified(): boolean {
    return !!this._emailVerifiedAt;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this._password);
  }

  public static async factory(payload: UserFactoryPayload): Promise<User> {
    const user = new User(payload);
    await user.validate();

    return user;
  }
}
