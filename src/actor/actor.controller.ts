import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ActorService } from './actor.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UpdateActorDto } from './dto/update-actor.dto'

@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('all')
  async getAllGenres(@Query('SearchTerm') searchTerm?: string) {
    return this.actorService.getAllActors(searchTerm)
  }

  @Get('get/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug)
  }

  @Get('get/by-id/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.actorService.getById(id)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.actorService.create()
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    return this.actorService.update(id, dto)
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.actorService.delete(id)
  }
}
