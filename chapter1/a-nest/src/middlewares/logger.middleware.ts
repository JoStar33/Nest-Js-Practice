import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// 현업에서는 참고로 nest morgan이라는게 별도로 존재하니까 그거쓰자.
// Q: implements는 왜 쓰는거냐 그럼?
// A: implements를 쓰면 에디터와 타입스크립트의 강점을 그대로 받을 수 있음.
// 에러에 대해서 알려주고, 코드의 구현에 강제성을 둘 수 있음. 따라서 에러를 사전에 방지할 수 있다는
// 장점이 있음.
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  // 이거는 express랑 똑같다 그쵸?
  // 디버그라는 패키지를 통해 어떤 콘솔로그와 어떤 문맥에서 나오는지 확인 가능함.
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent'); // 헤더에서 가져오는 정보죠?
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      // 이건 컨텍스트라는게 부여된 상태라, this.logger.log 이렇게 사용가능하고, 콘솔로그는 안씀 거의.
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });

    next();
  }
}
