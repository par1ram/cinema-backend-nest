import { Prisma } from '@prisma/client'
import { returnReviewObject } from '../review/return-review.object'

export const returnMovieObject: Prisma.MovieSelect = {
  id: true,
  createdAt: true,
  title: true,
  slug: true,
  poster: true,
  bigPoster: true,
  videoUrl: true,
  views: true,
  country: true,
  year: true,
  duration: true,
  reviews: {
    orderBy: {
      createdAt: 'desc',
    },
    select: returnReviewObject,
  },
  actors: {
    select: {
      id: true,
      name: true,
      slug: true,
      photoUrl: true,
    },
  },
  genres: {
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      icon: true,
    },
  },
}
