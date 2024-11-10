import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { UpdateGenreDto } from './dto/update-genre.dto'
import { generateSlugFromRu } from '../utils/generate-slug'

@Injectable()
export class GenreService {
  constructor(private prisma: PrismaService) {}

  async getAllGenres(searchTerm?: string) {
    if (searchTerm) {
      await this.search(searchTerm)
    }
    if (!searchTerm) {
      return this.prisma.genre.findMany({
        select: {
          id: true,
          createdAt: true,
          name: true,
          slug: true,
          description: true,
          icon: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
  }

  private async search(searchTerm: string) {
    return this.prisma.genre.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
            description: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
  }

  async getBySlug(slug: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { slug },
      select: {
        id: true,
        createdAt: true,
        name: true,
        slug: true,
        description: true,
      },
    })

    if (!genre) {
      throw new NotFoundException('No such genre')
    }

    if (genre) {
      return genre
    }
  }

  async getById(id: string) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        name: true,
        slug: true,
        description: true,
      },
    })

    if (!genre) {
      throw new NotFoundException('No such genre')
    }

    if (genre) {
      return genre
    }
  }

  async create() {
    const genre = await this.prisma.genre.create({
      data: {
        name: '',
        slug: '',
        description: '',
        icon: '',
      },
    })

    return genre.id
  }

  async update(id: string, dto: UpdateGenreDto) {
    try {
      const status = await this.prisma.genre.update({
        where: { id },
        data: {
          name: dto.name,
          slug: generateSlugFromRu(dto.name),
          description: dto.description,
          icon: dto.icon,
        },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such genre')
    }
  }

  async delete(id: string) {
    try {
      const status = await this.prisma.genre.delete({
        where: { id },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such genre')
    }
  }
}
