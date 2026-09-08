import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  const mockUserService = {
    findOne: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password when credentials are valid', async () => {
      const mockUser: any = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        pass: 'password123',
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual({
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
      });
      expect(userService.findOne).toHaveBeenCalledWith('test@example.com');
    });

    it('should return null when user is not found', async () => {
      mockUserService.findOne.mockResolvedValue(null);

      const result = await service.validateUser(
        'test@example.com',
        'password123',
      );

      expect(result).toBeNull();
    });

    it('should return null when password is incorrect', async () => {
      const mockUser: any = {
        _id: '123',
        name: 'Test User',
        email: 'test@example.com',
        pass: 'password123',
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await service.validateUser(
        'test@example.com',
        'wrongpassword',
      );

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token', async () => {
      const mockUser = {
        _doc: {
          name: 'Test User',
          email: 'test@example.com',
        },
      };

      mockJwtService.sign.mockReturnValue('test-jwt-token');

      const result = await service.login(mockUser);

      expect(result).toEqual({ access_token: 'test-jwt-token' });
      expect(jwtService.sign).toHaveBeenCalledWith({
        name: 'Test User',
        email: 'test@example.com',
      });
    });
  });
});
