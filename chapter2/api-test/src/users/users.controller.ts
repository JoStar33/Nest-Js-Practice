import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

// 함수명은 최대한 겹치지않게 구성해주자! 사실상 반복작업..
// 쿼리스트링 바디 파일이런건 어케받지?
// 아래처럼 쓰면된다 @Req(). res는 @Res()
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers(@Req() req) {
    return req.user;
  }
  // 여기서 DTO라는 개념이 등장함
  // DTO는 클래스로 구성해주세요잉~
  // 그리고 지금부터는 객체지향적 사고로 알잘딱으로 상속하거나 구조를 만들면 좋겠죠?
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.email, data.nickname, data.password);
  }
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
