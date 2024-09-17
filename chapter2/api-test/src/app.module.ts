import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Dms\Controller } from './dms/dms/.controller';
import { DmsController } from './dms/dms.controller';
import { DController } from './d/d.controller';
import { DmsService } from './dms/dms.service';
import { DmsModule } from './dms/dms.module';

@Module({
  imports: [UsersModule, DmsModule],
  controllers: [AppController, Dms\Controller, DmsController, DController],
  providers: [AppService, DmsService],
})
export class AppModule {}
