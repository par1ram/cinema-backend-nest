import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { generateSlugFromRu } from '../utils/generate-slug'
import { UpdateActorDto } from './dto/update-actor.dto'

@Injectable()
export class ActorService {
  constructor(private prisma: PrismaService) {}

  async getAllActors(searchTerm?: string) {
    if (searchTerm) {
      await this.search(searchTerm)
    }
    if (!searchTerm) {
      return this.prisma.actor.findMany({
        select: {
          id: true,
          createdAt: true,
          name: true,
          slug: true,
          photoUrl: true,
          movies: {
            select: {
              id: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }
  }

  private async search(searchTerm: string) {
    return this.prisma.actor.findMany({
      where: {
        OR: [
          {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      },
    })
  }

  async getBySlug(slug: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { slug },
      select: {
        id: true,
        createdAt: true,
        name: true,
        slug: true,
        photoUrl: true,
        movies: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!actor) {
      throw new NotFoundException('No such actor')
    }

    if (actor) {
      return actor
    }
  }

  async getById(id: string) {
    const actor = await this.prisma.actor.findUnique({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        name: true,
        slug: true,
        photoUrl: true,
        movies: {
          select: {
            id: true,
          },
        },
      },
    })

    if (!actor) {
      throw new NotFoundException('No such actor')
    }

    if (actor) {
      return actor
    }
  }

  async create() {
    const actor = await this.prisma.actor.create({
      data: {
        name: '',
        slug: '',
        photoUrl: '',
      },
    })

    return actor.id
  }

  async update(id: string, dto: UpdateActorDto) {
    try {
      const status = await this.prisma.actor.update({
        where: { id },
        data: {
          name: dto.name,
          slug: generateSlugFromRu(dto.name),
          photoUrl: dto.photoUrl,
        },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such actor')
    }
  }

  async delete(id: string) {
    try {
      const status = await this.prisma.actor.delete({
        where: { id },
      })
      if (status) {
        return status
      }
    } catch {
      throw new NotFoundException('No such actor')
    }
  }
}
