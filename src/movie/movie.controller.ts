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
import { MovieService } from './movie.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { UpdateMovieDto } from './dto/update-movie.dto'

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('all')
  async getAllMovies(@Query('searchTerm') searchTerm?: string) {
    return this.movieService.getAllMovies(searchTerm)
  }

  @Get('get/by-slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.movieService.getBySlug(slug)
  }

  @Get('get/most-popular')
  async getMostPopular() {
    return this.movieService.getMostPopular()
  }

  @Get('get/by-actor/:id')
  async getByActor(@Param('id') id: string) {
    return this.movieService.getByActor(id)
  }

  @Post('get/by-genres')
  @HttpCode(200)
  async getByGenres(@Body('genresIds') genresIds: string[]) {
    return this.movieService.getByGenres(genresIds)
  }

  @Put('update-count-views')
  async updateCountViews(@Body('slug') slug: string) {
    return this.movieService.updateCountViews(slug)
  }

  @Post('create')
  @HttpCode(200)
  @Auth('admin')
  async create() {
    return this.movieService.create()
  }

  @Get('get/by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.movieService.getById(id)
  }

  @Put('update/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth('admin')
  async update(@Param('id') id: string, @Body() data: UpdateMovieDto) {
    return this.movieService.update(id, data)
  }

  @Delete('delete/:id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.movieService.delete(id)
  }
}
