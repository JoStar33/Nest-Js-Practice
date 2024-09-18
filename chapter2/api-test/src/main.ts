import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //자동으로 API 문서를 만들어주는 코드
  //스웨거내에 다양한 기능을 제공하고 있으니, 이 내에서 사용하면 된다.
  const config = new DocumentBuilder().setTitle('My API').setDescription('The my API description').setVersion('1.0').addTag('my').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
