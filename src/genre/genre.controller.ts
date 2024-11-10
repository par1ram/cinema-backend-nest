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
import { GenreService } from './genre.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UpdateGenreDto } from './dto/update-genre.dto'

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get('all')
  async getAllGenres(@Query('SearchTerm') searchTerm?: string) {
    return this.genreService.getAllGenres(searchTerm)
  }

  @Get('get/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug)
  }

  @Get('get/by-id/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.genreService.getById(id)
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.genreService.create()
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.update(id, dto)
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.genreService.delete(id)
  }
}
