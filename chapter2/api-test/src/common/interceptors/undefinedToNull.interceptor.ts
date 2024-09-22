// 관심사를 가로가 아니라 새로로 흐르도록 하는 기능이라 하네요.
// A -> B -> C -> D
// A -> C -> D
// A -> E -> F -> D -> G
// Z -> A -> X -> D

// 위에 흐름에서 어느순간 내 관심사는 가로로 흐르는 흐름이 아니라
// 새로로 시선이 가있을거다(어? 지금 이 흐름의 공통점이 뭐지? 이렇게)

// 실행 전후사항에 대해서 일괄처리

// 보면 로깅쪽 코드가 딱 이에 부합하는데, 로깅이 API 호출시작되고, 마지막에 실행되고있는 구조다.
// 이거 사실 인터셉터로 구현가능.

// 인터셉터는 보통 컨트롤러 다음 어떤 동작을 할지 정할때 작성함.
// 컨트롤러에서 리턴한 데이터를 마지막으로 가공할 수 있는 찬스.

// 응답 정보를 알아서 바꾸고싶으면 씀.

import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

// Express의 미들웨어랑 비슷하네요?
@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    // 컨트롤러 가기 전부분
    // 여긴 간다음 부분. 여기서 rxjs를 쓰곤함. 데이터를 리턴해주고나서 어떤 형태로 만들건지 결정할 수 있음.
    // data가 undefined로 들어가면 json에 에러가 발생할수도 있음. 이걸 방지가능.
    // catchError라는 rxjs기능을 활용도 가능함.
    return next.handle().pipe(map((data) => (data === undefined ? null : data)));
  }
}
