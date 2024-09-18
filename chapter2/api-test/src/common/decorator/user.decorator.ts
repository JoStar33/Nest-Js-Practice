import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// User라는 데코레이터를 직접 만들어봤다!
// 참고로 http서버를 안쓰고 다른걸 쓸거면 switch치고 그내에서 선택ㄱㄱ
export const User = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return data ? request.user[data] : request.user;
});
