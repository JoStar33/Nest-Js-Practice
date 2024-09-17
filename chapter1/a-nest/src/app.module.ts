import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';

// Nest는 모듈시스템으로 구성돼 있음.
// Express는 라우터를 추가해주는 방식으로 설계를 했다면, Nest는 모듈위주의
// 설계를 하게된다. Nest를 실행할때 나오는 메시지를 통해 연결을 확인가능하다.
// 다만 모듈을 직접 구성해야한다는 점에서는 스프링보다 IoC가 약하다.

// const getEnv = async () => {
//   // 이렇게 비밀키 정보를 API호출을 통해 가져오는것 또한 가능하다.
//   const response = await fetch('/key');
//   return response.body;
// };

// 생성된 객체의 메모리는 힙에 저장되고 스택에는 호출스택이 쌓인다.

@Module({
  // forRoot가 뭐냐면, 가끔가다 register나 forFeature 이런식으로 선언하는데,
  // 매개변수를 받아야해서 이렇게쓰는 경우가 있음.
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  /**
   * 이 프로바이더 형태의 원형
   * {
   *    provide: 명(고유한 키명),
   *    useClass: 명(클래스명)
   * }
   *
   * 참고로 클래스를 안쓸거면 useValue >> 이렇게쓰면 돼요.
   * 자바는 이를 신경안쓰지만 Nest는 변형이 가능함.
   */
  providers: [AppService, ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 라우터 전체에 로거를 적용하겠다. 라는 의미인데 특정 주소에만 미들웨어를
    // 적용하는것도 가능함.
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
