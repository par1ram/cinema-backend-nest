import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { generateSlugFromRu } from '../utils/generate-slug'
import { returnMovieObject } from './return-movie.object'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}

  async getAllMovies(searchTerm?: string) {
    if (searchTerm) {
      await this.search(searchTerm)
    }
    if (!searchTerm) {
      return this.prisma.movie.findMany({
        select: returnMovieObject,
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
  }

  private async search(searchTerm: string) {
    return this.prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
  }

  async getBySlug(slug: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { slug },
      select: returnMovieObject,
    })

    if (!movie) {
      throw new NotFoundException('No such movie')
    }

    if (movie) {
      return movie
    }
  }

  async getMostPopular() {
    return this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        actors: true,
        genres: true,
      },
      take: 8,
    })
  }

  async getByActor(actorId: string) {
    const actors = await this.prisma.movie.findMany({
      where: {
        actors: {
          some: {
            id: actorId,
          },
        },
      },
    })
    if (actors.length > 0) {
      return actors
    }
    if (actors.length === 0) {
      throw new NotFoundException('No such actors')
    }
  }

  async getByGenres(genreIds: string[]) {
    return this.prisma.movie.findMany({
      where: {
        genres: {
          some: {
            id: {
              in: genreIds,
            },
          },
        },
      },
    })
  }

  async updateCountViews(slug: string) {
    return this.prisma.movie.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })
  }

  async getById(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      select: returnMovieObject,
    })

    if (!movie) {
      throw new NotFoundException('No such movie')
    }

    if (movie) {
      return movie
    }
  }

  async create() {
    const movie = await this.prisma.movie.create({
      data: {
        title: '',
        slug: '',
        poster: '',
        bigPoster: '',
        videoUrl: '',
        actors: {
          connect: [],
        },
        genres: {
          connect: [],
        },
      },
    })

    return movie.id
  }

  async update(id: string, dto: UpdateMovieDto) {
    try {
      const status = await this.prisma.movie.update({
        where: { id },
        data: {
          title: dto.title,
          slug: generateSlugFromRu(dto.title),
          poster: dto.poster,
          bigPoster: dto.bigPoster,
          videoUrl: dto.videoUrl,
          country: dto.country,
          year: dto.year,
          duration: dto.duration,
          genres: {
            set: dto.genres?.map((genreId) => ({ id: genreId })),
            disconnect: dto.genres
              ?.filter((genreId) => !dto.genres.includes(genreId))
              .map((genreId) => ({ id: genreId })),
          },
          actors: {
            set: dto.actors?.map((actorId) => ({ id: actorId })),
            disconnect: dto.actors
              ?.filter((actorId) => !dto.actors.includes(actorId))
              .map((actorId) => ({ id: actorId })),
          },
        },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such movie')
    }
  }

  async delete(id: string) {
    try {
      const status = await this.prisma.movie.delete({
        where: { id },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such movie')
    }
  }
}
