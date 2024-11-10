import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AuthDto } from '../auth/dto/auth.dto'
import { hash } from 'argon2'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { movies: true },
    })
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { movies: true },
    })
  }

  async create(dto: AuthDto) {
    const user = {
      name: dto.name,
      email: dto.email,
      password: await hash(dto.password),
    }

    return this.prisma.user.create({
      data: user,
    })
  }

  async toggleFavorite(userId: string, movieId: string) {
    const userWithFavorite = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        movies: {
          where: { id: movieId },
          select: { id: true },
        },
      },
    })

    const isExists = userWithFavorite?.movies.length > 0

    if (isExists) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          movies: {
            disconnect: { id: movieId },
          },
        },
      })
    }

    if (!isExists) {
      await this.prisma.user.update({
        where: { id: userId },
        data: {
          movies: {
            connect: { id: movieId },
          },
        },
      })
    }
  }

  async getAllUsers(searchTerm?: string) {
    if (searchTerm) {
      await this.search(searchTerm)
    }
    if (!searchTerm) {
      return this.prisma.user.findMany({
        select: {
          id: true,
          createdAt: true,
          name: true,
          email: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
  }

  private async search(searchTerm: string) {
    return this.prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      const status = await this.prisma.user.update({
        where: { id },
        data: dto,
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('User not found')
    }
  }

  async delete(id: string) {
    try {
      const status = await this.prisma.user.delete({
        where: { id },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('User not found')
    }
  }
}
