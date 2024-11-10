import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { ReviewService } from './review.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../user/decorators/user.decorator'
import { CreateReviewDto } from './dto/create-review.dto'

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create/:movieId')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  async create(
    @CurrentUser('id') userId: string,
    @Param('movieId') movieId: string,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewService.create(userId, movieId, dto)
  }

  @Get('get/all')
  @Auth('admin')
  async getAll() {
    return this.reviewService.getAll()
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id)
  }
}
