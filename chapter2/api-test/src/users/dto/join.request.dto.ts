// Nest의 컨벤션은 export만 쓰는걸로. 그리고 클래스만 쓴다.

import { ApiProperty } from '@nestjs/swagger';

// 자바스크립트 단에서도 타입검증을 할 수 있다는 점이 강점.
export class JoinRequestDto {
  // 이렇게 DTO 정보 및 예시 데이터를 정의하는것도 가능하다.
  // API 문서작성이 생각보다 간단한 편임. Express는 지금 이과정 자체만으로도
  // 생각이상으로 개빡쌤.
  @ApiProperty({
    example: 'test3765@naver.com',
    description: '사용자 이메일정보',
    required: true,
  })
  public email: string;
  @ApiProperty({
    example: '삐빅',
    description: '사용자 닉네임정보',
    required: false,
  })
  public nickname: string;
  @ApiProperty({
    example: 'DDsdfg123@@',
    description: '사용자 비밀번호',
    required: true,
  })
  public password: string;
}
