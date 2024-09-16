import { Injectable } from '@nestjs/common';

// 서비스의 역할은 비즈니스 로직의 분리이다.
// 이친구는 요청과 응답에 대해서는 모른다.
// 서비스로 분리해두면, 중복된 기능을 사용하는 상황에서 유용하다.
@Injectable()
export class AppService {
  // req, res이런건 안넣는게 좋고, 해야하는 동작만 넣어주는게 좋다.
  getHello(): string {
    return 'Hello World!';
  }
  // 그리고 좋은점! 이렇게 결과데이터 그자체로 리턴만 하면 알아서 JSON으로 출력된다.
  // response.json 이런 난리를 안쳐도 됨.
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
