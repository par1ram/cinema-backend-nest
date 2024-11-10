import { IsString } from 'class-validator'

export class RefreshTokenDto {
  @IsString({
    message: 'Token is required',
  })
  refreshToken: string
}
