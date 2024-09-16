import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

// 이 부분이 공통적인 라우터 주소가 됨.
// 이를 IoC라고 합니다. 제어의 역전.
// 데코레이터는 아직까지 거부감이 드네요??
// 시간이 지나면 익숙해질듯ㅇㅇ
// 블랙박스랑 비슷한 느낌...
// 컨트롤러는 라우터랑 비슷하다고 할 수 있는데 서비스라는게 존재하네!!
// 컨트롤러는 서비스를 실행해서 결과값만 받아 리턴하는 역할을 수행한다.
// 컨트롤러는 req, res를 알고있음.

@Controller('abc')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello') // /abc/hello << 이렇게 표현됩니다
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('post') // /abc/post << 이렇게 표현됩니다
  postHello(): string {
    return this.appService.getHello();
  }
}
