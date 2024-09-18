import { ApiProperty } from '@nestjs/swagger';
import { JoinRequestDto } from './join.request.dto';

export class UserDto extends JoinRequestDto {
  @ApiProperty({
    required: true,
    example: 1,
    description: '사용자 고유 ID',
  })
  public id: number;
}
