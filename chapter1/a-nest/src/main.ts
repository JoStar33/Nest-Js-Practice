import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

// 여기가 Nest실행 장소이다.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
