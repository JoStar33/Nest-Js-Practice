import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// 서비스의 역할은 비즈니스 로직의 분리이다.
// 이친구는 요청과 응답에 대해서는 모른다.
// 서비스로 분리해두면, 중복된 기능을 사용하는 상황에서 유용하다.
// Q: Injectable? 이건뭐임?
// A: DI라고 하죠? Injectable 이런애들을 보통 프로바이더라고 하고 모듈에다가 집어넣는데
// 의존성주입이라는걸 프로바이더에 연결로 판별지음. 생각을해보자. 컨트롤러에서 appService라는 정보를 우째알까?
// 타입만 넣으면 자동으로 서비스 정보를 가져오던데? 이게 바로 DI.
// 서비스를 내가 넣는게 아니라 남이 넣는거야.
// 객체의 정보가 고정돼서 들어가면 문제가 발생하겠지?
// 한마디로 함수의 매개변수 역할을 할 수 있다는 점이 특징.
// 결합성을 낮추는데에도 의미가 있음. 서비스를 임포트해서 쓰게되면, 그만큼 컨트롤러가 그 서비스객체에 더 의존하게 되는데
// 그게아니라 서비스 객체를 매개변수 형태로 받게되면 변화에 유연하게 됨.

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  // req, res이런건 안넣는게 좋고, 해야하는 동작만 넣어주는게 좋다.
  getHello(): string {
    // 참고로 .env파일 만들때 .env.prod, .env.dev 이렇게 만들어서 쓰는것도 가능함.
    // 환경변수별로 나뉘어서 쓰는것도 가능함.
    // 환경변수도 사실 Nest랑 관련이 없는거잖아? 이런 통제권까지도 Nest에게 넘기는거임ㅇㅇ
    console.log(process.env.TEST);

    // 아래와 같이 configService를 통해 사용도 가능함.
    // 이러면 TEST 정보를 가져올 수 있음. (env)
    // 걍 아래처럼쓰자!!!!
    this.configService.get('TEST');
    return 'Hello World!';
  }
  // 그리고 좋은점! 이렇게 결과데이터 그자체로 리턴만 하면 알아서 JSON으로 출력된다.
  // response.json 이런 난리를 안쳐도 됨. 확실히 단순명료해서 좋네요
  postHello(): number {
    let value = 0;
    for (let i = 0; i < 20; i++) {
      value += i;
    }
    return value;
  }
}

/**
 * Express의 단점: 테스트시에 가짜 객체를 모킹했어야함.
 * req, res, next를 넣어야 실행이 가능하기에 하나하나 정의가 필요했음.
 * 그러나 Nest.js는 하나의 함수 그자체로써 테스트할 수 있기에 장점이 있다.
 *
 * 재사용성 또한 뛰어나다.
 *
 * Nest는 서비스가 명확하게 나뉘어져 있기때문에 구조에대한 강제성을 띌수있다.
 * Express는 구조라는게 존재하지 않으니까 다소 별로지만, Nest는 이렇게 기능별로 나누고 관리하는게 가능.
 */
