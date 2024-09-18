import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DmsController } from './dms/dms.controller';
import { DmsService } from './dms/dms.service';
import { DmsModule } from './dms/dms.module';

@Module({
  imports: [UsersModule, DmsModule],
  controllers: [AppController, DmsController],
  providers: [AppService, DmsService],
})
export class AppModule {}
