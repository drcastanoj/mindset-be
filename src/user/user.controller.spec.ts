import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    create: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        { name: 'User 1', email: 'user1@example.com', pass: 'pass1' },
        { name: 'User 2', email: 'user2@example.com', pass: 'pass2' },
      ];

      mockUserService.findAll.mockResolvedValue(expectedUsers);

      const result = await controller.getUser();

      expect(result).toEqual(expectedUsers);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const createUserDto: UserDto = {
        name: 'New User',
        email: 'newuser@example.com',
        pass: 'password123',
      };

      const expectedUser = {
        _id: '123',
        ...createUserDto,
      };

      mockUserService.create.mockResolvedValue(expectedUser);

      const result = await controller.createUser(createUserDto);

      expect(result).toEqual(expectedUser);
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('deleteUser', () => {
    it('should delete and return a user', async () => {
      const userId = '123';
      const expectedUser = {
        _id: userId,
        name: 'User to Delete',
        email: 'delete@example.com',
        pass: 'password',
      };

      mockUserService.deleteUser.mockResolvedValue(expectedUser);

      const result = await controller.deleteUser(userId);

      expect(result).toEqual(expectedUser);
      expect(userService.deleteUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateUser', () => {
    it('should update and return a user', async () => {
      const userId = '123';
      const updateDto: Partial<UserDto> = {
        name: 'Updated Name',
      };

      const expectedUser = {
        _id: userId,
        name: 'Updated Name',
        email: 'user@example.com',
        pass: 'password',
      };

      mockUserService.updateUser.mockResolvedValue(expectedUser);

      const result = await controller.updateUser(userId, updateDto);

      expect(result).toEqual(expectedUser);
      expect(userService.updateUser).toHaveBeenCalledWith(userId, updateDto);
    });
  });
});
