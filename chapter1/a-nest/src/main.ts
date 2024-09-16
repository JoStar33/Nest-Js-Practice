import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// 여기가 Nest실행 장소이다.
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const port = process.env.PORT || 3000;
  console.log(`listening on port ${port}`); // 3000!
}
bootstrap();
