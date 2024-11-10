import { IsEmail, IsEnum, IsString } from 'class-validator'
import { UserRole } from '@prisma/client'

export class UpdateUserDto {
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsEnum(UserRole)
  role: UserRole
}
