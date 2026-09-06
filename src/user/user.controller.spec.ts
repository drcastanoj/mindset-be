import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './user.schema';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    _id: '507f1f77bcf86cd799439011',
    name: 'Test User',
    email: 'test@example.com',
    pass: 'password123',
  };

  const mockUserModel = {
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('should return an array of users', async () => {
      const users = [mockUser];
      jest.spyOn(service, 'findAll').mockResolvedValue(users as any);

      const result = await controller.getUser();
      expect(result).toEqual(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        pass: 'password123',
      };
      jest.spyOn(service, 'create').mockResolvedValue(mockUser as any);

      const result = await controller.createUser(createUserDto);
      expect(result).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updateUserDto = {
        name: 'Updated User',
        email: 'updated@example.com',
        pass: 'newpassword',
      };
      const updatedUser = { ...mockUser, ...updateUserDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser as any);

      const result = await controller.updateUser(mockUser._id, updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(mockUser._id, updateUserDto);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser as any);

      const result = await controller.removeUser(mockUser._id);
      expect(result).toEqual(mockUser);
      expect(service.remove).toHaveBeenCalledWith(mockUser._id);
    });
  });
});
