// Nest의 컨벤션은 export만 쓰는걸로. 그리고 클래스만 쓴다.
// 자바스크립트 단에서도 타입검증을 할 수 있다는 점이 강점.
export class JoinRequestDto {
  public email: string;
  public nickname: string;
  public password: string;
}
