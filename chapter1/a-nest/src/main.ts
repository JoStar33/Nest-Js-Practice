import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

// 여기가 Nest실행 장소이다.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app에 use를 통해 뭘 적용하는것도 Express랑 비슷함.
  // passport나 쿠키파서같은거 연결하는건 app.use(cookieParser())이렇게 하면 됨.
  await app.listen(3000);
  const port = process.env.PORT || 3000;
  console.log(`listening on port ${port}`); // 3000!
  //껐다 켰다하기 귀찮잖아~ 핫 리로딩 하자고
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
