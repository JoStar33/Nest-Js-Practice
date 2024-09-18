import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiParam, ApiQuery } from '@nestjs/swagger';

interface GetChatParam {
  id: string;
  url: string;
}

@Controller('api/workspace/:url/dms')
export class DmsController {
  // 쿼리스트링 & 파람스정보는 아래와 같이 정의한다.
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한 번에 가져오는 개수',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    description: '현재 페이지',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: '사용자 고유ID',
  })
  @Get(':id/chats')
  // 이런식으로 작성해서 쿼리스트링 값을 가져올 수 있고, 그게 아니라면 아예 객체정보를 가져오는것도
  // 가능하다.
  // 타입을 지정하는건 아래같이 :string 이렇게 넣어주면 된다!
  getChat(@Query('perPage') perPage: string, @Query('page') page: string, @Param() param: GetChatParam) {
    console.log(perPage);
    console.log(page);
    console.log(param.id); // 이렇게 param정보를 가져오는것도 가능.
  }

  @Post(':id/chats')
  postChat() {}
}
