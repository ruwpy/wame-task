import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { MatchModule } from './items/match/match.module';

@Module({
  imports: [DatabaseModule, MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
