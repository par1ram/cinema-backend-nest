import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { returnReviewObject } from './return-review.object'

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, movieId: string, dto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        ...dto,
        movie: {
          connect: {
            id: movieId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  async getAll() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: returnReviewObject,
    })
  }

  async delete(id: string) {
    try {
      return this.prisma.review.delete({
        where: { id },
      })
    } catch {
      throw new NotFoundException('Comment not found')
    }
  }
}
