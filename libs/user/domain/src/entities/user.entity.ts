import { v4 as uuid } from 'uuid';
import { IsString, IsEmail, IsDate, IsOptional, MinLength, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { BaseEntity } from '@moona/common/domain';
import { Optional } from '@moona/common/utils';
import { Exclude, Expose } from 'class-transformer';
import { instanceToPlain } from 'class-transformer';

import { UserFactoryPayload, CreateUserPayload, UserProps } from '../interfaces';

@Exclude()
export class User extends BaseEntity<string> {
  @IsString()
  @MinLength(2)
  private _firstName: string;

  @IsString()
  @MinLength(2)
  private _lastName: string;

  @IsEmail()
  private _email: string;

  @IsString()
  @IsNotEmpty()
  private _password: string;

  @IsString()
  @MinLength(3)
  private _username: string;

  @IsDate()
  @IsOptional()
  private _emailVerifiedAt?: Date;

  @IsDate()
  private readonly _createdAt: Date;

  @IsDate()
  private _updatedAt: Date;

  private constructor(payload: UserFactoryPayload) {
    super();

    this._id = payload.id;
    this._firstName = payload.firstName;
    this._lastName = payload.lastName;
    this._email = payload.email;
    this._emailVerifiedAt = payload.emailVerifiedAt;
    this._username = payload.username;
    this._password = payload.password;
    this._createdAt = payload.createdAt;
    this._updatedAt = payload.updatedAt;
  }

  private async hashPassword(): Promise<void> {
    this._password = await bcrypt.hash(this._password, 10);
    await this.validate();
  }

  @Expose()
  public get username(): string {
    return this._username;
  }

  @Expose()
  public get fullName(): string {
    return `${this._firstName} ${this._lastName}`;
  }

  @Expose()
  public get firstName(): string {
    return this._firstName;
  }

  @Expose()
  public get lastName(): string {
    return this._lastName;
  }

  @Expose()
  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }

  @Expose()
  public get emailVerifiedAt(): Optional<Date> {
    return this._emailVerifiedAt;
  }

  @Expose()
  public get createdAt(): Date {
    return this._createdAt;
  }

  @Expose()
  public get updatedAt(): Optional<Date> {
    return this._updatedAt;
  }

  public isEmailVerified(): boolean {
    return !!this._emailVerifiedAt;
  }

  public async changePassword(password: string): Promise<void> {
    this._password = password;
    await this.hashPassword();
  }

  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this._password);
  }

  public static async factory(payload: UserFactoryPayload): Promise<User> {
    const user = new User(payload);
    await user.validate();

    return user;
  }

  public static async create(payload: CreateUserPayload): Promise<User> {
    const currentDate = new Date();
    const user = new User({ ...payload, id: uuid(), createdAt: currentDate, updatedAt: currentDate });
    await user.hashPassword();

    return user;
  }

  public toProps(): UserProps {
    return instanceToPlain(this) as UserProps;
  }
}
