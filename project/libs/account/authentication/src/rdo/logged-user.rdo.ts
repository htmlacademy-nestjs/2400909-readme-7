import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: 'jkoj24o3j5njknkj5n23n5jn'
  })
  @Expose()
  public accessToken: string;
}
