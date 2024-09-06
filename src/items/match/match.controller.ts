import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Response,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async create(@Body() createMatchDto: CreateMatchDto) {
    const newMatch = await this.matchService.create(createMatchDto);

    return newMatch;
  }

  @Get()
  async findAll() {
    const allMatches = await this.matchService.findAll();

    return allMatches;
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string) {
    const match = await this.matchService.findOne(+id);

    if (!match) throw new NotFoundException();

    return match;
  }
}
