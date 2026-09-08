import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentController } from './appointment.constroller';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './appointment.dto';

describe('AppointmentController', () => {
  let controller: AppointmentController;
  let appointmentService: AppointmentService;

  const mockAppointmentService = {
    getAvailableAppointments: jest.fn(),
    findAppointmentsByMonthAndYear: jest.fn(),
    findAppointmentsByDayAndMonthAndYear: jest.fn(),
    createAppointment: jest.fn(),
    deleteAppointment: jest.fn(),
    updateAppointment: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentController],
      providers: [
        {
          provide: AppointmentService,
          useValue: mockAppointmentService,
        },
      ],
    }).compile();

    controller = module.get<AppointmentController>(AppointmentController);
    appointmentService = module.get<AppointmentService>(AppointmentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAppointment', () => {
    it('should return available appointments for a specific date', async () => {
      const day = 15;
      const month = 6;
      const year = 2023;
      const expectedAvailable = [8, 9, 10];

      mockAppointmentService.getAvailableAppointments.mockResolvedValue(
        expectedAvailable,
      );

      const result = await controller.getAppointment(day, month, year);

      expect(result).toEqual(expectedAvailable);
      expect(appointmentService.getAvailableAppointments).toHaveBeenCalledWith(
        day,
        month,
        year,
      );
    });
  });

  describe('getAppointmentsByMonth', () => {
    it('should return appointments for a specific month and year', async () => {
      const month = 6;
      const year = 2023;
      const expectedAppointments = [
        { day: 15, month: 6, year: 2023, hour: 10 },
        { day: 20, month: 6, year: 2023, hour: 11 },
      ];

      mockAppointmentService.findAppointmentsByMonthAndYear.mockResolvedValue(
        expectedAppointments,
      );

      const result = await controller.getAppointmentsByMonth(month, year);

      expect(result).toEqual(expectedAppointments);
      expect(
        appointmentService.findAppointmentsByMonthAndYear,
      ).toHaveBeenCalledWith(month, year);
    });
  });

  describe('getAppointmentsByDay', () => {
    it('should return appointments for a specific day, month and year', async () => {
      const day = 15;
      const month = 6;
      const year = 2023;
      const expectedAppointments = [
        { day: 15, month: 6, year: 2023, hour: 10 },
        { day: 15, month: 6, year: 2023, hour: 11 },
      ];

      mockAppointmentService.findAppointmentsByDayAndMonthAndYear.mockResolvedValue(
        expectedAppointments,
      );

      const result = await controller.getAppointmentsByDay(day, month, year);

      expect(result).toEqual(expectedAppointments);
      expect(
        appointmentService.findAppointmentsByDayAndMonthAndYear,
      ).toHaveBeenCalledWith(day, month, year);
    });
  });

  describe('createAppointment', () => {
    it('should create and return an appointment', async () => {
      const appointmentDto: AppointmentDto = {
        name: 'John Doe',
        email: 'john@example.com',
        pass: 'password',
        day: 15,
        month: 6,
        year: 2023,
        hour: 10,
        reason: 'Regular checkup',
        userId: undefined,
      };

      const expectedAppointment = {
        _id: '123',
        ...appointmentDto,
      };

      mockAppointmentService.createAppointment.mockResolvedValue(
        expectedAppointment,
      );

      const result = await controller.createAppointment(appointmentDto);

      expect(result).toEqual(expectedAppointment);
      expect(appointmentService.createAppointment).toHaveBeenCalledWith(
        appointmentDto,
      );
    });
  });

  describe('deleteAppointment', () => {
    it('should delete and return an appointment', async () => {
      const appointmentId = '123';
      const expectedAppointment = {
        _id: appointmentId,
        name: 'John Doe',
        email: 'john@example.com',
        day: 15,
        month: 6,
        year: 2023,
        hour: 10,
      };

      mockAppointmentService.deleteAppointment.mockResolvedValue(
        expectedAppointment,
      );

      const result = await controller.deleteAppointment(appointmentId);

      expect(result).toEqual(expectedAppointment);
      expect(appointmentService.deleteAppointment).toHaveBeenCalledWith(
        appointmentId,
      );
    });
  });

  describe('updateAppointment', () => {
    it('should update and return an appointment', async () => {
      const appointmentId = '123';
      const updateDto: Partial<AppointmentDto> = {
        hour: 11,
        reason: 'Updated reason',
      };

      const expectedAppointment = {
        _id: appointmentId,
        name: 'John Doe',
        email: 'john@example.com',
        day: 15,
        month: 6,
        year: 2023,
        hour: 11,
        reason: 'Updated reason',
      };

      mockAppointmentService.updateAppointment.mockResolvedValue(
        expectedAppointment,
      );

      const result = await controller.updateAppointment(
        appointmentId,
        updateDto,
      );

      expect(result).toEqual(expectedAppointment);
      expect(appointmentService.updateAppointment).toHaveBeenCalledWith(
        appointmentId,
        updateDto,
      );
    });
  });
});
