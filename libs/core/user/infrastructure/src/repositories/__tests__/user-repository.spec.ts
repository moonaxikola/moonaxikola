import { Test } from '@nestjs/testing';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { mockDeep } from 'jest-mock-extended';
import { User as PrismaUser } from '@prisma/client';

import { UserRepository } from '../user.repository';
import { UserMapper } from '../../mappers';
import { User } from '@moona/core/user/domain';

const mockPrismaUser: PrismaUser = {
  id: '4563f9e7-944e-410e-8fe7-1ca199c0646d',
  email: 'john.doe@hotmail.com',
  password: 'password',
  firstName: 'John',
  username: 'john.doe',
  lastName: 'Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerifiedAt: new Date(),
};

describe('User repository', () => {
  let userRepository: UserRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UserRepository],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    userRepository = moduleRef.get(UserRepository);
    prismaService = moduleRef.get(PrismaService);
  });

  describe('getOneById', () => {
    it('should return a domain User', async () => {
      const prismaUser = { ...mockPrismaUser };

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(await UserMapper.toDomain(prismaUser));

      const user = await userRepository.getOneById(prismaUser.id);

      expect(user).toBeInstanceOf(User);
      expect(user).toEqual(await UserMapper.toDomain(prismaUser));
      expect(prismaService.user.findUnique).toBeCalledWith({
        where: { id: prismaUser.id },
      });
    });
  });
});
