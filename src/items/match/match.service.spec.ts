import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';

describe('MatchService', () => {
  let service: MatchService;
  let repository: Repository<Match>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        {
          provide: getRepositoryToken(Match),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    repository = module.get<Repository<Match>>(getRepositoryToken(Match));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new match', async () => {
      const createMatchDto: CreateMatchDto = {
        homeTeam: 'Team A',
        awayTeam: 'Team B',
        matchDate: '2024-09-07',
        matchTime: '15:00',
      };

      const match = new Match({
        ...createMatchDto,
      });

      jest.spyOn(repository, 'save').mockResolvedValue(match);

      expect(await service.create(createMatchDto)).toEqual(match);
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

      jest.spyOn(repository, 'find').mockResolvedValue(matches);

      expect(await service.findAll()).toEqual(matches);
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
      jest.spyOn(repository, 'findOne').mockResolvedValue(match);

      expect(await service.findOne(1)).toEqual(match);
    });

    it('should return null if no match is found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      expect(await service.findOne(1)).toBeNull();
    });
  });
});
