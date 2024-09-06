import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { NotFoundException } from '@nestjs/common';
import { Match } from './entities/match.entity';

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        {
          provide: MatchService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a match', async () => {
      const createMatchDto: CreateMatchDto = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2024-09-07',
        matchTime: '15:00',
      };

      const result = { id: 1, createdAt: new Date(), ...createMatchDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createMatchDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return all matches', async () => {
      const matches = [
        new Match({
          id: 1,
          homeTeam: 'Team A',
          awayTeam: 'Team B',
          matchDate: '2024-09-07',
          matchTime: '15:00',
        }),
        new Match({
          id: 2,
          homeTeam: 'Team C',
          awayTeam: 'Team D',
          matchDate: '2024-09-08',
          matchTime: '16:00',
        }),
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(matches);

      expect(await controller.findAll()).toEqual(matches);
    });
  });

  describe('findOne', () => {
    it('should return a match by id', async () => {
      const match = new Match({
        id: 1,
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2024-09-07',
        matchTime: '15:00',
      });
      jest.spyOn(service, 'findOne').mockResolvedValue(match);

      expect(await controller.findOne('1')).toEqual(match);
    });

    it('should throw NotFoundException if no match is found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });
});
