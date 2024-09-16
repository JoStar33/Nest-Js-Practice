import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Nest는 모듈시스템으로 구성돼 있음.
// Express는 라우터를 추가해주는 방식으로 설계를 했다면, Nest는 모듈위주의
// 설계를 하게된다. Nest를 실행할때 나오는 메시지를 통해 연결을 확인가능하다.
// 다만 모듈을 직접 구성해야한다는 점에서는 스프링보다 IoC가 약하다.

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
