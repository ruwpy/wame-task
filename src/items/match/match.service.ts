import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRespository: Repository<Match>,
  ) {}

  async create(createMatchDto: CreateMatchDto) {
    const match = new Match(createMatchDto);

    return await this.matchRespository.save(match);
  }

  async findAll() {
    const allMatches = await this.matchRespository.find();

    return allMatches;
  }

  async findOne(id: number) {
    const match = await this.matchRespository.findOne({
      where: {
        id,
      },
    });

    return match;
  }
}
