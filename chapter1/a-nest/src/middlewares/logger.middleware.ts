import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  // 이거는 express랑 똑같다 그쵸?
  // 디버그라는 패키지를 통해 어떤 콘솔로그와 어떤 문맥에서 나오는지 확인 가능함.
  use(request: Request, response: Response): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent'); // 헤더에서 가져오는 정보죠?
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      // 이건 컨텍스트라는게 부여된 상태라, this.logger.log 이렇게 사용가능하고, 콘솔로그는 안씀 거의.
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });
  }
}
