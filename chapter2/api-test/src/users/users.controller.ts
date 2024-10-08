import { Body, Controller, Get, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';

// 함수명은 최대한 겹치지않게 구성해주자! 사실상 반복작업..
// 쿼리스트링 바디 파일이런건 어케받지?
// 아래처럼 쓰면된다 @Req(). res는 @Res()
// 인터셉터의 적용은 아래와 같이 사용함.
// 밑에 컨트롤러 내부함수일부에 적용도 가능.
@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // 이렇게 응답 성공결과를 노출하는것 또한 가능하다.
  // 참고로 그냥 ApiOkResponse 이거쓰면 200으로 보임.
  @ApiResponse({
    status: 200,
    description: '성공',
    type: UserDto,
  })
  @ApiOperation({ summary: '사용자 정보' })
  @Get()
  getUsers(@User() user) {
    return user;
  }
  // 여기서 DTO라는 개념이 등장함
  // DTO는 클래스로 구성해주세요잉~
  // 그리고 지금부터는 객체지향적 사고로 알잘딱으로 상속하거나 구조를 만들면 좋겠죠?
  @ApiOperation({ summary: '사용자 등록' })
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.email, data.nickname, data.password);
  }
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    // 여기에는 패스포트를 붙일예정.
  }
  // 컨트롤러도 어지간하면 Req, Res를 안넣는게 좋음.
  // 의존성 주입 때문에. Express에 결합이 되는게 문제임.
  // 이게 나중에, Express에서 다른걸로 변경할때 문제가 될수있음.
  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut(@Req() req, @Res() res) {
    req.logOut();
    res.clearCookie('connect.sid', { httpOnly: true });
    res.send('ok');
  }
}
