import { Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '122'
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png'
  })
  @Expose()
  public avatarUrl: string;

  @ApiProperty({
    description: 'User date birth (ISO format)',
    example: '1991-05-19'
  })
  @Expose()
  public dateOfBirth: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Keks'
  })
  @Expose()
  public lastname: string;
}
