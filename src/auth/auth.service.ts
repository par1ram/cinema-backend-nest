import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { AuthDto } from './dto/auth.dto'
import { JwtService } from '@nestjs/jwt'
import { verify } from 'argon2'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthDto) {
    const activeUser = await this.userService.getByEmail(dto.email)

    if (activeUser) {
      throw new BadRequestException('User already exists')
    }

    if (!activeUser) {
      const user = await this.userService.create(dto)
      const tokens = await this.issueTokens(user.id)

      return {
        user,
        ...tokens,
      }
    }
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokens(user.id)

    return {
      user,
      ...tokens,
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const validToken = await this.jwtService.verify(refreshToken)

      if (!validToken) {
        throw new UnauthorizedException('Token not verified')
      }

      if (validToken) {
        const user = await this.userService.getById(validToken.id)
        const tokens = await this.issueTokens(user.id)

        return {
          user,
          ...tokens,
        }
      }
    } catch {
      throw new UnauthorizedException('Wrong token')
    }
  }

  private async issueTokens(userId: string) {
    const data = { id: userId }

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1h',
    })

    const refreshToken = await this.jwtService.signAsync(data, {
      expiresIn: '7d',
    })

    return { accessToken, refreshToken }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email)

    if (!user) {
      throw new NotFoundException('User does not exist')
    }

    if (user) {
      const isValidPassword = await verify(user.password, dto.password)

      if (!isValidPassword) {
        throw new UnauthorizedException('Wrong password')
      }

      if (isValidPassword) {
        return user
      }
    }
  }
}
