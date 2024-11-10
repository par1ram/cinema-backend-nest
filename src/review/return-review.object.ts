import { Prisma } from '@prisma/client'

export const returnReviewObject: Prisma.ReviewSelect = {
  id: true,
  createdAt: true,
  text: true,
  rating: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
  movie: {
    select: {
      id: true,
    },
  },
}
