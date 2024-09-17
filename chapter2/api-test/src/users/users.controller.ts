import { Controller, Get, Post, Req, Res } from '@nestjs/common';

// 함수명은 최대한 겹치지않게 구성해주자! 사실상 반복작업..
// 쿼리스트링 바디 파일이런건 어케받지?
// 아래처럼 쓰면된다 @Req(). res는 @Res()
@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Req() req) {
    return req.user;
  }
  @Post()
  postUsers() {}
  @Post('login')
  logIn() {
    // 여기에는 패스포트를 붙일예정.
  }
  // 컨트롤러도 어지간하면 Req, Res를 안넣는게 좋음.
  // 의존성 주입 때문에. Express에 결합이 되는게 문제임.
  // 이게 나중에, Express에서 다른걸로 변경할때 문제가 될수있음.
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
